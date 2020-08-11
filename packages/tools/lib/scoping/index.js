const fs = require("fs");
const path = require("path");
const glob = require("glob");
const acorn = require("acorn");
const walk = require("acorn-walk");
const getAllComponents = require("./get-all-components.js");

const root = process.argv[2];
const version = process.argv[3].replace(/[\.\-]+/g, "");

const components = getAllComponents(process.cwd());

const packages = components.map(item => item.packageName).filter((item, index, arr) => arr.indexOf(item) === index);
const srcFiles = components.map(item => item.file);
const tags = components.flatMap(item => item.altTag ? [item.tag, item.altTag] : item.tag);

const processSourceFile = (file) => {
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

	// Replace tags
	tags.forEach(tag => {
		content = content.replace(new RegExp(`(${tag})([^\-A-Za-z0-9])`, "g"), `$1-${version}$2`);
	});

	fs.writeFileSync(file, content);
};

const processTemplate = (file) => {
	let content = String(fs.readFileSync(file));

	// Replace tags
	tags.forEach(tag => {
		content = content.replace(new RegExp(`(<\/?)(${tag})([> ])`, "g"), `$1$2-${version}$3`);
	});

	fs.writeFileSync(file, content);
};

const processCSS = (file) => {
	// console.log("Processing CSS", file, components);
};

// Replace imports for components in other packages, replace tags
glob.sync(path.join(root, "/*.js")).forEach(file => {
	processSourceFile(file);
});

// Replace tags in templates
glob.sync(path.join(root, "/generated/templates/**/*.js")).forEach(file => {
	processTemplate(file);
});

// Replace tags in CSS
glob.sync(path.join(root, "/generated/themes/*.css.js")).forEach(file => {
	processCSS(file);
});

