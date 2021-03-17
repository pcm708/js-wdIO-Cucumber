import ele from '../utils/pageUtility';
import Page from './page';

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

export default new PaymentPage();