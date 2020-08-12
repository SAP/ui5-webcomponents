const fs = require("fs");
const path = require("path");
const glob = require("glob");

const getTag = file => {
	const fileContent = String(fs.readFileSync(file)).replace(/\n/g, "");
	const matches = fileContent.match(/\btag\b:\s*\"(.*?)\"/);
	return matches ? matches[1] : undefined;
};

const getAltTag = file => {
	const fileContent = String(fs.readFileSync(file)).replace(/\n/g, "");
	const matches = fileContent.match(/\baltTag\b:\s*\"(.*?)\"/);
	return matches ? matches[1] : undefined;
};

const getComponents = (packageDir) => {
	const srcDir = path.join(packageDir, "src/");
	const packageFile = path.join(packageDir, "package.json");
	const packageFileContent = JSON.parse(fs.readFileSync(packageFile));
	const packageName = packageFileContent.name;
	const version = packageFileContent.version;

	return glob.sync(path.join(srcDir, "/**/*.js")).map(file => {
		const tag = getTag(file);
		const altTag = getAltTag(file);
		return tag ? {packageName, version, file, tag, altTag} : undefined;
	}).filter(item => !!item);
};

/**
 * Returns an array with the metadata files for all dependent packages that ship UI5 Web Components
 *
 * @param packageFile
 * @returns {string[]}
 */
const getDepComponentPackages = packageDir => {
	const packageFile = path.join(packageDir, "package.json");
	const packageFileContent = JSON.parse(fs.readFileSync(packageFile));
	if (!packageFileContent.ui5WebComponentsPackage) {
		return [];
	}

	return Object.keys(packageFileContent.dependencies || {}).map(dep => path.dirname(require.resolve(path.join(dep, "package.json"))));
};

/**
 * Get the list of all components for the purpose of scoping
 *  - include components from dependent packages
 *
 * @param packageDir
 * @returns {*}
 */
const getAllComponents = (packageDir) => {
	return getComponents(packageDir).concat(getDepComponentPackages(packageDir).flatMap(getAllComponents));
};

module.exports = getAllComponents;
