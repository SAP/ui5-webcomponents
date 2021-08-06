const fs = require("fs");
const path = require("path");
const glob = require("glob");
const getAllTags = require("./get-all-tags.js");

const tags = getAllTags(process.cwd());

const errors = [];

glob.sync(path.join(process.cwd(), "src/**/*.css")).forEach(file => {
	let content = String(fs.readFileSync(file));
	tags.forEach(tag => {
		if (content.match(new RegExp(`(^|[^\.\-_A-Za-z0-9"\[])(${tag})([^\-_A-Za-z0-9]|$)`, "g"))) {
			errors.push(`Warning! ${tag} found in ${file}`);
		}
	});
});

glob.sync(path.join(process.cwd(), "src/**/*.js")).forEach(file => {
	let content = String(fs.readFileSync(file));
	tags.forEach(tag => {
		if (content.match(new RegExp(`querySelector[A-Za-z]*..${tag}`, "g"))) {
			errors.push(`Warning! querySelector for ${tag} found in ${file}`);
		}
	});
});

if (errors.length) {
	errors.forEach(error => console.log(error));
	throw new Error("Errors found.");
}
