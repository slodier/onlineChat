var fs = require('fs');

module.exports = function (app) {
    app.get('/', function (req, res) {
        console.log('s')
        var path = './index.html';
        fs.readFile(path, function (err,data) {
            if (err){
                res.writeHead(400, {
                    'Content-Type' : 'text/html;charset=utf-8' });
                console.log(err);
                res.end(err['Error']);
            }else {
                res.writeHead(200, {
                    'Content-Type' : 'text/html;charset=utf-8' });
                res.end(data);
            }
        });
    })
}

