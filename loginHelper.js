const LoginPage = require('../pages/LoginPage');
const { GmailPage } = require('../pages/GmailPage');
const loginData = require('../data/loginData.json');

async function loginToApplication(page) {

    const login = new LoginPage(page);
    const gmail = new GmailPage();

    await login.navigate();
    await login.login(loginData.username);

    await page.waitForTimeout(10000);

    const otp = await gmail.getOTP(loginData.username, loginData.gmailPassword);

    await login.writeOTPandSubmit(page, otp);
}

module.exports = { loginToApplication };