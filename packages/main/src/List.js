import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getLastTabbableElement } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { isTabNext } from "@ui5/webcomponents-base/dist/Keys.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import ListMode from "./types/ListMode.js";
import ListSeparators from "./types/ListSeparators.js";
import BusyIndicator from "./BusyIndicator.js";

// Template
import ListTemplate from "./generated/templates/ListTemplate.lit.js";

// Styles
import listCss from "./generated/themes/List.css.js";

const BUSYINDICATOR_HEIGHT = 48; // px
const INFINITE_SCROLL_DEBOUNCE_RATE = 250; // ms

/**
 * @public
 */
const metadata = {
	tag: "ui5-list",
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.List.prototype */ {

		/**
		 * Defines the <code>ui5-list</code> header.
		 * <br><br>
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
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-li</code>, <code>ui5-li-custom</code>, and <code>ui5-li-groupheader</code> for the intended design.
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
		 * @defaultvalue ""
		 * @public
		 */
		headerText: {
			type: String,
		},

		/**
		 * Defines the footer text.
		 *
		 * @type {string}
		 * @defaultvalue ""
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
		 * <b>Note:</b> Available options are <code>None</code>, <code>SingleSelect</code>, <code>SingleSelectBegin</code>,
		 * <code>SingleSelectEnd</code>, <code>MultiSelect</code>, and <code>Delete</code>.
		 *
		 * @type {ListMode}
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
		 * @defaultvalue ""
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
		 * <li>When set to <code>None</code>, none of the items are separated by horizontal lines.</li>
		 * <li>When set to <code>Inner</code>, the first item doesn't have a top separator and the last
		 * item doesn't have a bottom separator.</li>
		 * </ul>
		 *
		 * @type {ListSeparators}
		 * @defaultvalue "All"
		 * @public
		 */
		separators: {
			type: ListSeparators,
			defaultValue: ListSeparators.All,
		},

		/**
		 * Defines if the component would fire the <code>load-more</code> event
		 * when the user scrolls to the bottom of the list, and helps achieving an "infinite scroll" effect
		 * by adding new items each time.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.6
		 */
		infiniteScroll: {
			type: Boolean,
		},

		/**
		 * Defines if the component would display a loading indicator at the bottom of the list.
		 * It's especially useful, when combined with <code>infiniteScroll</code>.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.6
		 */
		busy: {
			type: Boolean,
		},

		/**
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabel: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the input
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Used to externally manipulate the role of the list
		 *
		 * @private
		 * @type {String}
		 * @defaultvalue "listbox"
		 * @since 1.0.0-rc.9
		 */
		role: {
			type: String,
			defaultValue: "listbox",
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.List.prototype */ {

		/**
		 * Fired when an item is activated, unless the item's <code>type</code> property
		 * is set to <code>Inactive</code>.
		 *
		 * @event sap.ui.webcomponents.main.List#item-click
		 * @param {HTMLElement} item the clicked item.
		 * @public
		 */
		"item-click": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the <code>Close</code> button of any item is clicked
		 * <br><br>
		 * <b>Note:</b> This event is applicable to <code>ui5-li-notification</code> items only,
		 * not to be confused with <code>item-delete</code>.
		 *
		 * @event sap.ui.webcomponents.main.List#item-close
		 * @param {HTMLElement} item the item about to be closed.
		 * @public
		 * @since 1.0.0-rc.8
		 */
		"item-close": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the <code>Toggle</code> button of any item is clicked.
		 * <br><br>
		 * <b>Note:</b> This event is applicable to <code>ui5-li-notification-group</code> items only.
		 *
		 * @event sap.ui.webcomponents.main.List#item-toggle
		 * @param {HTMLElement} item the toggled item.
		 * @public
		 * @since 1.0.0-rc.8
		 */
		"item-toggle": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the Delete button of any item is pressed.
		 * <br><br>
		 * <b>Note:</b> A Delete button is displayed on each item,
		 * when the <code>ui5-list</code> <code>mode</code> property is set to <code>Delete</code>.
		 *
		 * @event sap.ui.webcomponents.main.List#item-delete
		 * @param {HTMLElement} item the deleted item.
		 * @public
		 */
		"item-delete": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when selection is changed by user interaction
		 * in <code>SingleSelect</code>, <code>SingleSelectBegin</code>, <code>SingleSelectEnd</code> and <code>MultiSelect</code> modes.
		 *
		 * @event sap.ui.webcomponents.main.List#selection-change
		 * @param {Array} selectedItems An array of the selected items.
		 * @param {Array} previouslySelectedItems An array of the previously selected items.
		 * @public
		 */
		"selection-change": {
			detail: {
				selectedItems: { type: Array },
				previouslySelectedItems: { type: Array },
				selectionComponentPressed: { type: Boolean }, // protected, indicates if the user used the selection components to change the selection
			},
		},

		/**
		 * Fired when the user scrolls to the bottom of the list.
		 * <br><br>
		 * <b>Note:</b> The event is fired when the <code>infiniteScroll</code> property is enabled.
		 *
		 * @event sap.ui.webcomponents.main.List#load-more
		 * @public
		 * @since 1.0.0-rc.6
		 */
		"load-more": {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-list</code> component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 * <br><br>
 * The <code>ui5-list</code> is а container for the available list items:
 * <ul>
 * <li><code>ui5-li</code></li>
 * <li><code>ui5-li-custom</code></li>
 * <li><code>ui5-li-groupheader</code></li>
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
 * <code>import "@ui5/webcomponents/dist/GroupHeaderListItem.js";</code> (for <code>ui5-li-groupheader</code>)
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
		this.addEventListener("ui5-close", this.onItemClose.bind(this));
		this.addEventListener("ui5-toggle", this.onItemToggle.bind(this));
		this.addEventListener("ui5-_focused", this.onItemFocused.bind(this));
		this.addEventListener("ui5-_forward-after", this.onForwardAfter.bind(this));
		this.addEventListener("ui5-_forward-before", this.onForwardBefore.bind(this));
		this.addEventListener("ui5-_selection-requested", this.onSelectionRequested.bind(this));
		this.addEventListener("ui5-_focus-requested", this.focusUploadCollectionItem.bind(this));
	}

	get shouldRenderH1() {
		return !this.header.length && this.headerText;
	}

	get headerID() {
		return `${this._id}-header`;
	}

	get hasData() {
		return this.getSlottedNodes("items").length !== 0;
	}

	get showNoDataText() {
		return !this.hasData && this.noDataText;
	}

	get showBusy() {
		return this.busy || this.infiniteScroll;
	}

	get isMultiSelect() {
		return this.mode === ListMode.MultiSelect;
	}

	get ariaLabelledBy() {
		if (this.ariaLabelledby || this.ariaLabel) {
			return undefined;
		}

		return this.shouldRenderH1 ? this.headerID : undefined;
	}

	get ariaLabelТxt() {
		return getEffectiveAriaLabelText(this);
	}

	onBeforeRendering() {
		this.prepareListItems();
	}

	initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getSlottedNodes("items"),
		});
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
			this.fireEvent("selection-change", {
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

	handleSingleSelectAuto(item) {
		return this.handleSingleSelect(item);
	}

	handleMultiSelect(item, selected) {
		item.selected = selected;
		return true;
	}

	handleDelete(item) {
		this.fireEvent("item-delete", { item });
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

	_onScroll(event) {
		if (!this.infiniteScroll) {
			return;
		}
		this.debounce(this.loadMore.bind(this, event.target), INFINITE_SCROLL_DEBOUNCE_RATE);
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
		this.fireEvent("item-focused", { item: target });

		if (this.mode === ListMode.SingleSelectAuto) {
			this.onSelectionRequested({
				detail: {
					item: target,
					selectionComponentPressed: false,
					selected: true,
					key: event.detail.key,
				},
			});
		}
	}

	onItemPress(event) {
		const pressedItem = event.detail.item;

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

		this.fireEvent("item-press", { item: pressedItem });
		this.fireEvent("item-click", { item: pressedItem });

		this._selectionRequested = false;
	}

	// This is applicable to NoficationListItem
	onItemClose(event) {
		this.fireEvent("item-close", { item: event.detail.item });
	}

	onItemToggle(event) {
		this.fireEvent("item-toggle", { item: event.detail.item });
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

	focusItem(item) {
		item.focus();
	}


	focusUploadCollectionItem(event) {
		setTimeout(() => {
			this.setPreviouslyFocusedItem(event.target);
			this.focusPreviouslyFocusedItem();
		}, 0);
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

	loadMore(el) {
		const scrollTop = el.scrollTop;
		const height = el.offsetHeight;
		const scrollHeight = el.scrollHeight;

		if (this.previousScrollPosition > scrollTop) { // skip scrolling upwards
			this.previousScrollPosition = scrollTop;
			return;
		}
		this.previousScrollPosition = scrollTop;

		if (scrollHeight - BUSYINDICATOR_HEIGHT <= height + scrollTop) {
			this.fireEvent("load-more");
		}
	}

	debounce(fn, delay) {
		clearTimeout(this.debounceInterval);
		this.debounceInterval = setTimeout(() => {
			this.debounceInterval = null;
			fn();
		}, delay);
	}

	static get dependencies() {
		return [BusyIndicator];
	}
}

List.define();

export default List;
