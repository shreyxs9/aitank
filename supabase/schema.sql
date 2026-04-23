create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
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
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
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
  insert into public.profiles (id, display_name, username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'user_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set
    display_name = excluded.display_name,
    username = excluded.username,
    avatar_url = excluded.avatar_url,
    updated_at = timezone('utc', now());

  return new;
end;
$$;

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
alter table public.articles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

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

drop policy if exists "articles_insert_own" on public.articles;
create policy "articles_insert_own"
on public.articles
for insert
to authenticated
with check (auth.uid() = author_id);

drop policy if exists "articles_update_own" on public.articles;
create policy "articles_update_own"
on public.articles
for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

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

insert into public.profiles (id, display_name, username, avatar_url)
select
  id,
  raw_user_meta_data ->> 'display_name',
  raw_user_meta_data ->> 'user_name',
  raw_user_meta_data ->> 'avatar_url'
from auth.users
on conflict (id) do update
set
  display_name = excluded.display_name,
  username = excluded.username,
  avatar_url = excluded.avatar_url,
  updated_at = timezone('utc', now());
