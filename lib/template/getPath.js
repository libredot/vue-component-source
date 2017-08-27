var rd = require('rd')
var path = require('path')
var formatedFilePath = require('../tools/formatedFilePath')

var fromRc = (comName, components) => {
    return components.find((component) => component.name === comName)
}

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
        var components = config.components
        var dependencies = config.dependencies
        var comPath = dependencies.map((comName) => {
            var comPathFromRc = fromRc(comName, components)
            if(comPathFromRc) {
                return comPathFromRc
            } else {
                return {
                    name: comName,
                    path: fromDir(comName, config)
                }
            }
        })

        return comPath
    }
}