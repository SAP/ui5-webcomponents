const ReaderCollection = require("@ui5/fs").ReaderCollection;

function replaceIncludes(hbs, config) {
	const inclRegex = /{{>\s*include\s*["']([a-zA-Z.\/]+)["']}}/g;

	async function replacer(match, p1) {
		readerWriter = new ReaderCollection({readers: config.readers});
		const resource = await readerWriter.byGlob(`**/${p1.split("./")[1]}`);
		const content = await resource[0].getString();
		hbs = hbs.replace(match, content);
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