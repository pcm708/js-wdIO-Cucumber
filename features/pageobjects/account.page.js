let ele = require('./../utils/pageUtility');
let Page = require('./base.page');

class AccountPage extends Page{

    get profileField() {return $(`.account span`)}
    get searchItem() {return $(`#search_query_top`)}
    get searchBox() {return $(`[name='submit_search']`)}
    get dress() {return $(`img[title='Printed Summer Dress']`)}
    get addToCartBtn() {return $(`//span[text()='Add to cart']`)}
    get ptCBtn(){return $(`//span[contains(text(),'Proceed to checkout')]`)}
    get ptcBtn2(){return $(`//span[text()='Proceed to checkout']`)}
    get ptcBtn3(){return $(`(//span[contains(text(),'Proceed to checkout')])[2]`)}
    get productName(){return $(`.layer_cart_product_info .product-name`)}
    get totalPrice(){return $(`(//div[@class='layer_cart_row']//span)[3]`)}
    get tCBtn(){return $(`#uniform-cgv`)}

    getUserProfile(){
        console.log("Fetching user name...")
        return ele.getText(this.profileField)
    }

    searchAnItem(itemName){ 
        console.log(`Searching for the item: ${itemName}`)
        ele.sendKeys(this.searchItem,itemName)
        console.log(`User clicked on a produuct`)
        ele.click(this.searchBox)
    }

    addProductToCart(){
        console.log(`Adding product to cart...`)
        ele.click(this.dress)
        ele.click(this.addToCartBtn)
    }

    clickProceedToCheckoutBtn(){
        console.log(`Proceeding to checkout`)
        ele.click(this.ptCBtn)
    }

    clickProceedToCheckoutBtn2(){
        console.log(`Proceeding to checkout`)
        ele.click(this.ptcBtn2)
    }

    clickProceedToCheckoutBtn3(){
        console.log(`Proceeding to checkout`)
        ele.click(this.ptcBtn3)
    }

    agreeTC(){
        console.log(`Clicked on Adree Terms and Condition checkbox`)
        ele.click(this.tCBtn)
    }

    getTotalprice(){
        console.log(`Fetching the total price`)
        return ele.getText(this.totalPrice)
    }

    getProductName(){
        console.log(`Fetching the product name`)
        return ele.getText(this.productName)
    }

    navigateToPaymentPage(){
        this.clickProceedToCheckoutBtn()
        this.clickProceedToCheckoutBtn2()
        this.clickProceedToCheckoutBtn2()
        this.agreeTC()
        this.clickProceedToCheckoutBtn3()
    }
}

module.exports= new AccountPage();