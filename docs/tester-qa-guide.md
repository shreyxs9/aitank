# The Loop QA Testing Guide

Use this document to test the public magazine, contributor workspace, and admin review flow before sharing the app widely.

## Test Environments

| Area | URL | Notes |
| --- | --- | --- |
| Public app | `https://loop.aitank.ai` | Main reader and contributor experience |
| Admin app | `https://loop.aitank.ai/admin` | Admin review dashboard |
| Admin login | `https://loop.aitank.ai/admin/login` | Use when redirected from admin |

## Admin Credentials

| Field | Value |
| --- | --- |
| Admin ID | `aitank.com` |
| Password | `aitank2026` |

Keep these credentials inside the testing group only.

## Recommended Test Matrix

Test at least these browser and device combinations:

| Platform | Browsers | Viewports |
| --- | --- | --- |
| Desktop | Chrome, Edge, Safari if available | 1440px, 1280px, 1024px |
| Mobile | Chrome Android, Safari iOS if available | 390px, 430px |
| Tablet | Safari or Chrome | 768px, 834px |

For every scenario, check:

- Page loads without a blank screen.
- Header, footer, buttons, links, forms, and images are visible.
- Text does not overlap or get clipped.
- Mobile menu opens and closes correctly.
- Back/forward browser navigation works.
- Refreshing the page keeps the expected state.
- Error messages are understandable.

## Smoke Test

Run this first on every build.

1. Open `https://loop.aitank.ai`.
2. Confirm the homepage loads with The Loop branding.
3. Open the mobile menu on a small viewport and verify all links are usable.
4. Open a featured article from the homepage.
5. Return to the homepage using the "Back to issue" link.
6. Click "Join our Community" and confirm it opens WhatsApp in a new tab.
7. Click "Visit AI Tank website" and confirm it opens `https://aitank.ai` in a new tab.
8. Open `/login`, `/write`, `/my-articles`, `/admin`, and `/admin/login` directly.

Expected result: public pages load normally, protected contributor pages redirect to login when signed out, and `/admin` redirects to admin login when no admin session exists.

## Public Reader Testing

### Homepage

1. Open `https://loop.aitank.ai`.
2. Verify the issue strip, hero article, editorial article sections, community section if present, and community pulse render correctly.
3. Click every visible article card.
4. Verify article links route to `/article/{slug}`.
5. Refresh the homepage.

Expected result: static editorial content appears for all users. Admin-approved community articles should appear in the community section. Draft, pending, and rejected articles should not appear on the homepage.

### Article Page

1. Open a featured/editorial article from the homepage.
2. Verify article header data: section, title, deck, author/date metadata, cover image if available.
3. Scroll through the article body.
4. Verify sidebar content renders on desktop and stacks acceptably on mobile.
5. Open an invalid article URL, for example `/article/not-a-real-slug`.

Expected result: valid articles render correctly. Invalid article URLs redirect back to the homepage.

### Signed-Out Article Preview

1. Sign out of contributor account if already signed in.
2. Open a community article URL if available.
3. Verify the article is readable according to the intended public/preview behavior.

Expected result: article content should not break for signed-out users. Any preview-only treatment should be intentional and visually clear.

## Contributor Account Testing

### Create Account

1. Open `https://loop.aitank.ai/login`.
2. Select "Create account".
3. Test profile picture upload with a valid JPG, PNG, or WebP under 5 MB.
4. Enter a display name and designation.
5. Enter a valid email and a password with at least 6 characters.
6. Submit the form.

Expected result: account creation succeeds or shows an email confirmation message, depending on Supabase email confirmation settings.

Validation checks:

- Empty email should show an email error.
- Invalid email format should show an email error.
- Email longer than 50 characters should be rejected.
- Password shorter than 6 characters should be rejected.
- Profile picture must be JPG, PNG, or WebP.
- Profile picture over 5 MB should be rejected.
- Display name must be 2 to 60 characters if provided.
- Designation must be 2 to 90 characters if provided.

### Login

1. Open `https://loop.aitank.ai/login`.
2. Select "Login".
3. Enter valid contributor credentials.
4. Submit.
5. Verify redirect goes to `/write` by default.
6. Sign out from the header.
7. Try an incorrect password.

Expected result: valid credentials sign the user in. Invalid credentials show an error and do not authenticate the user.

### Protected Routes

Test while signed out:

1. Open `/write`.
2. Open `/my-articles`.

Expected result: both routes redirect to `/login`.

Test while signed in:

1. Open `/write`.
2. Open `/my-articles`.

Expected result: both routes load without redirecting.

## Write Article Testing

### Save Draft

1. Sign in as a contributor.
2. Open `/write`.
3. Fill headline, deck, tags, body, and optional cover image.
4. Select "Draft".
5. Click "Save draft".
6. Verify redirect to the article preview URL.
7. Open `/my-articles`.
8. Confirm the article appears with status "Draft".

Expected result: draft saves successfully and appears only in the contributor's workspace. It should not appear on the public homepage.

### Submit for Review

1. Open `/write`.
2. Fill all required fields.
3. Select "Review".
4. Click "Submit for review".
5. Verify redirect to the article preview URL.
6. Open `/my-articles`.
7. Confirm the article appears with status "In review".
8. Open the public homepage in a signed-out browser.

Expected result: submitted article appears in My Articles and admin review queue, but should not appear on the public homepage until approved.

### Required Field Validation

Test these cases one by one:

- Empty headline.
- Headline shorter than 8 characters.
- Headline longer than 110 characters.
- Empty deck.
- Deck shorter than 30 characters.
- Deck longer than 220 characters.
- No tags.
- Tag shorter than 2 characters.
- Tag longer than 28 characters.
- Unsupported tag characters.
- Body under 120 words.
- Body over 30,000 characters.
- Cover image with unsupported file type.
- Cover image over 5 MB.

Expected result: form blocks submission and shows a clear validation error.

### Article Preview Panel

1. Type headline, deck, tags, body, and upload a cover.
2. Watch the right-side preview panel.
3. Remove the cover image.
4. Switch between Draft and Review.

Expected result: preview updates live, word count updates, readiness percentage updates, tag pills update, and cover preview can be replaced or removed.

## My Articles Testing

1. Sign in as a contributor.
2. Open `/my-articles`.
3. Verify total, review, draft, and live counters.
4. Confirm each article card shows image/no image, status, title, deck, tags, and date.
5. Click "Preview article" or "Open live post".
6. Delete a draft article.
7. Cancel a delete confirmation.
8. Confirm a delete confirmation.

Expected result: counters reflect article statuses, article links work, canceled delete does nothing, confirmed delete removes the article from the list.

Security check: a contributor should only see and delete their own articles.

## Admin Testing

### Admin Login

1. Open `https://loop.aitank.ai/admin`.
2. Verify redirect to `/admin/login` if not signed in as admin.
3. Enter Admin ID `aitank.com`.
4. Enter password `aitank2026`.
5. Submit.

Expected result: admin dashboard opens at `/admin`.

Negative checks:

- Empty Admin ID should be rejected.
- Invalid Admin ID should be rejected.
- Password shorter than 8 characters should be rejected.
- Incorrect password should show "Invalid admin credentials."

### Review Dashboard

1. Open `/admin` after admin login.
2. Verify dashboard stats: total, pending, approved, rejected.
3. Confirm submitted contributor articles appear in the queue.
4. Verify each card shows cover/no cover, author name, created date, status, title, deck, tags, Preview, Approve, and Reject.
5. Click "Preview" on a pending article.

Expected result: review queue loads and pending submissions are inspectable before approval.

### Approve Article

1. Create or locate an article with status "Pending".
2. Click "Approve".
3. Wait for the button state to finish.
4. Confirm status changes to "Approved".
5. Open homepage in a signed-out or fresh browser session.
6. Confirm the article appears in the community articles section.
7. Open the article URL.

Expected result: approved articles become public.

### Reject Article

1. Create or locate an article with status "Pending".
2. Click "Reject".
3. Confirm status changes to "Rejected".
4. Open homepage.

Expected result: rejected articles do not appear publicly. The contributor should see the rejected status in My Articles.

### Admin Sign Out

1. Click "Sign out admin".
2. Confirm redirect to `/admin/login`.
3. Open `/admin` again.

Expected result: admin session is cleared and `/admin` requires login again.

## End-to-End Publishing Loop

Use this complete loop before release:

1. Create a new contributor account or sign in as a test contributor.
2. Create one draft article.
3. Confirm the draft appears in `/my-articles`.
4. Confirm the draft does not appear on the homepage.
5. Create another article and submit it for review.
6. Confirm it appears as "In review" in `/my-articles`.
7. Sign in to admin at `/admin`.
8. Confirm the submitted article appears as "Pending".
9. Preview the article from admin.
10. Approve the article.
11. Open the homepage in a signed-out browser.
12. Confirm the approved article appears publicly.
13. Open the published article.
14. Return to contributor `/my-articles`.
15. Confirm the article status is "Live".
16. Create another review article.
17. Reject it from admin.
18. Confirm the rejected article does not appear on the homepage.
19. Confirm the contributor sees it as "Rejected".
20. Sign out from contributor and admin sessions.

Expected result: the full draft to review to approve/reject workflow behaves consistently across contributor, admin, and public views.

## Responsive and Visual QA

Check these pages at mobile, tablet, and desktop widths:

- `/`
- `/login`
- `/write`
- `/my-articles`
- `/admin/login`
- `/admin`
- At least three `/article/{slug}` pages

For each page, verify:

- No horizontal scrolling.
- Header remains usable.
- Mobile menu does not cover content permanently.
- Forms fit within the viewport.
- Sticky save bar on `/write` does not hide required form content.
- Images keep correct aspect ratio.
- Long article titles, tags, and names wrap cleanly.
- Buttons are large enough to tap on mobile.

## Accessibility Checks

Run quick manual checks:

- Navigate every page using keyboard only.
- Confirm visible focus states on links, buttons, inputs, and file upload controls.
- Confirm forms can be submitted with Enter where expected.
- Confirm images that are decorative do not create confusing screen reader output.
- Confirm error messages are shown close to the related form.
- Confirm color contrast is readable in dark UI sections.

## Performance and Reliability Checks

1. Test on a normal network and a slow mobile network.
2. Refresh every major route.
3. Open routes directly in a new browser tab.
4. Upload an image near 5 MB.
5. Submit forms twice quickly to verify duplicate submissions are prevented.
6. Leave `/write` open for several minutes, then submit.

Expected result: pages recover on refresh, direct URLs work, loading states appear when needed, and duplicate button presses do not create obvious duplicate records.

## Data Cleanup After Testing

After each testing session:

1. Delete unnecessary test drafts from `/my-articles`.
2. Reject or delete unwanted test submissions.
3. Keep one approved test article only if the team wants a live sample.
4. Record any test accounts created.

## Bug Report Format

Use this format for every issue:

```text
Title:
Environment:
URL:
Device/browser:
User type: signed out / contributor / admin
Test account used:

Steps to reproduce:
1.
2.
3.

Expected result:
Actual result:
Screenshot/video:
Console error, if any:
Network error, if any:
Severity: blocker / high / medium / low
Notes:
```

## Severity Guide

| Severity | Meaning |
| --- | --- |
| Blocker | Cannot load app, cannot sign in, cannot submit/review articles, data loss, public security issue |
| High | Major workflow broken, incorrect public publishing state, upload failures, route crashes |
| Medium | Validation issue, layout issue on common device, confusing error, broken secondary link |
| Low | Copy issue, minor spacing, small visual inconsistency |

## Release Sign-Off Checklist

- Public homepage works on desktop and mobile.
- Article pages work for existing editorial articles.
- Contributor signup and login work.
- `/write` can save draft and submit for review.
- `/my-articles` shows correct article statuses.
- Admin login works with provided credentials.
- Admin can approve and reject submissions.
- Approved submissions appear publicly.
- Rejected and draft submissions stay hidden from homepage.
- Sign out works for contributor and admin.
- No console errors on core routes.
- No major mobile layout issues.
- Test data is cleaned up or intentionally retained.
