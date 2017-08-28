var importFile = require('./importFile')
var addRoute   = require('./addRoute')

module.exports = {
    from (name, filename, config) {
        console.log('filename_index', filename)
        importFile.from(name, filename, config)
    }

    // add
    // TODO
}