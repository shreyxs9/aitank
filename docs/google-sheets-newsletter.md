# Google Sheets Newsletter Setup

This app uses a custom email input on the site and posts submissions to a Google Apps Script web app. The script writes emails into a `Subscribers` sheet.

## 1. Create the sheet

1. Create a new Google Sheet.
2. Rename the first tab to `Subscribers`, or leave it empty and let the script create it.

## 2. Add the Apps Script

1. In the Google Sheet, open `Extensions` -> `Apps Script`.
2. Replace the default script with the contents of [newsletter-signup.gs](../google-apps-script/newsletter-signup.gs).
3. Save the project.

## 3. Deploy the web app

1. Click `Deploy` -> `New deployment`.
2. Choose type `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Deploy and authorize the script.
6. Copy the `/exec` web app URL.

## 4. Add the URL to the frontend

Put the web app URL in [`.env`](../.env):

```env
VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/your-script-id/exec
```

Then restart the Vite dev server if it is already running.

## 5. What gets stored

Each signup writes one row with:

- `Subscribed At`
- `Email`
- `Source`

The script ignores obvious bot submissions through the hidden `website` field and skips duplicate emails.

## Notes

- The site keeps your custom input UI. No external Brevo template is shown.
- This setup uses a standard form POST to a hidden iframe because Google Apps Script web apps are awkward with browser `fetch()` due to CORS limitations. This form-post pattern avoids that issue while keeping the UX native.
