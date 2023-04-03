
const svgrx = new RegExp(/<svg[\s\S]*?>([\s\S]*?)<\/svg>/, 'g');
const blockrx = /block[0-9]+/g;

function processSVG(input) {
	let matches;
	let template = input;
	let blockCounter = 0;

	matches = getSVGMatches(template);

	if (!matches.length) {
		return template;
	}

	matches.forEach(match => {
		//(1) extract the SVG content as a separate block
		const svgContentGroup = match[1];
		const block = getSVGBlock(svgContentGroup, ++blockCounter);

		// (2) replace the SVG content with its block called, e.g ${blockSVG(context)}
		template = template.replace(svgContentGroup, block.usage);

		// (3) look for internal blocks in the SVG content and replace their `html with `svg
		template = replaceInternalBlocks(template, svgContentGroup);

		// (4) append the SVG block definiton (built in step 1), e.g const blockSVG = (context) => {return svg`.*`}
		template += block.definition;
	});

	return template;
}

function getSVGMatches(template) {
	let matches = [];

	while (svgMatch = svgrx.exec(template)) {
		matches.push(svgMatch);
		if (svgrx.lastIndex === svgMatch.index) {
			svgrx.lastIndex++;
		}
	}

	return matches;
}

function getSVGBlock(input, blockCounter) {
	const definitionTS = `\nfunction blockSVG${blockCounter} (this: any, context: UI5Element, tags: string[], suffix: string | undefined) {
		return svg\`${input}\`;
	};`;
	const definitionJS = `\nfunction blockSVG${blockCounter} (context, tags, suffix) {
		return svg\`${input}\`;
	};`;

	return {
		usage: `\${blockSVG${blockCounter}.call(this, context, tags, suffix)}`,
		definition: process.env.UI5_TS ? definitionTS : definitionJS,
	};
}

function replaceInternalBlocks(template, svgContent) {
	const internalBlocks = svgContent.match(blockrx) || [];

	internalBlocks.forEach(blockName => {
		const rx = new RegExp(`function ${blockName}.*(html\`).*;`);
		template = template.replace(rx, (match, p1) => {
			return match.replace(p1, "svg\`");
		});
	});

	return template;
}

module.exports = {
	process: processSVG,
};
