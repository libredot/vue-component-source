var rd = require('rd')
var path = require('path')
var formatedFilePath = require('../tools/formatedFilePath')
var select = require('./select')

var dep2promise = (comName, config) => {
    var comDir = path.resolve(process.cwd(), config.componentsDir)
    var viewsDir = path.resolve(process.cwd(), config.viewsDir)

    var filename = rd.readFileFilterSync(comDir, (file) => path.basename(file) === (comName + '.vue'))
    if(filename.length === 0) {
        filename = rd.readFileFilterSync(viewsDir, (file) => path.basename(file) === (comName + '.vue'))
        if(filename.length === 0) {
            console.error(`error! ${comName} is not exist.`)
            process.exit(0)
        }
    }
    
    if(filename.length === 1) {
        return new Promise((resolve, reject) => resolve(formatedFilePath.format(filename[0])))
    } else if(filename.length > 1) {
        var deps = filename.map((file) => formatedFilePath.format(file))
        return select.list(deps)
    } else {
        console.log('errror! bad deps!')
        process.exit(0)
    }
}
/* 
var fromDir = (comName, config) => {
    var comDir = path.resolve(process.cwd(), config.componentsDir)
    var viewsDir = path.resolve(process.cwd(), config.viewsDir)
    var filename = rd.readFileFilterSync(comDir, (file) => path.basename(file) === (comName + '.vue'))
    if(filename.length === 0) {
        filename = rd.readFileFilterSync(viewsDir, (file) => path.basename(file) === (comName + '.vue'))
        if(filename.length === 0) {
            console.error(`error! ${comName} is not exist.`)
            process.exit(0)
        }
    }
    return filename.map(formatedFilePath.format)[0]
}
 */
module.exports = {
    // 应该返回一个promise
    find: (config) => {
        
        var dependencies = config.dependencies
        var depPromises = dependencies.map((dep) => dep2promise(dep, config))
        return Promise.all(depPromises)
        /* * 
         * 原本是直接map一下dep，现在要用promise，行不通
            var comPath = dependencies.map((comName) => {
                return {
                    name: comName,
                    path: fromDir(comName, config)
                }
            })
        return comPath
         */
    }
}