// Chooser class
var Chooser = function(items) {
    this.items = [];
    this.total = 0;

    var itemKeys = Object.keys(items);
    for (var i = 0; i < itemKeys.length; ++i) {
	var val = itemKeys[i];
	var weight = items[val];
	this.addItem(val, weight);
    }
}

Chooser.prototype.addItem = function(val, weight) {
    this.items.push({
	val: val
	, weight: weight
    });
    this.total += weight;
}

Chooser.prototype.deleteItem = function(val) {
    var len = this.items.length;
    for (var i = 0; i < len; ++i) {
	if (this.items[i].val === val) {
	    this.items.splice(i, 1); // delete it
	    break;
	}
    }
}

Chooser.prototype.getItem = function(idx) {
    var prev = null;
    for (var item of this.items) {
	if (prev === null) {
	    prev = item;
	}
	if (item.start > idx) {
	    return prev.val;
	}
	prev = item;
    }
    return prev.val;
}

Chooser.prototype.numItems = function() {
    return this.items.length;
}

Chooser.prototype.reset = function() {
    this.items = [];
    this.start = 0;
}

Chooser.prototype.choose = function() {
    this.setup();

    var idx = Math.floor(Math.random() * this.total + 1);
    return this.getItem(idx);
}

Chooser.prototype.setup = function() {
    var start = 0;
    for (var item of this.items) {
	item.start = start;
	start += item.weight;
    }
    this.total = start;
}
module.exports = Chooser;
