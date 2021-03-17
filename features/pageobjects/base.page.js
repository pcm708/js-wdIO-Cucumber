let ele = require('../utils/pageUtility.js')

module.exports=

class Page {

    get applicationLogo() {return $(`.logo.img-responsive`)}

    launchApplication(){
        browser.maximizeWindow();
        browser.url("/");
    }

    verifyApplicationLogoIsDisplayed(){
        console.log(`Verifying if application logo is displayed`)
        return ele.isVisible(this.applicationLogo);
    }

    verifyPageTitle(pT){
        ele.verifyPageTitle(pT);
    }

}
