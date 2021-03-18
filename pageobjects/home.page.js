let ele = require('./../utils/pageUtility');
let Page = require('./base.page');

class HomePage extends Page{

    get signInBtn() {return $(`.login`)}

    clickSignInBtn(){
        console.log(`User clicked on signIn Btn`)
        ele.click(this.signInBtn);
    }

}
module.exports= new HomePage();