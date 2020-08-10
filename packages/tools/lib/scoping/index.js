const fs = require("fs");
const path = require("path");
const glob = require("glob");
const getAllComponents = require("./get-all-components.js");

const root = process.argv[2];

const components = getAllComponents();

const processSourceFile = (file, component) => {
	console.log("Processing source file", file, component);
};

const processTemplate = (file, component) => {
	console.log("Processing template", file, component);
};

const processCSS = (file, component) => {
	console.log("Processing CSS", file, component);
};

// Replace imports for components in other packages, replace tags
glob.sync(path.join(root, "/*.js")).forEach(file => {
	components.forEach(component => {
		processSourceFile(file, component);
	});
});

// Replace tags in templates
glob.sync(path.join(root, "/generated/templates/**/*.js")).forEach(file => {
	components.forEach(component => {
		processTemplate(file, component);
	});
});

// Replace tags in CSS
glob.sync(path.join(root, "/generated/themes/*.css.js")).forEach(file => {
	components.forEach(component => {
		processCSS(file, component);
	});
});

