let ele = require('./../utils/pageUtility');
let Page = require('./base.page');

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

    inputRegistrationDetails(genr,fn,ln,pwd,add,city,alias){
        if(genr=='Mr.') ele.click(this.radioMale)
        else if(genr=='Mrs.') ele.click(this.radioFemale)
        console.log(`Selected gender: Mr.`)
        ele.sendKeys(this.firstNameField,fn)
        console.log(`Entered firstname: ${fn}`)
        ele.sendKeys(this.lastNameField,ln)
        console.log(`Entered lirstname: ${ln}`)
        ele.sendKeys(this.passwordField,pwd)
        console.log(`Entered Password: ${pwd}`)
        ele.sendKeys(this.firstNameField2,fn)
        console.log(`Entered First Name: ${fn}`)
        ele.sendKeys(this.lastNameField2,ln)
        console.log(`Entered Last Name: ${fn}`)
        ele.sendKeys(this.addressField,add)
        console.log(`Entered Address: ${add}`)
        ele.sendKeys(this.city,city)
        console.log(`Entered city: ${city}`)
        ele.selectByVisibleText(this.state,"Alaska")
        console.log(`Entered state: Alaska`)
        ele.sendKeys(this.postalCode,"10000")
        console.log(`Entered postal code: 10000`)
        ele.sendKeys(this.mobileNumber,"1234567890")
        console.log(`Entered mobile number: 1234567890`)
        ele.sendKeys(this.aliasMail,alias)
        console.log(`Entered alias email: ${alias}`)
        ele.click(this.registerBtn)
        console.log(`Clicked on Registration Button`)
    }

}

module.exports= new RegistrationPage();