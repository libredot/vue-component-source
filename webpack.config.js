var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: './lib/vcs.js',
    output: {
        dir: path.resolve(__dirname, 'dist'),
        filename: 'vcs.js'
    }
}