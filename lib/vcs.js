#!/usr/bin/env node

/* 获取配置选项 => swig生成文件 => 添加组件路径到route配置文件 */

/* 
    1. 读取.vcsrc
    2. 读取命令行参数
    3. 命令行里的参数会覆盖.vcsrc下的配置
 */

 // cp一般是component的错写
let config = require('./config')
let template = require('./template/create')
let route = require('./route')

/* 
var filename = template.create(config)
console.log('filename_vcs', filename)
route.from(config.name, filename, config)
 */

var file = template.create(config)
// 添加了-r参数，才import
if(config.route) {
    file.then((filename) => {
        route.from(config.name, filename, config)
    })
}