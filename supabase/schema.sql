create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  display_name text,
  designation text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles
add column if not exists designation text;

create table if not exists public.app_admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default timezone('utc', now()),
  constraint app_admins_email_lowercase check (email = lower(email))
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  slug text not null unique,
  title text not null,
  deck text not null default '',
  section text not null default 'Community',
  body text not null,
  cover_image_url text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'pending_review', 'published', 'rejected')),
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('profile-pictures', 'profile-pictures', true)
on conflict (id) do nothing;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, username, designation, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'user_name',
    new.raw_user_meta_data ->> 'designation',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set
    display_name = excluded.display_name,
    username = excluded.username,
    designation = excluded.designation,
    avatar_url = excluded.avatar_url,
    updated_at = timezone('utc', now());

  return new;
end;
$$;

create or replace function public.is_app_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.is_hardcoded_admin(admin_password text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select admin_password = 'aitank2026';
$$;

create or replace function public.email_is_registered(email_to_check text)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from auth.users
    where lower(email) = lower(trim(email_to_check))
  );
$$;

create or replace function public.admin_fetch_review_articles(admin_password text)
returns table (
  author_id uuid,
  body text,
  cover_image_url text,
  created_at timestamptz,
  deck text,
  id uuid,
  published_at timestamptz,
  section text,
  slug text,
  status text,
  tags text[],
  title text,
  updated_at timestamptz,
  author_display_name text,
  author_designation text,
  author_avatar_url text,
  author_username text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    articles.author_id,
    articles.body,
    articles.cover_image_url,
    articles.created_at,
    articles.deck,
    articles.id,
    articles.published_at,
    articles.section,
    articles.slug,
    articles.status,
    articles.tags,
    articles.title,
    articles.updated_at,
    profiles.display_name as author_display_name,
    profiles.designation as author_designation,
    profiles.avatar_url as author_avatar_url,
    profiles.username as author_username
  from public.articles
  left join public.profiles
    on profiles.id = articles.author_id
  where public.is_hardcoded_admin(admin_password)
    and articles.status in ('pending_review', 'published', 'rejected')
  order by articles.created_at desc;
$$;

create or replace function public.admin_update_article_review_status(
  admin_password text,
  article_id uuid,
  next_status text
)
returns table (
  author_id uuid,
  body text,
  cover_image_url text,
  created_at timestamptz,
  deck text,
  id uuid,
  published_at timestamptz,
  section text,
  slug text,
  status text,
  tags text[],
  title text,
  updated_at timestamptz,
  author_display_name text,
  author_designation text,
  author_avatar_url text,
  author_username text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_hardcoded_admin(admin_password) then
    raise exception 'Invalid admin credentials';
  end if;

  if next_status not in ('published', 'rejected') then
    raise exception 'Invalid review status';
  end if;

  update public.articles
  set
    status = next_status,
    published_at = case
      when next_status = 'published' then timezone('utc', now())
      else null
    end
  where articles.id = article_id;

  return query
  select
    articles.author_id,
    articles.body,
    articles.cover_image_url,
    articles.created_at,
    articles.deck,
    articles.id,
    articles.published_at,
    articles.section,
    articles.slug,
    articles.status,
    articles.tags,
    articles.title,
    articles.updated_at,
    profiles.display_name as author_display_name,
    profiles.designation as author_designation,
    profiles.avatar_url as author_avatar_url,
    profiles.username as author_username
  from public.articles
  left join public.profiles
    on profiles.id = articles.author_id
  where articles.id = article_id;
end;
$$;

grant execute on function public.is_hardcoded_admin(text) to anon, authenticated;
grant execute on function public.email_is_registered(text) to anon, authenticated;
grant execute on function public.admin_fetch_review_articles(text) to anon, authenticated;
grant execute on function public.admin_update_article_review_status(text, uuid, text) to anon, authenticated;

notify pgrst, 'reload schema';

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row
execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.app_admins enable row level security;
alter table public.articles enable row level security;

alter table public.articles
drop constraint if exists articles_status_check;

alter table public.articles
add constraint articles_status_check
check (status in ('draft', 'pending_review', 'published', 'rejected'));

drop policy if exists "app_admins_select_own_email" on public.app_admins;
create policy "app_admins_select_own_email"
on public.app_admins
for select
to authenticated
using (email = lower(coalesce(auth.jwt() ->> 'email', '')));

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_select_admins" on public.profiles;
create policy "profiles_select_admins"
on public.profiles
for select
to authenticated
using (public.is_app_admin());

drop policy if exists "profiles_select_published_authors" on public.profiles;
create policy "profiles_select_published_authors"
on public.profiles
for select
to authenticated, anon
using (
  exists (
    select 1
    from public.articles
    where articles.author_id = profiles.id
      and articles.status = 'published'
  )
);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "articles_select_published_or_own" on public.articles;
create policy "articles_select_published_or_own"
on public.articles
for select
to authenticated, anon
using (status = 'published' or auth.uid() = author_id);

drop policy if exists "articles_select_admins" on public.articles;
create policy "articles_select_admins"
on public.articles
for select
to authenticated
using (public.is_app_admin());

drop policy if exists "articles_insert_own" on public.articles;
create policy "articles_insert_own"
on public.articles
for insert
to authenticated
with check (
  auth.uid() = author_id
  and status in ('draft', 'pending_review')
  and published_at is null
);

drop policy if exists "articles_update_own" on public.articles;
create policy "articles_update_own"
on public.articles
for update
to authenticated
using (
  auth.uid() = author_id
  and status in ('draft', 'pending_review', 'rejected')
)
with check (
  auth.uid() = author_id
  and status in ('draft', 'pending_review')
  and published_at is null
);

drop policy if exists "articles_update_admins" on public.articles;
create policy "articles_update_admins"
on public.articles
for update
to authenticated
using (public.is_app_admin())
with check (
  public.is_app_admin()
  and (
    (status = 'published' and published_at is not null)
    or (status = 'rejected' and published_at is null)
    or status = 'pending_review'
    or status = 'draft'
  )
);

drop policy if exists "articles_delete_own" on public.articles;
create policy "articles_delete_own"
on public.articles
for delete
to authenticated
using (auth.uid() = author_id);

drop policy if exists "article_covers_public_read" on storage.objects;
create policy "article_covers_public_read"
on storage.objects
for select
to public
using (bucket_id = 'article-covers');

drop policy if exists "article_covers_insert_own" on storage.objects;
create policy "article_covers_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'article-covers'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "article_covers_update_own" on storage.objects;
create policy "article_covers_update_own"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'article-covers'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'article-covers'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "article_covers_delete_own" on storage.objects;
create policy "article_covers_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'article-covers'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "profile_pictures_public_read" on storage.objects;
create policy "profile_pictures_public_read"
on storage.objects
for select
to public
using (bucket_id = 'profile-pictures');

drop policy if exists "profile_pictures_insert_own" on storage.objects;
create policy "profile_pictures_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'profile-pictures'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "profile_pictures_update_own" on storage.objects;
create policy "profile_pictures_update_own"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'profile-pictures'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'profile-pictures'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "profile_pictures_delete_own" on storage.objects;
create policy "profile_pictures_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'profile-pictures'
  and auth.uid()::text = (storage.foldername(name))[1]
);

insert into public.profiles (id, display_name, username, designation, avatar_url)
select
  id,
  raw_user_meta_data ->> 'display_name',
  raw_user_meta_data ->> 'user_name',
  raw_user_meta_data ->> 'designation',
  raw_user_meta_data ->> 'avatar_url'
from auth.users
on conflict (id) do update
set
  display_name = excluded.display_name,
  username = excluded.username,
  designation = excluded.designation,
  avatar_url = excluded.avatar_url,
  updated_at = timezone('utc', now());
