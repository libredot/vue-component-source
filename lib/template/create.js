var swig = require('swig')
var path = require('path')
var fs   = require('fs')
var getPath = require('./getPath')
var writeCode = require('./writeCode2File')
var kabab = require('../tools/kabab')
module.exports = {
    create: (config) => {
        /* 
            返回诸如
            [
                {
                    name: '...',
                    path: 'src/com...'
                }
            ]
         */
        var components = getPath.find(config)
        /* 
            根据传进去的config对象，
            可以从中得到components对象(已经知道的组件和路径的对应关系)
            和dependencies数组(依赖的组件)
         */
        var template = swig.compileFile('./lib/blueprints/source.vue')
        var code = template({
            name: kabab.convert(path.basename(config.name)),
            lang: config.lang,
            components: components
        })
        
        // return path + filename
        return writeCode.finish(code, config)
    }
}