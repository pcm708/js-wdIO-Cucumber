import Page from './page';
import util from '../utils/pageUtility';
import homePage from './home.page';

class LoginPage extends Page{

    get loginPageHeader() {return $('strong');}
    get email() {return $(`//button[text()='Log in']`);}

    open () {
        return super.open('login');
    }

    getLoginPageHeaderText(){
        return util.getText(this.loginPageHeader);
    }

   clickLoginButton(){
       this.email.click();
       return new homePage();
   }

}

export default new LoginPage();