var inquirer = require('inquirer')
var path = require('path')
var realName = (name) => {
    var realName = path.basename(name)
    return realName.replace(/(.vue)$/i, '')
}
module.exports = {
    list (cps) {
        var questions = [
            {
                type: 'list',
                name: 'ensuredCp',
                message: 'There are duplicate components, please choose which of the following you need.',
                choices: cps
            }
        ]
        
        return inquirer.prompt(questions)
    }
}