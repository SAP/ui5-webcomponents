const HTMLLitVisitor = require("./litVisitor2");
const PartialsVisitor = require("./partialsVisitor");
const Handlebars = require("handlebars/dist/handlebars.min.js");
const aCommonPartials = require("./commonPartials");
const includesReplacer = require("./includesReplacer");

const removeWhiteSpaces = (source) => {
	return source.replace(/\n+/g, "").replace(/\s+</g, "<").replace(/}}\s+{{/g, "}}{{");
};

const compileString = async (sInput, config) => {
	let sPreprocessed = sInput;

	sPreprocessed = await includesReplacer.replace(sPreprocessed, config);
	sPreprocessed += aCommonPartials.join("\n");
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

	result += "const renderMe = " + lv.mainBlock + ";";
	return result;
};

module.exports = {
	compileString
};