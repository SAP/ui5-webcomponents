import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import fastNavigation from "@ui5/webcomponents-base/dist/decorators/fastNavigation.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type { ClassMap, ComponentStylesData } from "@ui5/webcomponents-base/dist/types.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isTabNext,
	isSpace,
	isEnter,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import getNormalizedTarget from "@ui5/webcomponents-base/dist/util/getNormalizedTarget.js";
import getEffectiveScrollbarStyle from "@ui5/webcomponents-base/dist/util/getEffectiveScrollbarStyle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import isElementInView from "@ui5/webcomponents-base/dist/util/isElementInView.js";
import ListMode from "./types/ListMode.js";
import ListGrowingMode from "./types/ListGrowingMode.js";
import ListItemBase from "./ListItemBase.js";
import type ListItem from "./ListItem.js";
import type {
	SelectionRequestEventDetail,
	PressEventDetail,
} from "./ListItem.js";
import ListSeparators from "./types/ListSeparators.js";
// @ts-ignore
import BusyIndicator from "./BusyIndicator.js";

// Template
import ListTemplate from "./generated/templates/ListTemplate.lit.js";

// Styles
import listCss from "./generated/themes/List.css.js";
import browserScrollbarCSS from "./generated/themes/BrowserScrollbar.css.js";

// Texts
import {
	LOAD_MORE_TEXT, ARIA_LABEL_LIST_SELECTABLE,
	ARIA_LABEL_LIST_MULTISELECTABLE,
	ARIA_LABEL_LIST_DELETABLE,
	// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

const INFINITE_SCROLL_DEBOUNCE_RATE = 250; // ms

const PAGE_UP_DOWN_SIZE = 10;

// ListItemBase-based events
type FocusEventDetail = {
	item: ListItemBase,
}
type SelectionChangeEventDetail = {
	selectedItems: Array<ListItemBase>;
	previouslySelectedItems: Array<ListItemBase>;
	selectionComponentPressed: boolean;
	targetItem: ListItemBase;
	key?: string;
}
type DeleteEventDetail = FocusEventDetail;

// ListItem-based events
type CloseEventDetail = {
	item: ListItemBase,
}
type ToggleEventDetail = CloseEventDetail;
type ClickEventDetail = CloseEventDetail;

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-list</code> component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 * <br><br>
 * The <code>ui5-list</code> is a container for the available list items:
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
 *
 * <h4>Basic Navigation</h4>
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
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
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
 * @alias sap.ui.webc.main.List
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-list
 * @appenddocs StandardListItem CustomListItem GroupHeaderListItem
 * @public
 */
@customElement("ui5-list")
@fastNavigation

/**
 * Fired when an item is activated, unless the item's <code>type</code> property
 * is set to <code>Inactive</code>.
 *
 * @event sap.ui.webc.main.List#item-click
 * @allowPreventDefault
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event("item-click", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the <code>Close</code> button of any item is clicked
 * <br><br>
 * <b>Note:</b> This event is only applicable to list items that can be closed (such as notification list items),
 * not to be confused with <code>item-delete</code>.
 *
 * @event sap.ui.webc.main.List#item-close
 * @param {HTMLElement} item the item about to be closed.
 * @public
 * @since 1.0.0-rc.8
 */
@event("item-close", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the <code>Toggle</code> button of any item is clicked.
 * <br><br>
 * <b>Note:</b> This event is only applicable to list items that can be toggled (such as notification group list items).
 *
 * @event sap.ui.webc.main.List#item-toggle
 * @param {HTMLElement} item the toggled item.
 * @public
 * @since 1.0.0-rc.8
 */
@event("item-toggle", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the Delete button of any item is pressed.
 * <br><br>
 * <b>Note:</b> A Delete button is displayed on each item,
 * when the component <code>mode</code> property is set to <code>Delete</code>.
 *
 * @event sap.ui.webc.main.List#item-delete
 * @param {HTMLElement} item the deleted item.
 * @public
 */
@event("item-delete", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when selection is changed by user interaction
 * in <code>SingleSelect</code>, <code>SingleSelectBegin</code>, <code>SingleSelectEnd</code> and <code>MultiSelect</code> modes.
 *
 * @event sap.ui.webc.main.List#selection-change
 * @param {Array} selectedItems An array of the selected items.
 * @param {Array} previouslySelectedItems An array of the previously selected items.
 * @public
 */
@event("selection-change", {
	detail: {
		selectedItems: { type: Array },
		previouslySelectedItems: { type: Array },
		targetItem: { type: HTMLElement }, // protected, holds the event target item
		selectionComponentPressed: { type: Boolean }, // protected, indicates if the user used the selection components to change the selection
	},
})

/**
 * Fired when the user scrolls to the bottom of the list.
 * <br><br>
 * <b>Note:</b> The event is fired when the <code>growing='Scroll'</code> property is enabled.
 *
 * @event sap.ui.webc.main.List#load-more
 * @public
 * @since 1.0.0-rc.6
 */
@event("load-more")

/**
 * @private
 */
@event("item-focused", {
	detail: {
		item: { type: HTMLElement },
	},
})
class List extends UI5Element {
	/**
	 * Defines the component header text.
	 * <br><br>
	 * <b>Note:</b> If <code>header</code> is set this property is ignored.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.List.prototype.headerText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Defines the footer text.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.List.prototype.footerText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	footerText!: string;

	/**
	 * Determines whether the component is indented.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.List.prototype.indent
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	indent!: boolean;

	/**
	 * Defines the mode of the component.
	 * <br><br>
	 * <b>Note:</b> Available options are <code>None</code>, <code>SingleSelect</code>, <code>SingleSelectBegin</code>,
	 * <code>SingleSelectEnd</code>, <code>MultiSelect</code>, and <code>Delete</code>.
	 *
	 * @type {sap.ui.webc.main.types.ListMode}
	 * @name sap.ui.webc.main.List.prototype.mode
	 * @defaultvalue "None"
	 * @public
	 */
	@property({ type: ListMode, defaultValue: ListMode.None })
	mode!: ListMode;

	/**
	 * Defines the text that is displayed when the component contains no items.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.List.prototype.noDataText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	noDataText!: string;

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
	 * @type {sap.ui.webc.main.types.ListSeparators}
	 * @name sap.ui.webc.main.List.prototype.separators
	 * @defaultvalue "All"
	 * @public
	 */
	@property({ type: ListSeparators, defaultValue: ListSeparators.All })
	separators!: ListSeparators;

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
	 * <b>Restrictions:</b> <code>growing="Scroll"</code> is not supported for Internet Explorer,
	 * on IE the component will fallback to <code>growing="Button"</code>.
	 * @type {sap.ui.webc.main.types.ListGrowingMode}
	 * @name sap.ui.webc.main.List.prototype.growing
	 * @defaultvalue "None"
	 * @since 1.0.0-rc.13
	 * @public
	 */
	@property({ type: ListGrowingMode, defaultValue: ListGrowingMode.None })
	growing!: ListGrowingMode;

	/**
	 * Defines if the component would display a loading indicator over the list.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.List.prototype.busy
	 * @defaultvalue false
	 * @public
	 * @since 1.0.0-rc.6
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.List.prototype.busyDelay
	 * @defaultValue 1000
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Defines the accessible name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.List.prototype.accessibleName
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the IDs of the elements that label the input.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.List.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * Defines the accessible role of the component.
	 * <br><br>
	 * @public
	 * @type {string}
	 * @name sap.ui.webc.main.List.prototype.accessibleRole
	 * @defaultvalue "list"
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: "list" })
	accessibleRole!: string;

	/**
	 * Defines the description for the accessible role of the component.
	 * @protected
	 * @type {string}
	 * @name sap.ui.webc.main.List.prototype.accessibleRoleDescription
	 * @defaultvalue undefined
	 * @since 1.10.0
	 */
	@property({ defaultValue: undefined, noAttribute: true })
	accessibleRoleDescription?: string;

	/**
	 * Defines if the entire list is in view port.
	 * @private
	 */
	@property({ type: Boolean })
	_inViewport!: boolean;

	/**
	 * Defines the active state of the <code>More</code> button.
	 * @private
	 */
	@property({ type: Boolean })
	_loadMoreActive!: boolean;

	/**
	 * Defines the items of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-li</code>, <code>ui5-li-custom</code>, and <code>ui5-li-groupheader</code> for the intended design.
	 *
	 * @type {sap.ui.webc.main.IListItem[]}
	 * @name sap.ui.webc.main.List.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<ListItemBase>;

	/**
	 * Defines the component header.
	 * <br><br>
	 * <b>Note:</b> When <code>header</code> is set, the
	 * <code>headerText</code> property is ignored.
	 *
	 * @type {HTMLElement[]}
	 * @name sap.ui.webc.main.List.prototype.header
	 * @slot
	 * @public
	 */
	@slot()
	header!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;
	_previouslyFocusedItem: ListItemBase | null;
	_forwardingFocus: boolean;
	resizeListenerAttached: boolean;
	listEndObserved: boolean;
	_handleResize: () => void;
	initialIntersection: boolean;
	_selectionRequested?: boolean;
	growingIntersectionObserver?: IntersectionObserver | null;
	_itemNavigation: ItemNavigation;
	_beforeElement?: HTMLElement | null;
	_afterElement?: HTMLElement | null;

	static get render() {
		return litRender;
	}

	static get template() {
		return ListTemplate;
	}

	static get styles(): ComponentStylesData {
		return [browserScrollbarCSS, listCss];
	}

	static async onDefine() {
		List.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	static get dependencies() {
		return [BusyIndicator];
	}

	constructor() {
		super();

		this._previouslyFocusedItem = null;

		// Indicates that the List is forwarding the focus before or after the internal ul.
		this._forwardingFocus = false;

		// Indicates that the List has already subscribed for resize.
		this.resizeListenerAttached = false;

		// Indicates if the IntersectionObserver started observing the List
		this.listEndObserved = false;

		this._itemNavigation = new ItemNavigation(this, {
			skipItemsSize: PAGE_UP_DOWN_SIZE, // PAGE_UP and PAGE_DOWN will skip trough 10 items
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledItems(),
		});

		this._handleResize = this.checkListInViewport.bind(this);

		this._handleResize = this.checkListInViewport.bind(this);

		// Indicates the List bottom most part has been detected by the IntersectionObserver
		// for the first time.
		this.initialIntersection = true;
	}

	onExitDOM() {
		this.unobserveListEnd();
		this.resizeListenerAttached = false;
		ResizeHandler.deregister(this.getDomRef()!, this._handleResize);
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
			ResizeHandler.register(this.getDomRef()!, this._handleResize);
		}
	}

	get shouldRenderH1() {
		return !this.header.length && this.headerText;
	}

	get headerID() {
		return `${this._id}-header`;
	}

	get modeLabelID() {
		return `${this._id}-modeLabel`;
	}

	get listEndDOM() {
		return this.shadowRoot!.querySelector(".ui5-list-end-marker");
	}

	get hasData() {
		return this.getItems().length !== 0;
	}

	get showNoDataText() {
		return !this.hasData && this.noDataText;
	}

	get isDelete() {
		return this.mode === ListMode.Delete;
	}

	get isSingleSelect() {
		return [
			ListMode.SingleSelect,
			ListMode.SingleSelectBegin,
			ListMode.SingleSelectEnd,
			ListMode.SingleSelectAuto,
		].includes(this.mode);
	}

	get isMultiSelect() {
		return this.mode === ListMode.MultiSelect;
	}

	get ariaLabelledBy() {
		if (this.accessibleNameRef || this.accessibleName) {
			return undefined;
		}
		const ids = [];

		if (this.isMultiSelect || this.isSingleSelect || this.isDelete) {
			ids.push(this.modeLabelID);
		}

		if (this.shouldRenderH1) {
			ids.push(this.headerID);
		}

		return ids.length ? ids.join(" ") : undefined;
	}

	get ariaLabelTxt() {
		return getEffectiveAriaLabelText(this);
	}

	get ariaLabelModeText(): string {
		if (this.isMultiSelect) {
			return List.i18nBundle.getText(ARIA_LABEL_LIST_MULTISELECTABLE as I18nText);
		}
		if (this.isSingleSelect) {
			return List.i18nBundle.getText(ARIA_LABEL_LIST_SELECTABLE as I18nText);
		}
		if (this.isDelete) {
			return List.i18nBundle.getText(ARIA_LABEL_LIST_DELETABLE as I18nText);
		}

		return "";
	}

	get grows() {
		return this.growing !== ListGrowingMode.None;
	}

	get growsOnScroll() {
		return this.growing === ListGrowingMode.Scroll;
	}

	get growsWithButton() {
		return this.growing === ListGrowingMode.Button;
	}

	get _growingButtonText(): string {
		return List.i18nBundle.getText(LOAD_MORE_TEXT as I18nText);
	}

	get busyIndPosition() {
		if (!this.grows) {
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

	get classes(): ClassMap {
		return {
			root: {
				"ui5-list-root": true,
				"ui5-content-native-scrollbars": getEffectiveScrollbarStyle(),
			},
		};
	}

	prepareListItems() {
		const slottedItems = this.getItems();

		slottedItems.forEach((item, key) => {
			const isLastChild = key === slottedItems.length - 1;
			const showBottomBorder = this.separators === ListSeparators.All
				|| (this.separators === ListSeparators.Inner && !isLastChild);

			if (item.hasConfigurableMode) {
				(item as ListItem)._mode = this.mode;
			}
			item.hasBorder = showBottomBorder;
		});
	}

	async observeListEnd() {
		if (!this.listEndObserved) {
			await renderFinished();
			this.getIntersectionObserver().observe(this.listEndDOM!);
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

	onInteresection(entries: Array<IntersectionObserverEntry>) {
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
	onSelectionRequested(e: CustomEvent<SelectionRequestEventDetail>) {
		const previouslySelectedItems = this.getSelectedItems();
		let selectionChange = false;
		this._selectionRequested = true;

		if (this.mode !== ListMode.None && this[`handle${this.mode}`]) {
			selectionChange = this[`handle${this.mode}`](e.detail.item, !!e.detail.selected);
		}

		if (selectionChange) {
			this.fireEvent<SelectionChangeEventDetail>("selection-change", {
				selectedItems: this.getSelectedItems(),
				previouslySelectedItems,
				selectionComponentPressed: e.detail.selectionComponentPressed,
				targetItem: e.detail.item,
				key: e.detail.key,
			});
		}
	}

	handleSingleSelect(item: ListItemBase): boolean {
		if (item.selected) {
			return false;
		}

		this.deselectSelectedItems();
		item.selected = true;

		return true;
	}

	handleSingleSelectBegin(item: ListItemBase): boolean {
		return this.handleSingleSelect(item);
	}

	handleSingleSelectEnd(item: ListItemBase): boolean {
		return this.handleSingleSelect(item);
	}

	handleSingleSelectAuto(item: ListItemBase): boolean {
		return this.handleSingleSelect(item);
	}

	handleMultiSelect(item: ListItemBase, selected: boolean): boolean {
		item.selected = selected;
		return true;
	}

	handleDelete(item: ListItemBase): boolean {
		this.fireEvent<DeleteEventDetail>("item-delete", { item });

		return true;
	}

	deselectSelectedItems() {
		this.getSelectedItems().forEach(item => { item.selected = false; });
	}

	getSelectedItems(): Array<ListItemBase> {
		return this.getItems().filter(item => item.selected);
	}

	getEnabledItems(): Array<ListItemBase> {
		return this.getItems().filter(item => !item.disabled);
	}

	getItems(): Array<ListItemBase> {
		return this.getSlottedNodes("items") as Array<ListItemBase>;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isTabNext(e)) {
			this._handleTabNext(e);
		}
	}

	_onLoadMoreKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this._loadMoreActive = true;
		}

		if (isEnter(e)) {
			this._onLoadMoreClick();
			this._loadMoreActive = true;
		}

		if (isTabNext(e)) {
			this.focusAfterElement();
		}

		if (isTabPrevious(e)) {
			if (this.getPreviouslyFocusedItem()) {
				this.focusPreviouslyFocusedItem();
			} else {
				this.focusFirstItem();
			}
			e.preventDefault();
		}
	}

	_onLoadMoreKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
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
		this._inViewport = isElementInView(this.getDomRef()!);
	}

	loadMore() {
		this.fireEvent("load-more");
	}

	/*
	* KEYBOARD SUPPORT
	*/
	_handleTabNext(e: KeyboardEvent) {
		let lastTabbableEl;
		const target = getNormalizedTarget(e.target as HTMLElement);

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

			e.stopImmediatePropagation();
			e.preventDefault();
		}
	}

	_onfocusin(e: FocusEvent) {
		const target = getNormalizedTarget(e.target as HTMLElement);
		// If the focusin event does not origin from one of the 'triggers' - ignore it.
		if (!this.isForwardElement(target)) {
			e.stopImmediatePropagation();
			return;
		}

		// The focus arrives in the List for the first time.
		// If there is selected item - focus it or focus the first item.
		if (!this.getPreviouslyFocusedItem()) {
			if (this.growsWithButton && this.isForwardAfterElement(target)) {
				this.focusGrowingButton();
			} else {
				this.focusFirstItem();
			}
			e.stopImmediatePropagation();
			return;
		}

		// The focus returns to the List,
		// focus the first selected item or the previously focused element.
		if (!this.getForwardingFocus()) {
			if (this.growsWithButton && this.isForwardAfterElement(target)) {
				this.focusGrowingButton();
				e.stopImmediatePropagation();
				return;
			}

			this.focusPreviouslyFocusedItem();
			e.stopImmediatePropagation();
		}

		this.setForwardingFocus(false);
	}

	isForwardElement(element: HTMLElement) {
		const elementId = element.id;
		const beforeElement = this.getBeforeElement();

		if (this._id === elementId || (beforeElement && beforeElement.id === elementId)) {
			return true;
		}

		return this.isForwardAfterElement(element);
	}

	isForwardAfterElement(element: HTMLElement) {
		const elementId = element.id;
		const afterElement = this.getAfterElement();

		return afterElement && afterElement.id === elementId;
	}

	onItemFocused(e: CustomEvent) {
		const target = e.target as ListItemBase;

		e.stopPropagation();

		this._itemNavigation.setCurrentItem(target);
		this.fireEvent<FocusEventDetail>("item-focused", { item: target });

		if (this.mode === ListMode.SingleSelectAuto) {
			const detail: SelectionRequestEventDetail = {
				item: target,
				selectionComponentPressed: false,
				selected: true,
				key: e.detail.key,
			};

			this.onSelectionRequested({ detail } as CustomEvent<SelectionRequestEventDetail>);
		}
	}

	onItemPress(e: CustomEvent<PressEventDetail>) {
		const pressedItem = e.detail.item;

		if (!this.fireEvent<ClickEventDetail>("item-click", { item: pressedItem }, true)) {
			return;
		}

		if (!this._selectionRequested && this.mode !== ListMode.Delete) {
			this._selectionRequested = true;
			const detail: SelectionRequestEventDetail = {
				item: pressedItem,
				selectionComponentPressed: false,
				selected: !pressedItem.selected,
				key: e.detail.key,
			};

			this.onSelectionRequested({ detail } as CustomEvent<SelectionRequestEventDetail>);
		}

		this._selectionRequested = false;
	}

	// This is applicable to NotificationListItem
	onItemClose(e: CustomEvent<CloseEventDetail>) {
		this.fireEvent<CloseEventDetail>("item-close", { item: e.detail.item });
	}

	onItemToggle(e: CustomEvent<ToggleEventDetail>) {
		this.fireEvent<ToggleEventDetail>("item-toggle", { item: e.detail.item });
	}

	onForwardBefore(e: CustomEvent) {
		this.setPreviouslyFocusedItem(e.target as ListItemBase);
		this.focusBeforeElement();
		e.stopPropagation();
	}

	onForwardAfter(e: CustomEvent) {
		this.setPreviouslyFocusedItem(e.target as ListItemBase);

		if (!this.growsWithButton) {
			this.focusAfterElement();
		} else {
			this.focusGrowingButton();
			e.preventDefault();
		}

		e.stopPropagation();
	}

	focusBeforeElement() {
		this.setForwardingFocus(true);
		this.getBeforeElement().focus();
	}

	focusAfterElement() {
		this.setForwardingFocus(true);
		this.getAfterElement().focus();
	}

	focusGrowingButton() {
		const growingBtn = this.getGrowingButton();

		if (growingBtn) {
			growingBtn.focus();
		}
	}

	getGrowingButton() {
		return this.shadowRoot!.querySelector(`#${this._id}-growing-btn`) as HTMLElement;
	}

	/**
	 * Focuses the first list item and sets its tabindex to "0" via the ItemNavigation
	 * @protected
	 */
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
	focusItem(item: ListItemBase) {
		this._itemNavigation.setCurrentItem(item);
		item.focus();
	}

	onFocusRequested(e: CustomEvent) {
		setTimeout(() => {
			this.setPreviouslyFocusedItem(e.target as ListItemBase);
			this.focusPreviouslyFocusedItem();
		}, 0);
	}

	setForwardingFocus(forwardingFocus: boolean) {
		this._forwardingFocus = forwardingFocus;
	}

	getForwardingFocus() {
		return this._forwardingFocus;
	}

	setPreviouslyFocusedItem(item: ListItemBase) {
		this._previouslyFocusedItem = item;
	}

	getPreviouslyFocusedItem() {
		return this._previouslyFocusedItem;
	}

	getFirstItem(filter: (item: ListItemBase) => boolean): ListItemBase | null {
		const slottedItems = this.getItems();
		let firstItem = null;

		if (!filter) {
			return slottedItems.length ? slottedItems[0] : null;
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
			this._afterElement = this.shadowRoot!.querySelector(`#${this._id}-after`) as HTMLElement;
		}
		return this._afterElement;
	}

	getBeforeElement() {
		if (!this._beforeElement) {
			this._beforeElement = this.shadowRoot!.querySelector(`#${this._id}-before`) as HTMLElement;
		}
		return this._beforeElement;
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
export type {
	ClickEventDetail,
	FocusEventDetail,
	DeleteEventDetail,
	CloseEventDetail,
	ToggleEventDetail,
	SelectionChangeEventDetail,
};
