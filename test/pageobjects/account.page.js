import ele from '../utils/pageUtility';
import Page from './page';

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
        return ele.getText(this.profileField)
    }

    searchAnItem(itemName){
        ele.sendKeys(this.searchItem,itemName)
        ele.click(this.searchBox)
    }

    addProductToCart(){
        ele.click(this.dress)
        ele.click(this.addToCartBtn)
    }

    clickProceedToCheckoutBtn(){
        ele.click(this.ptCBtn)
    }

    clickProceedToCheckoutBtn2(){
        ele.click(this.ptcBtn2)
    }

    clickProceedToCheckoutBtn3(){
        ele.click(this.ptcBtn3)
    }

    agreeTC(){
        ele.click(this.tCBtn)
    }

    getTotalprice(){
        return ele.getText(this.totalPrice)
    }

    getProductName(){
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

export default new AccountPage();