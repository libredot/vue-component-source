var rd = require('rd')
var path = require('path')
var formatedFilePath = require('../tools/formatedFilePath')

var fromDir = (comName, config) => {
    var comDir = path.resolve(process.cwd(), config.componentsDir)
    var filename = rd.readFileFilterSync(comDir, (filename) => path.basename(filename) === (comName + '.vue'))
    if(filename.length === 0) {
        console.error(`error! ${comName} is not exist.`)
        process.exit(-1)
    }
    return formatedFilePath.format(filename[0])
}

module.exports = {
    find: (config) => {
        var dependencies = config.dependencies
        var comPath = dependencies.map((comName) => {
            return {
                name: comName,
                path: fromDir(comName, config)
            }
        })

        return comPath
    }
}