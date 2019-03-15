const postcss = require('postcss')
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
	if (!opts.importFrom) {
		console.log("importFrom option not specified, plugin will add no fallback parameters");
	} else {
		// Work with options here
		const sourceParams = fs.readFileSync(opts.importFrom).toString();
		params = findCSSVars(sourceParams);
	}

	return function (root, result) {
		if (!opts.importFrom) {
			return;
		}

		root.walkDecls(decl => {
			// extract var name
			const match = decl.value.match(/var\((.+)\)/);
			if (match) {
				const varName = match[1];
				if (params.has(varName)) {
					decl.value = decl.value.replace(varName, `${varName}, ${params.get(varName)}`)
				}
			}
		});

		// add the importFrom file as dependency so this file is processed again on changes
		result.messages.push({
			type: "dependency",
			file: opts.importFrom,
			parent: root.source.input.file,
		});
	}
});