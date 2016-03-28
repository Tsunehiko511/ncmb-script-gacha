
var NCMB = require('ncmb');

var Configfile = require('config');
var app_key = Configfile.config.app_key;
var client_key = Configfile.config.client_key;

var ncmb = new NCMB(app_key, client_key);

var scriptname = 'gacha.js';
// var scriptname = 'script.js';
// userId is random string
var userId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
var itemId = 1;

ncmb.Script
    .query({user: userId, item: itemId})
    .exec('GET', scriptname)
    .then(function(res) {
	console.log(res);
    })
    .catch(function(err) {
	console.log(err);
    });

