var swig = require('swig')
var path = require('path')
var fs   = require('fs')
var getPath = require('./getPath')
var writeCode = require('./writeCode2File')
var kabab = require('../tools/kabab')

var nameFromPath = (depPath) => {
    var name = path.basename(depPath)
    return name.replace(/(.vue)$/i, '')
}
module.exports = {
    create: (config) => {
        var depPromises = getPath.find(config)
        return depPromises
                .then((depPathes) => {
                    depPathes = depPathes.map((depPath) => {
                        var cpPath = depPath.ensuredCp || depPath
                        return {
                            name: nameFromPath(cpPath),
                            path: cpPath
                        }
                    })

                    // var template = swig.compileFile('./lib/blueprints/source.vue')
                    var templateSrc = fs.readFileSync(path.join(__dirname, '../blueprints/source.vue'), {encoding: 'utf-8'})
                    var template = swig.compile(templateSrc)
                    var code = template({
                        name: kabab.convert(path.basename(config.name)),
                        lang: config.lang,
                        components: depPathes
                    })

                    try {
                        var filename = writeCode.finish(code, config)

                        // 在这个promise里返回新建的组件的路径, 如果出错则不引入该组件的路径到route
                        return new Promise((resoleve, reject) => {
                            resoleve(filename)
                        })
                    } catch (e) {
                        throw e
                        console.error('error! cannot write to new file!')
                    }
                }).catch((e) => {
                    throw e
                    console.error('get deps path error!')
                })
        /* 
            返回诸如
            [
                {
                    name: '...',
                    path: 'src/com...'
                }
            ]
         */
        // var components = getPath.find(config)
        /* 
            根据传进去的config对象，
            可以从中得到components对象(已经知道的组件和路径的对应关系)
            和dependencies数组(依赖的组件)
         */
        /* 
        var template = swig.compileFile('./lib/blueprints/source.vue')
        var code = template({
            name: kabab.convert(path.basename(config.name)),
            lang: config.lang,
            components: components
        })
        
        // return path + filename
        return writeCode.finish(code, config)
        */
    }
}