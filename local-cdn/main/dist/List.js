var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var List_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isTabNext, isSpace, isEnter, isTabPrevious, } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import findClosestPosition from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import getNormalizedTarget from "@ui5/webcomponents-base/dist/util/getNormalizedTarget.js";
import getEffectiveScrollbarStyle from "@ui5/webcomponents-base/dist/util/getEffectiveScrollbarStyle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import isElementInView from "@ui5/webcomponents-base/dist/util/isElementInView.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import ListMode from "./types/ListMode.js";
import ListGrowingMode from "./types/ListGrowingMode.js";
import "./ListItemBase.js";
import DropIndicator from "./DropIndicator.js";
import ListSeparators from "./types/ListSeparators.js";
import BusyIndicator from "./BusyIndicator.js";
// Template
import ListTemplate from "./generated/templates/ListTemplate.lit.js";
// Styles
import listCss from "./generated/themes/List.css.js";
import browserScrollbarCSS from "./generated/themes/BrowserScrollbar.css.js";
// Texts
import { LOAD_MORE_TEXT, ARIA_LABEL_LIST_SELECTABLE, ARIA_LABEL_LIST_MULTISELECTABLE, ARIA_LABEL_LIST_DELETABLE, } from "./generated/i18n/i18n-defaults.js";
import "./CheckBox.js";
import "./RadioButton.js";
const INFINITE_SCROLL_DEBOUNCE_RATE = 250; // ms
const PAGE_UP_DOWN_SIZE = 10;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-list` component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 *
 * The `ui5-list` is a container for the available list items:
 *
 * - `ui5-li`
 * - `ui5-li-custom`
 * - `ui5-li-groupheader`
 *
 * To benefit from the built-in selection mechanism, you can use the available
 * selection modes, such as
 * `SingleSelect`, `MultiSelect` and `Delete`.
 *
 * Additionally, the `ui5-list` provides header, footer, and customization for the list item separators.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-list` provides advanced keyboard handling.
 * When a list is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Up] or [Down] - Navigates up and down the items
 * - [Home] - Navigates to first item
 * - [End] - Navigates to the last item
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete),
 * when the `mode` property is in use:
 *
 * - [Space] - Select an item (if `type` is 'Active') when `mode` is selection
 * - [Delete] - Delete an item if `mode` property is `Delete`
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/List.js";`
 *
 * `import "@ui5/webcomponents/dist/StandardListItem.js";` (for `ui5-li`)
 *
 * `import "@ui5/webcomponents/dist/CustomListItem.js";` (for `ui5-li-custom`)
 *
 * `import "@ui5/webcomponents/dist/GroupHeaderListItem.js";` (for `ui5-li-groupheader`)
 * @constructor
 * @extends UI5Element
 * @public
 */
let List = List_1 = class List extends UI5Element {
    static async onDefine() {
        List_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
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
            skipItemsSize: PAGE_UP_DOWN_SIZE,
            navigationMode: NavigationMode.Vertical,
            getItemsCallback: () => this.getEnabledItems(),
        });
        this._handleResize = this.checkListInViewport.bind(this);
        this._handleResize = this.checkListInViewport.bind(this);
        // Indicates the List bottom most part has been detected by the IntersectionObserver
        // for the first time.
        this.initialIntersection = true;
    }
    onEnterDOM() {
        DragRegistry.subscribe(this);
    }
    onExitDOM() {
        this.unobserveListEnd();
        this.resizeListenerAttached = false;
        ResizeHandler.deregister(this.getDomRef(), this._handleResize);
        DragRegistry.unsubscribe(this);
    }
    onBeforeRendering() {
        this.prepareListItems();
    }
    onAfterRendering() {
        if (this.growsOnScroll) {
            this.observeListEnd();
        }
        else if (this.listEndObserved) {
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
    get modeLabelID() {
        return `${this._id}-modeLabel`;
    }
    get listEndDOM() {
        return this.shadowRoot.querySelector(".ui5-list-end-marker");
    }
    get dropIndicatorDOM() {
        return this.shadowRoot.querySelector("[ui5-drop-indicator]");
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
    get ariaLabelModeText() {
        if (this.hasData) {
            if (this.isMultiSelect) {
                return List_1.i18nBundle.getText(ARIA_LABEL_LIST_MULTISELECTABLE);
            }
            if (this.isSingleSelect) {
                return List_1.i18nBundle.getText(ARIA_LABEL_LIST_SELECTABLE);
            }
            if (this.isDelete) {
                return List_1.i18nBundle.getText(ARIA_LABEL_LIST_DELETABLE);
            }
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
    get _growingButtonText() {
        return this.growingButtonText || List_1.i18nBundle.getText(LOAD_MORE_TEXT);
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
    prepareListItems() {
        const slottedItems = this.getItemsForProcessing();
        slottedItems.forEach((item, key) => {
            const isLastChild = key === slottedItems.length - 1;
            const showBottomBorder = this.separators === ListSeparators.All
                || (this.separators === ListSeparators.Inner && !isLastChild);
            if (item.hasConfigurableMode) {
                item._mode = this.mode;
            }
            item.hasBorder = showBottomBorder;
        });
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
    onSelectionRequested(e) {
        const previouslySelectedItems = this.getSelectedItems();
        let selectionChange = false;
        this._selectionRequested = true;
        if (this.mode !== ListMode.None && this[`handle${this.mode}`]) {
            selectionChange = this[`handle${this.mode}`](e.detail.item, !!e.detail.selected);
        }
        if (selectionChange) {
            const changePrevented = !this.fireEvent("selection-change", {
                selectedItems: this.getSelectedItems(),
                previouslySelectedItems,
                selectionComponentPressed: e.detail.selectionComponentPressed,
                targetItem: e.detail.item,
                key: e.detail.key,
            }, true);
            if (changePrevented) {
                this._revertSelection(previouslySelectedItems);
            }
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
        return true;
    }
    deselectSelectedItems() {
        this.getSelectedItems().forEach(item => { item.selected = false; });
    }
    getSelectedItems() {
        return this.getItems().filter(item => item.selected);
    }
    getEnabledItems() {
        return this.getItems().filter(item => item._focusable);
    }
    getItems() {
        return this.getSlottedNodes("items");
    }
    getItemsForProcessing() {
        return this.getItems();
    }
    _revertSelection(previouslySelectedItems) {
        this.getItems().forEach((item) => {
            const oldSelection = previouslySelectedItems.indexOf(item) !== -1;
            const multiSelectCheckBox = item.shadowRoot.querySelector(".ui5-li-multisel-cb");
            const singleSelectRadioButton = item.shadowRoot.querySelector(".ui5-li-singlesel-radiobtn");
            item.selected = oldSelection;
            if (multiSelectCheckBox) {
                multiSelectCheckBox.checked = oldSelection;
            }
            else if (singleSelectRadioButton) {
                singleSelectRadioButton.checked = oldSelection;
            }
        });
    }
    _onkeydown(e) {
        if (isTabNext(e)) {
            this._handleTabNext(e);
        }
    }
    _onLoadMoreKeydown(e) {
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
            }
            else {
                this.focusFirstItem();
            }
            e.preventDefault();
        }
    }
    _onLoadMoreKeyup(e) {
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
        this._inViewport = isElementInView(this.getDomRef());
    }
    loadMore() {
        this.fireEvent("load-more");
    }
    /*
    * KEYBOARD SUPPORT
    */
    _handleTabNext(e) {
        let lastTabbableEl;
        const target = getNormalizedTarget(e.target);
        if (!lastTabbableEl) {
            return;
        }
        if (lastTabbableEl === target) {
            if (this.getFirstItem(x => x.selected && x._focusable)) {
                this.focusFirstSelectedItem();
            }
            else if (this.getPreviouslyFocusedItem()) {
                this.focusPreviouslyFocusedItem();
            }
            else {
                this.focusFirstItem();
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }
    _onfocusin(e) {
        const target = getNormalizedTarget(e.target);
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
            }
            else {
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
    _ondragenter(e) {
        e.preventDefault();
    }
    _ondragleave(e) {
        if (e.relatedTarget instanceof Node && this.shadowRoot.contains(e.relatedTarget)) {
            return;
        }
        this.dropIndicatorDOM.targetReference = null;
    }
    _ondragover(e) {
        const draggedElement = DragRegistry.getDraggedElement();
        if (!(e.target instanceof HTMLElement) || !draggedElement) {
            return;
        }
        const closestPosition = findClosestPosition(this.items, e.clientY, Orientation.Vertical);
        if (!closestPosition) {
            this.dropIndicatorDOM.targetReference = null;
            return;
        }
        let placements = closestPosition.placements;
        if (closestPosition.element === draggedElement) {
            placements = placements.filter(placement => placement !== MovePlacement.On);
        }
        const placementAccepted = placements.some(placement => {
            const beforeItemMovePrevented = !this.fireEvent("move-over", {
                source: {
                    element: draggedElement,
                },
                destination: {
                    element: closestPosition.element,
                    placement,
                },
            }, true);
            if (beforeItemMovePrevented) {
                e.preventDefault();
                this.dropIndicatorDOM.targetReference = closestPosition.element;
                this.dropIndicatorDOM.placement = placement;
                return true;
            }
            return false;
        });
        if (!placementAccepted) {
            this.dropIndicatorDOM.targetReference = null;
        }
    }
    _ondrop(e) {
        e.preventDefault();
        const draggedElement = DragRegistry.getDraggedElement();
        this.fireEvent("move", {
            source: {
                element: draggedElement,
            },
            destination: {
                element: this.dropIndicatorDOM.targetReference,
                placement: this.dropIndicatorDOM.placement,
            },
        });
        this.dropIndicatorDOM.targetReference = null;
        draggedElement.focus();
    }
    isForwardElement(element) {
        const elementId = element.id;
        const beforeElement = this.getBeforeElement();
        if (this._id === elementId || (beforeElement && beforeElement.id === elementId)) {
            return true;
        }
        return this.isForwardAfterElement(element);
    }
    isForwardAfterElement(element) {
        const elementId = element.id;
        const afterElement = this.getAfterElement();
        return afterElement && afterElement.id === elementId;
    }
    onItemTabIndexChange(e) {
        const target = e.target;
        this._itemNavigation.setCurrentItem(target);
    }
    onItemFocused(e) {
        const target = e.target;
        e.stopPropagation();
        this._itemNavigation.setCurrentItem(target);
        this.fireEvent("item-focused", { item: target });
        if (this.mode === ListMode.SingleSelectAuto) {
            const detail = {
                item: target,
                selectionComponentPressed: false,
                selected: true,
                key: e.detail.key,
            };
            this.onSelectionRequested({ detail });
        }
    }
    onItemPress(e) {
        const pressedItem = e.detail.item;
        if (!this.fireEvent("item-click", { item: pressedItem }, true)) {
            return;
        }
        if (!this._selectionRequested && this.mode !== ListMode.Delete) {
            this._selectionRequested = true;
            const detail = {
                item: pressedItem,
                selectionComponentPressed: false,
                selected: !pressedItem.selected,
                key: e.detail.key,
            };
            this.onSelectionRequested({ detail });
        }
        this._selectionRequested = false;
    }
    // This is applicable to NotificationListItem
    onItemClose(e) {
        const target = e.target;
        const shouldFireItemClose = target?.hasAttribute("ui5-li-notification") || target?.hasAttribute("ui5-li-notification-group");
        if (shouldFireItemClose) {
            this.fireEvent("item-close", { item: e.detail?.item });
        }
    }
    onItemToggle(e) {
        this.fireEvent("item-toggle", { item: e.detail.item });
    }
    onForwardBefore(e) {
        this.setPreviouslyFocusedItem(e.target);
        this.focusBeforeElement();
        e.stopPropagation();
    }
    onForwardAfter(e) {
        this.setPreviouslyFocusedItem(e.target);
        if (!this.growsWithButton) {
            this.focusAfterElement();
        }
        else {
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
        return this.shadowRoot.querySelector(`[id="${this._id}-growing-btn"]`);
    }
    /**
     * Focuses the first list item and sets its tabindex to "0" via the ItemNavigation
     * @protected
     */
    focusFirstItem() {
        // only enabled items are focusable
        const firstItem = this.getFirstItem(x => x._focusable);
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
        const firstSelectedItem = this.getFirstItem(x => x.selected && x._focusable);
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
    onFocusRequested(e) {
        setTimeout(() => {
            this.setPreviouslyFocusedItem(e.target);
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
            this._afterElement = this.shadowRoot.querySelector(`[id="${this._id}-after"]`);
        }
        return this._afterElement;
    }
    getBeforeElement() {
        if (!this._beforeElement) {
            this._beforeElement = this.shadowRoot.querySelector(`[id="${this._id}-before"]`);
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
};
__decorate([
    property()
], List.prototype, "headerText", void 0);
__decorate([
    property()
], List.prototype, "footerText", void 0);
__decorate([
    property({ type: Boolean })
], List.prototype, "indent", void 0);
__decorate([
    property({ type: ListMode, defaultValue: ListMode.None })
], List.prototype, "mode", void 0);
__decorate([
    property()
], List.prototype, "noDataText", void 0);
__decorate([
    property({ type: ListSeparators, defaultValue: ListSeparators.All })
], List.prototype, "separators", void 0);
__decorate([
    property({ type: ListGrowingMode, defaultValue: ListGrowingMode.None })
], List.prototype, "growing", void 0);
__decorate([
    property()
], List.prototype, "growingButtonText", void 0);
__decorate([
    property({ type: Boolean })
], List.prototype, "busy", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1000 })
], List.prototype, "busyDelay", void 0);
__decorate([
    property()
], List.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], List.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ defaultValue: "list" })
], List.prototype, "accessibleRole", void 0);
__decorate([
    property({ defaultValue: undefined, noAttribute: true })
], List.prototype, "accessibleRoleDescription", void 0);
__decorate([
    property({ type: Boolean })
], List.prototype, "_inViewport", void 0);
__decorate([
    property({ type: Boolean })
], List.prototype, "_loadMoreActive", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], List.prototype, "items", void 0);
__decorate([
    slot()
], List.prototype, "header", void 0);
List = List_1 = __decorate([
    customElement({
        tag: "ui5-list",
        fastNavigation: true,
        renderer: litRender,
        template: ListTemplate,
        styles: [browserScrollbarCSS, listCss],
        dependencies: [BusyIndicator, DropIndicator],
    })
    /**
     * Fired when an item is activated, unless the item's `type` property
     * is set to `Inactive`.
     * @allowPreventDefault
     * @param {HTMLElement} item The clicked item.
     * @public
     */
    ,
    event("item-click", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the `Close` button of any item is clicked
     *
     * **Note:** This event is only applicable to list items that can be closed (such as notification list items),
     * not to be confused with `item-delete`.
     * @param {HTMLElement} item the item about to be closed.
     * @public
     * @since 1.0.0-rc.8
     */
    ,
    event("item-close", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the `Toggle` button of any item is clicked.
     *
     * **Note:** This event is only applicable to list items that can be toggled (such as notification group list items).
     * @param {HTMLElement} item the toggled item.
     * @public
     * @since 1.0.0-rc.8
     */
    ,
    event("item-toggle", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the Delete button of any item is pressed.
     *
     * **Note:** A Delete button is displayed on each item,
     * when the component `mode` property is set to `Delete`.
     * @param {HTMLElement} item the deleted item.
     * @public
     */
    ,
    event("item-delete", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when selection is changed by user interaction
     * in `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect` modes.
     * @allowPreventDefault
     * @param {Array<ListItemBase>} selectedItems An array of the selected items.
     * @param {Array<ListItemBase>} previouslySelectedItems An array of the previously selected items.
     * @public
     */
    ,
    event("selection-change", {
        detail: {
            /**
             * @public
             */
            selectedItems: { type: Array },
            /**
             * @public
             */
            previouslySelectedItems: { type: Array },
            /**
             * protected, holds the event target item
             * @protected
             */
            targetItem: { type: HTMLElement },
            /**
             * protected, indicates if the user used the selection components to change the selection
             * @protected
             */
            selectionComponentPressed: { type: Boolean },
            /**
             * @private
             */
            key: { type: String },
        },
    })
    /**
     * Fired when the user scrolls to the bottom of the list.
     *
     * **Note:** The event is fired when the `growing='Scroll'` property is enabled.
     * @public
     * @since 1.0.0-rc.6
     */
    ,
    event("load-more")
    /**
     * @private
     */
    ,
    event("item-focused", {
        detail: {
            item: { type: HTMLElement },
        },
    })
], List);
List.define();
export default List;
//# sourceMappingURL=List.js.map