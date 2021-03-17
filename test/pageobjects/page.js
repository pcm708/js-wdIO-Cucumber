import ele  from './../utils/pageUtility'
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    
    get applicationLogo() {return $(`.logo.img-responsive`)}

    launchApplication(){
        browser.maximizeWindow();
        browser.url("/");
    }

    verifyApplicationLogoIsDisplayed(){
        return ele.isVisible(this.applicationLogo);
    }

    verifyPageTitle(pT){
        ele.verifyPageTitle(pT);
    }
}