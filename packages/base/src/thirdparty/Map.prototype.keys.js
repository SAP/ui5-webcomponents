if (!Map.prototype.keys) {
	Map.prototype.keys = function() {
		const keys = [];
		this.forEach((value, key) => {
			keys.push(key);
		});
		return keys;
	}
}
