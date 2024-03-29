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
      this.scrollPerfectly()
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

  clickUsingJavaScript(){
    browser.execute(()=>{
    document.querySelector('.icon-user.left').click()
  })
}


  scrollPerfectly(){
    browser.execute("window.scrollBy(0,-300);")
  }
}
module.exports= new CommonPageUtility();