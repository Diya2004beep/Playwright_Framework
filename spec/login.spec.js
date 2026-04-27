const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { GmailPage } = require('../pages/GmailPage');
const loginData = require('../data/loginData.json');

test('Verify user login', async ({ page }) => {

    const login = new LoginPage(page);
    const gmail = new GmailPage();

    await login.navigate();

    await login.login(loginData.username);

    // wait for OTP email to arrive
    await page.waitForTimeout(15000);

    const otp = await gmail.getOTP(
        loginData.username,
        loginData.gmailPassword
    );

    await login.writeOTPandSubmit(otp);

});
