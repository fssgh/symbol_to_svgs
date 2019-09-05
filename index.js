const fs = require("fs");
const cheerio = require("cheerio")


const fire_url = './symbol.svg'

fs.readFile(fire_url, 'utf8', function (err, res) {
    if (err) {
        return false
    }
    // console.log(res)
    readSvg(res)

})

function readSvg (data) {
    if (data === '') {
        return false
    }
    var $ = cheerio.load(data);
    let sum = 0
    $("symbol").each(function (i, e) {
        var item = $(e)
        var str = '<svg xmlns="http://www.w3.org/2000/svg" '
        str +='viewBox = "' + item.attr("viewBox") + '">'
        str += item.html()
        str += '</svg>'
        writeSvg(str, item.attr("id"))
        sum ++
    })
    console.log(`all item number is ${sum}`)

}

function writeSvg (data, name) {
    if (data === '') return
    var file_name = name + '.svg'
	fs.mkdirSync('./svg-icon', { recursive: true });
    fs.writeFile('./svg-icon/'+file_name, data, function (err) {
        if (err) {
            return
        }
        console.log( file_name + 'is saved')
    })
}