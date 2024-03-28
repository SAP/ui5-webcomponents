var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Breadcrumbs_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isShow, } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import BreadcrumbsDesign from "./types/BreadcrumbsDesign.js";
import BreadcrumbsSeparatorStyle from "./types/BreadcrumbsSeparatorStyle.js";
import BreadcrumbsItem from "./BreadcrumbsItem.js";
import { BREADCRUMB_ITEM_POS, BREADCRUMBS_ARIA_LABEL, BREADCRUMBS_OVERFLOW_ARIA_LABEL, BREADCRUMBS_CANCEL_BUTTON, } from "./generated/i18n/i18n-defaults.js";
import Link from "./Link.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
// Templates
import BreadcrumbsTemplate from "./generated/templates/BreadcrumbsTemplate.lit.js";
import BreadcrumbsPopoverTemplate from "./generated/templates/BreadcrumbsPopoverTemplate.lit.js";
// Styles
import breadcrumbsCss from "./generated/themes/Breadcrumbs.css.js";
import breadcrumbsPopoverCss from "./generated/themes/BreadcrumbsPopover.css.js";
/**
 * @class
 *
 * ### Overview
 * Enables users to navigate between items by providing a list of links to previous steps in the user's navigation path.
 * It helps the user to be aware of their location within the application and allows faster navigation.
 *
 * The last three steps can be accessed as links directly, while the remaining links prior to them are available
 * in a drop-down menu.
 *
 * You can choose the type of separator to be used from a number of predefined options.
 *
 * ### Keyboard Handling
 * The `ui5-breadcrumbs` provides advanced keyboard handling.
 *
 * - [F4], [Alt] + [Up], [Alt] + [Down], [Space], or [Enter] - If the dropdown arrow is focused - opens/closes the drop-down.
 * - [Space],[Enter] - Activates the focused item and triggers the `item-click` event.
 * - [Escape] - Closes the drop-down.
 * - [Left] - If the drop-down is closed - navigates one item to the left.
 * - [Right] - If the drop-down is closed - navigates one item to the right.
 * - [Up] - If the drop-down is open - moves focus to the next item.
 * - [Down] - If the drop-down is open - moves focus to the previous item.
 * - [Home] - Navigates to the first item.
 * - [End] - Navigates to the last item.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 */
let Breadcrumbs = Breadcrumbs_1 = class Breadcrumbs extends UI5Element {
    constructor() {
        super();
        // maps items to their widths
        this._breadcrumbItemWidths = new WeakMap();
        // the width of the interactive element that opens the overflow
        this._dropdownArrowLinkWidth = 0;
        this._itemNavigation = new ItemNavigation(this, {
            navigationMode: NavigationMode.Horizontal,
            getItemsCallback: () => this._getFocusableItems(),
        });
        this._onResizeHandler = this._updateOverflow.bind(this);
    }
    onInvalidation(changeInfo) {
        if (changeInfo.reason === "childchange") {
            const itemIndex = this._getItems().indexOf(changeInfo.child), isInOverflow = itemIndex < this._overflowSize;
            if (isInOverflow) {
                // the content of an overflowing item has changed
                // => need to render the item outside the overflow to obtain its new width
                // => lower-down the `_overfowSize` to exclude that item from the overflow
                this._overflowSize = itemIndex;
            }
        }
    }
    _getItems() {
        return this.getSlottedNodes("items");
    }
    onBeforeRendering() {
        this._preprocessItems();
    }
    onAfterRendering() {
        this._cacheWidths();
        this._updateOverflow();
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._onResizeHandler);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._onResizeHandler);
    }
    _initItemNavigation() {
        if (!this._itemNavigation) {
            this._itemNavigation = new ItemNavigation(this, {
                navigationMode: NavigationMode.Horizontal,
                getItemsCallback: () => this._getFocusableItems(),
            });
        }
    }
    /**
     * Obtains the items for navigation via keyboard
     * @private
     */
    _getFocusableItems() {
        const items = this._links;
        if (!this._isOverflowEmpty) {
            items.unshift(this._dropdownArrowLink);
        }
        return items;
    }
    _onfocusin(e) {
        const currentItem = e.target;
        this._itemNavigation.setCurrentItem(currentItem);
    }
    _onkeydown(e) {
        const isDropdownArrowFocused = this._isDropdownArrowFocused;
        if (isShow(e) && isDropdownArrowFocused && !this._isOverflowEmpty) {
            e.preventDefault();
            this._toggleRespPopover();
            return;
        }
        if (isSpace(e) && isDropdownArrowFocused && !this._isOverflowEmpty && !this._isPickerOpen) {
            e.preventDefault();
        }
    }
    _onkeyup(e) {
        if (this._isDropdownArrowFocused && isSpace(e) && !this._isOverflowEmpty && !this._isPickerOpen) {
            this._openRespPopover();
        }
    }
    /**
     * Caches the space required to render the content
     * @private
     */
    _cacheWidths() {
        const map = this._breadcrumbItemWidths, items = this._getItems();
        for (let i = this._overflowSize; i < items.length; i++) {
            const item = items[i], link = this.shadowRoot.querySelector(`#${item._id}-link-wrapper`);
            map.set(item, this._getElementWidth(link));
        }
        if (!this._isOverflowEmpty) {
            const arrow = this.shadowRoot.querySelector(".ui5-breadcrumbs-dropdown-arrow-link-wrapper");
            this._dropdownArrowLinkWidth = this._getElementWidth(arrow);
        }
    }
    _updateOverflow() {
        const items = this._getItems(), availableWidth = this.shadowRoot.querySelector(".ui5-breadcrumbs-root").offsetWidth;
        let requiredWidth = this._getTotalContentWidth(), overflowSize = 0;
        if (requiredWidth > availableWidth) {
            // need to show the component that opens the overflow
            requiredWidth += this._dropdownArrowLinkWidth;
        }
        while ((requiredWidth >= availableWidth) && (overflowSize < this._maxAllowedOverflowSize)) {
            const itemToOverflow = items[overflowSize];
            let itemWidth = 0;
            if (this._isItemVisible(itemToOverflow)) {
                itemWidth = this._breadcrumbItemWidths.get(itemToOverflow) || 0;
            }
            // move the item to the overflow
            requiredWidth -= itemWidth;
            overflowSize++;
        }
        this._overflowSize = overflowSize;
        // if overflow was emptied while picker was open => close redundant popup
        if (this._isOverflowEmpty && this._isPickerOpen) {
            this.responsivePopover.close();
        }
        // if the last focused link has done into the overflow =>
        // ensure the first visible link is focusable
        const focusableItems = this._getFocusableItems();
        if (!focusableItems.some(x => x.forcedTabIndex === "0")) {
            this._itemNavigation.setCurrentItem(focusableItems[0]);
        }
    }
    _getElementWidth(element) {
        if (element) {
            return Math.ceil(element.getBoundingClientRect().width);
        }
        return 0;
    }
    _getTotalContentWidth() {
        const items = this._getItems(), widthsMap = this._breadcrumbItemWidths, totalLinksWidth = items.reduce((sum, link) => sum + widthsMap.get(link), 0);
        return totalLinksWidth;
    }
    _onLinkPress(e) {
        const link = e.target, items = this._getItems(), item = items.find(x => `${x._id}-link` === link.id), { altKey, ctrlKey, metaKey, shiftKey, } = e.detail;
        if (!this.fireEvent("item-click", {
            item,
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
        }, true)) {
            e.preventDefault();
            return;
        }
        if (item._isCurrentPageItem) {
            window.location.reload();
        }
    }
    _onOverflowListItemSelect(e) {
        const listItem = e.detail.selectedItems[0], items = this._getItems(), item = items.find(x => `${x._id}-li` === listItem.id);
        if (this.fireEvent("item-click", { item }, true)) {
            window.open(item.href, item.target || "_self", "noopener,noreferrer");
            this.responsivePopover.close();
        }
    }
    async _respPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector("[ui5-responsive-popover]");
    }
    async _toggleRespPopover() {
        this.responsivePopover = await this._respPopover();
        if (this._isPickerOpen) {
            this._closeRespPopover();
        }
        else {
            this._openRespPopover();
        }
    }
    _closeRespPopover() {
        this.responsivePopover && this.responsivePopover.close();
    }
    async _openRespPopover() {
        this.responsivePopover = await this._respPopover();
        this.responsivePopover.showAt(this._dropdownArrowLink);
    }
    _isItemVisible(item) {
        return !item.hidden && this._hasVisibleContent(item);
    }
    _hasVisibleContent(item) {
        // the check is not complete but may be extended in the future if needed to cover
        // cases besides the standard (UX-recommended) ones
        return item.innerText || Array.from(item.children).some(child => !child.hidden);
    }
    _preprocessItems() {
        this.items.forEach(item => {
            item._getRealDomRef = () => this.getDomRef().querySelector(`[data-ui5-stable*=${item.stableDomRef}]`);
        });
    }
    _getItemPositionText(position, size) {
        return Breadcrumbs_1.i18nBundle.getText(BREADCRUMB_ITEM_POS, position, size);
    }
    _getItemAccessibleName(item, position, size) {
        const positionText = this._getItemPositionText(position, size);
        const itemsText = item.textContent || "";
        // innerText is needed as it is no longer read out when label is set
        let text = "";
        if (item.accessibleName) {
            text = `${itemsText.trim()} ${item.accessibleName} ${positionText}`;
        }
        else {
            text = `${itemsText.trim()} ${positionText}`;
        }
        return text;
    }
    get _visibleItems() {
        return this._getItems()
            .slice(this._overflowSize)
            .filter(i => this._isItemVisible(i));
    }
    get _endsWithCurrentPageItem() {
        return this.design === BreadcrumbsDesign.Standard;
    }
    get _isDropdownArrowFocused() {
        return this._dropdownArrowLink.forcedTabIndex === "0";
    }
    /**
     * Returns the maximum allowed count of items in the overflow
     * with respect to the UX requirement to never overflow the last visible item
     */
    get _maxAllowedOverflowSize() {
        const items = this._getItems().filter(item => this._isItemVisible(item));
        // all items except tha last visible one are allowed to overflow by UX requirement
        return items.length - 1;
    }
    /**
     * Getter for the interactive element that opens the overflow
     * @private
     */
    get _dropdownArrowLink() {
        return this.shadowRoot.querySelector(".ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-link]");
    }
    /**
     * Getter for the list of abstract breadcrumb items to be rendered as list-items inside the overflow
     */
    get _overflowItemsData() {
        return this._getItems()
            .slice(0, this._overflowSize)
            .filter(item => this._isItemVisible(item))
            .reverse();
    }
    /**
     * Getter for the list of abstract breadcrumb items to be rendered as links outside the overflow
     */
    get _linksData() {
        const items = this._visibleItems;
        const itemsCount = items.length;
        return items
            .map((item, index) => {
            item._accessibleNameText = this._getItemAccessibleName(item, index + 1, itemsCount);
            item._isCurrentPageItem = index === (itemsCount - 1) && this._endsWithCurrentPageItem;
            return item;
        });
    }
    /**
     * Getter for the list of links corresponding to the abstract breadcrumb items
     */
    get _links() {
        return Array.from(this.shadowRoot.querySelectorAll(".ui5-breadcrumbs-link-wrapper [ui5-link]"));
    }
    get _isOverflowEmpty() {
        return this._overflowItemsData.length === 0;
    }
    get _ariaHasPopup() {
        if (!this._isOverflowEmpty) {
            return "listbox";
        }
        return undefined;
    }
    get _isPickerOpen() {
        return !!this.responsivePopover && this.responsivePopover.opened;
    }
    get _accessibleNameText() {
        return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_ARIA_LABEL);
    }
    get _dropdownArrowAccessibleNameText() {
        return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_OVERFLOW_ARIA_LABEL);
    }
    get _cancelButtonText() {
        return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_CANCEL_BUTTON);
    }
    static async onDefine() {
        Breadcrumbs_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property({ type: BreadcrumbsDesign, defaultValue: BreadcrumbsDesign.Standard })
], Breadcrumbs.prototype, "design", void 0);
__decorate([
    property({ type: BreadcrumbsSeparatorStyle, defaultValue: BreadcrumbsSeparatorStyle.Slash })
], Breadcrumbs.prototype, "separatorStyle", void 0);
__decorate([
    property({ validator: Integer, noAttribute: true, defaultValue: 0 })
], Breadcrumbs.prototype, "_overflowSize", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], Breadcrumbs.prototype, "items", void 0);
Breadcrumbs = Breadcrumbs_1 = __decorate([
    customElement({
        tag: "ui5-breadcrumbs",
        languageAware: true,
        renderer: litRender,
        template: BreadcrumbsTemplate,
        staticAreaTemplate: BreadcrumbsPopoverTemplate,
        styles: breadcrumbsCss,
        staticAreaStyles: breadcrumbsPopoverCss,
        dependencies: [
            BreadcrumbsItem,
            Link,
            ResponsivePopover,
            List,
            StandardListItem,
            Icon,
            Button,
        ],
    })
    /**
     * Fires when a `BreadcrumbsItem` is clicked.
     *
     * **Note:** You can prevent browser location change by calling `event.preventDefault()`.
     * @allowPreventDefault
     * @param {HTMLElement} item The clicked item.
     * @param {Boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
     * @param {Boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
     * @param {Boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
     * @param {Boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
     * @public
     */
    ,
    event("item-click", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
            /**
             * @public
             */
            altKey: { type: Boolean },
            /**
             * @public
             */
            ctrlKey: { type: Boolean },
            /**
             * @public
             */
            metaKey: { type: Boolean },
            /**
             * @public
             */
            shiftKey: { type: Boolean },
        },
    })
], Breadcrumbs);
Breadcrumbs.define();
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map