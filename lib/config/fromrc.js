var path = require('path')

try {
    var rc = require(path.resolve(process.cwd(), '.vcsrc'))
} catch(e) {
    console.error(`need .vcsrc file in the root dir of this project`)
}

module.exports = rc