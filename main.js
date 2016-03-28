
// gacha main
module.exports = function(req, res) {
    var NCMB = require('ncmb');
    var app_key = 'PLEASE PUT YOUR APP KEY HERE';
    var client_key = 'PLEASE PUT YOUR CLIENT KEY HERE'

    if (req.query.user == undefined || req.query.item == undefined) {
	res.status(400).send('Bad Request');
	return;
    }

    var userId = req.query.user;
    var itemId = parseInt(req.query.item, 10);
    var ncmb = new NCMB(app_key, client_key);

    var config = new Config(itemId, ncmb);

    config.getItems()
	.then(function(params) {
	    var chooser = new Chooser(params);
	    var item = chooser.choose();

	    var logger = new Logger(ncmb);
	    logger.log(userId, itemId, item);

	    res.send(item);
	})
	.catch(function(err) {
	    res.status(500).send(err.message);
	});
    ;
}
