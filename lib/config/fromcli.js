var commander = require('commander')

// 根据参数名或取参数数组
var getParamsOfArrFormat = (option) => {
    var rawArgs = commander.rawArgs
    var optionIndex = null
    var nextOptionIndex = null

    for(let i = 0; i < rawArgs.length; i++) {
        if(optionIndex !== null && (rawArgs[i].indexOf('-') !== -1 || i === rawArgs.length - 1)) {
            if(i === rawArgs.length - 1) {
                nextOptionIndex = i + 1
            } else {
                nextOptionIndex = i
            }
            break;
        }

        if(rawArgs[i] === '-' + option) {
            optionIndex = i
        }

    }

    return rawArgs.slice(optionIndex + 1, nextOptionIndex)
}

var pureName = (name) => {
    return name.replace(/\.vue$/i, '')
}

commander
    .version('0.0.1')
    .option('-n, --name <name>', 'The name of component', pureName, 'Test')
    .option('-l, --lang <lang>', 'The style lang one of scss, css, sass, less, postcss, stylus.', /^(scss|css|sass|less|postcss|stylus)$/i, 'scss')
    .option('-v, --view', 'Whether it is a view instead component')
    .option('-d, --dependencies <dependencies>', 'The dependencies of the new component')
    .parse(process.argv)

let options = {
    name: commander.name,
    lang: commander.lang,
    view: commander.view || false,
    dependencies: getParamsOfArrFormat('d')
}
module.exports = options