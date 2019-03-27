const postcss = require('postcss');
const fs = require('fs');
const arrayUniq = require('array-uniq');

const findCSSVars = styleString => {
	const vars = new Map();
	const couples = styleString.match(/--[^:)]+:\s*[^;}]+/g) || [];
	couples.forEach(couple => {
		const [varName, varValue] = couple.split(/:\s*/);
		vars.set(varName, varValue);
	});
	return vars;
};

module.exports = postcss.plugin('add fallback plugin', function (opts) {
	let params = new Map();
	opts = opts || {};

	return function (root, result) {
		// If importFrom was given, parse all CSS variables from there
		if (opts.importFrom) {
			const sourceParams = fs.readFileSync(opts.importFrom).toString();
			params = findCSSVars(sourceParams);
		}

		root.walkDecls(decl => {
			// extract var name
			let matches = decl.value.match(/var\(([^\,\(\)]+)\)/g);
			matches = arrayUniq(matches);
			if (matches) {
				matches.forEach(varMatch => {
					const varNameMatch = varMatch.match(/var\((.*)\)/);
					const varName = varNameMatch[1];
					if (params.has(varName)) {
						decl.value = decl.value.replace(new RegExp(varName, 'g'), `${varName}, ${params.get(varName)}`)
					}
				});
			}
			params.set(decl.prop, decl.value);
		});

		// add the importFrom file as dependency so this file is processed again on changes
		if (opts.importFrom) {
			result.messages.push({
				type: "dependency",
				file: opts.importFrom,
				parent: root.source.input.file,
			});
		}
	}
});
