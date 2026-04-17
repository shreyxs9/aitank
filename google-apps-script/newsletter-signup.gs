const SHEET_NAME = 'Subscribers';

function doGet() {
  return renderText('Newsletter signup endpoint is live. Use POST to submit emails.');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const email = String(e?.parameter?.email || '').trim().toLowerCase();
    const honeypot = String(e?.parameter?.website || '').trim();
    const source = String(e?.parameter?.source || 'Website').trim();

    if (honeypot) {
      return renderText('ok');
    }

    if (!isValidEmail(email)) {
      return renderText('invalid email');
    }

    const sheet = getSubscribersSheet_();
    const existingEmails = getExistingEmails_(sheet);

    if (existingEmails.has(email)) {
      return renderText('already subscribed');
    }

    sheet.appendRow([
      new Date(),
      email,
      source,
    ]);

    return renderText('ok');
  } finally {
    lock.releaseLock();
  }
}

function getSubscribersSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Subscribed At', 'Email', 'Source']);
  }

  return sheet;
}

function getExistingEmails_(sheet) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return new Set();
  }

  const values = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  return new Set(
    values
      .flat()
      .map((value) => String(value).trim().toLowerCase())
      .filter(Boolean),
  );
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderText(message) {
  return ContentService
    .createTextOutput(message)
    .setMimeType(ContentService.MimeType.TEXT);
}
