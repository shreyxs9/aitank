# Supabase Setup

## Phase 1

1. Create a Supabase project.
2. Copy `.env.example` to `.env`.
3. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. The schema creates a public storage bucket named `article-covers` used by the `/write` drop area.

## If draft save fails with RLS

Run the latest `supabase/schema.sql` again.

This version fixes the common failure where:
- `articles.author_id` depended on `public.profiles`
- the user had authenticated successfully
- but no matching profile row existed yet

The updated schema now:
- references `auth.users(id)` from `public.articles`
- auto-creates a `public.profiles` row with a trigger on `auth.users`
- backfills missing profile rows for existing users

## Current app flow

- `/login` handles email/password auth.
- `/admin/login` handles admin email/password auth.
- `/admin` lets configured admins review, approve, or reject contributor submissions.
- `/write` is protected and lets a signed-in user create drafts or submit articles for review.
- `/my-articles` lists the current user's submissions.
- `/article/:slug` falls back to Supabase when the slug is not in the local mock content file.
- The homepage only renders community articles with `status = 'published'`.
- Admin-approved submissions are rows with `status = 'published'`.

## Temporary admin setup

Run `supabase/schema.sql` again so the temporary review RPC functions exist.

Admins sign in at `/admin/login` with:

- Admin ID: `aitank.com`
- Password: `aitank2026`

This is a temporary hardcoded gate. Move this to Supabase Auth roles before production.

If `/admin` shows that the review queue failed to load, the most likely cause is that the
latest schema has not been run in Supabase yet. Re-run `supabase/schema.sql`; the file grants
RPC access and sends `notify pgrst, 'reload schema';` so PostgREST can find the new functions.

## Next build slices

1. Add an editor with markdown blocks or rich text.
2. Revoke object URLs after preview replacement to tighten client-side cleanup.
