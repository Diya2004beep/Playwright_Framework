const { test } = require('@playwright/test');
const { loginToApplication } = require('../utils/loginHelper');
const {searchProductPage } = require('../pages/searchProductPage');

test('Login and search product', async ({ page }) => {
    const product1 = new searchProductPage(page);
    await loginToApplication(page);
    await product1.searchproduct();
    await product1.productSelection();
    await product1.addProduct();
    await product1.checkout();
});
