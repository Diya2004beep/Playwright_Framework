const { expect }  = require('@playwright/test');

class LoginPage {
    constructor(page){
        this.page = page;

        this.userName = page.getByPlaceholder("Please enter email address");
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        // this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    }

    async navigate() {
    await this.page.goto('https://uae.sharafdg.com/my-account/');
  }

  async login(username){
    await this.userName.fill(username);
    await expect(this.userName).toBeVisible();
    await this.nextButton.click();
  }

 async writeOTPandSubmit(otp){

  if (!otp) throw new Error('OTP is undefined');

  for (let i = 0; i < otp.length; i++) {

    const digitBox = this.page.locator(`#loginform #digit${i + 1}`);

    await digitBox.waitFor({ state: 'visible' });

    await digitBox.fill(otp[i]);

  }

  await this.loginButton.click();

//   await expect(this.dashboardLink).toBeVisible();

}
}
module.exports = LoginPage;
