import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import getEffectiveScrollbarStyle from "@ui5/webcomponents-base/dist/util/getEffectiveScrollbarStyle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";

import TextAreaTemplate from "./generated/templates/TextAreaTemplate.lit.js";
import TextAreaPopoverTemplate from "./generated/templates/TextAreaPopoverTemplate.lit.js";
import type FormSupportT from "./features/InputElementsFormSupport.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_TYPE_SUCCESS,
	VALUE_STATE_TYPE_INFORMATION,
	VALUE_STATE_TYPE_ERROR,
	VALUE_STATE_TYPE_WARNING,
	TEXTAREA_CHARACTERS_LEFT,
	TEXTAREA_CHARACTERS_EXCEEDED,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/TextArea.css.js";
import valueStateMessageStyles from "./generated/themes/ValueStateMessage.css.js";

type TokenizedText = Array<string>;
type IndexedTokenizedText = Array<{
	text: string;
	last: boolean;
}>;

type ExceededText = {
	exceededText?: string;
	leftCharactersCount?: number;
	calcedMaxLength?: number;
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-textarea` component is used to enter multiple lines of text.
 *
 * When empty, it can hold a placeholder similar to a `ui5-input`.
 * You can define the rows of the `ui5-textarea` and also determine specific behavior when handling long texts.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TextArea.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart textarea - Used to style the native textarea
 */
@customElement({
	tag: "ui5-textarea",
	languageAware: true,
	styles: [getEffectiveScrollbarStyle(), styles],
	renderer: litRender,
	template: TextAreaTemplate,
	staticAreaTemplate: TextAreaPopoverTemplate,
	staticAreaStyles: valueStateMessageStyles,
	dependencies: [Popover, Icon],
})
/**
 * Fired when the text has changed and the focus leaves the component.
 * @public
 */
@event("change")

/**
 * Fired when the value of the component changes at each keystroke or when
 * something is pasted.
 * @since 1.0.0-rc.5
 * @public
 */
@event("input")

/**
 * Fired when some text has been selected.
 *
 * @since 1.23.0
 * @public
 */
@event("select")

/**
 * Fired when textarea is scrolled.
 *
 * @since 1.23.0
 * @public
 */
@event("scroll")

class TextArea extends UI5Element implements IFormElement {
	/**
	 * Defines the value of the component.
	 * @formEvents change input
	 * @formProperty
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;
	/**
	 * Indicates whether the user can interact with the component or not.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
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
	 */
	@property({ type: Boolean })
	readonly!: boolean;
	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.3
	 */
	@property({ type: Boolean })
	required!: boolean;

	/**
	 * Defines a short hint intended to aid the user with data entry when the component has no value.
	 * @default ""
	 * @public
	 */
	@property()
	placeholder!: string;

	/**
	 * Defines the value state of the component.
	 *
	 * **Note:** If `maxlength` property is set,
	 * the component turns into "Warning" state once the characters exceeds the limit.
	 * In this case, only the "Error" state is considered and can be applied.
	 * @default "None"
	 * @since 1.0.0-rc.7
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Defines the number of visible text lines for the component.
	 *
	 * **Notes:**
	 *
	 * - If the `growing` property is enabled, this property defines the minimum rows to be displayed
	 * in the textarea.
	 * - The CSS `height` property wins over the `rows` property, if both are set.
	 * @default 0
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 0 })
	rows!: number;

	/**
	 * Defines the maximum number of characters that the `value` can have.
	 * @default undefined
	 * @public
	 */
	@property({ validator: Integer })
	maxlength?: number

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
	 */
	@property({ type: Boolean })
	showExceededText!: boolean;

	/**
	 * Enables the component to automatically grow and shrink dynamically with its content.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	growing!: boolean;

	/**
	 * Defines the maximum number of lines that the component can grow.
	 * @default 0
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 0 })
	growingMaxLines!: number;

	/**
	 * Determines the name with which the component will be submitted in an HTML form.
	 *
	 * **Important:** For the `name` property to have effect, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 *
	 * **Note:** When set, a native `input` HTML element
	 * will be created inside the component so that it can be submitted as
	 * part of an HTML form. Do not use this property unless you need to submit a form.
	 * @default ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the textarea.
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef!: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * @private
	 */
	 @property({ type: Boolean })
	exceeding!: boolean;

	/**
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_mirrorText!: IndexedTokenizedText;

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	_maxHeight!: string;

	/**
	 * @private
	 */
	@property({ validator: Integer })
	_width?: number;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * The value state message slot should contain only one root element.
   	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed if the component has
	 * `valueState` of type `Information`, `Warning` or `Error`.
	 * @since 1.0.0-rc.7
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;
	/**
	 * The slot is used to render native `input` HTML element within Light DOM to enable form submit,
	 * when `name` property is set.
	 * @private
	 */
	 @slot()
	 formSupport!: Array<HTMLElement>;

	_fnOnResize: ResizeObserverCallback;
	_firstRendering: boolean;
	_openValueStateMsgPopover: boolean;
	_exceededTextProps!: ExceededText;
	_keyDown?: boolean;
	FormSupport?: typeof FormSupportT;
	previousValue: string;
	valueStatePopover?: Popover;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		TextArea.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._firstRendering = true;
		this._openValueStateMsgPopover = false;
		this._fnOnResize = this._onResize.bind(this);
		this.previousValue = "";
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._fnOnResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._fnOnResize);
	}

	onBeforeRendering() {
		if (!this.value) {
			// fallback to default value
			this.value = "";
		}

		this._exceededTextProps = this._calcExceededText();
		this._mirrorText = this._tokenizeText(this.value);

		this.exceeding = !!this._exceededTextProps.leftCharactersCount && this._exceededTextProps.leftCharactersCount < 0;
		this._setCSSParams();

		const FormSupport = getFeature<typeof FormSupportT>("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenTextArea(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	onAfterRendering() {
		const nativeTextArea = this.getInputDomRef()!;

		if (this.rows === 1) {
			nativeTextArea.setAttribute("rows", "1");
		} else {
			nativeTextArea.removeAttribute("rows");
		}

		this.toggleValueStateMessage(this.openValueStateMsgPopover);
		this._firstRendering = false;
	}

	getInputDomRef() {
		return this.getDomRef()!.querySelector<HTMLTextAreaElement>("textarea")!;
	}

	_onkeydown(e: KeyboardEvent) {
		this._keyDown = true;

		if (isEscape(e)) {
			const nativeTextArea = this.getInputDomRef();

			this.value = this.previousValue;
			nativeTextArea.value = this.value;
			this.fireEvent("input");
		}
	}

	_onkeyup() {
		this._keyDown = false;
	}

	_onfocusin() {
		this.focused = true;
		this._openValueStateMsgPopover = true;
		this.previousValue = this.getInputDomRef().value;
	}

	_onfocusout(e: FocusEvent) {
		const eTarget = e.relatedTarget as HTMLElement;
		const focusedOutToValueStateMessage = eTarget?.shadowRoot?.querySelector(".ui5-valuestatemessage-root");

		this.focused = false;

		if (!focusedOutToValueStateMessage) {
			this._openValueStateMsgPopover = false;
		}
	}

	_onchange() {
		this.fireEvent("change", {});
	}

	_onselect() {
		this.fireEvent("select", {});
	}

	_onscroll() {
		this.fireEvent("scroll", {});
	}

	_oninput(e: InputEvent) {
		const nativeTextArea = this.getInputDomRef()!;

		if (e.target === nativeTextArea) {
			// stop the native event, as the semantic "input" would be fired.
			e.stopImmediatePropagation();
		}

		this.value = nativeTextArea.value;
		const valueLength = this.value.length;

		if (e.inputType === "insertFromPaste" && this.maxlength && valueLength > this.maxlength) {
			nativeTextArea.setSelectionRange(this.maxlength, valueLength);
		}

		this.fireEvent("input", {});

		// Angular two way data binding
		this.fireEvent("value-changed");
	}

	_onResize() {
		if (this.displayValueStateMessagePopover) {
			this._width = this.offsetWidth;
		}
	}

	_setCSSParams() {
		this.style.setProperty("--_textarea_rows", this.rows ? String(this.rows) : "2");
		this.style.setProperty("--_textarea_growing_max_lines", String(this.growingMaxLines));
	}

	toggleValueStateMessage(toggle: boolean) {
		if (toggle) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	async openPopover() {
		this.valueStatePopover = await this._getPopover();
		this.valueStatePopover && await this.valueStatePopover.showAt(this.shadowRoot!.querySelector(".ui5-textarea-root .ui5-textarea-wrapper")!);
	}

	async closePopover() {
		this.valueStatePopover = await this._getPopover();
		this.valueStatePopover && this.valueStatePopover.close();
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Popover>("[ui5-popover]")!;
	}

	_tokenizeText(value: string) {
		const tokenizedText = value.replace(/&/gm, "&amp;").replace(/"/gm, "&quot;").replace(/'/gm, "&apos;").replace(/</gm, "<")
			.replace(/>/gm, ">")
			.split("\n");

		if (tokenizedText.length < this.rows) {
			return this._mapTokenizedTextToObject([...tokenizedText, ...Array(this.rows - tokenizedText.length).fill("")] as TokenizedText);
		}

		return this._mapTokenizedTextToObject(tokenizedText);
	}

	_mapTokenizedTextToObject(tokenizedText: TokenizedText) {
		return tokenizedText.map((token, index) => {
			return {
				text: token,
				last: index === (tokenizedText.length - 1),
			};
		});
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
					exceededText = TextArea.i18nBundle.getText(TEXTAREA_CHARACTERS_LEFT, leftCharactersCount);
				} else {
					exceededText = TextArea.i18nBundle.getText(TEXTAREA_CHARACTERS_EXCEEDED, Math.abs(leftCharactersCount));
				}
			}
		} else {
			calcedMaxLength = this.maxlength;
		}

		return {
			exceededText, leftCharactersCount, calcedMaxLength,
		};
	}

	get classes() {
		return {
			root: {
				"ui5-textarea-root": true,
				"ui5-content-custom-scrollbars": !!getEffectiveScrollbarStyle(),
			},
			valueStateMsg: {
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		return {
			valueStateMsgPopover: {
				"max-width": `${this._width!}px`,
			},
		};
	}

	get tabIndex() {
		return this.disabled ? -1 : 0;
	}

	get ariaLabelText() {
		const effectiveAriaLabelText = getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this);

		if (this.showExceededText) {
			if (effectiveAriaLabelText) {
				return effectiveAriaLabelText.concat(" ", this._exceededTextProps.exceededText!);
			}

			return this._exceededTextProps.exceededText;
		}

		return effectiveAriaLabelText;
	}

	get ariaDescribedBy() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : undefined;
	}

	get ariaValueStateHiddenText() {
		if (!this.hasValueState) {
			return;
		}

		if (this.valueState === ValueState.None) {
			return;
		}

		if (this.hasCustomValueState) {
			return `${this.valueStateTypeMappings[this.valueState]}`.concat(" ", this.valueStateMessageText.map(el => el.textContent).join(" "));
		}

		return `${this.valueStateTypeMappings[this.valueState]} ${this.valueStateDefaultText}`;
	}

	get valueStateDefaultText() {
		if (this.valueState !== ValueState.None) {
			return this.valueStateTextMappings[this.valueState];
		}

		return "";
	}

	get ariaInvalid() {
		return this.valueState === "Error" ? "true" : null;
	}

	get openValueStateMsgPopover() {
		return !this._firstRendering && this._openValueStateMsgPopover && this.displayValueStateMessagePopover;
	}

	get displayValueStateMessagePopover() {
		return !this.readonly && (this.hasCustomValueState || this.hasValueState);
	}

	get hasCustomValueState() {
		return !!this.valueStateMessage.length && this.hasValueState;
	}

	get hasValueState() {
		return this.valueState === ValueState.Error || this.valueState === ValueState.Warning || this.valueState === ValueState.Information;
	}

	get valueStateMessageText() {
		return this.valueStateMessage.map(x => x.cloneNode(true));
	}

	get _valueStatePopoverHorizontalAlign() {
		return this.effectiveDir !== "rtl" ? "Left" : "Right";
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageIcon() {
		const iconPerValueState = {
			Error: "error",
			Warning: "alert",
			Success: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	get valueStateTextMappings() {
		return {
			"Success": TextArea.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": TextArea.i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Error": TextArea.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": TextArea.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get valueStateTypeMappings() {
		return {
			"Success": TextArea.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			"Information": TextArea.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			"Error": TextArea.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			"Warning": TextArea.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}
}

TextArea.define();

export default TextArea;
