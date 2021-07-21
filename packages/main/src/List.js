import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { getLastTabbableElement } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { isTabNext, isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import isElementInView from "@ui5/webcomponents-base/dist/util/isElementInView.js";
import ListMode from "./types/ListMode.js";
import ListGrowingMode from "./types/ListGrowingMode.js";
import ListSeparators from "./types/ListSeparators.js";
import BusyIndicator from "./BusyIndicator.js";

// Template
import ListTemplate from "./generated/templates/ListTemplate.lit.js";

// Styles
import listCss from "./generated/themes/List.css.js";

// Texts
import { LOAD_MORE_TEXT } from "./generated/i18n/i18n-defaults.js";

const INFINITE_SCROLL_DEBOUNCE_RATE = 250; // ms

/**
 * @public
 */
const metadata = {
	tag: "ui5-list",
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.List.prototype */ {

		/**
		 * Defines the component header.
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
		 * Defines the items of the component.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-li</code>, <code>ui5-li-custom</code>, and <code>ui5-li-groupheader</code> for the intended design.
		 *
		 * @type {sap.ui.webcomponents.main.IListItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.List.prototype */ {

		/**
		 * Defines the component header text.
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
		indent: {
			type: Boolean,
		},

		/**
		 * Defines the mode of the component.
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
		 * Defines the text that is displayed when the component contains no items.
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
		 * Defines whether the component will have growing capability either by pressing a <code>More</code> button,
		 * or via user scroll. In both cases <code>load-more</code> event is fired.
		 * <br><br>
		 *
		 * Available options:
		 * <br><br>
		 * <code>Button</code> - Shows a <code>More</code> button at the bottom of the list,
		 * pressing of which triggers the <code>load-more</code> event.
		 * <br>
		 * <code>Scroll</code> - The <code>load-more</code> event is triggered when the user scrolls to the bottom of the list;
		 * <br>
		 * <code>None</code> (default) - The growing is off.
		 * <br><br>
		 *
		 * <b>Limitations:</b> <code>growing="Scroll"</code> is not supported for Internet Explorer,
		 * on IE the component will fallback to <code>growing="Button"</code>.
		 * @type {ListGrowingMode}
		 * @defaultvalue "None"
		 * @since 1.0.0-rc.13
		 * @public
		 */
		 growing: {
			type: ListGrowingMode,
			defaultValue: ListGrowingMode.None,
		},

		/**
		 * Defines if the component would display a loading indicator over the list.
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
		 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
		 *
		 * @type {Integer}
		 * @defaultValue 1000
		 * @public
		 */
		busyDelay: {
			type: Integer,
			defaultValue: 1000,
		},

		/**
		 * Sets the accessible aria name of the component.
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the input
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the accessible role of the component.
		 * <br><br>
		 * <b>Note:</b> If you use notification list items,
		 * it's recommended to set <code>accessible-role="list"</code> for better accessibility.
		 *
		 * @public
		 * @type {String}
		 * @defaultvalue "listbox"
		 * @since 1.0.0-rc.15
		 */
		 accessibleRole: {
			type: String,
			defaultValue: "listbox",
		},

		/**
		 * Defines if the entire list is in view port.
		 * @private
		 */
		 _inViewport: {
			type: Boolean,
		},

		/**
		 * Defines the active state of the <code>More</code> button.
		 * @private
		 */
		 _loadMoreActive: {
			type: Boolean,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.List.prototype */ {

		/**
		 * Fired when an item is activated, unless the item's <code>type</code> property
		 * is set to <code>Inactive</code>.
		 *
		 * @event sap.ui.webcomponents.main.List#item-click
		 * @param {HTMLElement} item The clicked item.
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
		 * when the component <code>mode</code> property is set to <code>Delete</code>.
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
		 * <b>Note:</b> The event is fired when the <code>growing='Scroll'</code> property is enabled.
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
 * <br><br>
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-list</code> provides advanced keyboard handling.
 * When a list is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 *
 * <ul>
 * <li>[UP/DOWN] - Navigates up and down the items</li>
 * <li>[HOME] - Navigates to first item</li>
 * <li>[END] - Navigates to the last item</li>
 * </ul>
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete),
 * when the <code>mode</code> property is in use:
 * <ul>
 * <li>[SPACE] - Select an item (if <code>type</code> is 'Active') when <code>mode</code> is selection</li>
 * <li>[DELETE] - Delete an item if <code>mode</code> property is <code>Delete</code></li>
 * </ul>
 * <br><br>
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

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	static get dependencies() {
		return [BusyIndicator];
	}

	constructor() {
		super();
		this.initItemNavigation();

		// Stores the last focused item within the internal ul element.
		this._previouslyFocusedItem = null;

		// Indicates that the List is forwarding the focus before or after the internal ul.
		this._forwardingFocus = false;

		this._previouslySelectedItem = null;

		// Indicates that the List has already subscribed for resize.
		this.resizeListenerAttached = false;

		// Indicates if the IntersectionObserver started observing the List
		this.listEndObserved = false;

		this.addEventListener("ui5-_press", this.onItemPress.bind(this));
		this.addEventListener("ui5-close", this.onItemClose.bind(this));
		this.addEventListener("ui5-toggle", this.onItemToggle.bind(this));
		this.addEventListener("ui5-_focused", this.onItemFocused.bind(this));
		this.addEventListener("ui5-_forward-after", this.onForwardAfter.bind(this));
		this.addEventListener("ui5-_forward-before", this.onForwardBefore.bind(this));
		this.addEventListener("ui5-_selection-requested", this.onSelectionRequested.bind(this));
		this.addEventListener("ui5-_focus-requested", this.focusUploadCollectionItem.bind(this));

		this._handleResize = this.checkListInViewport.bind(this);
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");

		// Indicates the List bottom most part has been detected by the IntersectionObserver
		// for the first time.
		this.initialIntersection = true;
	}

	onExitDOM() {
		this.unobserveListEnd();
		this.resizeListenerAttached = false;
		ResizeHandler.deregister(this.getDomRef(), this._handleResize);
	}

	onBeforeRendering() {
		this.prepareListItems();
	}

	onAfterRendering() {
		if (this.growsOnScroll) {
			this.observeListEnd();
		} else if (this.listEndObserved) {
			this.unobserveListEnd();
		}

		if (this.grows) {
			this.checkListInViewport();
			this.attachForResize();
		}
	}

	attachForResize() {
		if (!this.resizeListenerAttached) {
			this.resizeListenerAttached = true;
			ResizeHandler.register(this.getDomRef(), this._handleResize);
		}
	}

	get shouldRenderH1() {
		return !this.header.length && this.headerText;
	}

	get headerID() {
		return `${this._id}-header`;
	}

	get listEndDOM() {
		return this.shadowRoot.querySelector(".ui5-list-end-marker");
	}

	get hasData() {
		return this.getSlottedNodes("items").length !== 0;
	}

	get showNoDataText() {
		return !this.hasData && this.noDataText;
	}

	get isMultiSelect() {
		return this.mode === ListMode.MultiSelect;
	}

	get ariaLabelledBy() {
		if (this.accessibleNameRef || this.accessibleName) {
			return undefined;
		}

		return this.shouldRenderH1 ? this.headerID : undefined;
	}

	get ariaLabelТxt() {
		return getEffectiveAriaLabelText(this);
	}

	get grows() {
		return this.growing !== ListGrowingMode.None;
	}

	get growsOnScroll() {
		return this.growing === ListGrowingMode.Scroll && !isIE();
	}

	get growsWithButton() {
		if (isIE()) {
			// On IE fallback to "More" button, even if growing of type "Scroll" is set.
			return this.grows;
		}

		return this.growing === ListGrowingMode.Button;
	}

	get _growingButtonText() {
		return this.i18nBundle.getText(LOAD_MORE_TEXT);
	}

	get busyIndPosition() {
		if (isIE() || !this.grows) {
			return "absolute";
		}

		return this._inViewport ? "absolute" : "sticky";
	}

	get styles() {
		return {
			busyInd: {
				position: this.busyIndPosition,
			},
		};
	}

	initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledItems(),
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

	async observeListEnd() {
		if (!this.listEndObserved) {
			await renderFinished();
			this.getIntersectionObserver().observe(this.listEndDOM);
			this.listEndObserved = true;
		}
	}

	unobserveListEnd() {
		if (this.growingIntersectionObserver) {
			this.growingIntersectionObserver.disconnect();
			this.growingIntersectionObserver = null;
			this.listEndObserved = false;
		}
	}

	onInteresection(entries) {
		if (this.initialIntersection) {
			this.initialIntersection = false;
			return;
		}
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				debounce(this.loadMore.bind(this), INFINITE_SCROLL_DEBOUNCE_RATE);
			}
		});
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

	getEnabledItems() {
		return this.getSlottedNodes("items").filter(item => !item.disabled);
	}

	_onkeydown(event) {
		if (isSpace(event)) {
			event.preventDefault(); // prevent scroll
		}
		if (isTabNext(event)) {
			this._handleTabNext(event);
		}
	}

	_onLoadMoreKeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
			this._loadMoreActive = true;
		}

		if (isEnter(event)) {
			this._onLoadMoreClick();
			this._loadMoreActive = true;
		}

		if (isTabNext(event)) {
			this.setPreviouslyFocusedItem(event.target);
			this.focusAfterElement();
		}
	}

	_onLoadMoreKeyup(event) {
		if (isSpace(event)) {
			this._onLoadMoreClick();
		}
		this._loadMoreActive = false;
	}

	_onLoadMoreMousedown() {
		this._loadMoreActive = true;
	}

	_onLoadMoreMouseup() {
		this._loadMoreActive = false;
	}

	_onLoadMoreClick() {
		this.loadMore();
	}

	checkListInViewport() {
		this._inViewport = isElementInView(this.getDomRef());
	}

	loadMore() {
		this.fireEvent("load-more");
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
			if (this.getFirstItem(x => x.selected && !x.disabled)) {
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
			if (this.getFirstItem(x => x.selected && !x.disabled)) {
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
			if (this.getFirstItem(x => x.selected && !x.disabled)) {
				this.focusFirstSelectedItem();
			} else {
				this.focusPreviouslyFocusedItem();
			}

			event.stopImmediatePropagation();
		}

		this.setForwardingFocus(false);
	}

	isForwardElement(node) {
		const nodeId = node.id;
		const afterElement = this.getAfterElement();
		const beforeElement = this.getBeforeElement();

		if (this._id === nodeId || (beforeElement && beforeElement.id === nodeId)) {
			return true;
		}

		return afterElement && afterElement.id === nodeId;
	}

	onItemFocused(event) {
		const target = event.target;

		this._itemNavigation.setCurrentItem(target);
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
		event.stopImmediatePropagation();
	}

	onForwardAfter(event) {
		this.setPreviouslyFocusedItem(event.target);

		if (!this.growsWithButton) {
			this.focusAfterElement();
		}
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
		// only enabled items are focusable
		const firstItem = this.getFirstItem(x => !x.disabled);

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
		// only enabled items are focusable
		const firstSelectedItem = this.getFirstItem(x => x.selected && !x.disabled);

		if (firstSelectedItem) {
			firstSelectedItem.focus();
		}
	}

	/**
	 * Focuses a list item and sets its tabindex to "0" via the ItemNavigation
	 * @protected
	 * @param item
	 */
	focusItem(item) {
		this._itemNavigation.setCurrentItem(item);
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

	getFirstItem(filter) {
		const slottedItems = this.getSlottedNodes("items");
		let firstItem = null;

		if (!filter) {
			return !!slottedItems.length && slottedItems[0];
		}

		for (let i = 0; i < slottedItems.length; i++) {
			if (filter(slottedItems[i])) {
				firstItem = slottedItems[i];
				break;
			}
		}

		return firstItem;
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

	getIntersectionObserver() {
		if (!this.growingIntersectionObserver) {
			this.growingIntersectionObserver = new IntersectionObserver(this.onInteresection.bind(this), {
				root: null,
				rootMargin: "0px",
				threshold: 1.0,
			});
		}

		return this.growingIntersectionObserver;
	}
}

List.define();

export default List;
