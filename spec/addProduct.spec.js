const { test } = require('@playwright/test');
const { loginToApplication } = require('../utils/loginHelper');
const { AddProductPage } = require('../pages/AddProductPage');

test('Login and verify product', async ({ page }) => {
    const product = new AddProductPage(page);
     await loginToApplication(page);
     await product.selectOption();
     await product.selectSmartPhone();
     await product.selectProduct();
     await product.AddToCart();
     await product.checkout();
});
