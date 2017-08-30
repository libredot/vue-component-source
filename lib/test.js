var commander = require('commander')

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

    console.log(rawArgs[i])
    return rawArgs.slice(optionIndex + 1, i)

}

commander
    .version('0.0.1')
    .option('-n, --name <name>', 'The name of component', 'Test')
    .option('-l, --lang <lang>', 'The style lang one of scss, css, sass, less, postcss, stylus.', /^(scss|css|sass|less|postcss|stylus)$/i, 'scss')
    .option('-v, --view', 'Whether it is a view instead component')
    .option('-d, --dependencies <dependencies>', 'The dependencies of the new component')
    .parse(process.argv)



console.log(commander.rawArgs)
console.log(getParamsOfArrFormat('d'))
/* var kabab = require('./tools/kabab')
var swig = require('swig')

var template = swig.compileFile('./blueprints/source.vue')
var code = template({
    lang: 'scss',
    name: 'test',
    components: [
        {
            name: 'Header',
            path: 'layouts/Header'
        },
        {
            name: 'Order',
            path: 'order/Header'
        },
        {
            name: 'Body',
            path: 'layouts/Body'
        },
        {
            name: 'Body',
            path: 'layouts/Body'
        }
    ]
})

console.log(code) */