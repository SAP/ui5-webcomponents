const fs = require("fs");

if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr){

		// If a regex pattern
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);

	};
}

const transformLine = line => {
	// it
	line = line.replace(/(it.*?)(\(\))(\s+=>\s+{)/, "$1async $2$3");

	// before
	line = line.replace(/(before.*?)(\(\))(\s+=>\s+{)/, "$1async $2$3");

	// browser.(url, $, $$, etc...)
	line = line.replaceAll(/browser\.(.*?)\(/g, "await browser.$1(");

	// element.*
	line = line.replaceAll(/([a-zA-Z0-9_]+)\.(getText|setText|getValue|getProperty|setValue|setProperty|getAttribute|setAttribute|click|keys)\(/g, "await $1.$2(");

	// browser.execute(() => {
	line = line.replace(/browser\.execute\(\s*\(\s*\)\s*=>\s*{/, "browser.executeAsync(done => {");

	// browser.execute((param, param, param) => {
	line = line.replace(/browser\.execute\(\s*\(\s*(.*?)\s*\)\s*\s*=>\s*{/, "browser.executeAsync(($1, done) => {");

	return line;
};

const file = process.argv[2];

const content = `${fs.readFileSync(file)}`;
let lines = content.split("\n");

lines = lines.map(transformLine);

const result = lines.join("\n");
const newFile = file.replace(/\.js$/, "2.js");
fs.writeFileSync(newFile, result);
