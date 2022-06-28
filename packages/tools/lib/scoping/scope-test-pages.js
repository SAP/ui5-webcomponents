const fs = require("fs");
const path = require("path");
const glob = require("glob");
const getAllTags = require("./get-all-tags.js");

const root = process.argv[2];
const suffix = process.argv[3];

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

// Replace bundle names and HTML tag names in test pages
glob.sync(path.join(root, "/**/*.html")).forEach(file => {
	let content = String(fs.readFileSync(file));
	content = content.replace(/bundle\.(.*?)\.js/g, `../bundle.scoped.$1.js`);
	content = replaceTagsHTML(content);
	fs.writeFileSync(file, content);
});

// Replace tag names everywhere
glob.sync(path.join(root, "/**/*.{html,css,js}")).forEach(file => {
	let content = String(fs.readFileSync(file));
	content = replaceTagsAny(content);
	fs.writeFileSync(file, content);
});
