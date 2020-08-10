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

const getComponents = (srcDir) => {
	return glob.sync(path.join(srcDir, "/**/*.js")).map(file => {
		const tag = getTag(file);
		const altTag = getAltTag(file);
		return tag ? {file, tag, altTag} : undefined;
	}).filter(item => !!item);
};

/**
 * Returns an array with the metadata files for all dependent packages that ship UI5 Web Components
 *
 * @param packageFile
 * @returns {string[]}
 */
const getDepComponentPackages = packageFile => {
	const packageFileContent = JSON.parse(fs.readFileSync(packageFile));
	if (!packageFileContent.ui5WebComponentsPackage) {
		return [];
	}

	return Object.keys(packageFileContent.dependencies || []).map(dep => {
		let file;
		try {
			file = require.resolve(path.join(dep, "package.json"));
		} catch (e) {
			file = undefined;
		}
		return file;
	}).filter(file => !!file);
};

/**
 * Get the list of all components for the purpose of scoping
 *  - include components from dependent packages
 *
 * @param packageDir
 * @returns {*}
 */
const getAllComponents = (packageDir) => {
	packageDir = packageDir ? path.dirname(packageDir) : process.cwd();

	const srcDir = path.join(packageDir, "src/");
	const packageFile = path.join(packageDir, "package.json");
	return getComponents(srcDir).concat(getDepComponentPackages(packageFile).flatMap(getAllComponents));
};

module.exports = getAllComponents;
