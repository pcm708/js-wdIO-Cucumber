let ele = require('./../utils/pageUtility');
let Page = require('./base.page');

class PaymentPage extends Page{

    get productName() {return $(`p.product-name>a`)}
    get totalPrice() {return $(`#total_price`)}

    getListedTotalprice(){
        return ele.getText(this.totalPrice)
    }

    getListedProductName(){
        return ele.getText(this.productName)
    }
}

module.exports= new PaymentPage();