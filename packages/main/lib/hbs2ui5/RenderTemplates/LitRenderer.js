const buildRenderer = (controlName, litTemplate) => {
	return `
/* eslint no-unused-vars: 0 */	
import { html, svg } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat'
import ifTruthy from '@ui5/webcomponents-base/src/sap/ui/webcomponents/base/renderer/ifTruthy'
const ${controlName}LitRenderer = {};
${litTemplate}
${controlName}LitRenderer.render = renderMe;
export default ${controlName}LitRenderer;`
};

module.exports = {
	generateTemplate: buildRenderer
};