const HTMLLitVisitor = require("./litVisitor2");
const PartialsVisitor = require("./partialsVisitor");
const Handlebars = require("handlebars/dist/handlebars.min.js");
const includesReplacer = require("./includesReplacer");
const svgProcessor = require("./svgProcessor");

const removeWhiteSpaces = (source) => {
	return source.replace(/\n+/g, "").replace(/\s+</g, "<").replace(/}}\s+{{/g, "}}{{");
};

const compileString = async (sInput, config) => {
	let sPreprocessed = sInput;

	sPreprocessed = await includesReplacer.replace(sPreprocessed, config);
	sPreprocessed = removeWhiteSpaces(sPreprocessed);

	const ast = Handlebars.parse(sPreprocessed);

	const pv = new PartialsVisitor();
	const lv = new HTMLLitVisitor();

	let result = "";

	pv.accept(ast);
	pv.modify(ast);

	lv.accept(ast);

	for (let key in lv.blocks) {
		result += lv.blocks[key] + "\n";
	}

	result = svgProcessor.process(result);
	return result;
};

module.exports = {
	compileString
};
