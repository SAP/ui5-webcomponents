import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

import TextAreaTemplate from "./generated/templates/TextAreaTemplate.lit.js";
import TextAreaPopoverTemplate from "./generated/templates/TextAreaPopoverTemplate.lit.js";

import {
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	TEXTAREA_CHARACTERS_LEFT,
	TEXTAREA_CHARACTERS_EXCEEDED,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/TextArea.css.js";
import valueStateMessageStyles from "./generated/themes/ValueStateMessage.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-textarea",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.TextArea.prototype */ {
		/**
		 * Defines the value of the Web Component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Indicates whether the user can interact with the component or not.
		 * <br><br>
		 * <b>Note:</b> Disabled components cannot be focused and they are out of the tab chain.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines whether the <code>ui5-textarea</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-textarea</code> is not editable,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines whether the <code>ui5-textarea</code> is required.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.3
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the component has no value.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-textarea</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
		 * <br><br>
		 * <b>Note:</b> If <code>maxlength</code> property is set,
		 * the component turns into "Warning" state once the characters exceeds the limit.
		 * In this case, only the "Error" state is considered and can be applied.
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @since 1.0.0-rc.7
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines the number of visible text lines for the component.
		 * <br><br>
		 * <b>Notes:</b>
		 * <ul>
		 * <li>If the <code>growing</code> property is enabled, this property defines the minimum rows to be displayed
		 * in the textarea.</li>
		 * <li>The CSS <code>height</code> property wins over the <code>rows</code> property, if both are set.</li>
		 * </ul>
		 *
		 * @type {number}
		 * @defaultvalue 0
		 * @public
		 */
		rows: {
			type: Integer,
			defaultValue: 0,
		},

		/**
		 * Defines the maximum number of characters that the <code>value</code> can have.
		 *
		 * @type {number}
		 * @defaultValue null
		 * @public
		 */
		maxlength: {
			type: Integer,
			defaultValue: null,
		},

		/**
		 * Determines whether the characters exceeding the maximum allowed character count are visible
		 * in the <code>ui5-textarea</code>.
		 * <br><br>
		 * If set to <code>false</code>, the user is not allowed to enter more characters than what is set in the
		 * <code>maxlength</code> property.
		 * If set to <code>true</code> the characters exceeding the <code>maxlength</code> value are selected on
		 * paste and the counter below the <code>ui5-textarea</code> displays their number.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showExceededText: {
			type: Boolean,
		},

		/**
		 * Enables the <code>ui5-textarea</code> to automatically grow and shrink dynamically with its content.
		 * <br><br>
		 * <b>Note:</b> If set to <code>true</code>, the CSS <code>height</code> property is ignored.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		growing: {
			type: Boolean,
		},

		/**
		 * Defines the maximum number of lines that the Web Component can grow.
		 *
		 * @type {number}
		 * @defaultvalue 0
		 * @public
		 */
		growingMaxLines: {
			type: Integer,
			defaultValue: 0,
		},

		/**
		 * Determines the name with which the <code>ui5-textarea</code> will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-textarea</code> so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		exceeding: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_mirrorText: {
			type: Object,
			multiple: true,
			defaultValue: "",
		},

		/**
		 * @private
		 */
		_maxHeight: {
			type: String,
			noAttribute: true,
		},

		/**
		 * @private
		 */
		_width: {
			type: Integer,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.TextArea.prototype */ {

		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-textarea</code>.
		 *
		 * <br><br>
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 *
		 * <br><br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed if the <code>ui5-textarea</code> has
		 * <code>valueState</code> of type <code>Information</code>, <code>Warning</code> or <code>Error</code>.
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.7
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TextArea.prototype */ {
		/**
		 * Fired when the text has changed and the focus leaves the <code>ui5-textarea</code>.
		 *
		 * @event
		 * @public
		 */
		change: {},

		/**
		 * Fired when the value of the <code>ui5-textarea</code> changes at each keystroke or when
		 * something is pasted.
		 *
		 * @event
		 * @since 1.0.0-rc.5
		 * @public
		 */
		input: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-textarea</code> component provides large spaces for text
 * entries in the form of multiple rows.
 * It has the functionality of the <code>TextField</code> with the additional
 * functionality for multiline texts.
 * <br><br>
 * When empty, it can hold a placeholder similar to a <code>ui5-input</code>.
 * You can define the rows of the <code>ui5-textarea</code> and also determine specific behavior when handling long texts.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/TextArea";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TextArea
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-textarea
 * @public
 */
class TextArea extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TextAreaTemplate;
	}

	static get staticAreaTemplate() {
		return TextAreaPopoverTemplate;
	}

	static get staticAreaStyles() {
		return valueStateMessageStyles;
	}

	constructor() {
		super();

		this._firstRendering = true;
		this._openValueStateMsgPopover = false;
		this._fnOnResize = this._onResize.bind(this);
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._fnOnResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._fnOnResize);
	}

	onBeforeRendering() {
		this._exceededTextProps = this._calcExceededText();
		this._mirrorText = this._tokenizeText(this.value);

		this.exceeding = this._exceededTextProps.leftCharactersCount < 0;

		if (this.growingMaxLines) {
			// this should be complex calc between line height and paddings - TODO: make it stable
			this._maxHeight = `${this.growingMaxLines * 1.4 * 14 + 9}px`;
		}

		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	onAfterRendering() {
		this.toggleValueStateMessage(this.openValueStateMsgPopover);
		this._firstRendering = false;
	}

	getInputDomRef() {
		return this.getDomRef().querySelector("textarea");
	}

	_onkeydown() {
		this._keyDown = true;
	}

	_onkeyup() {
		this._keyDown = false;
	}

	_onfocusin() {
		this.focused = true;
		this._openValueStateMsgPopover = true;
	}

	_onfocusout() {
		this.focused = false;
		this._openValueStateMsgPopover = false;
	}

	_onchange() {
		this.fireEvent("change", {});
	}

	_oninput(event) {
		const nativeTextarea = this.getInputDomRef();

		/* skip calling change event when an textarea with a placeholder is focused on IE
			- value of the host and the internal textarea should be different in case of actual input
			- input is called when a key is pressed => keyup should not be called yet
		*/
		const skipFiring = (this.getInputDomRef().value === this.value) && isIE() && !this._keyDown && !!this.placeholder;
		if (event.target === nativeTextarea) {
			// stop the native event, as the semantic "input" would be fired.
			event.stopImmediatePropagation();
		}

		if (skipFiring) {
			return;
		}

		this.value = nativeTextarea.value;
		this.fireEvent("input", {});

		// Angular two way data binding
		this.fireEvent("value-changed");
	}

	_onResize() {
		if (this.displayValueStateMessagePopover) {
			this._width = this.offsetWidth;
		}
	}

	toggleValueStateMessage(toggle) {
		if (toggle) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	async openPopover() {
		this.popover = await this._getPopover();
		this.popover && this.popover.openBy(this.shadowRoot.querySelector(".ui5-textarea-inner"));
	}

	async closePopover() {
		this.popover = await this._getPopover();
		this.popover && this.popover.close(false, false, true);
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("ui5-popover");
	}

	_tokenizeText(value) {
		const tokenizedText = value.replace(/&/gm, "&amp;").replace(/"/gm, "&quot;").replace(/"/gm, "&#39;").replace(/</gm, "&lt;")
			.replace(/>/gm, "&gt;")
			.split("\n");

		if (tokenizedText.length < this.rows) {
			return this._mapTokenizedTextToObject([...tokenizedText, ...Array(this.rows - tokenizedText.length).fill("")]);
		}

		return this._mapTokenizedTextToObject(tokenizedText);
	}

	_mapTokenizedTextToObject(tokenizedText) {
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
			const maxLength = this.maxlength || 0;

			if (maxLength) {
				leftCharactersCount = maxLength - this.value.length;

				if (leftCharactersCount >= 0) {
					exceededText = this.i18nBundle.getText(TEXTAREA_CHARACTERS_LEFT, [leftCharactersCount]);
				} else {
					exceededText = this.i18nBundle.getText(TEXTAREA_CHARACTERS_EXCEEDED, [Math.abs(leftCharactersCount)]);
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
			valueStateMsg: {
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning || this.exceeding,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		const lineHeight = 1.4 * 16;

		return {
			mirror: {
				"max-height": this._maxHeight,
			},
			main: {
				width: "100%",
				height: (this.rows && !this.growing) ? `${this.rows * lineHeight}px` : "100%",
			},
			focusDiv: {
				"height": (this.showExceededText ? "calc(100% - 26px)" : "100%"),
				"max-height": (this._maxHeight),
			},
			valueStateMsgPopover: {
				"max-width": `${this._width}px`,
			},
		};
	}

	get tabIndex() {
		return this.disabled ? undefined : "0";
	}

	get ariaLabelledBy() {
		return this.showExceededText ? `${this._id}-exceededText` : undefined;
	}

	get ariaInvalid() {
		return this.valueState === "Error" ? "true" : undefined;
	}

	get openValueStateMsgPopover() {
		return !this._firstRendering && this._openValueStateMsgPopover && this.displayValueStateMessagePopover;
	}

	get displayValueStateMessagePopover() {
		return this.hasCustomValueState || this.hasValueState || this.exceeding;
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

	get valueStateText() {
		if (this.valueState !== ValueState.Error && this.exceeding) {
			return this.valueStateTextMappings()[ValueState.Warning];
		}

		return this.valueStateTextMappings()[this.valueState];
	}

	valueStateTextMappings() {
		const i18nBundle = this.i18nBundle;

		return {
			"Information": i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Error": i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

TextArea.define();

export default TextArea;
