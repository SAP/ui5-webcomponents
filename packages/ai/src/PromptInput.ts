import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/paper-plane.js";
import type IInputSuggestionItem from "@ui5/webcomponents/dist/Input.js";
import type InputEventDetail from "@ui5/webcomponents/dist/Input.js";
import Input from "@ui5/webcomponents/dist/Input.js";
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
 * @experimental The **@ui5/webcomponents-ai** package is under development and considered experimental - components' APIs are subject to change.
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
 * @since 2.0.0
 * @public
 */
@event("submit")

/**
 * Fired when the value of the component changes at each keystroke,
 * and when a suggestion item has been selected.
 *
 * @since 2.0.0
 * @public
 */
@event("input")

/**
 * Fired when the input operation has finished by pressing Enter
 * or on focusout.
 *
 * @since 2.0.0
 * @public
 */
@event("change")
class PromptInput extends UI5Element {
	/**
	 * Defines the value of the component.
	 *
	 * @default ""
	 * @since 2.0.0
	 * @public
	 */
	@property()
	value = "";

	/**
	 * Defines a short hint intended to aid the user with data entry when the
	 * component has no value.
	 * @default undefined
	 * @since 2.0.0
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Defines the label of the input field.
	 *
	 * @default undefined
	 * @since 2.0.0
	 * @public
	 */
	@property()
	label?: string;

	/**
	 * Defines whether the clear icon of the input will be shown.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	showClearIcon = false;

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
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	showExceededText = false;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Sets the maximum number of characters available in the input field.
	 *
	 * @default undefined
	 * @since 2.0.0
	 * @public
	 */
	@property({ type: Number })
	maxlength?: number;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @since 2.0.0
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None"

	/**
	 * Defines whether the component should show suggestions, if such are present.
	 *
	 * **Note:** You need to import the `InputSuggestions` module
	 * from `"@ui5/webcomponents/dist/features/InputSuggestions.js"` to enable this functionality.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSuggestions = false;

	/**
	 * Defines the suggestion items.
	 *
	 * **Note:** The suggestions would be displayed only if the `showSuggestions`
	 * property is set to `true`.
	 *
	 * **Note:** The `<ui5-suggestion-item>`, `<ui5-suggestion-item-group>` and `ui5-suggestion-item-custom` are recommended to be used as suggestion items.
	 *
	 * **Note:** Importing the Input Suggestions Support feature:
	 *
	 * `import "@ui5/webcomponents/dist/features/InputSuggestions.js";`
	 *
	 * automatically imports the `<ui5-suggestion-item>` and `<ui5-suggestion-item-group>` for your convenience.
	 * @public
	 */
		@slot({ type: HTMLElement, "default": true })
		suggestionItems!: Array<IInputSuggestionItem>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * The value state message slot should contain only one root element.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the component is in `Information`, `Critical` or `Negative` value state.
	 *
	 * @since 2.0.0
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	valueStateMessage!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;
	_initialRendering = true;

	static async onDefine() {
		PromptInput.i18nBundle = await getI18nBundle("@ui5/webcomponents-ai");
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this.fireEvent("submit");
		}
	}

	_onInnerInput(e: CustomEvent<InputEventDetail>) {
		this.value = (e.target as Input).value;

		this.fireEvent("input");
	}

	_onInnerChange() {
		this.fireEvent("change");
	}

	_onButtonClick() {
		this.fireEvent("submit");
	}

	_onTypeAhead(e: CustomEvent): void {
		this.value = (e.target as Input).value;
	}

	get _exceededText() {
		if (this.showExceededText) {
			let leftCharactersCount;
			const maxLength = this.maxlength;

			if (maxLength !== undefined) {
				leftCharactersCount = maxLength - this.value.length;

				if (leftCharactersCount >= 0) {
					return PromptInput.i18nBundle.getText(PROMPT_INPUT_CHARACTERS_LEFT, leftCharactersCount);
				}

				return PromptInput.i18nBundle.getText(PROMPT_INPUT_CHARACTERS_EXCEEDED, Math.abs(leftCharactersCount));
			}
		}
	}

	get _maxLenght() {
		return this.maxlength || undefined;
	}

	get _submitButtonDisabled() {
		return (this.value.length <= 0) || this.disabled || this.readonly;
	}
}

PromptInput.define();

export default PromptInput;
