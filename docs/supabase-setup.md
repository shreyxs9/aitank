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
- `/write` is protected and lets a signed-in user create draft or published articles.
- `/my-articles` lists the current user's submissions.
- `/article/:slug` falls back to Supabase when the slug is not in the local mock content file.

## Next build slices

1. Add an editor with markdown blocks or rich text.
2. Add admin moderation so community posts can be reviewed before public publish.
3. Blend published community stories into the homepage once the editorial rules are defined.
4. Revoke object URLs after preview replacement to tighten client-side cleanup.
