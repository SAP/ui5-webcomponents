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

	// element.*
	line = line.replaceAll(/([a-zA-Z0-9_\[\]]+)\.(\$|\$\$|addValue|isEnabled|isClickable|getTagName|getText|setText|getValue|getProperty|setValue|setProperty|getAttribute|setAttribute|removeAttribute|click|doubleClick|keys|shadow\$|shadow\$\$|isExisting|isDisplayed|isDisplayedInViewport|isFocused|isFocusedDeep|hasClass|moveTo|scrollIntoView|getSize|getHTML|dragAndDrop|getCSSProperty|getLocation)\(/g, "await $1.$2(");

	// browser.(url, $, $$, etc...)
	line = line.replaceAll(/browser\.(.*?)\(/g, "await browser.$1(");

	// browser.execute(() => {
	line = line.replace(/browser\.execute\(\s*\(\s*\)\s*=>\s*{/, "browser.executeAsync(done => {");

	// browser.execute((param, param, param) => {
	line = line.replace(/browser\.execute\(\s*\(\s*(.*?)\s*\)\s*\s*=>\s*{/, "browser.executeAsync(($1, done) => {");

	// = $(
	line = line.replace(/= \$\(/, "= await browser.$(");

	line = line.replaceAll(/await await/g, "await");

	line = line.replaceAll(/\.ok\(\!await/g, ".notOk(await");

	return line;
};

const file = process.argv[2];

const content = `${fs.readFileSync(file)}`;
let lines = content.split("\n");

lines = lines.map(transformLine);

const result = lines.join("\n");
const newFile = file; //.replace(/\.js$/, "2.js");
fs.writeFileSync(newFile, result);
