//collects the partials defined with the inline mustache syntax
//also cleans the handlebars template from the partials definitions
function collectPartials(hbs) {
	let oResult = {};

	const re = RegExp("{{#\\*inline\\s* \"(\\w+)\"\\s*}}((.|\\s)*?){{\\/inline}}");
	const regexGroups = {partialKey: 1, partialDefinition: 2};

	let m;

	do {
		m = re.exec(hbs);
		if (m) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === re.lastIndex) {
				re.lastIndex++;
			}

			// The result can be accessed through the `m`-variable.
			oResult[m[regexGroups.partialKey]] = m[regexGroups.partialDefinition];

			//remove the partial from the hbs
			hbs = hbs.replace(m[0], "");
		}
	} while (m);

	return {partials: oResult, hbs: hbs};
}

//replaces the partials usages with their actual definitions
function replacePartials(hbs, mPartials) {
	let sResultHbs = hbs;
	for (let key in mPartials) {
		if (mPartials.hasOwnProperty(key)) {
			let val = mPartials[key];
			let re = new RegExp("{{\\s*>\\s*" + key + "\\s*}}", "g"); //ex match: {{   >   controlData  }}
			sResultHbs = sResultHbs.replace(re, val);
		}
	}

	return sResultHbs;
}

module.exports = {
	resolve: function(hbs) {
		let oResult = collectPartials(hbs);
		let sResultHbs = replacePartials(oResult.hbs, oResult.partials);

		return sResultHbs;
	}
};