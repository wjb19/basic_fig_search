module.exports = function(app) {    

var Record = require('./models/record_schema');
    var db = require('../config/db');

    var express = require('express');
    var path = require('path');
    var util = require('util');
    var csvParser = require('csv-parser');
    var router = express.Router();
    var exec = require('child_process').exec;

    var path = require('path');
    var fs = require('fs-extra');

    app.use('/api', router);
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/help', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/images/:file', function(req, res) {
        
	var im = '/home/bill/p2t/images/' + req.params.file
	res.sendfile(im);
    });


router.route('/down/:folder/:file')

    .get(function(req, res) {

        var filePath = '/home/bill/p2t/' + req.params.folder + '/' + req.params.file;
        res.sendFile(filePath);

    });

/**
    router.route('/record/')

    .get(function(req, res) {

        Record.find({
        }, function(err, records) {
            if (err)
                res.send(err);

            res.json(records);
        });
    });
**/

    router.route('/record/:a/:b')

    .get(function(req, res) {

	var full_url = "http://arxiv.org/abs/" + req.params.a + "/" + req.params.b;

        Record.find({
            url: full_url 
        }, function(err, records) {
            if (err)
                res.send(err);

            res.json(records);
        });
    });

}
