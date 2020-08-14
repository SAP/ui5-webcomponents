const fs = require("fs");
const path = require("path");
const glob = require("glob");
const acorn = require("acorn");
const walk = require("acorn-walk");

const root = process.argv[2];
const suffix = process.argv[3];

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

const getDepComponentPackages = packageDir => {
	const packageFile = path.join(packageDir, "package.json");
	const packageFileContent = JSON.parse(fs.readFileSync(packageFile));
	const name = packageFileContent.name;
	if (!["@ui5/webcomponents-fiori", "@ui5-webcomponents"].includes(name)) {
		return [];
	}

	return Object.keys(packageFileContent.dependencies || {}).map(dep => path.dirname(require.resolve(path.join(dep, "package.json"))));
};

const getAllTags = (packageDir) => {
	return getPackageTags(packageDir).concat(getDepComponentPackages(packageDir).flatMap(getPackageTags));
};

const tags = getAllTags(process.cwd());

// Replaces tags in HTML content, f.e. <ui5-button> with <ui5-button-ver> or </ui5-button> with </ui5-button-ver>
const replaceTagsHTML = content => {
	tags.forEach(tag => {
		content = content.replace(new RegExp(`(<\/?)(${tag})(\/?[> \t\n])`, "g"), `$1$2-${suffix}$3`);
	});
	return content;
};

// Replace tags in any content
const replaceTagsAny = content => {
	tags.forEach(tag => {
		content = content.replace(new RegExp(`(^|[^\-_A-Za-z0-9])(${tag})([^\-_A-Za-z0-9]|$)`, "g"), `$1$2-${suffix}$3`);
	});
	return content;
};

// Replace HTML in test pages
glob.sync(path.join(root, "/**/*.html")).forEach(file => {
	let content = String(fs.readFileSync(file));
	content = replaceTagsHTML(content);
	fs.writeFileSync(file, content);
});

// Replace tag names everywhere
glob.sync(path.join(root, "/**/*.{html,css,js}")).forEach(file => {
	let content = String(fs.readFileSync(file));
	content = replaceTagsAny(content);
	fs.writeFileSync(file, content);
});
