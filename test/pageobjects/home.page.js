import util from './../utils/pageUtility';
import Page from './page';

class HomePage extends Page{

    get loginPageHeader() {return $(`//a[text()='Logout']`);}

    verifyHomePageHeader(){
        return util.isVisible(this.loginPageHeader)
    }
}

export default new HomePage();