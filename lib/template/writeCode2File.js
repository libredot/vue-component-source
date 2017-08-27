var path = require('path')
var fs   = require('fs')


module.exports = {
    finish (code, config) {
        var fileDir = config.view ? config.viewDir : config.componentsDir
        var filename = path.resolve(fileDir, config.name + '.vue')

        try {
            fs.statSync(path.dirname(filename), (err, stats) => {
                // TODO
            })
        } catch (e) {
            console.log('没有文件夹，我创建一个')
            fs.mkdirSync(path.dirname(filename), 0755)
        }

        fs.writeFile(filename, code, (err) => {
            if(err) {
                console.log('cannot write file')
                throw err
            }

            console.log('file done')
        })
    }
}