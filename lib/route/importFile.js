var path = require('path')
var babel = require('babel-core')
var types = require('babel-types')
var fs = require('fs')
var routeFilePath = require('./routeFilePath')
var formatedFilePath = require('../tools/formatedFilePath')
const NODE_TYPE = 'ImportDeclaration'

var formatFileName = (filename) => {
    var basename = path.basename(filename)
    var name = basename.replace(/(.vue)$/g, '')
    var dir = formatedFilePath.format(filename)
    
    return {
        name,
        dir
    }
}

module.exports = {
    from (name, filename, config) {
        var routeFileName = routeFilePath.find(config)
        var formated = formatFileName(filename)

        const visitor = {
            // 引入组件
            ImportDeclaration: {
                enter (path) {
                    var nodeName = path.node.specifiers[0].local.name
                    var nodeType = path.getSibling(path.key + 1).type
                    if( nodeName === formatFileName(filename).name || nodeType === NODE_TYPE) {
                        return
                    }
                    var identifier = types.Identifier(formated.name)
                    var defaultSpecifier = types.importDefaultSpecifier(identifier)
                    var literal = types.stringLiteral(formated.dir)
                    path.insertAfter(types.importDeclaration([defaultSpecifier], literal))
                }
            }

            // 将组件添加到路由
            // TODO
        }

        babel.transformFile(routeFileName, {
            plugins: [{ visitor }]
        }, (err, result) => {
            if(err) {
                console.log('transform error')
                throw err
            }

            fs.writeFile(routeFileName, result.code, (err) => {
                if(err) {
                    console.log('cannot import file to route')
                    throw err
                }
                
                console.log('imported automatically!')
            })
        })
    }
}