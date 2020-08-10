const fs = require("fs");
const path = require("path");

/**
 * Returns an array with the metadata files for all dependent packages that ship UI5 Web Components
 *
 * @param packageFile
 * @returns {string[]}
 */
const getDepComponentPackages = packageFile => {
	const packageFileContent = JSON.parse(fs.readFileSync(packageFile));

	return Object.keys(packageFileContent.dependencies).map(dep => {
		let file;
		try {
			file = require.resolve(path.join(dep, "ui5webcomponents.js"))
		} catch (e) {
			file = undefined;
		}
		return file;
	}).filter(file => !!file);
};

/**
 * Get the list of all components for the purpose of scoping
 *  - include components from dependent packages
 *  - sort descending
 *
 * @param metadataFile
 * @returns {string[]}
 */
const getAllComponents = (metadataFile) => {
	metadataFile = metadataFile || path.join(process.cwd(), "ui5webcomponents.js");
	const metadata = require(metadataFile);

	const packageFile = path.join(path.dirname(metadataFile), "package.json");
	return metadata.components.concat(getDepComponentPackages(packageFile).flatMap(getAllComponents)).sort().reverse();
};

module.exports = getAllComponents;
