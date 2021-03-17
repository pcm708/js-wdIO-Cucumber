import Page from './page';
import ele from '../utils/pageUtility';

class LoginPage extends Page{

    get loginPageHeader() {return $(`//h3[text()='Create an account']`)}
    get emailField() {return $(`#email_create`)}
    get createAccountBtn() { return $(`.icon-user.left`)}

    verifyCreateAccountFieldIsDisplayed(){
        return ele.isVisible(this.loginPageHeader);
    }

    inputEmailAddress(value){
        ele.sendKeys(this.emailField,value)
    }

    clickCreateAccountBtn(){
        ele.click(this.createAccountBtn)
    }
}

export default new LoginPage();