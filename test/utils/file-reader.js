import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';


class FileReader{
/**
 * @description delete all the screenshot 
 */
  async deleteScreenShots(path_of_screenshots) {
    try {
      await (() => {
      // let path_of_screenshots = path.resolve(process.cwd().replace('core', "")) + "/results/screenShots"

        fs.readdir(path_of_screenshots, function (err, files) {
          if (err) {
            return console.log('Unable to scan directory: ' + err);
          }
          files.forEach(function (file) {
            if (file.includes(".jpeg") || file.includes("png")) {
              fs.unlink(path_of_screenshots + "//" + file, function (err) {
                if (err)
                  console.log(err)
              })
            }
          });
        });
      })()

    } catch (err) {
      console.log(err)
    }

    console.log("***********************************deleted all the screenShots*****************************************")

  }


  /**
   * @description delete all the screenshot 
   */
  async deletePreviousJsonResultFile(path_of_screenshots) {
    try {
      await (() => {
      // let path_of_screenshots = path.resolve(process.cwd().replace('core', "")) + "/results/"

        fs.readdir(path_of_screenshots, function (err, files) {
          if (err) {
            return console.log('Unable to scan directory: ' + err);
          }
          files.forEach(function (file) {
            if (file.includes("results-")) {
              fs.unlink(path_of_screenshots + "//" + file, function (err) {
                if (err)
                  console.log(err)
              })
            }
          });
        });
      })()

    } catch (err) {
      console.log(err)
    }
    console.log("***********************************deleted all the results file*****************************************")

  }

  readDataFromDownloadedFile() {
    var fileName 
    var ymlData
    let directoryPath = path.resolve(process.cwd().replace('utils',"")+"\\Download")
    fs.readdir(directoryPath, function (err, files) {
      //handling error    
      if (err) {
      return console.log('Unable to scan directory: ' + err)
      }
      //listing all files using forEach
      files.forEach(function (file) {
        fileName= file.toString()
        console.log("File name as String: "+fileName)
        var filePath = path.resolve(process.cwd().replace('utils',"")+"\\Download\\"+fileName)
        console.log("FilePath: "+filePath)
        ymlData = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
        console.log("Code: "+ymlData)
      })
    })
      return ymlData
  }

  logger(msg){ 
    console.log(chalk.bgRed(msg))
  }

  _getDataFromBrowserObject(key) {
    return browser.config[key]
  }

  /**
   * @description set the yml path from wheer data  will be picked based on Tier
   * Tier  LT|PROD|QA mention in the config file
   * this will be set thorough browser global instance by adding env options.
   * browser.options.env
   */
  setYamlTestDataFilePath() {

    let YAMLFILEPATH = ''
    if (browser.config.env === undefined) { throw new Error("env is undefined please mention it in setup file") }
    try {
      let tier = _getDataFromBrowserObject('env')        //getConfigData("env");
      //let product = _getDataFromBrowserObject('product')  //  getConfigData("env");

      let fileName = null;
      if (tier == "rc" || tier == "RC") {
        fileName = "sapling_rc.yml";
      }
      else if (tier == "legacy" || tier == "LEGACY") {
        fileName = "sapling_legacy.yml";
      }
      else if (tier == "Prod" || tier == "PROD" || tier == "Production" || tier == "prod") {
        fileName = "sapling_prod.yml";
      } else {
        throw new Error(`INVALID TIER mention in the config file ${tier} required ${["prod", "PROD", "Prod", "Production", "qa", "QA", "lt", "LT"]} any one of them`)
      }

      YAMLFILEPATH = path.resolve(process.cwd().replace('core', "") + "\\resources\\testData\\" + fileName);
      this.logger('Path of test data file is: ' + YAMLFILEPATH);

    } catch (e) {
      console.error(e);
    }
    // this.logger('Path of test data file is: ' + YAMLFILEPATH);
    return YAMLFILEPATH;
  }

  /**
   * @description Reads  the data of ConfigProperties.yml file and loads it to an object
   * @returns Object
   * 
   */
  readConfigFileData() {
    let configFilePath
    let configData
    try {
      console.log(process.cwd())
      configFilePath = path.resolve(process.cwd().replace('core', "") + "\\ConfigProperties.yml")
      configData = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));
    }
    catch (e) {
      console.log(e);
    }
    return configData;
  }

  /**
   * @description get the data of specified key.Data will be picked base on the tier value set in the config file
   * this method will set the yml path first then loads the data in json format and then return the specified key value
   * @returns Vlaue of key 
   * 
   */
  // Item has been removed.
  // Adding existing content item has been added to Launchpad.
  getData(key) {

    var filePath = setYamlTestDataFilePath();
    var ymlData = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

    let level = key.split('\.')
    for (i in level) {
      if (ymlData[level[i]] === undefined) {
        console.log(`NO value at this nesting level ${level[i]} \n found last level  ${ymlData}`)
        throw new Error(`NO value at this nesting level ${level[i]} \n found last level  ${ymlData}`)

      }
      ymlData = ymlData[level[i]]
    }
    this.logger(`DATA FROM FILE:${key}===>${ymlData}`)
    return ymlData
  }

  /**
   * @description reads the data from config file 
   * @returns  configData['key']
   */
  getConfigData(key) {
    var configData = readConfigFileData();
    return configData[key];
  }

  /**
   * @description storeJsonData will be used to store key value pair in json format upto any level and any point of time this data can be fetched using same method without providing any vlaue as a parameter.this method will not override all the existing content in file simply it will add new key to the existing object if the key value pair with smae name is allready present then it will override this with new value.
   * @example  bookIdentifier="bps7e" 
   * PATH_SRC = will be determine based on the value provided  by parameter product and if PATH_SRC is passed
   * @throws Error('Key is not found')
   * bstoreJsondata(bookIdentifier+".test10.url.lt","updatedthere")
   * @param {string} key 
   * @param {any}  value 
   */

  

  storeJsonData(key, value, PATH_SRC) {

    if (!PATH_SRC)
      PATH_SRC = path.resolve(process.cwd().replace('core', "") + "\\resources\\dynamicData\\" + _getDataFromBrowserObject('product') + "\\" + "testData.json");

    createFileAndDirectoryStructure(PATH_SRC,process.cwd().replace('core', ""))



    let keys = key.split(".")
    let ExistingContent = fs.readFileSync(PATH_SRC, "utf8", function (err) { console.log(err) })

    if (ExistingContent === "") ExistingContent = "{}"
    ExistingContent = JSON.parse(ExistingContent)
    //this code will be removed in future---------------------------------------------------------
    try {
      console.log(`${arguments.length === 1 || value === 'testRail' ? 'Reading data from file' : 'Storing data to file'} ===>`, PATH_SRC)
      //console.log(ExistingContent)

      if (arguments.length === 1 || value === 'testRail') {
        let data = eval("ExistingContent." + key)
        let error = new Error(`${key} is not found in the file ${PATH_SRC}`)
        if (data !== undefined) return data
        else {
          console.log(error.stack);
          throw error
        }
      }
    } catch (error) {
      this.logger(`unable to find the value ${key} in file ${PATH_SRC} ,please refer to stack trace`)
      console.log(error)
      return -1
    } finally {
      //
    }
  //---------------------------------------------------------------------------------
    let currentObject = ExistingContent;
    for (i in keys) {
      if (i == keys.length - 1) {
        currentObject = currentObject[keys[i]] = value
      }
      else if (currentObject[keys[i]] === undefined) {
        currentObject = currentObject[keys[i]] = {}
      }
      else if (currentObject[keys[i]] !== undefined) {
        currentObject = currentObject[keys[i]]
      }

    }

    let content = JSON.stringify(ExistingContent, null, 4)
    fs.writeFileSync(PATH_SRC, content, "utf8", function (err) { console.log("written in file") })

  }
  /**
   * @description get the json data specified by key and relative path source
   * 
   * @param {String} key   key first.second.third
   * @param {String} PATH_SRC  relative path
   * @example  getJsonData("first.second.third","./results/testdata/test.json")
   * will return the value of the json object with key first.second.third
   */

  getJsonData(key,PATH_SRC){

    if (!PATH_SRC)
      PATH_SRC = path.resolve(process.cwd().replace('core', "") + "\\resources\\dynamicData\\" + _getDataFromBrowserObject('product') + "\\" + "testData.json");

    let ExistingContent = fs.readFileSync(PATH_SRC, "utf8", function (err) { console.log(err) })

  if (ExistingContent === "") ExistingContent = "{}"
  ExistingContent = JSON.parse(ExistingContent)
  try {
    console.log(`Reading key  ${key} from file ${PATH_SRC}`)
    //console.log(ExistingContent)
    
    let data = eval("ExistingContent." + key)
    let error = new Error(`${key} is not found in the file ${PATH_SRC}`)
    if (data !== undefined) return data
    else
    {  
      throw error
    }
    
  } catch (error) {
    this.logger(`unable to find the value ${key} in file ${PATH_SRC} ,please refer to stack trace`)
    return 
  } 
  }

  /**
   * @description creates the directory structure for specified path.It will create the file in specified directory.if it all ready exist it 
   * will do nothing
   * @param {String} directoryStructure  path of directory strurcture starting from porject root also containing the filename
   * @param {String} project_root_path   root path of project
   */
  createFileAndDirectoryStructure(directoryStructure,project_root_path){

    if(fs.existsSync(path.resolve(project_root_path,directoryStructure)))
    {
      console.log("file all ready exist there is not need to create new file")
      return;
    }
  let fileName=path.basename(directoryStructure)
  directoryStructure=directoryStructure.replace(fileName,"").split("/").filter(data=>!(data.includes(".")||data==='')) 
  let updated_path=project_root_path

  for(i=0;i<directoryStructure.length;i++){
    
    updated_path=path.join(updated_path,directoryStructure[i])

    if (!fs.existsSync(updated_path)){
      fs.mkdirSync(updated_path);
      console.log("created directory structure\t",updated_path)
    }else{
      console.log("directory allready exist\t",updated_path)
    }
  }
  
  updated_path=path.join(updated_path,fileName)
    
  if (!fs.existsSync(updated_path)) {
      console.log('The file does not exist creating new file at location .'+updated_path);
      fs.open(updated_path, 'w', function (err,fd) {
        if (err) {console.log(err)}
      fs.close(fd,function(err){if(err)console.log(err)
                                  else console.log("close the file")})

      })
  
    } else {
        console.log("file allready exist")
    }
  }

  async deleteDownloadFiles(path_of_files) {
    try {
      await (() => {
        fs.readdir(path_of_files, function (err, files) {
          if (err) {
            return console.log('Unable to scan directory: ' + err);
          }
          files.forEach(function (file) {
              fs.unlink(path_of_files + "//" + file, function (err) {
                if (err)
                  console.log(err)
              })
          });
        });
      })()
    } catch (err) {
      console.log(err)
    }
    console.log("***********************************deleted all the downloaded files*****************************************")
  }
}

module.exports = new FileReader();