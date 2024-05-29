import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import Input, { InputEventDetail } from "@ui5/webcomponents/dist/Input.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import {
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import {
	PROMPT_INPUT_CHARACTERS_LEFT,
	PROMPT_INPUT_CHARACTERS_EXCEEDED,
} from "./generated/i18n/i18n-defaults.js";

import PromptInputTemplate from "./generated/templates/PromptInputTemplate.lit.js";

// Styles
import PromptInputCss from "./generated/themes/PromptInput.css.js";

type ExceededText = {
	exceededText?: string;
	leftCharactersCount?: number;
	calcedMaxLength?: number;
};

/**
 * @class
 * ### Overview
 *
 * The `ui5-ai-prompt-input` component allows the user to write custom instructions in natural language, so that AI is guided to generate content tailored to user needs.
 *
 * **Note:** The web component is in an experimental state
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/PromptInput.js
 * @class
 * @constructor
 * @public
 * @extends UI5Element
 */
@customElement({
	tag: "ui5-ai-prompt-input",
	renderer: litRender,
	styles: PromptInputCss,
	template: PromptInputTemplate,
	dependencies: [
		Input,
		Label,
		Button,
	],
})

/**
 * Fired when the input operation has finished by pressing Enter
 * or AI button is clicked.
 *
 * @since 2.0.0-rc.1
 * @public
 */
@event("submit")

/**
 * Fired when the value of the component changes at each keystroke,
 * and when a suggestion item has been selected.
 *
 * @since 2.0.0-rc.1
 * @public
 */
@event("input")

/**
 * Fired when the input operation has finished by pressing Enter
 * or on focusout.
 *
 * @since 2.0.0-rc.1
 * @public
 */
@event("change")
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

	/**
	 * Defines the label of the input field.
	 *
	 * @default ""
	 * @since 2.0.0-rc.1
	 * @public
	 */
	@property()
	label!: string;

	/**
	 * Defines whether the clear icon of the input will be shown.
	 * @default false
	 * @public
	 * @since 2.0.0-rc.1
	 */
	@property({ type: Boolean })
	showClearIcon!: boolean;

	/**
	 * Determines whether the characters exceeding the maximum allowed character count are visible
	 * in the component.
	 *
	 * If set to `false`, the user is not allowed to enter more characters than what is set in the
	 * `maxlength` property.
	 * If set to `true` the characters exceeding the `maxlength` value are selected on
	 * paste and the counter below the component displays their number.
	 * @default false
	 * @public
	 * @since 2.0.0-rc.1
	 */
	@property({ type: Boolean })
	showExceededText!: boolean;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 * @since 2.0.0-rc.1
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 * @since 2.0.0-rc.1
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Sets the maximum number of characters available in the input field.
	 *
	 * @default undefined
	 * @since 2.0.0-rc.1
	 * @public
	 */
	@property({ validator: Integer })
	maxlength?: number;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @since 2.0.0-rc.1
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	@property({ validator: Integer })
	_charactersLeft?: number;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * The value state message slot should contain only one root element.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the component is in `Information`, `Critical` or `Negative` value state.
	 *
	 * @since 2.0.0-rc.1
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	valueStateMessage!: Array<HTMLElement>;

	_isEnter?: boolean;
	_exceededTextProps!: ExceededText;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		PromptInput.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
		this._isEnter = false;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this._isEnter = true;
		}
	}

	_onInnerInput(e: CustomEvent<InputEventDetail>) {
		this.value = (e.target as Input).value;

		this.fireEvent("input");
	}

	_onInnerChange() {
		this.fireEvent("change");

		if (this._isEnter) {
			this.fireEvent("submit");

			this._isEnter = false;
		}
	}

	_onButtonClick() {
		this.fireEvent("submit");
	}

	onBeforeRendering(): void {
		this._exceededTextProps = this._calcExceededText();
		if (this.maxlength) {
			this._charactersLeft = this.maxlength - this.value.length;
		}
	}

	_calcExceededText() {
		let calcedMaxLength,
			exceededText,
			leftCharactersCount;

		if (this.showExceededText) {
			const maxLength = this.maxlength;

			if (maxLength !== null && maxLength !== undefined) {
				leftCharactersCount = maxLength - this.value.length;

				if (leftCharactersCount >= 0) {
					exceededText = PromptInput.i18nBundle.getText(PROMPT_INPUT_CHARACTERS_LEFT, leftCharactersCount);
				} else {
					exceededText = PromptInput.i18nBundle.getText(PROMPT_INPUT_CHARACTERS_EXCEEDED, Math.abs(leftCharactersCount));
				}
			}
		} else {
			calcedMaxLength = this.maxlength;
		}

		return {
			exceededText, leftCharactersCount, calcedMaxLength,
		};
	}

	get _submitButtonDisabled() {
		return (this.value.length <= 0) || this.disabled || this.readonly;
	}
}

PromptInput.define();

export default PromptInput;
