const { expect }  = require('@playwright/test');

class AddProductPage {
    constructor(page){
        this.page = page;
        this.option = page.getByRole('link', {name : 'TECH THRIFTS'});
        this.smartphones = page.locator("//a[text()='Smartphones']").first();
        this.product = page.getByRole('heading', { name: 'Xiaomi Redmi Note 14 Pro 5G 512GB 12GB RAM Sand Gold Dual Sim Smartphone' });
        this.addtocart = page.getByRole('button' , {name : 'Add to Cart'}).first();
        this.checkoutButton = page.getByRole('link', { name: 'Proceed to Checkout' });
    }
    async selectOption(){
        await this.option.hover();
    }
    async selectSmartPhone(){
        await this.smartphones.click();
    }
    async selectProduct(){
        await this.product.click();
    }
    async AddToCart(){
        await this.addtocart.click();
    }
    async checkout(){
        await this.checkoutButton.click();
    }
}
module.exports = {AddProductPage};
