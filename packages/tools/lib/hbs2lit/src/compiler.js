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
				const blockNormal = block.replace(/^const block/, "const normal_block").replace(/\${scopeTag\("/g, "").replace(/", tags, suffix\)}/g, "");
				const blockParams = block.match(/\(.*?\)/)[0];
				const blockBranching = `const ${key} = ${blockParams} => normal_${key}${blockParams};`;
				result += blockNormal + "\n" + blockBranching + "\n";
			} else {
				result += block + "\n";
			}
	}

	result = svgProcessor.process(result);
	return result;
};

module.exports = hbs2lit;
