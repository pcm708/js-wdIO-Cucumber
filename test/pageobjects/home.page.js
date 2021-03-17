import ele from './../utils/pageUtility';
import Page from './page';

class HomePage extends Page{

    get signInBtn() {return $(`.login`)}

    clickSignInBtn(){
        ele.click(this.signInBtn);
    }

}
export default new HomePage();