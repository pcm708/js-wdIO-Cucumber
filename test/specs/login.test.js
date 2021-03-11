import { step } from 'mocha-steps';
import homePage from '../pageobjects/home.page';
import loginPage from '../pageobjects/login.page';
import assert from '../utils/assertionUtility.js';

describe('Login Page Test', () => {

    it(`should have page Header "Welcome, please sign in!"`, () => {
        assert.verifyTextUsingstrictEqual(loginPage.getLoginPageHeaderText(),"Welcome, please sign in!");
    });

    it(`admin should be able to login with valid credentials`, () => {
        homePage= loginPage.clickLoginButton();
        assert.isTrue(homePage.verifyHomePageHeader(),"Home Page Header");
    });
});