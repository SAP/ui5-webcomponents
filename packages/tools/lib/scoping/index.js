const fs = require("fs");
const path = require("path");
const glob = require("glob");
const acorn = require("acorn");
const walk = require("acorn-walk");
const getAllComponents = require("./get-all-components.js");

const root = process.argv[2];

const normalizeVersion = version => version.replace(/[\.\-]+/g, "");

const components = getAllComponents(process.cwd());

const packages = components.map(item => item.packageName).filter((item, index, arr) => arr.indexOf(item) === index);
const tags = components.flatMap(item => item.altTag ? [item.tag, item.altTag] : item.tag);

// Build a map to easily get the version for each tag
const versionsMap = new Map();
components.forEach(item => {
	versionsMap.set(item.tag, normalizeVersion(item.version));
	if (item.altTag) {
		versionsMap.set(item.altTag, normalizeVersion(item.version));
	}
});

// Replaces tags in HTML content, f.e. <ui5-button> with <ui5-button-ver> or </ui5-button> with </ui5-button-ver>
const replaceTagsHTML = content => {
	tags.forEach(tag => {
		const version = versionsMap.get(tag);
		content = content.replace(new RegExp(`(<\/?)(${tag})(\/?[> \t\n])`, "g"), `$1$2-${version}$3`);
	});

	return content;
};

// Replace tags in any content
const replaceTagsAny = content => {
	tags.forEach(tag => {
		const version = versionsMap.get(tag);
		content = content.replace(new RegExp(`(^|[^\-_A-Za-z0-9])(${tag})([^\-_A-Za-z0-9]|$)`, "g"), `$1$2-${version}$3`);
	});
	return content;
};

// Replace imports for components in other packages, replace tags
glob.sync(path.join(root, "/**/*.js")).forEach(file => {
	let content = String(fs.readFileSync(file));

	// Replace imports
	walk.simple(acorn.parse(content, {sourceType: "module"}), {
		ImportDeclaration(node) {
			const source = node.source.value;

			packages.forEach(packageName => {
				if (source.startsWith(`${packageName}/dist/`)) {
					const newSource = source.replace("/dist/", "/dist/scoped/");
					content = content.replace(source, newSource);
				}
			});
		}
	});

	content = replaceTagsAny(content);

	fs.writeFileSync(file, content);
});

// Replace tags in templates
glob.sync(path.join(root, "/generated/templates/**/*.js")).forEach(file => {
	let content = String(fs.readFileSync(file));
	content = replaceTagsHTML(content);
	fs.writeFileSync(file, content);
});

// Replace tag names in CSS
glob.sync(path.join(root, "/generated/themes/*.css.js")).forEach(file => {
	let content = String(fs.readFileSync(file));
	content = replaceTagsAny(content);
	fs.writeFileSync(file, content);
});

// Replace both tags and tag names in test pages
glob.sync(path.join(root, "/test-resources/pages/**/*.html")).forEach(file => {
	let content = String(fs.readFileSync(file));
	content = content.replace(/bundle\.(.*?)\.js/g, `bundle.scoped.$1.js`);
	content = replaceTagsHTML(content);
	fs.writeFileSync(file, content);
});

// Replace tag names in test pages scripts
glob.sync(path.join(root, "/test-resources/pages/**/*.{html,css,js}")).forEach(file => {
	let content = String(fs.readFileSync(file));
	content = replaceTagsAny(content);
	fs.writeFileSync(file, content);
});
