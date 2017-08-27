module.exports = {
    convert (str) {
        var str = str.split('')
        var indexArr = []
        var count = 0
        for(var i = 0; i < str.length; i++) {
            if(str[i] >= 'A' && str[i] <= 'Z' && i !== 0) {
                indexArr.push(i)
            }

            str[i] = str[i].toLowerCase()
        }

        for(var i = 0; i < indexArr.length; i++) {
            str.splice(indexArr[i] + count, 0, '-')
            count++
        }

        return str.join('')
    }
}