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

const hbs2lit = async (file) => {
	let sPreprocessed = await includesReplacer.replace(file);

	sPreprocessed = removeWhiteSpaces(sPreprocessed);

	const ast = Handlebars.parse(sPreprocessed);

	const pv = new PartialsVisitor();
	const lv = new HTMLLitVisitor();

	let result = "";

	pv.accept(ast);
	pv.modify(ast);

	lv.accept(ast);

	for (let key in lv.blocks) {
		let block = lv.blocks[key];

		if (block.match(/scopeTag/)) {
			const matches = block.match(/^(.*?)( => )(.*?);$/);
			const scopedCode = matches[3];
			const normalCode = scopedCode.replace(/\${scopeTag\("/g, "").replace(/", tags, suffix\)}/g, "");
			block = `${matches[1]}${matches[2]}suffix ? ${scopedCode} : ${normalCode};`;
		}

		result += block + "\n";
	}

	result = svgProcessor.process(result);
	return result;
};

module.exports = hbs2lit;
