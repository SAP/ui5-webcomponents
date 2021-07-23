import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	isSpace,
	isEnter,
	isDown,
	isLeft,
	isUp,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Label from "./Label.js";
import RadioButtonGroup from "./RadioButtonGroup.js";
import WrappingType from "./types/WrappingType.js";

// Template
import RadioButtonTemplate from "./generated/templates/RadioButtonTemplate.lit.js";

// i18n
import { VALUE_STATE_ERROR, VALUE_STATE_WARNING } from "./generated/i18n/i18n-defaults.js";

// Styles
import radioButtonCss from "./generated/themes/RadioButton.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-radio-button",
	altTag: "ui5-radiobutton",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.RadioButton.prototype */ {

		/**
		 * Defines whether the component is disabled.
		 * <br><br>
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
		 * <br><br>
		 * <b>Note:</b> A read-only component is not editable,
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
		 * Defines whether the component is checked or not.
		 * <br><br>
		 * <b>Note:</b> The property value can be changed with user interaction,
		 * either by clicking/tapping on the component,
		 * or by using the Space or Enter key.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.15
		 */
		checked: {
			type: Boolean,
		},

		/**
		 * Defines the text of the component.
		 *
		 * @type  {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the value state of the component.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * </ul>
		 *
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			defaultValue: ValueState.None,
			type: ValueState,
		},

		/**
		 * Defines the name of the component.
		 * Radio buttons with the same <code>name</code> will form a radio button group.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 * The selection can be changed with <code>ARROW_UP/DOWN</code> and <code>ARROW_LEFT/RIGHT</code> keys between radio buttons in same group.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 * Only one radio button can be selected per group.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect when submitting forms, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the component so that it can be submitted as
		 * part of an HTML form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Defines the form value of the component.
		 * When a form with a radio button group is submitted, the group's value
		 * will be the value of the currently selected radio button.
		 * <br>
		 * <b>Important:</b> For the <code>value</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Defines whether the component text wraps when there is not enough space.
		 * <br><br>
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

		_tabIndex: {
			type: String,
			defaultValue: "-1",
			noAttribute: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.RadioButton.prototype */ {
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
	events: /** @lends sap.ui.webcomponents.main.RadioButton.prototype */ {

		/**
		 * Fired when the component checked state changes.
		 *
		 * @event
		 * @public
		 * @since 1.0.0-rc.15
		 */
		change: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-radio-button</code> component enables users to select a single option from a set of options.
 * When a <code>ui5-radio-button</code> is selected by the user, the
 * <code>change</code> event is fired.
 * When a <code>ui5-radio-button</code> that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the <code>name</code> property.
 * <br>
 * <b>Note:</b> If <code>ui5-radio-button</code> is not part of a group, it can be selected once, but can not be deselected back.
 *
 * <h3>Keyboard Handling</h3>
 *
 * Once the <code>ui5-radio-button</code> is on focus, it might be selected by pressing the Space and Enter keys.
 * <br>
 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
 * <br>
 * <b>Note:</b> On entering radio button group, the focus goes to the currently selected radio button.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/RadioButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.RadioButton
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-radio-button
 * @public
 */
class RadioButton extends UI5Element {
	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return RadioButtonTemplate;
	}

	static get styles() {
		return radioButtonCss;
	}

	static get dependencies() {
		return [Label];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this.syncGroup();

		this._enableFormSupport();
	}

	syncGroup() {
		const oldGroup = this._name;
		const currentGroup = this.name;
		const oldChecked = this._checked;
		const currentChecked = this.checked;

		if (currentGroup !== oldGroup) {
			if (oldGroup) {
				// remove the control from the previous group
				RadioButtonGroup.removeFromGroup(this, oldGroup);
			}

			if (currentGroup) {
				// add the control to the existing group
				RadioButtonGroup.addToGroup(this, currentGroup);
			}
		} else if (currentGroup) {
			RadioButtonGroup.enforceSingleSelection(this, currentGroup);
		}

		if (this.name && currentChecked !== oldChecked) {
			RadioButtonGroup.updateTabOrder(this.name);
		}

		this._name = this.name;
		this._checked = this.checked;
	}

	_enableFormSupport() {
		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
				nativeInput.disabled = element.disabled || !element.checked;
				nativeInput.value = element.checked ? element.value : "";
			});
		} else if (this.value) {
			console.warn(`In order for the "value" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_onclick() {
		return this.toggle();
	}

	_handleDown(event) {
		const currentGroup = this.name;

		if (!currentGroup) {
			return;
		}

		event.preventDefault();
		RadioButtonGroup.selectNextItem(this, currentGroup);
	}

	_handleUp(event) {
		const currentGroup = this.name;

		if (!currentGroup) {
			return;
		}

		event.preventDefault();
		RadioButtonGroup.selectPreviousItem(this, currentGroup);
	}

	_onkeydown(event) {
		if (isSpace(event)) {
			return event.preventDefault();
		}

		if (isEnter(event)) {
			return this.toggle();
		}

		if (isDown(event) || isRight(event)) {
			this._handleDown(event);
		}

		if (isUp(event) || isLeft(event)) {
			this._handleUp(event);
		}
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this.toggle();
		}
	}

	toggle() {
		if (!this.canToggle()) {
			return this;
		}

		if (!this.name) {
			this.checked = !this.checked;
			this.fireEvent("change");
			return this;
		}

		RadioButtonGroup.selectItem(this, this.name);
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readonly || this.checked);
	}

	valueStateTextMappings() {
		const i18nBundle = this.i18nBundle;

		return {
			"Error": i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get classes() {
		return {
			main: {},
			inner: {
				"ui5-radio-inner--hoverable": !this.disabled && !this.readonly && isDesktop(),
			},
		};
	}

	get ariaReadonly() {
		return this.readonly ? "true" : undefined;
	}

	get ariaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get ariaLabelledBy() {
		return this.text ? `${this._id}-label` : undefined;
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

		if (this.disabled) {
			return "-1";
		}

		if (this.name) {
			return this._tabIndex;
		}

		return tabindex || "0";
	}

	get strokeWidth() {
		return this.valueState === "None" ? "1" : "2";
	}
}

RadioButton.define();

export default RadioButton;
