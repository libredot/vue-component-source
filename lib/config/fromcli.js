var commander = require('commander')

// 根据参数名或取参数数组
var getParamsOfArrFormat = (option) => {
    var rawArgs = commander.rawArgs
    var optionIndex = null
    for(var i = 0; i < rawArgs.length; i++) {
        if(optionIndex !== null && (rawArgs[i].indexOf('-') !== -1)) {
            break
        }
        if(rawArgs[i] === '-' + option) {
            optionIndex = i
        }

    }
    return rawArgs.slice(optionIndex + 1, i)
}

var pureName = (name) => {
    return name.replace(/\.vue$/i, '')
}

commander
    .version('0.0.1')
    .option('-n, --name <name>', 'The name of component', pureName, 'Test')
    .option('-l, --lang <lang>', 'The style lang one of scss, css, sass, less, postcss, stylus.', /^(scss|css|sass|less|postcss|stylus)$/i, 'scss')
    .option('-v, --view', 'This is a view rather than a component')
    .option('-d, --dependencies <dependencies>', 'The name of the component on which the new component depends')
    .option('-r, --route', 'Is it necessary to import automatically into the routing profile?', false)
    .parse(process.argv)

let options = {
    name: commander.name,
    lang: commander.lang,
    view: commander.view || false,
    route: commander.route,
    dependencies: commander.dependencies ? getParamsOfArrFormat('d') : []
}
module.exports = options