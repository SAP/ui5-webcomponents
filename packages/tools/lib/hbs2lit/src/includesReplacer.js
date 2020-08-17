const path = require("path");
const fs = require("fs");

function replaceIncludes(file) {
	const filePath = path.dirname(file);
	let fileContent = fs.readFileSync(file, "utf-8");

	const inclRegex = /{{>\s*include\s*["'](.+?)["']}}/g;
	let match;

	while((match = inclRegex.exec(fileContent)) !== null) {
		inclRegex.lastIndex = 0;

		let targetFile = match[1];
		if (targetFile.startsWith(".")) {
			// Relative path, f.e. {{>include "./Popup.hbs"}} or {{>include "../partials/Header.hbs"}}
			targetFile = path.join(filePath, targetFile);
		} else {
			// Node module path, f.e. {{>include "@ui5/webcomponents/src/Popup.hbs"}}
			targetFile = require.resolve(targetFile);
		}

		fileContent = fileContent.replace(match[0], replaceIncludes(targetFile));
	}

	return fileContent;
}

module.exports = {
	replace: replaceIncludes
};
