const path = require("path");
const {promisify} = require("util");
const nativeFs = require("fs");

function replaceIncludes(hbs, config) {
	const fs = config.fs || nativeFs;
	const readFile = promisify(fs.readFile);
	const inclRegex = /{{>\s*include\s*["']([a-zA-Z.\/]+)["']}}/g;

	async function replacer(match, p1) {
		const includeContent = await readFile(path.join(config.templatesPath, p1), "utf-8");
		hbs = hbs.replace(match, includeContent);
	}

	let match;
	const replacers = [];
	while ((match = inclRegex.exec (hbs)) !== null) {
		replacers.push(replacer(match[0], match[1]));
	}
	return Promise.all(replacers).then(() => hbs);
}

module.exports = {
	replace: replaceIncludes
};