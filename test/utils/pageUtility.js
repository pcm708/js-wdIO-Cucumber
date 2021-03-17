import chalk from 'chalk';
let MAX_TIME_FOR_WAIT_FOR_VISIBLITY = 5000

class CommonPageUtility{

  logger(message){
    console.log(("[Message]: " + message).green)
  }

  getText(elm) {
    if(this.isVisible(elm))
      return (elm).getText()
  }

  click(elm){
    if(this.isVisible(elm))
      elm.waitForClickable()
      elm.click()
  }

  isVisible(locator) {
    locator.waitForDisplayed()
    return locator.isDisplayed()
  }

  sendKeys(ele,value){
    if(this.isVisible(ele)){
      ele.scrollIntoView()
      ele.clearValue()
      browser.pause(1000)
      ele.setValue(value)
    }
  }

  selectByVisibleText(ele,text){
      ele.scrollIntoView()
      ele.selectByVisibleText(text)
  }

  selectByIndex(ele,text){
      ele.waitForClickable()
      ele.scrollIntoView()
      ele.selectByIndex(text)
  }

  selectFromDropdown(locator, value) {
    this.click(locator)
    value = value.toString()
      $(locator).selectByAttribute("value", value)
  }

  sendKeysUsingJS(locator,value){
    browser.executeScript(`document.getElementById("${locator}").value="${value}"`)
  }

  verifyPageTitle(pageTitle){
    browser.waitUntil(function(){
        return (browser.getTitle() === pageTitle)
      }, 10000, `title is not displayed after the given time`
    )
  }

  clickUsingJavaScript(locator) {
    browser.execute(`document.querySelector('${locator}').click`)
  }

}
export default new CommonPageUtility();