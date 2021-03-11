import chalk from 'chalk';
let MAX_TIME_FOR_WAIT_FOR_VISIBLITY = 50000

class CommonPageUtility{

  logger(message){
    console.log(("[Message]: " + message).green)
  }

  getText(elm, overrideMaxTimeForVisiblity) {
    if (typeof (elm) === 'string') elm = $(elm)
    let result;
    if (!overrideMaxTimeForVisiblity) overrideMaxTimeForVisiblity = MAX_TIME_FOR_WAIT_FOR_VISIBLITY
    browser.waitUntil(function () {
      result = elm.isDisplayed()
      return result
    }, overrideMaxTimeForVisiblity, chalk.bgMagenta("Element is not visible"), 1000)
    return (elm).getText()
  }

  isVisible(locator) {
    let result = false
    try {
      if (typeof (locator) === 'string') 
        result = Boolean($(locator).isDisplayed())
      else if (typeof (locator) === 'object') 
        result = Boolean((locator).isDisplayed())
      else
        throw new Error("Locator must be string or object")
    } catch (error) {
      result = false
    } finally {
    }
    return result
  }

}
export default new CommonPageUtility();