const postcss = require('postcss');
const fs = require('fs');

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
			const match = decl.value.match(/var\((.+)\)/);
			if (match) {
				const varName = match[1];
				if (params.has(varName)) {
					decl.value = decl.value.replace(varName, `${varName}, ${params.get(varName)}`)
				}
			} else {
				params.set(decl.prop, decl.value);
			}
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
