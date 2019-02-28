const buildRenderer = (controlName, litTemplate) => {
	return `
/* eslint no-unused-vars: 0 */	
import ifTruthy from '@ui5/webcomponents-base/src/sap/ui/webcomponents/base/renderer/ifTruthy';
import { html, svg, repeat } from '@ui5/webcomponents-base/src/sap/ui/webcomponents/base/renderer/LitRenderer';
const ${controlName}LitRenderer = {};
${litTemplate}
${controlName}LitRenderer.render = renderMe;
export default ${controlName}LitRenderer;`
};

module.exports = {
	generateTemplate: buildRenderer
};
