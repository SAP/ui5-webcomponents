const fs = require("fs");
const path = require("path");
const glob = require("glob");
const getAllTags = require("./get-all-tags.js");

const tags = getAllTags(process.cwd());

glob.sync(path.join(process.cwd(), "src/**/*.css")).forEach(file => {
	let content = String(fs.readFileSync(file));
	tags.forEach(tag => {
		if (content.match(new RegExp(`(^|[^\-_A-Za-z0-9"])(${tag})([^\-_A-Za-z0-9]|$)`, "g"))) {
			console.warn(`${tag} found in ${file}`);
		}
	});
});
