import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isBackSpace, isDelete, isShow } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import * as Filters from "./ComboBoxFilters.js";

// Styles
import ComboBoxTemplate from "./generated/templates/ComboBoxTemplate.lit.js";
import ComboBoxCss from "./generated/themes/ComboBox.css.js";
import ComboBoxItem from "./ComboBoxItem.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import List from "./List.js";

const metadata = {
	tag: "ui5-combobox",
	defaultSlot: "items",
	properties: {
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
		 * Available options are: <code>None</code>, <code>Success</code>, <code>Warning</code>, and <code>Error</code>.
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
		 * @since 1.0.0-rc.5
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Indicates whether a loading indicator should be shown in the picker
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
	slots: {
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
	events: {
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

	static get template() {
		return ComboBoxTemplate;
	}

	constructor(props) {
		super(props);

		this._filteredItems = [];
		this._initialRendering = true;
	}

	onBeforeRendering() {
		const domValue = this._initialRendering ? this.value : this.filterValue;

		this._filteredItems = this._filterItems(domValue);

		if (this._autocomplete && domValue !== "") {
			this._autoCompleteValue(domValue);
		} else {
			this._tempValue = domValue;
		}

		this._selectMatchingItem();
		this._initialRendering = false;
	}

	onAfterRendering() {
		this._width = this.getBoundingClientRect().width;
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
	}

	_togglePopover() {
		if (this.popover.opened) {
			this.popover.close();
		} else {
			this.popover.openBy(this);
		}
	}

	_resetFilter() {
		this._filteredItems = this._filterItems("");
		this._selectMatchingItem();
	}

	_arrowClick() {
		this.inner.focus();
		this._resetFilter();

		this._togglePopover();
	}

	_input(event) {
		const { value } = event.target;

		this.filterValue = value;
		this.fireEvent("input");

		this.popover.openBy(this);
	}

	_startsWithMatchingItems(str) {
		return Filters.StartsWith(str, this._filteredItems);
	}

	_keydown(event) {
		this._autocomplete = !(isBackSpace(event) || isDelete(event));

		if (isShow(event) && !this.readonly && !this.disabled) {
			event.preventDefault();
			this._resetFilter();
			this._togglePopover();
		}
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

		if (matchingItems.length) {
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
	}

	_selectItem(event) {
		const listItem = event.detail.item;

		this._tempValue = listItem.mappedItem.text;

		this._filteredItems.map(item => {
			item.selected = (item === listItem.mappedItem);

			return item;
		});

		this._inputChange();
		this.popover.close();
	}

	get styles() {
		return {
			popover: {
				"min-width": `${this._width}px`,
			},
		};
	}

	get _filteredItems() {
		return !this.items.length ? [] : this.items.filter(item => {
			return item.text.toLowerCase().startsWith(this.value.toLowerCase());
		});
	}

	get inner() {
		return this.shadowRoot.querySelector("[inner-input]");
	}

	get popover() {
		return this.shadowRoot.querySelector(".ui5-combobox-popover");
	}

	get editable() {
		return !this.readonly;
	}

	static async define(...params) {
		await Promise.all([
			ComboBoxItem.define(),
			Icon.define(),
			Popover.define(),
			List.define(),
		]);

		super.define(...params);
	}
}

ComboBox.define();

export default ComboBox;
