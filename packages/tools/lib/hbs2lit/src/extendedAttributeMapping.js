function replaceEqualities(hbs) {
	// converts the boolean attributes to lit like boolean attributes
	return hbs.replace(/(\s+)(disabled|hidden|checked|readonly)\s*=\s*/g, " ?$2 = ")
	// maps all the propertis to attributes
		.replace(/([a-zA-Z][\w\-]*?)\s*=\s*"{{/g, "$1 = \"{{")
		// maps the value attribute to property
		.replace(/(value\s*=)/g, ".value =");
}

module.exports = {
	map: replaceEqualities
};