import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import getEffectiveAriaLabelText from "@ui5/webcomponents-base/dist/util/getEffectiveAriaLabelText.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/icons/decline.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isBackSpace, isDelete, isShow } from "@ui5/webcomponents-base/dist/Keys.js";
import * as Filters from "./ComboBoxFilters.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	INPUT_SUGGESTIONS_TITLE,
	ICON_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import ComboBoxTemplate from "./generated/templates/ComboBoxTemplate.lit.js";
import ComboBoxPopoverTemplate from "./generated/templates/ComboBoxPopoverTemplate.lit.js";

// Styles
import ComboBoxCss from "./generated/themes/ComboBox.css.js";
import ComboBoxPopoverCss from "./generated/themes/ComboBoxPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

import ComboBoxItem from "./ComboBoxItem.js";
import Icon from "./Icon.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import BusyIndicator from "./BusyIndicator.js";
import Button from "./Button.js";
import StandardListItem from "./StandardListItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-combobox",
	languageAware: true,
	defaultSlot: "items",
	properties: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Defines the value of the <code>ui5-combobox</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the "live" value of the <code>ui5-combobox</code>.
		 * <br><br>
		 * <b>Note:</b> The property is updated upon typing.
		 *
		 * <br><br>
		 * <b>Note:</b> Initially the filter value is synced with value.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		filterValue: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the
		 * <code>ui5-combobox</code> has no value.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines whether <code>ui5-combobox</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-combobox</code> is completely uninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the value state of the <code>ui5-combobox</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
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
		 * Defines whether the <code>ui5-combobox</code> is readonly.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-combobox</code> is not editable,
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
		 * Defines whether the <code>ui5-combobox</code> is required.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Indicates whether a loading indicator should be shown in the picker.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		loading: {
			type: Boolean,
		},

		/**
		 * Defines the filter type of the <code>ui5-combobox</code>.
		 * Available options are: <code>StartsWithPerTerm</code>, <code>StartsWith</code> and <code>Contains</code>.
		 *
		 * @type {string}
		 * @defaultvalue "StartsWithPerTerm"
		 * @public
		 */
		filter: {
			type: String,
			defaultValue: "StartsWithPerTerm",
		},

		/**
		 * Indicates whether the input is focssed
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * Defines the aria-label attribute for the combo box
		 * @type {String}
		 * @defaultvalue: ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabel: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Receives id(or many ids) of the elements that label the combo box
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
		},

		_iconPressed: {
			type: Boolean,
			noAttribute: true,
		},

		_tempValue: {
			type: String,
			defaultValue: "",
		},

		_filteredItems: {
			type: Object,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Defines the <code>ui5-combobox</code> items.
		 * <br><br>
		 * Example: <br>
		 * &lt;ui5-combobox><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #1&lt;/ui5-li><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #2&lt;/ui5-li><br>
		 * &lt;/ui5-combobox>
		 * <br> <br>
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			listenFor: { include: ["*"] },
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ComboBox.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter, focusout or an item is selected.
		 *
		 * @event
		 * @public
		 */
		change: {},

		/**
		 * Fired when typing in input.
		 * <br><br>
		 * <b>Note:</b> filterValue property is updated, input is changed.
		 * @event
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
 * The <code>ui5-combobox</code> component represents a drop-down menu with a list of the available options and a text input field to narrow down the options.
 *
 * It is commonly used to enable users to select one or more options from a predefined list.
 * <h3>Structure</h3>
 * The <code>ui5-combobox</code> consists of the following elements:
 * <ul>
 * <li> Input field - displays the selected option or a custom user entry. Users can type to narrow down the list or enter their own value.
 * <li> Drop-down arrow - expands\collapses the option list.</li>
 * <li> Option list - the list of available options.</li>
 * </ul>
 * <h3>Keyboard Handling</h3>
 *
 * The <code>ui5-combobox</code> provides advanced keyboard handling.
 *
 * <h4>Picker</h4>
 * If the <code>ui5-combobox</code> is focused,
 * you can open or close the drop-down by pressing <code>F4</code>, <code>ALT+UP</code> or <code>ALT+DOWN</code> keys.
 * <br>
 *
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/ComboBox";</code>
 *
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBox
 * @extends UI5Element
 * @tagname ui5-combobox
 * @appenddocs ComboBoxItem
 * @public
 * @since 1.0.0-rc.6
 */
class ComboBox extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ComboBoxCss;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ComboBoxPopoverCss];
	}

	static get template() {
		return ComboBoxTemplate;
	}

	static get staticAreaTemplate() {
		return ComboBoxPopoverTemplate;
	}

	constructor(props) {
		super(props);

		this._filteredItems = [];
		this._initialRendering = true;
		this._itemFocused = false;
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		let domValue;

		if (this._initialRendering) {
			domValue = this.value;
			this._filteredItems = this.items;
		} else {
			domValue = this.filterValue;
		}

		if (this._autocomplete && domValue !== "") {
			this._autoCompleteValue(domValue);
		} else {
			this._tempValue = domValue;
		}

		if (!this._initialRendering && this.popover && document.activeElement === this && !this._filteredItems.length) {
			this.popover.close();
		}

		this._selectMatchingItem();
		this._initialRendering = false;
	}

	async onAfterRendering() {
		await this._respPopover();
		if (isPhone() && this.responsivePopover.opened) {
			// Set initial focus to the native input
			this.inner.focus();
		}

		if (this.shouldClosePopover()) {
			this.responsivePopover.close(false, false, true);
		}

		this._itemFocused = false;
	}

	shouldClosePopover() {
		return this.responsivePopover.opened && !this.focused && !this._itemFocused;
	}

	_focusin(event) {
		this.focused = true;

		if (this.filterValue !== this.value) {
			this.filterValue = this.value;
		}

		event.target.setSelectionRange(0, this.value.length);
	}

	_focusout() {
		this.focused = false;
	}

	_afterOpenPopover() {
		this._iconPressed = true;
	}

	_afterClosePopover() {
		this._iconPressed = false;

		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
		}
	}

	_toggleRespPopover() {
		if (this.responsivePopover.opened) {
			this._closeRespPopover();
		} else {
			this._openRespPopover();
		}
	}

	_resetFilter() {
		this._filteredItems = this._filterItems("");
		this._selectMatchingItem();
	}

	_arrowClick() {
		this.inner.focus();
		this._resetFilter();

		this._toggleRespPopover();
	}

	_input(event) {
		const { value } = event.target;

		if (event.target === this.inner) {
			// stop the native event, as the semantic "input" would be fired.
			event.stopImmediatePropagation();
		}

		this.filterValue = value;
		this.fireEvent("input");

		this._filteredItems = this._filterItems(value);

		if (!this._filteredItems.length) {
			this._closeRespPopover();
		} else {
			this._openRespPopover();
		}
	}

	_startsWithMatchingItems(str) {
		return Filters.StartsWith(str, this._filteredItems);
	}

	_keydown(event) {
		this._autocomplete = !(isBackSpace(event) || isDelete(event));

		if (isShow(event) && !this.readonly && !this.disabled) {
			event.preventDefault();
			this._resetFilter();
			this._toggleRespPopover();
		}
	}

	_click(event) {
		if (isPhone() && !this.readonly) {
			this._openRespPopover();
		}
	}

	_closeRespPopover() {
		this.responsivePopover.close();
	}

	_openRespPopover() {
		this.updateStaticAreaItemContentDensity();
		this.responsivePopover.open(this);
	}

	_filterItems(str) {
		return (Filters[this.filter] || Filters.StartsWithPerTerm)(str, this.items);
	}

	_autoCompleteValue(current) {
		const currentValue = current;
		const matchingItems = this._startsWithMatchingItems(currentValue);

		if (matchingItems.length) {
			this._tempValue = matchingItems[0] ? matchingItems[0].text : current;
		} else {
			this._tempValue = current;
		}

		if (matchingItems.length && (currentValue !== this._tempValue)) {
			setTimeout(() => {
				this.inner.setSelectionRange(currentValue.length, this._tempValue.length);
			}, 0);
		}
	}

	_selectMatchingItem() {
		this._filteredItems = this._filteredItems.map(item => {
			item.selected = (item.text === this._tempValue);

			return item;
		});
	}

	_inputChange() {
		if (this.value !== this._tempValue) {
			this.value = this._tempValue;
			this.fireEvent("change");
			this.inner.setSelectionRange(this.value.length, this.value.length);
		}

		this._closeRespPopover();
	}

	_selectItem(event) {
		const listItem = event.detail.item;

		this._tempValue = listItem.mappedItem.text;
		this.filterValue = this._tempValue;

		this._filteredItems.map(item => {
			item.selected = (item === listItem.mappedItem);

			return item;
		});

		this._inputChange();
	}

	_onItemFocus(event) {
		this._itemFocused = true;
	}

	get _headerTitleText() {
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get _iconAccessibleNameText() {
		return this.i18nBundle.getText(ICON_ACCESSIBLE_NAME);
	}

	get inner() {
		return isPhone() ? this.responsivePopover.querySelector(".ui5-input-inner-phone") : this.shadowRoot.querySelector("[inner-input]");
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("ui5-responsive-popover");
		return this.responsivePopover;
	}

	get editable() {
		return !this.readonly;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get valueStateText() {
		return this.valueStateTextMappings[this.valueState];
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : undefined;
	}

	get valueStateTextMappings() {
		return {
			"Success": this.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Error": this.i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": this.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get open() {
		return this.responsivePopover ? this.responsivePopover.opened : false;
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	static async onDefine() {
		await Promise.all([
			ComboBoxItem.define(),
			Icon.define(),
			ResponsivePopover.define(),
			List.define(),
			BusyIndicator.define(),
			Button.define(),
			StandardListItem.define(),
		]);
	}
}

ComboBox.define();

export default ComboBox;
