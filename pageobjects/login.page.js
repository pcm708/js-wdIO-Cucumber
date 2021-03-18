let ele = require('./../utils/pageUtility');
let Page = require('./base.page');

class LoginPage extends Page{

    get loginPageHeader() {return $(`//h3[text()='Create an account']`)}
    get emailField() {return $(`#email_create`)}
    get createAccountBtn() { return $(`.icon-user.left`)}

    verifyCreateAccountFieldIsDisplayed(){
        return ele.isVisible(this.loginPageHeader);
    }

    inputEmailAddress(value){
        console.log(`Entering email Address`)
        ele.sendKeys(this.emailField,value)
    }

    clickCreateAccountBtn(){
        ele.click(this.createAccountBtn)
        console.log(`Cliked on Create Account Btn`)
    }
}

module.exports= new LoginPage();