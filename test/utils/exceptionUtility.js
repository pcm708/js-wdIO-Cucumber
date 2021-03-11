class CustomException{

    error_waitForELementToBeVisible(err,sec){
        let currentlocatorName=browser.options.customOption.locator_name
        let error=new Error(`Element: ${currentlocatorName} is not visible Even after ${sec}`)
        throw error
    }
    error_enterText(err){
        let currentlocatorName=browser.config.customOption.locator_name
        let error=new Error(`Element: ${currentlocatorName} ===> ${err.message} ===>${err.type}==>${err.details} `)
        //console.log(error.stack)
        throw error
    }
    error_click(err){
        let currentlocatorName=browser.options.customOption.locator_name
        let error=new Error(`Element: ${currentlocatorName} ===> ${err.message} ===>${err.type}==>${err.details} `)
        //console.log(error.stack)
        throw error
    }
    error_clickUsingJavaScript(err){
        let currentlocatorName=browser.options.customOption.locator_name
        let error=new Error(`Element: ${currentlocatorName} ===> ${err.message} ===>${err.type}==>${err.details} `)
        //console.log(error.stack)
        throw error
    }
    error_selectDropdownTextByIndex(err){
        let currentlocatorName=browser.options.customOption.locator_name
        let error=new Error(`Element: ${currentlocatorName} ===> ${err.message} ===>${err.type}==>${err.details} `)
        //console.log(error.stack)
        throw error
    }
    error_selectDropdownTextByVisibleText(err){
        let currentlocatorName=browser.options.customOption.locator_name
        let error=new Error(`Element: ${currentlocatorName} ===> ${err.message} ===>${err.type}==>${err.details} `)
        //console.log(error.stack)
        throw error
    }
}
module.exports= new CustomException()