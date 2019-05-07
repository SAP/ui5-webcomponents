import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import {
	isSpace,
	isUp,
	isDown,
	isEnter,
	isEscape,
} from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js";
import ValueState from "@ui5/webcomponents-base/src/types/ValueState.js";
import Function from "@ui5/webcomponents-base/src/types/Function.js";
import Suggestions from "./Suggestions.js";
import StandardListItem from "./StandardListItem.js";
import Option from "./Option.js";

// Template
import SelectRenderer from "./build/compiled/SelectRenderer.lit.js";
import SelectTemplateContext from "./SelectTemplateContext.js";

// Styles
import selectCss from "./themes/Select.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-select",
	defaultSlot: "options",
	slots: /** @lends sap.ui.webcomponents.main.Select.prototype */ {

		/**
		 * Defines the <code>ui5-select</code> options.
		 * <br/><br/>
		 * <b>Note:</b> Only one selected option is allowed.
		 * If more than one option is defined as selected, the last one would be considered as the selected one.
		 * <br/><br/>
		 * <b>Note:</b> Use the <code>ui5-option</code> component to define the desired options.
		 * @type {Option[]}
		 * @slot
		 * @public
		 */
		options: {
			type: Option,
			multiple: true,
			listenFor: { include: ["*"] },
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Select.prototype */  {

		/**
		 * Defines whether <code>ui5-select</code> is in disabled state.
		 * </br></br>
		 * <b>Note:</b> A disabled <code>ui5-select</code> is noninteractive.
		 *
		 * @type {boolean}
		 * @public
		 */
		disabled: {
			type: Boolean,
			defaultValue: false,
		},

		/**
		 * Defines the value state of <code>ui5-select</code>.
		 * Available options are: <code>None</code>, <code>Success</code>, <code>Warning</code> and <code>Error</code>.
		 *
		 * @type {string}
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		_text: {
			type: String,
			defaultValue: "",
		},

		_previewedItem: {
			type: Object,
			defaultValue: null,
		},

		_selectedItem: {
			type: Object,
			defaultValue: null,
		},

		_opened: {
			type: Boolean,
			defaultValue: false,
		},

		_focused: {
			type: Boolean,
			defaultValue: false,
		},

		_fnClickSelectBox: {
			type: Function,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Select.prototype */ {
		/**
		 * Fired when the selected option changes.
		 *
		 * @event
		 * @param {HTMLElement} option the selected option.
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
 * <h3 class="comment-api-title"> Overview </h3>
 *
 * The <code>ui5-select</code> component is used to create a drop-down list.
 * You can define the available options by using the <code>ui5-option</code> component.
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
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Select
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-input
 * @public
 * @since 0.8.0
 */
class Select extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return SelectRenderer;
	}

	static get calculateTemplateContext() {
		return SelectTemplateContext.calculate;
	}

	static get styles() {
		return selectCss;
	}

	constructor() {
		super();

		this._closing = false; // Flag for handling open/close on space
		this._selectedItemBeforeOpen = null; // Stores the selected item before opening the picker
		this._escapePressed = false; // Identifies if the escape is pressed when picker is open

		this.Suggestions = new Suggestions(this, true /* move focus with arrow keys */);
		this._fnClickSelectBox = this.toggleList.bind(this);
	}

	onBeforeRendering() {
		console.log('select -> onBeforeRendering');
		//this._validateSelection();
		this._setText();
	}

	_setText() {
		// If there is a previewed item, use its text
		if (this._previewedItem) {
			this._text = this._previewedItem.textContent;
			return;
		}

		// If there is a selected item, use its text
		if (this._selectedItem) {
			this._text = this._selectedItem.textContent;
			return;
		}

		this.options.forEach(option => {
			if (option.selected) {
				this._text = option.textContent;
			}
		}, this);
	}

	/* Event handling */
	toggleList() {
		if (this.disabled) {
			return;
		}

		this.Suggestions.toggle();
	}

	onkeydown(event) {
		if (this.disabled) {
			return;
		}

		if (isUp(event)) {
			this.Suggestions.onUp(event);
			this._changeSelectionWhileClosed();
		}

		if (isDown(event)) {
			this.Suggestions.onDown(event);
			this._changeSelectionWhileClosed();
		}

		if (isSpace(event)) {
			if (!this._isOpened()) {
				this._closing = true;
				return event.preventDefault();
			}
			this._closing = false;
			return this.Suggestions.onSpace(event);
		}

		if (isEnter(event)) {
			this.Suggestions.onEnter(event);
		}

		if (isEscape(event) && this._opened && this._selectedItemBeforeOpen) {
			this.getSuggestionItems().forEach(item => {
				item.selected = false;
			});

			this._select(this._selectedItemBeforeOpen, this.getSuggestionItems().indexOf(this._selectedItemBeforeOpen));
			this._escapePressed = true;
		}

		const key = event.which;

		if (key === KeyCodes.F4 || (event.altKey && Select.ARROWS.includes(key))) {
			event.preventDefault();
			this.Suggestions.toggle();
		}
	}

	onkeyup(event) {
		if (isSpace(event)) {
			return this.Suggestions.toggle(this._closing); // Open Suggestions
		}
	}

	onfocusin(event) {
		this._focused = true; // invalidating property
	}

	onfocusout(event) {
		this._focused = false; // invalidating property
	}

	/* Suggestions Interface methods */

	getSuggestionItems() {
		return [...this.shadowRoot.querySelectorAll("ui5-li")];
	}

	/*
	_listItemToOption(listItem) {
		let matchingOption;
		this.items.forEach(option => {
			if (option._id === listItem.id) {
				matchingOption = option;
			}
		});
		return matchingOption;
	}
	*/

	onItemFocused() {}

	onItemSelected(item) {
		console.log("onItemSelected", item);
		if (this._selectedItem === item) {
			return;
		}

		this._select(item);
	}

	onItemPreviewed(item) {
		console.log("onItemPreviewed", item);
		this._previewedItem = item;
	}

	onOpen() {
		this._opened = true; // invalidating property

		const selectedItem = this._selectedItem;

		if (selectedItem) {
			this._selectedItemBeforeOpen = selectedItem;
			selectedItem.focus();
		}
	}

	onClose() {
		this._opened = false; // invalidating property

		if ((this._selectedItem !== this._selectedItemBeforeOpen) && !this._escapePressed) {
			const previewedItem = this._selectedItem;
			this._fireChange(previewedItem);
		}

		this._escapePressed = false;
	}

	/* Private methods */
	_validateSelection() {
		if (this._isOpened() || !this.getSuggestionItems().length) {
			return;
		}

		let selectedItem = null;
		let selectedItemPos = null;

		this.getSuggestionItems().forEach((item, idx) => {
			if (item.selected) {
				if (selectedItem) {
					selectedItem.selected = false;
				}
				selectedItem = item;
				selectedItemPos = idx;
			}
		});

		if (!selectedItem) {
			selectedItem = this.getSuggestionItems()[0];
			selectedItemPos = 0;
		}

		if (this._selectedItem !== selectedItem) {
			this._select(selectedItem, selectedItemPos);
		}
	}

	_isSelectionChanged() {
		const previewedItem = this._previewedItem;
		const selectedItem = this._selectedItem;

		return previewedItem && selectedItem !== previewedItem;
	}

	_select(item, position) {
		this._selectedItem = item;
		this._previewedItem = null;

		if (position !== undefined) {
			this._updateSelectedItemPos(position);
		}
		this._syncOptions();
	}

	_changeSelectionWhileClosed() {
		if (this.getSuggestionItems().length > 1 && !this._opened) {
			this._select(this._previewedItem);
			this._fireChange(this._selectedItem);
		}
	}

	_updateSelectedItemPos(position) {
		this.Suggestions.updateSelectedItemPosition(position);
	}

	_isOpened() {
		return this.Suggestions.isOpened();
	}

	_fireChange(item) {
		this.fireEvent("change", { selectedItem: item });
	}

	_syncOptions() {
		this.options.forEach(option => {
			option.selected = option._id === this._selectedItem.id;
		}, this);
	}

	static async define(...params) {
		await Promise.all([
			Option.define(),
			StandardListItem.define(),
		]);

		super.define(...params);
	}
}

Select.ARROWS = [KeyCodes.ARROW_DOWN, KeyCodes.ARROW_UP];

Bootstrap.boot().then(_ => {
	Select.define();
});

export default Select;
