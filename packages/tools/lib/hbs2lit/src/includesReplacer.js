const path = require("path");
const nativeFs = require("fs");

function replaceIncludes(hbs, config) {
	const fs = config.fs || nativeFs;
	const inclRegex = /{{>\s*include\s*["']([a-zA-Z.\/]+)["']}}/g;
	let match;

	while((match = inclRegex.exec(hbs)) !== null) {
		inclRegex.lastIndex = 0;
		const includeContent = fs.readFileSync(path.join(config.templatesPath, match[1]), "utf-8");
		hbs = hbs.replace(match[0], includeContent);
	}

	return hbs;
}

module.exports = {
	replace: replaceIncludes
};