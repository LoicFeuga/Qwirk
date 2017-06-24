/*eslint-disable*/
var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();

var DIR = './uploads/';

var upload = multer({ dest: DIR });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(function (req, res, next) {
    multer({
        dest: DIR,
        rename: function (fieldname, filename) {
            return filename + Date.now();
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...');
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path);
        }
    });
    next();
});

app.get('/api', function (req, res) {
    res.end('file catcher example');
});

app.post('/api', function (req, res) {
   var tmp_path = req.files.thumbnail.path;
    var target_path = './uploads/' + req.files.thumbnail.name;
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
   });
    // upload(req, res, function (err) {
    //     if (err) {
    //         return res.end(err.toString());
    //     }

    //     res.end('File is uploaded');
    // });
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Working on port ' + PORT);
});