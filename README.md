# Playwright Page Object Model (POM) Framework

## Requirements

Before starting, make sure the following are installed:

-   Node.js (version 18 or above) --- https://nodejs.org/
-   Works on Windows, macOS, and Linux
-   Gmail account with Two-Factor Authentication (2FA) enabled
-   Google App Password generated for Gmail IMAP access

------------------------------------------------------------------------

## Installation

``` bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

------------------------------------------------------------------------

## Environment Variables

The framework uses the following environment variables:

-   EMAIL or USERNAME -- Email used for application login and OTP
    retrieval
-   GMAIL_PASSWORD -- Gmail App Password (16 characters, no spaces)
-   BROWSER -- Browser for running tests (`chromium`, `firefox`,
    `webkit`, `edge`, `all`)
    -   Default: chromium
-   BASE_URL (optional) -- Overrides the default application URL
    -   Default: https://uae.sdgstage.com

Note: ADMIN_USERNAME and ADMIN_PASSWORD defined in `.env` will override
default authentication values if present.

------------------------------------------------------------------------

## Example loginData.json

``` json
{
  "username": "akshaygarg283@gmail.com",
  "gmailEmail": "akshaygarg283@gmail.com",
  "gmailPassword": "abcd1234abcd5678"
}
```

------------------------------------------------------------------------

## Gmail OTP Auto Fetch

This framework automatically retrieves OTP from Gmail using IMAP.

Implementation details: - Uses the `imap-simple` package - Connects to
`imap.gmail.com` on port `993` using TLS

### Important

If Gmail 2FA is enabled: 1. Generate a Google App Password from\
https://myaccount.google.com/apppasswords 2. Use this password as
`GMAIL_PASSWORD`.

### Possible Errors

Application-specific password required\
→ Use a Gmail App Password instead of your normal Gmail password.

textCode: 'ALERT'\
→ Approve the login attempt at\
https://accounts.google.com/signin/security-check

------------------------------------------------------------------------

## Playwright Configuration

  Setting              Description
  -------------------- --------------------------------------------------
  Default Browser      Chromium (can be changed using BROWSER variable)
  Supported Browsers   chromium, firefox, webkit, edge, all
  Headless Mode        Enabled by default
  Headed Mode          Use `npm run test:headed`
  Action Timeout       30 seconds
  Navigation Timeout   60 seconds
  Screenshots          Captured only on test failure

------------------------------------------------------------------------

## Running Tests

``` bash
# Run all tests (headless, default browser)
npm test

# Run with specific browser
BROWSER=firefox npm test          # macOS / Linux
$env:BROWSER="firefox"; npm test  # Windows PowerShell

# Run on all browsers
BROWSER=all npm test

# Run with visible browser
npm run test:headed

# Playwright UI mode
npm run test:ui

# Debug mode
npm run test:debug

# Open HTML report
npm run test:report
```

------------------------------------------------------------------------

## Demo Test Flow

The current sample test performs the following steps:

1.  Open the login page
2.  Enter the user email address
3.  Request OTP
4.  Fetch the latest OTP from Gmail using IMAP
5.  Submit the OTP
6.  Verify successful login
7.  Save results in `reports/login-report.xlsx`
8.  Capture screenshots on success or failure
