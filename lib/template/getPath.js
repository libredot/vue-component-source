var rd = require('rd')
var path = require('path')
var formatedFilePath = require('../tools/formatedFilePath')

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

module.exports = {
    find: (config) => {
        var dependencies = config.dependencies
        console.log('dep:', dependencies)
        var comPath = dependencies.map((comName) => {
            return {
                name: comName,
                path: fromDir(comName, config)
            }
        })
        console.log('comPath:', comPath)
        return comPath
    }
}