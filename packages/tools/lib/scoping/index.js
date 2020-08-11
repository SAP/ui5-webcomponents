const fs = require("fs");
const path = require("path");
const glob = require("glob");
const getAllComponents = require("./get-all-components.js");

const root = process.argv[2];

const components = getAllComponents(process.cwd());
const packages = components.map(item => item.packageName).filter((item, index, arr) => arr.indexOf(item) === index);
const srcFiles = components.map(item => item.file);
const tags = components.flatMap(item => item.altTag ? [item.tag, item.altTag] : item.tag);

console.log(packages);
console.log(srcFiles);
console.log(tags);
process.exit();

const processSourceFile = (file) => {
	// console.log("FILE", file)
	const content = String(fs.readFileSync(file)); //.replace(/\n/g, " ");
	// console.log(content);

	process.exit();

	const imports = content.match(/import.*?\".*?";/g);
	if (imports) {
		imports.forEach(imp => {
			let resolvedPath;
			const matches = imp.match(/import.*?\"(.*?)";/);
			const impPath = matches[1];

			if (impPath.startsWith(".")) {
				resolvedPath = path.join(require.resolve(path.dirname(file)), impPath);
			} else {
				resolvedPath = require.resolve(impPath);
			}

		});
	}
	process.exit();
};

const processTemplate = (file) => {
	console.log("Processing template", file, components);
};

const processCSS = (file) => {
	console.log("Processing CSS", file, components);
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

