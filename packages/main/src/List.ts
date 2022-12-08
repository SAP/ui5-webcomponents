import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import fastNavigation from "@ui5/webcomponents-base/dist/decorators/fastNavigation.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
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
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import isElementInView from "@ui5/webcomponents-base/dist/util/isElementInView.js";
import ListMode from "./types/ListMode.js";
import ListGrowingMode from "./types/ListGrowingMode.js";
import ListItemBase from "./ListItemBase.js";
import ListItem from "./ListItem.js";
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

type SelectionChangeEventDetail = {
	item: ListItemBase,
	selectionComponentPressed: boolean,
	selected: boolean,
	key: string,
}

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
@event("item-click", {
	item: { type: HTMLElement },
})
@event("item-toggle", {
	item: { type: HTMLElement },
})
@event("item-delete", {
	item: { type: HTMLElement },
})
@event("selection-change", {
	selectedItems: { type: Array },
	previouslySelectedItems: { type: Array<HTMLElement> },
	targetItem: { type: HTMLElement },
	selectionComponentPressed: { type: Boolean },
})
@event("load-more")
class List extends UI5Element {
	@property()
	headerText!: string;

	@property()
	footerText!: string;

	@property({ type: Boolean })
	indent!: boolean;

	@property({ type: ListMode, defaultValue: ListMode.None })
	mode!: ListMode;

	@property()
	noDataText!: string;

	@property({ type: ListSeparators, defaultValue: ListSeparators.All })
	separators!: ListSeparators;

	@property({ type: ListGrowingMode, defaultValue: ListGrowingMode.None })
	growing!: ListGrowingMode;

	@property({ type: Boolean })
	busy!: boolean;

	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	@property()
	accessibleName!: string;

	@property()
	accessibleNameRef!: string;

	@property({ type: String, defaultValue: "list" })
	accessibleRole!: string;

	@property({ type: String, defaultValue: undefined, noAttribute: true })
	accessibleRoleDescription?: string;

	@property({ type: Boolean })
	_inViewport!: boolean;

	@property({ type: Boolean })
	_loadMoreActive!: boolean;

	@slot({ type: HTMLElement, "default": true })
	items!: Array<ListItemBase>;

	@slot({ type: HTMLElement })
	header!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;
	_previouslyFocusedItem?: HTMLElement | null;
	_forwardingFocus = false;
	_previouslySelectedItem = null;
	resizeListenerAttached = false;
	listEndObserved = false;
	_handleResize: () => void;
	initialIntersection = true;
	_selectionRequested?: boolean;
	growingIntersectionObserver?: IntersectionObserver | null;
	_itemNavigation!: ItemNavigation;
	_beforeElement?: HTMLElement | null;
	_afterElement?: HTMLElement | null;

	static get render() {
		return litRender;
	}

	static get template() {
		return ListTemplate;
	}

	static get styles() {
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

		this._previouslySelectedItem = null;

		// Indicates that the List has already subscribed for resize.
		this.resizeListenerAttached = false;

		// Indicates if the IntersectionObserver started observing the List
		this.listEndObserved = false;

		this.initItemNavigation();
		this.addEventListener("ui5-_press", this.onItemPress.bind(this) as EventListener);
		this.addEventListener("ui5-close", this.onItemClose.bind(this) as EventListener);
		this.addEventListener("ui5-toggle", this.onItemToggle.bind(this) as EventListener);
		this.addEventListener("ui5-_focused", this.onItemFocused.bind(this) as EventListener);
		this.addEventListener("ui5-_forward-after", this.onForwardAfter.bind(this) as EventListener);
		this.addEventListener("ui5-_forward-before", this.onForwardBefore.bind(this) as EventListener);
		this.addEventListener("ui5-_selection-requested", this.onSelectionRequested.bind(this) as EventListener);
		this.addEventListener("ui5-_focus-requested", this.focusUploadCollectionItem.bind(this) as EventListener);

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

	get ariaLabelModeText(): string | undefined {
		if (this.isMultiSelect) {
			return List.i18nBundle.getText(ARIA_LABEL_LIST_MULTISELECTABLE as I18nText);
		}
		if (this.isSingleSelect) {
			return List.i18nBundle.getText(ARIA_LABEL_LIST_SELECTABLE as I18nText);
		}
		if (this.isDelete) {
			return List.i18nBundle.getText(ARIA_LABEL_LIST_DELETABLE as I18nText);
		}

		return undefined;
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

	get classes() {
		return {
			root: {
				"ui5-list-root": true,
				"ui5-content-native-scrollbars": getEffectiveScrollbarStyle(),
			},
		};
	}

	initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this, {
			skipItemsSize: PAGE_UP_DOWN_SIZE, // PAGE_UP and PAGE_DOWN will skip trough 10 items
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledItems(),
		});
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

		this._previouslySelectedItem = null;
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
	onSelectionRequested(e: CustomEvent<SelectionChangeEventDetail>) {
		const previouslySelectedItems = this.getSelectedItems();
		let selectionChange = false;
		this._selectionRequested = true;

		if (this.mode !== ListMode.None && this[`handle${this.mode}`]) {
			selectionChange = this[`handle${this.mode}`](e.detail.item, e.detail.selected);
		}

		if (selectionChange) {
			this.fireEvent("selection-change", {
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
		this.fireEvent("item-delete", { item });

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
		// If the focusin e does not origin from one of the 'triggers' - ignore it.
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

	isForwardElement(node: HTMLElement) {
		const nodeId = node.id;
		const beforeElement = this.getBeforeElement();

		if (this._id === nodeId || (beforeElement && beforeElement.id === nodeId)) {
			return true;
		}

		return this.isForwardAfterElement(node);
	}

	isForwardAfterElement(node: HTMLElement) {
		const nodeId = node.id;
		const afterElement = this.getAfterElement();

		return afterElement && afterElement.id === nodeId;
	}

	onItemFocused(e: CustomEvent) {
		const target = e.target as HTMLElement;

		e.stopPropagation();

		this._itemNavigation.setCurrentItem(target);
		this.fireEvent("item-focused", { item: target });

		if (this.mode === ListMode.SingleSelectAuto) {
			this.onSelectionRequested({
				detail: {
					item: target,
					selectionComponentPressed: false,
					selected: true,
					key: e.detail.key,
				},
			} as CustomEvent<SelectionChangeEventDetail>);
		}
	}

	onItemPress(e: CustomEvent) {
		const pressedItem = e.detail.item;

		if (!this.fireEvent("item-click", { item: pressedItem }, true)) {
			return;
		}

		if (!this._selectionRequested && this.mode !== ListMode.Delete) {
			this._selectionRequested = true;
			this.onSelectionRequested({
				detail: {
					item: pressedItem,
					selectionComponentPressed: false,
					selected: !pressedItem.selected,
					key: e.detail.key,
				},
			} as CustomEvent<SelectionChangeEventDetail>);
		}

		this._selectionRequested = false;
	}

	// This is applicable to NoficationListItem
	onItemClose(e: CustomEvent) {
		this.fireEvent("item-close", { item: e.detail.item });
	}

	onItemToggle(e: CustomEvent) {
		this.fireEvent("item-toggle", { item: e.detail.item });
	}

	onForwardBefore(e: CustomEvent) {
		this.setPreviouslyFocusedItem(e.target as HTMLElement);
		this.focusBeforeElement();
		e.stopPropagation();
	}

	onForwardAfter(e: CustomEvent) {
		this.setPreviouslyFocusedItem(e.target as HTMLElement);

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
	focusItem(item: HTMLElement) {
		this._itemNavigation.setCurrentItem(item);
		item.focus();
	}

	focusUploadCollectionItem(e: Event) {
		setTimeout(() => {
			this.setPreviouslyFocusedItem(e.target as HTMLElement);
			this.focusPreviouslyFocusedItem();
		}, 0);
	}

	setForwardingFocus(forwardingFocus: boolean) {
		this._forwardingFocus = forwardingFocus;
	}

	getForwardingFocus() {
		return this._forwardingFocus;
	}

	setPreviouslyFocusedItem(item: HTMLElement) {
		this._previouslyFocusedItem = item;
	}

	getPreviouslyFocusedItem() {
		return this._previouslyFocusedItem;
	}

	getFirstItem(filter: (item: ListItemBase) => boolean) {
		const slottedItems = this.getItems();
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
