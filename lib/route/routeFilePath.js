var path = require('path')

module.exports = {
    find (config) {
        var routePath = config.routePath
        return path.resolve(process.cwd(), routePath)
    }
}