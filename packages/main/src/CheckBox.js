import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import Icon from "./Icon.js";
import Label from "./Label.js";
import WrappingType from "./types/WrappingType.js";
import {
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_SUCCESS,
} from "./generated/i18n/i18n-defaults.js";

// Template
import CheckBoxTemplate from "./generated/templates/CheckBoxTemplate.lit.js";

// Styles
import checkboxCss from "./generated/themes/CheckBox.css.js";

let isGlobalHandlerAttached = false;
let activeCb = null;

/**
 * @public
 */
const metadata = {
	tag: "ui5-checkbox",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.CheckBox.prototype */ {

		/**
		 * Receives id(or many ids) of the elements that label the component
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.1.0
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the accessible ARIA name of the component.
		 *
		 * @type {string}
		 * @public
		 * @defaultvalue ""
		 * @since 1.1.0
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Defines whether the component is disabled.
		 * <br /><br />
		 * <b>Note:</b> A disabled component is completely noninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines whether the component is read-only.
		 * <br /><br />
		 * <b>Note:</b> A red-only component is not editable,
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
		 * Defines whether the component is required.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.3.0
		 */
		required: {
			type: Boolean,
		},

		/**
		* Defines whether the component is displayed as partially checked.
		* <br/><br/>
		* <b>Note:</b> The indeterminate state can be set only programmatically and can’t be achieved by user
		* interaction and the resulting visual state depends on the values of the <code>indeterminate</code>
		* and <code>checked</code> properties:
		* <ul>
		* <li> If the component is checked and indeterminate, it will be displayed as partially checked
		* <li> If the component is checked and it is not indeterminate, it will be displayed as checked
		* <li> If the component is not checked, it will be displayed as not checked regardless value of the indeterminate attribute
		* </ul>
		*
		* @type {boolean}
		* @defaultvalue false
		* @public
		* @since 1.0.0-rc.15
		*/
		indeterminate: {
			type: Boolean,
		},

		/**
		 * Defines if the component is checked.
		 * <br /><br />
		 * <b>Note:</b> The property can be changed with user interaction,
		 * either by cliking/tapping on the component, or by
		 * pressing the Enter or Space key.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		checked: {
			type: Boolean,
		},

		/**
		 * Defines the text of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the value state of the component.
		 *
		 * <br /><br />
		 * <b>Note:</b>
		 *
		 * <ul>
		 * <li><code>Warning</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>None</code>(default)</li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
		 *
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines whether the component text wraps when there is not enough space.
		 * <br /><br />
		 * Available options are:
		 * <ul>
		 * <li><code>None</code> - The text will be truncated with an ellipsis.</li>
		 * <li><code>Normal</code> - The text will wrap. The words will not be broken based on hyphenation.</li>
		 * </ul>
		 *
		 * @type {WrappingType}
		 * @defaultvalue "None"
		 * @public
		 */
		 wrappingType: {
			type: WrappingType,
			defaultValue: WrappingType.None,
		},

		/**
		 * Determines the name with which the component will be submitted in an HTML form.
		 *
		 * <br /><br />
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br /><br />
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the component so that it can be submitted as
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
		 * Defines the active state (pressed or not) of the component.
		 * @private
		 */
		active: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.CheckBox.prototype */ {

		/**
		 * Fired when the component checked state changes.
		 *
		 * @public
		 * @event
		 */
		change: {},
	},
	slots: /** @lends sap.ui.webcomponents.main.CheckBox.prototype */ {
		/**
		 * The slot is used to render native <code>input</code> HTML element within Light DOM to enable form submit,
		 * when <code>name</code> property is set.
		 * @type {HTMLElement[]}
		 * @slot
		 * @private
		 */
		formSupport: {
			type: HTMLElement,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 * <br /><br />
 * The <code>ui5-checkbox</code> component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the <code>ui5-checkbox</code>, the user has to click or tap the square
 * box or its label.
 * <br /><br />
 * The <code>ui5-checkbox</code> component only has 2 states - checked and unchecked.
 * Clicking or tapping toggles the <code>ui5-checkbox</code> between checked and unchecked state.
 *
 * <h3>Usage</h3>
 *
 * You can define the checkbox text with via the <code>text</code> property. If the text exceeds the available width, it is truncated by default.
 * In case you prefer text to wrap, set the <code>wrappingType</code> property to "Normal".
 * The touchable area for toggling the <code>ui5-checkbox</code> ends where the text ends.
 * <br /><br />
 * You can disable the <code>ui5-checkbox</code> by setting the <code>disabled</code> property to
 * <code>true</code>,
 * or use the <code>ui5-checkbox</code> in read-only mode by setting the <code>readonly</code>
 * property to <code>true</code>.
 *
 * <br /><br />
 * <h3>Keyboard Handling</h3>
 *
 * The user can use the following keyboard shortcuts to toggle the checked state of the <code>ui5-checkbox</code>.
 * <ul>
 * <li>[SPACE, ENTER] - Toggles between different states: checked, not checked.</li>
 * </ul>
 * <br /><br />
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CheckBox";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CheckBox
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-checkbox
 * @public
 */
class CheckBox extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return CheckBoxTemplate;
	}

	static get styles() {
		return checkboxCss;
	}

	constructor() {
		super();

		this._deactivate = () => {
			if (activeCb) {
				activeCb.active = false;
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);
			isGlobalHandlerAttached = true;
		}
	}

	onBeforeRendering() {
		this._enableFormSupport();
	}

	_enableFormSupport() {
		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
				nativeInput.disabled = element.disabled || !element.checked;
				nativeInput.value = element.checked ? "on" : "";
			});
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_onclick() {
		this.toggle();
	}

	_onmousedown() {
		if (this.readonly || this.disabled) {
			return;
		}

		this.active = true;
		activeCb = this; // eslint-disable-line
	}

	_onmouseup() {
		this.active = false;
	}

	_onfocusout() {
		this.active = false;
	}

	_onkeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
			this.active = true;
		}

		if (isEnter(event)) {
			this.toggle();
			this.active = true;
		}
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this.toggle();
		}

		this.active = false;
	}

	toggle() {
		if (this.canToggle()) {
			if (this.indeterminate) {
				this.indeterminate = false;
				this.checked = true;
			} else {
				this.checked = !this.checked;
			}

			this.fireEvent("change");
			// Angular two way data binding
			this.fireEvent("value-changed");
		}
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readonly);
	}

	valueStateTextMappings() {
		return {
			"Error": CheckBox.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": CheckBox.i18nBundle.getText(VALUE_STATE_WARNING),
			"Success": CheckBox.i18nBundle.getText(VALUE_STATE_SUCCESS),
		};
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get classes() {
		return {
			main: {
				"ui5-checkbox--hoverable": !this.disabled && !this.readonly && isDesktop(),
			},
		};
	}

	get ariaReadonly() {
		return this.readonly ? "true" : undefined;
	}

	get ariaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get ariaChecked() {
		return this.indeterminate && this.checked ? "mixed" : this.checked;
	}

	get ariaLabelledBy() {
		if (!this.ariaLabelText) {
			return this.text ? `${this._id}-label` : undefined;
		}

		return undefined;
	}

	get ariaDescribedBy() {
		return this.hasValueState ? `${this._id}-descr` : undefined;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get valueStateText() {
		return this.valueStateTextMappings()[this.valueState];
	}

	get tabIndex() {
		const tabindex = this.getAttribute("tabindex");
		return this.disabled ? undefined : tabindex || "0";
	}

	get isCompletelyChecked() {
		return this.checked && !this.indeterminate;
	}

	static get dependencies() {
		return [
			Label,
			Icon,
		];
	}

	static async onDefine() {
		CheckBox.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

CheckBox.define();

export default CheckBox;
