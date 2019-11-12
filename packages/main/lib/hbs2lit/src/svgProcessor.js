
const SVGRgx = /<svg [\s\S]*?>([\s\S]+)?<\/svg>/;
let counter = 0;

function process(input) {
	const match = input.match(SVGRgx);

	if (match) {
		const svgContent = match[1];
		const blockInfo = getSVGBlock(svgContent);
		const template = input.replace(svgContent, blockInfo.usage);
		return { template, block: blockInfo.definition };
	}

	return { template: input, block: '' };
}

function getSVGBlock(input) {
	let num = ++counter;
	return {
		usage: `\${blockSVG${num}(context)}`,
		definition: `const blockSVG${num} = (context) => {return svg\`${input}\`};`
	};
}

module.exports = {
	process: process
};