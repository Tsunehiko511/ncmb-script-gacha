// Config class
var Config = function(itemId, ncmb) {
    this.itemId = itemId;
    this.ncmb = ncmb;
};

Config.prototype.getItems = function() {
    var ncmb = this.ncmb;
    var itemId = this.itemId;

    return new Promise(function(resolve, reject) {
	var Items = ncmb.DataStore('Items');
	Items.equalTo('id', itemId)
	    .fetchAll()
	    .then(function(results) {
		var weights = results[0];
		var ignoreKeys = [
		    'objectId'
		    , 'id'
		    , 'createDate'
		    , 'updateDate'
		    , 'acl'
		];
		var params = {};
		for (var key in weights) {
		    if (!weights.hasOwnProperty(key) ||
			(ignoreKeys.indexOf(key) != -1)) {
			continue;
		    }
		    params[key] = weights[key];
		}
		resolve(params);
	    })
	    .catch(function(err) {
		reject(err);
	    });
    });
};
module.exports = Config;
