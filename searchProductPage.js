const { expect }  = require('@playwright/test');

class searchProductPage {
    constructor(page){
        this.page = page;
        this.search = page.getByPlaceholder("Search Sharaf DG");
        this.product = page.getByText('Nothing Phone (3) - Snapdragon 8s Gen 4 Smartphone with 50 MP Triple Rear Camera system, 24 Hour Silicon Carbon Long Lasting Battery, 6.67"" 120Hz AMOLED Display and Glyph Matrix, 16GB   512GB, Black   Ear Earbuds');
        this.addtocart = page.getByRole('button' , {name : 'Add to Cart'}).nth(1);
        this.checkoutButton = page.getByRole('link', { name: 'Proceed to Checkout' });
    }
    async searchproduct(){
        await this.search.click();
        await this.search.fill("mobile");
        await this.search.press('Enter');
    }
    async productSelection(){
        await this.product.click();
    }
    async addProduct(){
        await this.addtocart.click();
    }
    async checkout(){
        await this.checkoutButton.click();
    }
}
module.exports = {searchProductPage};
