const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const CleanCSS = require('clean-css');

mkdirp.sync("dist/generated/css/");
fs.readdirSync("src/css/").filter(file => file.endsWith(".css")).forEach(file => {
	let content = fs.readFileSync(path.join("src/css/", file));
	const res = new CleanCSS().minify(`${content}`);
	content = `export default {
	packageName: "@ui5/webcomponents-base",
	fileName: "${file}",
	content: \`${res.styles}\`
};`;

	fs.writeFileSync(path.join("dist/generated/css/", `${file}.js`), content);
});

