// Logger class
var Logger = function(ncmb) {
    this.ncmb = ncmb;
}

Logger.prototype.log = function(userId, itemId, item) {
    this.saveLog(userId, itemId, item);
    this.updateCounter(itemId, item);
}

Logger.prototype.updateCounter = function(itemId, item) {
    var Counter = this.ncmb.DataStore('Counter');

    Counter.equalTo('id', itemId)
	.fetchAll()
	.then(function(results) {
	    var counter = null;
	    if (results.length == 0) {
		counter = new Counter;
		counter.set('id', itemId)
		    .set(item, 1)
		    .save();
	    } else {
		counter = results[0];
		counter.setIncrement(item, 1)
		    .update();
	    }
	})
	.catch(function(err) {
	    throw err;
	});
}

Logger.prototype.saveLog = function(userId, itemId, item) {
    var Log = this.ncmb.DataStore('Log');
    var log = new Log();
    log.set('userId', userId)
	.set('itemId', itemId)
	.set('item', item)
	.save()
	.catch(function(err) {
	    throw err;
	});
}
module.exports = Logger;
