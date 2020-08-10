const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const glob = require("glob");
const getAllComponents = require("./get-all-components.js");

const root = process.argv[2];

const components = getAllComponents();
console.log(components);
process.exit();

const processSourceFile = file => {
	console.log("Processing source file", file);
};

const processTemplate = file => {
	console.log("Processing template", file);
};

const processCSS = file => {
	console.log("Processing CSS", file);
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

