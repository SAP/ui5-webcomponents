const HTMLLitVisitor = require("./litVisitor2");
const PartialsVisitor = require("./partialsVisitor");
const Handlebars = require("handlebars/dist/handlebars.min.js");
const includesReplacer = require("./includesReplacer");
const svgProcessor = require("./svgProcessor");

const removeWhiteSpaces = (source) => {
	return source
		.replace(/\s*\r*\n+\s*/g, " ") // Replace new lines and all whitespace between them with a space
		.replace(/\s*<\s*/g, "<") // Strip whitespace round <
		.replace(/\s*>\s*/g, ">") // Strip whitespace round >
		.replace(/}}\s+{{/g, "}}{{"); // Remove whitespace between }} and {{
};

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

const hbs2lit = (file) => {
	let sPreprocessed = includesReplacer.replace(file);

	sPreprocessed = removeWhiteSpaces(sPreprocessed);

	const ast = Handlebars.parse(sPreprocessed);

	const pv = new PartialsVisitor();
	const lv = new HTMLLitVisitor();

	let result = "";

	pv.accept(ast);
	pv.modify(ast);

	lv.accept(ast);

	for (let key in lv.blocks) {
		const block = lv.blocks[key];

		if (block.match(/scopeTag/)) {
			const blockScoped = block.replace(/^const block/, "const scoped_block");
			const blockNormal = block.replace(/^const block/, "const normal_block").replaceAll('${scopeTag("', "").replaceAll('", tags, suffix)}', "");
			const blockBranching = `const ${key} = (context, tags, suffix) => suffix ? scoped_${key}(context, tags, suffix): normal_${key}(context);`;
			result += blockNormal + "\n" + blockScoped + "\n" + blockBranching + "\n";
		} else {
			result += block + "\n";
		}
	}

	result = svgProcessor.process(result);
	return result;
};

module.exports = hbs2lit;
