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

const getPackageTags = (packageDir) => {
	const srcDir = path.join(packageDir, "src/");
	return glob.sync(path.join(srcDir, "/**/*.js")).flatMap(file => {
		const tag = getTag(file);
		const altTag = getAltTag(file);
		return [tag, altTag];
	}).filter(item => !!item);
};

const isComponentsPackage = (packageFileContent) => {
	const name = packageFileContent.name;
	return ["@ui5/webcomponents", "@ui5/webcomponents-fiori"].includes(name);
};

const getDepComponentPackages = packageDir => {
	const packageFile = path.join(packageDir, "package.json");
	const packageFileContent = JSON.parse(fs.readFileSync(packageFile));
	if (!isComponentsPackage(packageFileContent)) {
		return [];
	}

	return Object.keys(packageFileContent.dependencies || {}).map(dep => path.dirname(require.resolve(path.join(dep, "package.json"))));
};

const getAllTags = (packageDir) => {
	return getPackageTags(packageDir).concat(getDepComponentPackages(packageDir).flatMap(getPackageTags));
};

module.exports = getAllTags;
