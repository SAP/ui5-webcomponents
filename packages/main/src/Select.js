import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isSpace,
	isUp,
	isDown,
	isEnter,
	isEscape,
	isShow,
} from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-down.js";
import Label from "./Label.js";
import Popover from "./Popover.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";

// Template
import SelectTemplate from "./generated/templates/SelectTemplate.lit.js";

// Styles
import selectCss from "./generated/themes/Select.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-select",
	slots: /** @lends sap.ui.webcomponents.main.Select.prototype */ {

		/**
		 * Defines the <code>ui5-select</code> options.
		 * <br><br>
		 * <b>Note:</b> Only one selected option is allowed.
		 * If more than one option is defined as selected, the last one would be considered as the selected one.
		 * <br><br>
		 * <b>Note:</b> Use the <code>ui5-option</code> component to define the desired options.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "options",
			type: HTMLElement,
			listenFor: { include: ["*"] },
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Select.prototype */  {

		/**
		 * Defines whether <code>ui5-select</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-select</code> is noninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines the name with which the <code>ui5-select</code> will be submitted in an HTML form.
		 * The value of the <code>ui5-select</code> will be the value of the currently selected <code>ui5-option</code>.
		 *
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-select</code> so that it can be submitted as
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
		 * Defines the value state of <code>ui5-select</code>.
		 * Available options are: <code>None</code>, <code>Success</code>, <code>Warning</code> and <code>Error</code>.
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		_text: {
			type: String,
			noAttribute: true,
		},

		_iconPressed: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * @private
		 */
		opened: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Select.prototype */ {
		/**
		 * Fired when the selected item changes.
		 *
		 * @event
		 * @param {HTMLElement} item the selected item.
		 * @public
		 */
		change: {
			detail: {
				selectedOption: {},
			},
		},
	},
};

/**
 * @class
 *
 * The <code>ui5-select</code> component is used to create a drop-down list.
 * The items inside the <code>ui5-select</code> define the available options by using the <code>ui5-option</code> component.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-select</code> provides advanced keyboard handling.
 * If the <code>ui5-select</code> is focused,
 * you can open or close the drop-down by pressing <code>F4</code>, <code>ALT+UP</code> or <code>ALT+DOWN</code> keys.
 * Once the drop-down is opened, you can use the <code>UP</code> and <code>DOWN</code> arrow keys
 * to navigate through the available options and select one by pressing the <code>Space</code> or <code>Enter</code> keys.
 * <br>
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/Select";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/Option";</code>
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Select
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-select
 * @appenddocs Option
 * @public
 * @since 0.8.0
 */
class Select extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return SelectTemplate;
	}

	static get styles() {
		return selectCss;
	}

	constructor() {
		super();

		this._syncedOptions = [];
		this._selectedIndex = -1;
		this._selectedIndexBeforeOpen = -1;
		this._escapePressed = false;
		this._lastSelectedOption = null;
	}

	onBeforeRendering() {
		this._syncSelection();
		this._enableFormSupport();
	}

	_onfocusin() {
		this.focused = true;
	}

	_onfocusout() {
		this.focused = false;
	}

	get _isPickerOpen() {
		const popover = this.shadowRoot.querySelector("#ui5-select--popover");

		return popover && popover.opened;
	}

	/**
	 * Currently selected option
	 * @readonly
	 * @type { ui5-option }
	 * @public
	 */
	get selectedOption() {
		return this.options.find(option => option.selected);
	}

	_togglePopover() {
		const popover = this.shadowRoot.querySelector("#ui5-select--popover");

		if (this.disabled) {
			return;
		}

		if (this._isPickerOpen) {
			popover.close();
		} else {
			popover.openBy(this);
		}
	}

	_syncSelection() {
		let lastSelectedOptionIndex = -1;
		const opts = this.options.map((opt, index) => {
			if (opt.selected) {
				lastSelectedOptionIndex = index;
			}

			opt.selected = false;

			return {
				selected: false,
				icon: opt.icon,
				value: opt.value,
				textContent: opt.textContent,
				id: opt._id,
			};
		});

		if (lastSelectedOptionIndex > -1) {
			opts[lastSelectedOptionIndex].selected = true;
			this.options[lastSelectedOptionIndex].selected = true;
			this._text = opts[lastSelectedOptionIndex].textContent;
			this._selectedIndex = lastSelectedOptionIndex;
		} else {
			this._text = "";
			this._selectedIndex = -1;
		}

		if (lastSelectedOptionIndex === -1 && opts[0]) {
			opts[0].selected = true;
			this.options[0].selected = true;
			this._selectedIndex = 0;
			this._text = this.options[0].textContent;
		}

		this._syncedOptions = opts;
	}

	_enableFormSupport() {
		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
				nativeInput.disabled = element.disabled;
				nativeInput.value = element._currentlySelectedOption.value;
			});
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_onkeydown(event) {
		if (isShow(event)) {
			this._togglePopover();
		}

		if (!this._isPickerOpen) {
			this._handleArrowNavigation(event, true);
		}
	}

	_onkeyup(event) {
		if (isSpace(event) && !this._isPickerOpen) {
			this._togglePopover();
		}
	}

	_getSelectedItemIndex(item) {
		return [].indexOf.call(item.parentElement.children, item);
	}

	_select(index) {
		this.options[this._selectedIndex].selected = false;
		this._selectedIndex = index;
		this.options[index].selected = true;
	}

	_selectionChange(event) {
		const selectedItemIndex = this._getSelectedItemIndex(event.detail.item);

		this._select(selectedItemIndex);
		this._togglePopover();
	}

	_applyFocusAfterOpen() {
		this._toggleIcon();

		if (!this._currentlySelectedOption) {
			return;
		}

		const li = this.shadowRoot.querySelector(`#${this._currentlySelectedOption._id}-li`);

		li.parentElement._itemNavigation.currentIndex = this._selectedIndex;
		li && li.focus();
	}

	_handlePickerKeydown(event) {
		this._handleArrowNavigation(event, false);
	}

	_handleArrowNavigation(event, shouldFireEvent) {
		let nextIndex = -1;
		const isDownKey = isDown(event);
		const isUpKey = isUp(event);

		if (isDownKey || isUpKey) {
			event.preventDefault();
			if (isDownKey) {
				nextIndex = this._getNextOptionIndex();
			} else {
				nextIndex = this._getPreviousOptionIndex();
			}

			this.options[this._selectedIndex].selected = false;
			this.options[nextIndex].selected = true;
			this._selectedIndex = nextIndex === -1 ? this._selectedIndex : nextIndex;

			if (shouldFireEvent) {
				this.fireEvent("change", { selectedOption: this.options[nextIndex] });
			}
		}

		if (isEscape(event)) {
			this._escapePressed = true;
		}

		if (isEnter(event) || isSpace(event)) {
			this._shouldClosePopover = true;
		}
	}

	_getNextOptionIndex() {
		return this._selectedIndex === (this.options.length - 1) ? 0 : (this._selectedIndex + 1);
	}

	_getPreviousOptionIndex() {
		return this._selectedIndex === 0 ? (this.options.length - 1) : (this._selectedIndex - 1);
	}

	_beforeOpen() {
		this._selectedIndexBeforeOpen = this._selectedIndex;
		this._lastSelectedOption = this.options[this._selectedIndex];
	}

	_afterClose() {
		this._toggleIcon();

		if (this._escapePressed) {
			this._select(this._selectedIndexBeforeOpen);
			this._escapePressed = false;
		} else if (this._lastSelectedOption !== this.options[this._selectedIndex]) {
			this.fireEvent("change", { selectedOption: this.options[this._selectedIndex] });
			this._lastSelectedOption = this.options[this._selectedIndex];
		}
	}

	_toggleIcon() {
		this._iconPressed = !this._iconPressed;
	}

	get _currentSelectedItem() {
		return this.shadowRoot.querySelector(`#${this.options[this._selectedIndex]._id}-li`);
	}

	get _currentlySelectedOption() {
		return this.options[this._selectedIndex];
	}

	get tabIndex() {
		return this.disabled ? "-1" : "0";
	}

	get dir() {
		return getRTL() ? "rtl" : "ltr";
	}

	static async define(...params) {
		await Promise.all([
			Label.define(),
			Popover.define(),
			List.define(),
			StandardListItem.define(),
			Icon.define(),
		]);

		super.define(...params);
	}
}

Select.define();

export default Select;
