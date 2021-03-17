import homePage from '../pageobjects/home.page';
import loginPage from '../pageobjects/login.page';
import registrationPage from '../pageobjects/registration.page';
import accountPage from '../pageobjects/account.page';
import paymentPage from '../pageobjects/payment.page';
import testdata from '../utils/testdata';
import { assert } from 'chai';

describe('Payment Details Verification Test', () => {

    before('Launch Application', () => {
        homePage.launchApplication();
    });

    describe('Navigate to registration page', () => {
        it(`Verify user navigated to application page successfully`,()=>{
            assert.isTrue(homePage.verifyApplicationLogoIsDisplayed())
            console.log(`[Assertion Passed]: User is navigated to application successfully`)
        })

        it(`click on SignIn Btn`, () => {
            homePage.clickSignInBtn()
            assert.isTrue(loginPage.verifyCreateAccountFieldIsDisplayed())
            console.log(`[Assertion Passed]: User is navigated to login page after clicking on signIn Btn`)
        })
    })

    describe('Create Account',()=>{
        it(`input eMail Address and click on Create Account btn`, () => {
            loginPage.inputEmailAddress(testdata.email)
            loginPage.clickCreateAccountBtn()
            assert.isTrue(registrationPage.verifyPersonalInformationHeaderIsDisplayed())
            console.log(`[Assertion Passed]: User navigated to registration page successfully`)
        })

        it(`Fill personal Information`,()=>{
            let fn= testdata.firstName
            let ln= testdata.lastName
            let fullname= fn+" "+ln
            registrationPage.inputRegistrationDetails(testdata.gender,fn,ln,testdata.password,testdata.address,testdata.city,testdata.alias)
            assert.isTrue(accountPage.getUserProfile()===fullname)
            console.log(`[Assertion Passed]: User= ${fullname} created successfully`)
        })
    })

    describe('Verify product details on product page',()=>{
        
        let totalprice
        let itemName

        it(`search an item and add to cart`, () => {
            accountPage.searchAnItem("Dress")
            accountPage.addProductToCart()
            console.log("[Assertion Passed]: User added item to the cart")
        })

        it(`Proceed to checkout page`, () => {
            totalprice=accountPage.getTotalprice()
            itemName=accountPage.getProductName()
            console.log("Price: "+totalprice)
            console.log("Item Name: "+itemName)
            accountPage.navigateToPaymentPage()
            console.log("[Assertion Passed]: User navigated to Payments Page")
        })

        it(`verify if correct product added to cart`,()=>{
            assert.isTrue(totalprice===paymentPage.getListedTotalprice())
            assert.isTrue(itemName===paymentPage.getListedProductName())
            console.log("[Assertion Passed]: Correct product is added to the cart")
        })
    })    
})