var path = require('path')

module.exports = {
    format: (filePath) => {
        var filePath = path.relative(process.cwd(), filePath)
        if(path.sep === '\\') {
            filePath = filePath.replace(/\\/g, '/')
        }
        return filePath
    }
}