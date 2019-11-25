import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getLastTabbableElement } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { isTabNext } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import ListMode from "./types/ListMode.js";
import ListSeparators from "./types/ListSeparators.js";
import ListItemType from "./types/ListItemType.js";

// Template
import ListTemplate from "./generated/templates/ListTemplate.lit.js";

// Styles
import listCss from "./generated/themes/List.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-list",
	slots: /** @lends sap.ui.webcomponents.main.List.prototype */ {

		/**
		 * Defines the <code>ui5-li</code> header.
		 * <b>Note:</b> When <code>header</code> is set, the
		 * <code>headerText</code> property is ignored.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Defines the items of the <code>ui5-list</code>.
		 * <br><b>Note:</b> Use <code>ui5-li</code>, <code>ui5-li-custom</code> and <code>ui5-li-groupheader</code> for the intended design.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.List.prototype */ {

		/**
		 * Defines the <code>ui5-list</code> header text.
		 * <br><br>
		 * <b>Note:</b> If <code>header</code> is set this property is ignored.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		headerText: {
			type: String,
		},

		/**
		 * Defines the footer text.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		footerText: {
			type: String,
		},

		/**
		 * Determines whether the list items are indented.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		inset: {
			type: Boolean,
		},

		/**
		 * Defines the mode of the <code>ui5-list</code>.
		 * <br><br>
		 * <b>Note:</b> Avalaible options are <code>None</code>, <code>SingleSelect</code>,
		 * <code>MultiSelect</code>, and <code>Delete</code>.
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		mode: {
			type: ListMode,
			defaultValue: ListMode.None,
		},

		/**
		 * Defines the text that is displayed when the <code>ui5-list</code> contains no items.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		noDataText: {
			type: String,
		},

		/**
		 * Defines the item separator style that is used.
		 * <br><br>
		 * <b>Notes:</b>
		 * <ul>
		 * <li>Avalaible options are <code>All</code>, <code>Inner</code>, and <code>None</code>.</li>
		 * <li>When set to <code>None</code>, none of the items is separated by horizontal lines.</li>
		 * <li>When set to <code>Inner</code>, the first item doesn't have a top separator and the last
		 * item doesn't have a bottom separator.</li>
		 * </ul>
		 *
		 * @type {string}
		 * @defaultvalue "All"
		 * @public
		 */
		separators: {
			type: ListSeparators,
			defaultValue: ListSeparators.All,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.List.prototype */ {

		/**
		 * Fired when an item is activated, unless the item's <code>type</code> property
		 * is set to <code>Inactive</code>.
		 *
		 * @event
		 * @param {HTMLElement} item the clicked item.
		 * @public
		 */
		itemClick: {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the Delete button of any item is pressed.
		 * <br><br>
		 * <b>Note:</b> A Delete button is displayed on each item,
		 * when the <code>ui5-list</code> <code>mode</code> property is set to <code>Delete</code>.
		 * @event
		 * @param {HTMLElement} item the deleted item.
		 * @public
		 */
		itemDelete: {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when selection is changed by user interaction
		 * in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
		 *
		 * @event
		 * @param {Array} selectedItems an array of the selected items.
		 * @param {Array} previouslySelectedItems an array of the previously selected items.
		 * @public
		 */
		selectionChange: {
			detail: {
				selectedItems: { type: Array },
				previouslySelectedItems: { type: Array },
				selectionComponentPressed: { type: Boolean }, // protected, indicates if the user used the selection components to change the selection
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title"> Overview </h3>
 *
 * The <code>ui5-list</code> component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 * <br><br>
 * The <code>ui5-list</code> is а container for the available list items:
 * <ul>
 * <li><code>ui5-li</code></li>
 * <li><code>ui5-li-custom</code></li>
 * <li><code>ui5-li-group-header</code></li>
 * </ul>
 * <br><br>
 * To benefit from the built-in selection mechanism, you can use the available
 * selection modes, such as
 * <code>SingleSelect</code>, <code>MultiSelect</code> and <code>Delete</code>.
 * <br><br>
 * Additionally, the <code>ui5-list</code> provides header, footer, and customization for the list item separators.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/List.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/StandardListItem.js";</code> (for <code>ui5-li</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/CustomListItem.js";</code> (for <code>ui5-li-custom</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/GroupHeaderListItem.js";</code> (for <code>ui5-li-group-header</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.List
 * @extends UI5Element
 * @tagname ui5-list
 * @appenddocs StandardListItem CustomListItem GroupHeaderListItem
 * @public
 */
class List extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return ListTemplate;
	}

	static get styles() {
		return listCss;
	}

	constructor() {
		super();
		this.initItemNavigation();

		// Stores the last focused item within the internal ul element.
		this._previouslyFocusedItem = null;

		// Indicates that the List is forwarding the focus before or after the internal ul.
		this._forwardingFocus = false;

		this._previouslySelectedItem = null;

		this.addEventListener("ui5-_press", this.onItemPress.bind(this));
		this.addEventListener("ui5-_focused", this.onItemFocused.bind(this));
		this.addEventListener("ui5-_forwardAfter", this.onForwardAfter.bind(this));
		this.addEventListener("ui5-_forwardBefore", this.onForwardBefore.bind(this));
		this.addEventListener("ui5-_selectionRequested", this.onSelectionRequested.bind(this));
	}

	onBeforeRendering() {
		this.prepareListItems();
	}

	initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this);
		this._itemNavigation.getItemsCallback = () => this.getSlottedNodes("items");
	}

	prepareListItems() {
		const slottedItems = this.getSlottedNodes("items");

		slottedItems.forEach((item, key) => {
			const isLastChild = key === slottedItems.length - 1;
			const showBottomBorder = this.separators === ListSeparators.All
				|| (this.separators === ListSeparators.Inner && !isLastChild);

			item._mode = this.mode;
			item.hasBorder = showBottomBorder;
		});

		this._previouslySelectedItem = null;
	}

	/*
	* ITEM SELECTION BASED ON THE CURRENT MODE
	*/
	onSelectionRequested(event) {
		const previouslySelectedItems = this.getSelectedItems();
		let selectionChange = false;
		this._selectionRequested = true;

		if (this[`handle${this.mode}`]) {
			selectionChange = this[`handle${this.mode}`](event.detail.item, event.detail.selected);
		}

		if (selectionChange) {
			this.fireEvent("selectionChange", {
				selectedItems: this.getSelectedItems(),
				previouslySelectedItems,
				selectionComponentPressed: event.detail.selectionComponentPressed,
				key: event.detail.key,
			});
		}
	}

	handleSingleSelect(item) {
		if (item.selected) {
			return false;
		}

		this.deselectSelectedItems();
		item.selected = true;

		return true;
	}

	handleSingleSelectBegin(item) {
		return this.handleSingleSelect(item);
	}

	handleSingleSelectEnd(item) {
		return this.handleSingleSelect(item);
	}

	handleMultiSelect(item, selected) {
		item.selected = selected;
		return true;
	}

	handleDelete(item) {
		this.fireEvent("itemDelete", { item });
	}

	deselectSelectedItems() {
		this.getSelectedItems().forEach(item => { item.selected = false; });
	}

	getSelectedItems() {
		return this.getSlottedNodes("items").filter(item => item.selected);
	}

	getFirstSelectedItem() {
		const slottedItems = this.getSlottedNodes("items");
		let firstSelectedItem = null;

		for (let i = 0; i < slottedItems.length; i++) {
			if (slottedItems[i].selected) {
				firstSelectedItem = slottedItems[i];
				break;
			}
		}

		return firstSelectedItem;
	}

	_onkeydown(event) {
		if (isTabNext(event)) {
			this._handleTabNext(event);
		}
	}

	/*
	* KEYBOARD SUPPORT
	*/
	_handleTabNext(event) {
		// If forward navigation is performed, we check if the List has headerToolbar.
		// If yes - we check if the target is at the last tabbable element of the headerToolbar
		// to forward correctly the focus to the selected, previously focused or to the first list item.
		let lastTabbableEl;
		const target = this.getNormalizedTarget(event.target);

		if (this.headerToolbar) {
			lastTabbableEl = this.getHeaderToolbarLastTabbableElement();
		}

		if (!lastTabbableEl) {
			return;
		}

		if (lastTabbableEl === target) {
			if (this.getFirstSelectedItem()) {
				this.focusFirstSelectedItem();
			} else if (this.getPreviouslyFocusedItem()) {
				this.focusPreviouslyFocusedItem();
			} else {
				this.focusFirstItem();
			}

			event.stopImmediatePropagation();
			event.preventDefault();
		}
	}

	_onfocusin(event) {
		// If the focusin event does not origin from one of the 'triggers' - ignore it.
		if (!this.isForwardElement(this.getNormalizedTarget(event.target))) {
			event.stopImmediatePropagation();
			return;
		}

		// The focus arrives in the List for the first time.
		// If there is selected item - focus it or focus the first item.
		if (!this.getPreviouslyFocusedItem()) {
			if (this.getFirstSelectedItem()) {
				this.focusFirstSelectedItem();
			} else {
				this.focusFirstItem();
			}

			event.stopImmediatePropagation();
			return;
		}

		// The focus returns to the List,
		// focus the first selected item or the previously focused element.
		if (!this.getForwardingFocus()) {
			if (this.getFirstSelectedItem()) {
				this.focusFirstSelectedItem();
			} else {
				this.focusPreviouslyFocusedItem();
			}
		}

		this.setForwardingFocus(false);
	}

	isForwardElement(node) {
		const nodeId = node.id;

		if (this._id === nodeId || this.getBeforeElement().id === nodeId) {
			return true;
		}

		return this.getAfterElement().id === nodeId;
	}

	onItemFocused(event) {
		const target = event.target;

		this._itemNavigation.update(target);
		this.fireEvent("itemFocused", { item: target });
	}

	onItemPress(event) {
		const pressedItem = event.detail.item;

		if (pressedItem.type === ListItemType.Active) {
			this.fireEvent("itemPress", { item: pressedItem });
			this.fireEvent("itemClick", { item: pressedItem });
		}

		if (!this._selectionRequested && this.mode !== ListMode.Delete) {
			this._selectionRequested = true;
			this.onSelectionRequested({
				detail: {
					item: pressedItem,
					selectionComponentPressed: false,
					selected: !pressedItem.selected,
					key: event.detail.key,
				},
			});
		}

		this._selectionRequested = false;
	}

	onForwardBefore(event) {
		this.setPreviouslyFocusedItem(event.target);
		this.focusBeforeElement();
	}

	onForwardAfter(event) {
		this.setPreviouslyFocusedItem(event.target);
		this.focusAfterElement();
	}

	focusBeforeElement() {
		this.setForwardingFocus(true);
		this.getBeforeElement().focus();
	}

	focusAfterElement() {
		this.setForwardingFocus(true);
		this.getAfterElement().focus();
	}

	focusFirstItem() {
		const firstItem = this.getFirstItem();

		if (firstItem) {
			firstItem.focus();
		}
	}

	focusPreviouslyFocusedItem() {
		const previouslyFocusedItem = this.getPreviouslyFocusedItem();

		if (previouslyFocusedItem) {
			previouslyFocusedItem.focus();
		}
	}

	focusFirstSelectedItem() {
		const firstSelectedItem = this.getFirstSelectedItem();

		if (firstSelectedItem) {
			firstSelectedItem.focus();
		}
	}

	setForwardingFocus(forwardingFocus) {
		this._forwardingFocus = forwardingFocus;
	}

	getForwardingFocus() {
		return this._forwardingFocus;
	}

	setPreviouslyFocusedItem(item) {
		this._previouslyFocusedItem = item;
	}

	getPreviouslyFocusedItem() {
		return this._previouslyFocusedItem;
	}

	getFirstItem() {
		const slottedItems = this.getSlottedNodes("items");
		return !!slottedItems.length && slottedItems[0];
	}

	getAfterElement() {
		if (!this._afterElement) {
			this._afterElement = this.shadowRoot.querySelector(`#${this._id}-after`);
		}
		return this._afterElement;
	}

	getBeforeElement() {
		if (!this._beforeElement) {
			this._beforeElement = this.shadowRoot.querySelector(`#${this._id}-before`);
		}
		return this._beforeElement;
	}

	getHeaderToolbarLastTabbableElement() {
		return getLastTabbableElement(this.headerToolbar.getDomRef()) || this.headerToolbar.getDomRef();
	}

	getNormalizedTarget(target) {
		let focused = target;

		if (target.shadowRoot && target.shadowRoot.activeElement) {
			focused = target.shadowRoot.activeElement;
		}

		return focused;
	}

	get shouldRenderH1() {
		return !this.header.length && this.headerText;
	}

	get showNoDataText() {
		return this.items.length === 0 && this.noDataText;
	}
}

List.define();

export default List;
