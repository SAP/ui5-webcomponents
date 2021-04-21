const buildRenderer = (controlName, litTemplate) => {
	return `
/* eslint no-unused-vars: 0 */
import { ifDefined } from "lit-html/directives/if-defined.js";
import { html, svg, repeat, classMap, styleMap, unsafeHTML, scopeTag } from '@ui5/webcomponents-base/dist/renderer/LitRenderer.js';

const main = (context, tags, suffix) => {
	${litTemplate}

	return block0(context);
};

export default main;`;
};

module.exports = {
	generateTemplate: buildRenderer
};
