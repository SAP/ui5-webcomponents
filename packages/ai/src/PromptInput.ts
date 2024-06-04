import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import Label from "@ui5/webcomponents/dist/Label.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";

/**
 * @class
 *
 * ### Overview
 *
 * The PromptInput is an AI component.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/PromptInput.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.0
 * @public
 */
@customElement({
	tag: "ui5-ai-prompt-input",
	renderer: litRender,
	dependencies: [
		Input,
		Label,
		Button,
	],
})
class PromptInput extends UI5Element {
	/**
	 * Defines the value of the PromptInput.
	 * @public
	 * @default ""
	 */
	@property()
	value = "";
}

PromptInput.define();

export default PromptInput;
