import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import Input, { InputEventDetail } from "@ui5/webcomponents/dist/Input.js";

import PromptInputTemplate from "./generated/templates/PromptInputTemplate.lit.js";

// Styles
import PromptInputCss from "./generated/themes/PromptInput.css.js";
import Button from "./Button.js";

/**
 * @class
 * @constructor
 * @public
 * @extends UI5Element
 */
@customElement({
	tag: "ai-prompt-input",
	renderer: litRender,
	styles: PromptInputCss,
	template: PromptInputTemplate,
	dependencies: [
		Input,
		Button,
	],
})

class PromptInput extends UI5Element {
	/**
	 * Defines the value of the component.
	 *
	 * @default ""
	 * @since 2.0.0-rc.1
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines a short hint intended to aid the user with data entry when the
	 * component has no value.
	 * @default ""
	 * @since 2.0.0-rc.1
	 * @public
	 */
	@property()
	placeholder!: string;

	@property()
	label!: string;

	@property({ type: Boolean })
	showClearIcon!: boolean

	@property({ type: Boolean })
	disabled!: boolean

	@property({ validator: Integer })
	maxlength?: number

	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	@slot()
	valueStateContent!: Array<HTMLElement>;

	@property({ validator: Integer })
	_charactersLeft?: number

	@slot({
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	valueStateMessage!: Array<HTMLElement>;

	_onInnerInput(e: CustomEvent<InputEventDetail>) {
		this.value = (e.target as Input).value;
	}

	onBeforeRendering(): void {
		if (this.maxlength) {
			this._charactersLeft = this.maxlength - this.value.length;
		}
	}

	get _submitButtonDisabled() {
		return (this.value.length <= 0) || this.disabled;
	}
}

PromptInput.define();

export default PromptInput;
