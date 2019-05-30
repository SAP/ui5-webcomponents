const buildRenderer = (controlName, litTemplate) => {
	return `
/* eslint no-unused-vars: 0 */
import ifDefined from '@ui5/webcomponents-base/src/renderer/ifDefined.js';
import { html, svg, repeat, classMap, styleMap } from '@ui5/webcomponents-base/src/renderer/LitRenderer.js';
const ${controlName}LitRenderer = {};
${litTemplate}
${controlName}LitRenderer.render = renderMe;
export default ${controlName}LitRenderer;`
};

module.exports = {
	generateTemplate: buildRenderer
};
