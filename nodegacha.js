
var NCMB = require('ncmb');

var Configfile = require('config');
var app_key = Configfile.config.app_key;
var client_key = Configfile.config.client_key;

var ncmb = new NCMB(app_key, client_key);
var Config = require('./config');
var Chooser = require('./chooser');
var Logger = require('./logger');

var userId = 'nodegacha';
var itemId = 1;
var config = new Config(itemId, ncmb);
var logger = new Logger(ncmb);

config.getItems()
    .then(function(params) {
	var chooser = new Chooser(params);
	var item = chooser.choose();

	logger.log(userId, itemId, item)
	    .then(function(result) {
		console.log(item);
	    })
	    .catch(function(err) {
		throw err;
	    });
    })
    .catch(function(err) {
	console.log(err.message);
    });
