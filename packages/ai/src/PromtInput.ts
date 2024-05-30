import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import Label from "@ui5/webcomponents/dist/Label.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Button from "@ui5/webcomponents/dist/Button.js";

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
}

PromptInput.define();

export default PromptInput;