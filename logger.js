// Logger class
var Logger = function(ncmb) {
    this.ncmb = ncmb;
}

Logger.prototype.log = function(userId, itemId, item) {
    var logger = this;
    return Promise.all([
	logger.saveLog(userId, itemId, item),
	logger.updateCounter(itemId, item)
    ]);
}

Logger.prototype.updateCounter = function(itemId, item) {
    var logger = this;
    return new Promise(function(resolve, reject) {
	var Counter = logger.ncmb.DataStore('Counter');

	Counter.equalTo('id', itemId)
	    .fetchAll()
	    .then(function(results) {
		var counter = null;
		if (results.length == 0) {
		    counter = new Counter;
		    counter.set('id', itemId)
			.set(item, 1)
			.save()
			.then(resolve);
		} else {
		    counter = results[0];
		    counter.setIncrement(item, 1)
			.update()
			.then(resolve);
		}
	    })
	    .catch(function(err) {
		reject(err);
	    });
    });
}

Logger.prototype.saveLog = function(userId, itemId, item) {
    var logger = this;
    return new Promise(function(resolve, reject) {
	var Log = logger.ncmb.DataStore('Log');
	var log = new Log();
	log.set('userId', userId)
	    .set('itemId', itemId)
	    .set('item', item)
	    .save()
	    .then(function() {
		resolve();
	    })
	    .catch(function(err) {
		reject(err);
	    });
    });
}
module.exports = Logger;
