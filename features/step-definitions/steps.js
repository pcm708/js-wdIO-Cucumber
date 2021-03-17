const { Given, When, Then} = require('@cucumber/cucumber');
let chalk = require('chalk');
let basepage = require('../pageobjects/home.page');
let homePage = require('../pageobjects/home.page');
let loginPage = require('../pageobjects/login.page');
let registrationPage = require('../pageobjects/registration.page');
let accountPage = require('../pageobjects/account.page');
let paymentPage = require('../pageobjects/payment.page');
let testdata = require('../utils/testdata');
let { assert } = require('chai');
let totalprice= null
let itemName= null

Given(/^I am on the application page$/, () => {
    basepage.launchApplication()
    assert.isTrue(homePage.verifyApplicationLogoIsDisplayed())
    console.log(chalk.green(`[Assertion Passed]: User is navigated to application successfully`))
});

When(/^I click on SignIn Btn$/, () => {
    homePage.clickSignInBtn()
    assert.isTrue(loginPage.verifyCreateAccountFieldIsDisplayed())
    console.log(chalk.green(`[Assertion Passed]: User is navigated to login page after clicking on signIn Btn`))
});

When(/^I input eMail Address and click on Create Account btn$/, () => {
    loginPage.inputEmailAddress(testdata.email)
    loginPage.clickCreateAccountBtn()
    assert.isTrue(registrationPage.verifyPersonalInformationHeaderIsDisplayed())
    console.log(chalk.green(`[Assertion Passed]: User navigated to registration page successfully`))
});

When(/^I fill personal Information$/, () => {
    let fn= testdata.firstName
    let ln= testdata.lastName
    let fullname= fn+" "+ln
    registrationPage.inputRegistrationDetails(testdata.gender,fn,ln,testdata.password,testdata.address,testdata.city,testdata.alias)
    assert.isTrue(accountPage.getUserProfile()===fullname)
    console.log(chalk.green(`[Assertion Passed]: User= ${fullname} created successfully`))
});

When(/^I search an item and add to cart$/, () => {
    accountPage.searchAnItem("Dress")
    accountPage.addProductToCart()
    console.log(chalk.green(`[Assertion Passed]: User added item to the cart`))
});

Then(/^I validate on the payments page if the product details are correct.$/, () => {
    totalprice=accountPage.getTotalprice()
    itemName=accountPage.getProductName()
    console.log("Price: "+totalprice)
    console.log("Item Name: "+itemName)
    accountPage.navigateToPaymentPage()
    console.log(chalk.green(`[Assertion Passed]: User navigated to Payments Page`))
    assert.isTrue(totalprice===paymentPage.getListedTotalprice())
    assert.isTrue(itemName===paymentPage.getListedProductName())
    console.log(chalk.green(`[Assertion Passed]: Correct product is added to the cart`))
});

