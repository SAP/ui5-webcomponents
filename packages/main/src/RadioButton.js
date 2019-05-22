import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js";
import ValueState from "@ui5/webcomponents-base/src/types/ValueState.js";
import {
	isSpace,
	isEnter,
	isDown,
	isLeft,
	isUp,
	isRight,
} from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import RadioButtonGroup from "./RadioButtonGroup.js";
// Template
import RadioButtonRenderer from "./build/compiled/RadioButtonRenderer.lit.js";
import RadioButtonTemplateContext from "./RadioButtonTemplateContext.js";

// Styles
import radioButtonCss from "./themes/RadioButton.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-radiobutton",
	properties: /** @lends sap.ui.webcomponents.main.RadioButton.prototype */  {

		/**
		 * Determines whether the <code>ui5-radiobutton</code> is disabled.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-radiobutton</code> is completely uninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-radiobutton</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-radiobutton</code> is not editable,
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
		 * Determines whether the <code>ui5-radiobutton</code> is selected or not.
		 * <br><br>
		 * <b>Note:</b> The property value can be changed with user interaction,
		 * either by cliking/tapping on the <code>ui5-radiobutton</code>,
		 * or by using the Space or Enter key.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines the text of the <code>ui5-radiobutton</code>.
		 *
		 * @type  {string}
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-radiobutton</code>.
		 * Available options are <code>Warning</code>, <code>Error</code>, and
		 * <code>None</code> (by default).
		 * <br><br>
		 * <b>Note:</b> Using the value states affects the visual appearance of
		 * the <code>ui5-radiobutton</code>.
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			defaultValue: ValueState.None,
			type: ValueState,
		},

		/**
		 * Defines the name of the <code>ui5-radiobutton</code>.
		 * Radio buttons with the same <code>name</code> will form a radio button group.
		 * <br/><b>Note:</b>
		 * The selection can be changed with <code>ARROW_UP/DOWN</code> and <code>ARROW_LEFT/RIGHT</code> keys between radios in same group.
		 * <br/><b>Note:</b>
		 * Only one radio button can be selected per group.
		 *
		 * <b>Important:</b> For the <code>name</code> property to have effect when submitting forms, you must add the following import to your project:
		 * <code>import InputElementsFormSupport from "@ui5/webcomponents/dist/InputElementsFormSupport";</code>
		 *
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-radiobutton</code> so that it can be submitted as
		 * part of an HTML form.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Defines the form value of the <code>ui5-radiobutton</code>.
		 * When a form with a radio button group is submitted, the group's value
		 * will be the value of the currently selected radio button.
		 *
		 * <b>Important:</b> For the <code>value</code> property to have effect, you must add the following import to your project:
		 * <code>import InputElementsFormSupport from "@ui5/webcomponents/dist/InputElementsFormSupport";</code>
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		value: {
			type: String,
		},

		_label: {
			type: Object,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.RadioButton.prototype */ {

		/**
		 * Fired when the <code>ui5-radiobutton</code> selected state changes.
		 *
		 * @event
		 * @public
		 */
		select: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-radibutton</code> component enables users to select a single option from a set of options.
 * When a <code>ui5-radiobutton</code> is selected by the user, the
 * <code>select</code> event is fired.
 * When a <code>ui5-radiobutton</code> that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the <code>name</code> property.
 *
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/RadioButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.RadioButton
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-radiobutton
 * @public
 */
class RadioButton extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return RadioButtonRenderer;
	}

	static get styles() {
		return radioButtonCss;
	}

	constructor() {
		super();
		this._label = {};
	}

	onBeforeRendering() {
		this.syncLabel();
		this.syncGroup();

		this._enableFormSupport();
	}

	syncLabel() {
		this._label = Object.assign({}, this._label);
		this._label.text = this.text;
	}

	syncGroup() {
		const oldGroup = this._name;
		const currentGroup = this.name;

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

		this._name = this.name;
	}

	_enableFormSupport() {
		if (RadioButton.FormSupport) {
			RadioButton.FormSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
				nativeInput.disabled = element.disabled || !element.selected;
				nativeInput.value = element.selected ? element.value : "";
			});
		} else if (this.value) {
			console.warn(`In order for the "value" property to have effect, you should also: import InputElementsFormSupport from "@ui5/webcomponents/dist/InputElementsFormSupport";`); // eslint-disable-line
		}
	}

	onclick() {
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

	onkeydown(event) {
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

	onkeyup(event) {
		if (event.keyCode === KeyCodes.SPACE) {
			this.toggle();
		}
	}

	toggle() {
		if (!this.canToggle()) {
			return this;
		}

		if (!this.name) {
			this.selected = !this.selected;
			this.fireEvent("select");
			return this;
		}

		RadioButtonGroup.selectItem(this, this.name);
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readonly || this.selected);
	}

	static get calculateTemplateContext() {
		return RadioButtonTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	RadioButton.define();
});

export default RadioButton;
