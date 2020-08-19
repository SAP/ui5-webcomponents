const buildRenderer = (controlName, litTemplate) => {
	return `
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/dist/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap, unsafeHTML, setTags, setSuffix } from '@ui5/webcomponents-base/dist/renderer/LitRenderer.js';
${litTemplate}

const main = (context, tags, suffix) => {
	setTags(tags);
	setSuffix(suffix);
	return block0(context);
};
 
export default main;`
};

module.exports = {
	generateTemplate: buildRenderer
};
