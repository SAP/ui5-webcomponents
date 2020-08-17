if (!Map.prototype.keys) {
	Map.prototype.keys = function() {
		var keys = [];
		this.forEach(function(value, key) {
			keys.push(key);
		});
		return keys;
	}
}
