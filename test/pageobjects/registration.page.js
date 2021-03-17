import Page from './page';
import ele from '../utils/pageUtility';

class RegistrationPage extends Page{

    get verifyRegistrationPageHeader(){ return $(`//h3[text()='Your personal information']`)}
    get radioFemale(){ return $(`#id_gender2`)}
    get radioMale(){ return $(`#id_gender1`)}
    get firstNameField(){ return $(`#customer_firstname`)}
    get lastNameField(){ return $(`#customer_lastname`)}
    get passwordField(){ return $(`#passwd`)}
    get day(){return $(`#days`)}
    get month(){return $(`#months`)}
    get year(){return $(`#years`)}
    get firstNameField2(){ return $(`[name='firstname']`)}
    get lastNameField2(){ return $(`[name='lastname']`)}
    get addressField(){return $(`#address1`)}
    get city(){return $(`#city`)}
    get state(){return $(`#id_state`)}
    get postalCode(){return $(`#postcode`)}
    get country(){return $(`#id_country`)}
    get mobileNumber(){return $(`#phone_mobile`)}
    get aliasMail() {return $(`#alias`)}
    get registerBtn(){return $(`#submitAccount`)}


    verifyPersonalInformationHeaderIsDisplayed(){
        return ele.isVisible(this.verifyRegistrationPageHeader)
    }

    clickOuterFrame(){
        browser.pause(1000)
        ele.click(this.verifyRegistrationPageHeader)
    }

    inputRegistrationDetails(genr,fn,ln,pwd,add,city,alias){
        if(genr=='Mr.') ele.click(this.radioMale)
        else if(genr=='Mrs.') ele.click(this.radioFemale)
        
        ele.sendKeys(this.firstNameField,fn)
        ele.sendKeys(this.lastNameField,ln)
        ele.sendKeys(this.passwordField,pwd)
        ele.sendKeys(this.firstNameField2,fn)
        ele.sendKeys(this.lastNameField2,ln)
        ele.sendKeys(this.addressField,add)
        ele.sendKeys(this.city,city)
        ele.selectByVisibleText(this.state,"Alaska")
        ele.sendKeys(this.postalCode,"10000")
        ele.sendKeys(this.mobileNumber,"1234567890")
        ele.sendKeys(this.aliasMail,alias)
        ele.click(this.registerBtn)
    }

}

export default new RegistrationPage();