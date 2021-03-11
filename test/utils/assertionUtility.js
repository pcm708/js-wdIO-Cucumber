import pkg from 'chai';
import chalk from 'chalk';
 const { assert } = pkg;
import common from './pageUtility.js';

class AssertionUtility{

    logger(message){
        console.log(chalk.green("[Message]: " + message))
    }

    isElementDisplayed(locator){
        let locator_name=locator
        if(typeof(locator)==='string') locator=$(locator)
        common.logger(locator_name)
        common.waitForELementToBeVisible(locator)
        
        let result = locator.isDisplayed()
        assert.isTrue(result, "[Failed]: " + locator_name + " not displayed")
        logger("[Displayed]: " + locator_name + " is displayed");
    }

    verifyTextUsingstrictEqual(actualText,expectedText,message){
        let errormsg= chalk.red(`[ASSERTION Failed]==>[Actual Text]: ${actualText},[Expected Text]: ${expectedText},[Message]: ${message}`);
        assert.strictEqual(actualText.toString().trim(), expectedText.toString().trim(),errormsg)
        this.logger(`[ASSERTION PASSED]====>[Actual Text]===${actualText},[Expected Text]:=${expectedText}`)
    }

    equal(actual, expected){
        assert.equal(actual, expected, "[Assertion Failed]: "+actual+" is not equal to "+expected);
        logger("[Assertion Passed]: "+expected+" is equal to "+actual)
    }

    assertTrue(conidtionthatresultTrue,msg){
        if(conidtionthatresultTrue) conidtionthatresultTrue='true'
        assert.strictEqual(conidtionthatresultTrue,'true',`${msg} `) 
    }

    assertTextIsNotEqual(actual,expected){
        assert.isFalse(actual===expected,`[Assertion Failure]: actual text ${actual} is equal to ${expected} `)
        logger(`[Assertion passed]: actual text ${actual} is  Not equal to ${expected} `)
    }

    isElementNotDisplayed(locator){ 
        let result = $(locator).isDisplayed();
        assert.strictEqual(result,false,` ${locator} Element is displayed`)
        logger("Assertion Passed: " + locator + " is not displayed");
    }

    isTrue(flag,msg){
        assert.isTrue(flag,msg);
        this.logger(`Assertion Passed: ${msg} is displayed`);
    }

    isArrayContainsValue (array,value){
        let msg=`Assertion failed this particular array does not conatain the ${value}`
        logger('Here is the value of the array you have passed')
        console.table(array)
        assertTrue(array.includes(value),msg)
        logger("[Assertion Passed] this particualr value is presnt in the chapter content")
    }

    assertElementIsDisable(locator){
        if(typeof(locator)==='string') locator=$(locator)
        let status=locator.isEnabled()
        assert.isFalse(status,"[Assertion Failed] element is not disabled")
    }
    
    isSelected(locator){ 
        let result = $(locator).isSelected()
        assert.strictEqual(result,true,` ${locator} Element is selected`)
        logger("Assertion Passed: " + locator + " is selected");
    }

    isVisible(locator){
        if(typeof(locator)==='string') locator=$(locator)
        common.waitForELementToBeVisible(locator)
        let result = locator.isDisplayed()
        common.logger(`${locator} is dispalyed: Result: ${result}`)
        return result
    }

    areElementsDisplayed(elem){
        let elementList = $$(elem)
        elementList.forEach(element => {
            this.isElementDisplayed(element)
            common.logger(`${element.getText()} is displayed`)
        })
    }

    verifyUserLandsOncorrectPage(expectedSubString){
        common.logger(`Current url: ${common.getURL()}`)
        assert.include(common.getURL(),expectedSubString,`User lands on incorrect page Actual: ${browser.getUrl()} , Expected substring: ${expectedSubString}`)
        common.logger(`User lands on correct page`)
    }

    verifyActualTextIncludesExpectedText(locator,expctedText){
        actualText = common.getText(locator,"1")
        common.logger(`Actual Text: ${actualText} and Expected Text: ${expctedText}`)
        assert.include(actualText,expctedText,`Assertion Failed: Text displayed is not correct`)
        common.logger(`Text displayed is correct`)
    }

    verifyTextDisplayedUsingAttributeName(elem, attributeName, expectedTxt) {
        var actualTxt = common.getActualTextUsingAttribute(elem, attributeName)
        verifyTextUsingstrictEqual(actualTxt, expectedTxt, `The text displayed is not correct, actualText:  ${actualTxt}, expectedTxt: ${expectedTxt}`)
        common.logger(`The text displayed is correct`)
    }

    verifyMessagesDisplayed(locator,msg){
        actualText = common.getText(locator)
        common.logger(`Actual Text: ${actualText} and Expected Text: ${msg}` )
        verifyTextUsingstrictEqual(actualText,msg,`ASSERTION FAILED: Text displayed is not correct`)
        common.logger(`ASSERTION PASSED: Text displayed is correct`)
    }

    verifyTextOfElementIsNotNull(locator){
        let actualText = common.getText(locator)
        assert.if(actualText != null & actualText != '')
        common.logger(`Text is not null or blank`)    
    }

    verifyActualTextContainsExpectedText(locator,expctedText){
        actualText = common.getText(locator)
        common.logger(`Actual Text: ${actualText} and Expected Text: ${expctedText}` )
        assert.include(actualText.replace(/[^a-zA-Z ]/g, ""),expctedText.replace(/[^a-zA-Z ]/g, ""),`Assertion Failed: Text displayed is not correct`)
        common.logger(`Text displayed is correct`)
    }

    verifyAlertMessage(expctedText){
        let actualAlertText = browser.getAlertText();
        common.logger(`Actual Text: ${actualAlertText} and Expected Text: ${expctedText}` )
        assert.include(actualAlertText,expctedText,`Assertion Failed: Text displayed is not correct`)
        common.logger(`Text displayed in alert box is correct`)
    }

    verifyTextContainsExpectedText(actualText,expctedText){
        common.logger(`Actual Text: ${actualText} and Expected Text: ${expctedText}` )
        assert.include(actualText.replace(/[^a-zA-Z ]/g, ""),expctedText.replace(/[^a-zA-Z ]/g, ""),`Assertion Failed: Text displayed is not correct`)
        common.logger(`Text displayed is correct`)
    }

    verifyElementIsDisabled(locator){
        let result = $(locator).isEnabled()
        common.logger(`Result: ${result}`)
        assert.isFalse(result, "[Failed]: " + locator + " not disabled")
        logger(locator + " is disabled");
    }
}

export default new AssertionUtility();