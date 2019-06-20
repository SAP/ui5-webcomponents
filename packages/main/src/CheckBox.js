import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import ValueState from "@ui5/webcomponents-base/src/types/ValueState.js";
import { getCompactSize } from "@ui5/webcomponents-base/src/Configuration.js";
import { getFeature } from "@ui5/webcomponents-base/src/FeaturesRegistry.js";
import getEffectiveRTL from "@ui5/webcomponents-base/src/util/getEffectiveRTL.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import CheckBoxTemplate from "./build/compiled/CheckBoxTemplate.lit.js";
import Label from "./Label.js";

// Styles
import checkboxCss from "./themes/CheckBox.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-checkbox",
	properties: /** @lends sap.ui.webcomponents.main.CheckBox.prototype */ {

		/**
		 * Defines whether the <code>ui5-checkbox</code> is disabled.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-checkbox</code> is completely uninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines whether the <code>ui5-checkbox</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A red-only <code>ui5-checkbox</code> is not editable,
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
		 * Defines if the <code>ui5-checkbox</code> is checked.
		 * <br><br>
		 * <b>Note:</b> The property can be changed with user interaction,
		 * either by cliking/tapping on the <code>ui5-checkbox</code>, or by
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
		 * Defines the text of the <code>ui5-checkbox</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-checkbox</code>.
		 * <br><br>
		 * <b>Note:</b> Available options are <code>Warning</code>, <code>Error</code>, and <code>None</code> (default).
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines whether the <code>ui5-checkbox</code> text wraps when there is not enough space.
		 * <br><br>
		 * <b>Note:</b> By default, the text truncates when there is not enough space.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		wrap: {
			type: Boolean,
		},

		/**
		 * Determines the name with which the <code>ui5-checkbox</code> will be submitted in an HTML form.
		 *
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/InputElementsFormSupport.js";</code>
		 *
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-checkbox</code> so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		_label: {
			type: Object,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.CheckBox.prototype */ {

		/**
		 * Fired when the <code>ui5-checkbox</code> checked state changes.
		 *
		 * @public
		 * @event
		 */
		change: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 * <br/><br/>
 * The <code>ui5-checkbox</code> component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the <code>ui5-checkbox</code>, the user has to click or tap the square
 * box or its label.
 * <br/><br/>
 * Clicking or tapping toggles the <code>ui5-checkbox</code> between checked and unchecked state.
 * The <code>ui5-checkbox</code> component only has 2 states - checked and unchecked.
 *
 * <h3>Usage</h3>
 *
 * You can manually set the width of the element containing the box and the label using the <code>width</code> property.
 * If the text exceeds the available width, it is truncated.
 * The touchable area for toggling the <code>ui5-checkbox</code> ends where the text ends.
 * <br><br>
 * You can disable the <code>ui5-checkbox</code> by setting the <code>disabled</code> property to
 * <code>true</code>,
 * or use the <code>ui5-checkbox</code> in read-only mode by setting the <code>readonly</code>
 * property to <code>true</code>.
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
		this._label = {};
	}

	onBeforeRendering() {
		this.syncLabel();

		this._enableFormSupport();
	}

	syncLabel() {
		this._label = Object.assign({}, this._label);
		this._label.text = this.text;
		this._label.wrap = this.wrap;
		this._label.textDirection = this.textDirection;
	}

	_enableFormSupport() {
		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
				nativeInput.disabled = element.disabled || !element.checked;
				nativeInput.value = element.checked ? "on" : "";
			});
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	onclick() {
		this.toggle();
	}

	onkeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
		}

		if (isEnter(event)) {
			this.toggle();
		}
	}

	onkeyup(event) {
		if (isSpace(event)) {
			this.toggle();
		}
	}

	toggle() {
		if (this.canToggle()) {
			this.checked = !this.checked;
			this.fireEvent("change");
		}
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readonly);
	}

	get classes() {
		return {
			main: {
				"ui5-checkbox-wrapper": true,
				"ui5-checkbox-with-label": !!this.text,
				"ui5-checkbox--disabled": this.disabled,
				"ui5-checkbox--readonly": this.readonly,
				"ui5-checkbox--error": this.valueState === "Error",
				"ui5-checkbox--warning": this.valueState === "Warning",
				"ui5-checkbox--wrap": this.wrap,
				"ui5-checkbox--hoverable": !this.disabled && !this.readonly && isDesktop(),
				"sapUiSizeCompact": getCompactSize(),
			},
			inner: {
				"ui5-checkbox-inner": true,
				"ui5-checkbox-inner-mark": true,
				"ui5-checkbox-inner--checked": !!this.checked,
			},
		};
	}

	get ariaReadonly() {
		return this.readonly ? "true" : undefined;
	}

	get ariaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get tabIndex() {
		return this.disabled ? undefined : "0";
	}

	get rtl() {
		return getEffectiveRTL() ? "rtl" : undefined;
	}

	static async define(...params) {
		await Label.define();

		super.define(...params);
	}
}

CheckBox.define();

export default CheckBox;
