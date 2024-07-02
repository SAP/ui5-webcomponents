var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Toolbar_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL, } from "./generated/i18n/i18n-defaults.js";
import ToolbarTemplate from "./generated/templates/ToolbarTemplate.lit.js";
import ToolbarCss from "./generated/themes/Toolbar.css.js";
import ToolbarPopoverTemplate from "./generated/templates/ToolbarPopoverTemplate.lit.js";
import ToolbarPopoverCss from "./generated/themes/ToolbarPopover.css.js";
import ToolbarAlign from "./types/ToolbarAlign.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
import HasPopup from "./types/HasPopup.js";
import "./ToolbarItem.js";
import { getRegisteredToolbarItem, getRegisteredStyles, getRegisteredStaticAreaStyles, getRegisteredDependencies, } from "./ToolbarRegistry.js";
import Button from "./Button.js";
import Popover from "./Popover.js";
function calculateCSSREMValue(styleSet, propertyName) {
    return Number(styleSet.getPropertyValue(propertyName).replace("rem", "")) * parseInt(getComputedStyle(document.body).getPropertyValue("font-size"));
}
function parsePxValue(styleSet, propertyName) {
    return Number(styleSet.getPropertyValue(propertyName).replace("px", ""));
}
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar` component is used to create a horizontal layout with items.
 * The items can be overflowing in a popover, when the space is not enough to show all of them.
 *
 * ### Keyboard Handling
 * The `ui5-toolbar` provides advanced keyboard handling.
 *
 * - The control is not interactive, but can contain of interactive elements
 * - [Tab] - iterates through elements
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Toolbar.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
let Toolbar = Toolbar_1 = class Toolbar extends UI5Element {
    static get styles() {
        const styles = getRegisteredStyles();
        return [
            ToolbarCss,
            ...styles,
        ];
    }
    static get staticAreaStyles() {
        const styles = getRegisteredStaticAreaStyles();
        return [
            ToolbarPopoverCss,
            ...styles,
        ];
    }
    static get dependencies() {
        const deps = getRegisteredDependencies();
        return [
            Popover,
            Button,
            ...deps,
        ];
    }
    static async onDefine() {
        Toolbar_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    constructor() {
        super();
        this.itemsToOverflow = [];
        this.itemsWidth = 0;
        this.popoverOpen = false;
        this.itemsWidthMeasured = false;
        this.ITEMS_WIDTH_MAP = new Map();
        this._onResize = this.onResize.bind(this);
        this._onInteract = (e) => this.onInteract(e);
    }
    /**
     * Read-only members
     */
    get overflowButtonSize() {
        return this.overflowButtonDOM?.getBoundingClientRect().width || 0;
    }
    get padding() {
        const toolbarComputedStyle = getComputedStyle(this.getDomRef());
        return calculateCSSREMValue(toolbarComputedStyle, getScopedVarName("--_ui5-toolbar-padding-left"))
            + calculateCSSREMValue(toolbarComputedStyle, getScopedVarName("--_ui5-toolbar-padding-right"));
    }
    get subscribedEvents() {
        return this.items
            .map((item) => Array.from(item.subscribedEvents.keys()))
            .flat()
            // remove duplicates
            .filter((value, index, self) => self.indexOf(value) === index);
    }
    get alwaysOverflowItems() {
        return this.items.filter((item) => item.overflowPriority === ToolbarItemOverflowBehavior.AlwaysOverflow);
    }
    get movableItems() {
        return this.items.filter((item) => item.overflowPriority !== ToolbarItemOverflowBehavior.AlwaysOverflow && item.overflowPriority !== ToolbarItemOverflowBehavior.NeverOverflow);
    }
    get overflowItems() {
        // spacers are ignored
        const overflowItems = this.getItemsInfo(this.itemsToOverflow.filter(item => !item.ignoreSpace));
        return this.reverseOverflow ? overflowItems.reverse() : overflowItems;
    }
    get standardItems() {
        return this.getItemsInfo(this.items.filter(item => this.itemsToOverflow.indexOf(item) === -1));
    }
    get hideOverflowButton() {
        return this.itemsToOverflow.filter(item => !(item.ignoreSpace || item.isSeparator)).length === 0;
    }
    get classes() {
        return {
            items: {
                "ui5-tb-items": true,
                "ui5-tb-items-full-width": this.hasFlexibleSpacers,
            },
            overflow: {
                "ui5-overflow-list--alignleft": this.hasItemWithText,
            },
            overflowButton: {
                "ui5-tb-item": true,
                "ui5-tb-overflow-btn": true,
                "ui5-tb-overflow-btn-hidden": this.hideOverflowButton,
            },
        };
    }
    get interactiveItemsCount() {
        return this.items.filter((item) => item.isInteractive).length;
    }
    /**
     * Accessibility
     */
    get hasAriaSemantics() {
        return this.interactiveItemsCount > 1;
    }
    get accessibleRole() {
        return this.hasAriaSemantics ? "toolbar" : undefined;
    }
    get ariaLabelText() {
        return this.hasAriaSemantics ? getEffectiveAriaLabelText(this) : undefined;
    }
    get accInfo() {
        return {
            root: {
                role: this.accessibleRole,
                accessibleName: this.ariaLabelText,
            },
            overflowButton: {
                accessibleName: Toolbar_1.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL),
                tooltip: Toolbar_1.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL),
                accessibilityAttributes: {
                    expanded: this.overflowButtonDOM?.accessibilityAttributes.expanded,
                    hasPopup: HasPopup.Menu.toLowerCase(),
                },
            },
        };
    }
    /**
     * Toolbar Overflow Popover
     */
    get overflowButtonDOM() {
        return this.shadowRoot.querySelector(".ui5-tb-overflow-btn");
    }
    get itemsDOM() {
        return this.shadowRoot.querySelector(".ui5-tb-items");
    }
    get hasItemWithText() {
        return this.itemsToOverflow.some((item) => item.containsText);
    }
    get hasFlexibleSpacers() {
        return this.items.some((item) => item.hasFlexibleWidth);
    }
    /**
     * Lifecycle methods
     */
    onEnterDOM() {
        ResizeHandler.register(this, this._onResize);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._onResize);
    }
    onInvalidation(changeInfo) {
        if (changeInfo.reason === "childchange" && changeInfo.child === this.itemsToOverflow[0]) {
            this.onToolbarItemChange();
        }
    }
    onBeforeRendering() {
        this.detachListeners();
        this.attachListeners();
    }
    async onAfterRendering() {
        await renderFinished();
        this.storeItemsWidth();
        this.processOverflowLayout();
    }
    /**
     * Returns if the overflow popup is open.
     * @public
     */
    async isOverflowOpen() {
        const overflowPopover = await this.getOverflowPopover();
        return overflowPopover.isOpen();
    }
    async openOverflow() {
        const overflowPopover = await this.getOverflowPopover();
        overflowPopover.showAt(this.overflowButtonDOM);
        this.reverseOverflow = overflowPopover.actualPlacementType === "Top";
    }
    async closeOverflow() {
        const overflowPopover = await this.getOverflowPopover();
        overflowPopover.close();
    }
    toggleOverflow() {
        if (this.popoverOpen) {
            this.closeOverflow();
        }
        else {
            this.openOverflow();
        }
    }
    async getOverflowPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector(".ui5-overflow-popover");
    }
    /**
     * Layout management
     */
    processOverflowLayout() {
        const containerWidth = this.offsetWidth - this.padding;
        const contentWidth = this.itemsWidth;
        const overflowSpace = contentWidth - containerWidth + this.overflowButtonSize;
        // skip calculation if the width has not been changed or if the items width has not been changed
        if (this.width === containerWidth && this.contentWidth === contentWidth) {
            return;
        }
        this.distributeItems(overflowSpace);
        this.width = containerWidth;
        this.contentWidth = contentWidth;
    }
    storeItemsWidth() {
        let totalWidth = 0;
        this.items.forEach((item) => {
            const itemWidth = this.getItemWidth(item);
            totalWidth += itemWidth;
            this.ITEMS_WIDTH_MAP.set(item._id, itemWidth);
        });
        this.itemsWidth = totalWidth;
    }
    distributeItems(overflowSpace = 0) {
        const movableItems = this.movableItems.reverse();
        let index = 0;
        let currentItem = movableItems[index];
        this.itemsToOverflow = [];
        // distribute items that always overflow
        this.distributeItemsThatAlwaysOverflow();
        while (overflowSpace > 0 && currentItem) {
            this.itemsToOverflow.unshift(currentItem);
            overflowSpace -= this.getCachedItemWidth(currentItem?._id) || 0;
            index++;
            currentItem = movableItems[index];
        }
        // If the last bar item is a spacer, force it to the overflow even if there is enough space for it
        if (index < movableItems.length) {
            let lastItem = movableItems[index];
            while (index <= movableItems.length - 1 && lastItem.isSeparator) {
                this.itemsToOverflow.unshift(lastItem);
                index++;
                lastItem = movableItems[index];
            }
        }
        this.setSeperatorsVisibilityInOverflow();
    }
    distributeItemsThatAlwaysOverflow() {
        this.alwaysOverflowItems.forEach((item) => {
            this.itemsToOverflow.push(item);
        });
    }
    setSeperatorsVisibilityInOverflow() {
        this.itemsToOverflow.forEach((item, idx, items) => {
            if (item.isSeparator) {
                item.visible = this.shouldShowSeparatorInOverflow(idx, items);
            }
        });
    }
    shouldShowSeparatorInOverflow(separatorIdx, overflowItems) {
        let foundPrevNonSeparatorItem = false;
        let foundNextNonSeperatorItem = false;
        // search for non-separator item before and after the seperator
        overflowItems.forEach((item, idx) => {
            if (idx < separatorIdx && !item.isSeparator) {
                foundPrevNonSeparatorItem = true;
            }
            if (idx > separatorIdx && !item.isSeparator) {
                foundNextNonSeperatorItem = true;
            }
        });
        return foundPrevNonSeparatorItem && foundNextNonSeperatorItem;
    }
    /**
     * Event Handlers
     */
    onOverflowPopoverClosed() {
        this.popoverOpen = false;
        if (this.overflowButtonDOM) {
            this.overflowButtonDOM.accessibilityAttributes.expanded = false;
        }
    }
    onOverflowPopoverOpened() {
        this.popoverOpen = true;
        if (this.overflowButtonDOM) {
            this.overflowButtonDOM.accessibilityAttributes.expanded = true;
        }
    }
    onResize() {
        if (!this.itemsWidth) {
            return;
        }
        this.closeOverflow();
        this.processOverflowLayout();
    }
    onInteract(e) {
        const target = e.target;
        const item = target.closest(".ui5-tb-item") || target.closest(".ui5-tb-popover-item");
        if (target === this.overflowButtonDOM) {
            this.toggleOverflow();
            return;
        }
        if (!item) {
            return;
        }
        const refItemId = target.getAttribute("data-ui5-external-action-item-id");
        if (refItemId) {
            const abstractItem = this.getItemByID(refItemId);
            const eventType = e.type;
            const eventTypeNonPrefixed = e.type.replace("ui5-", "");
            const prevented = !abstractItem?.fireEvent(eventTypeNonPrefixed, e.detail, true);
            const eventOptions = abstractItem?.subscribedEvents.get(eventType) || abstractItem?.subscribedEvents.get(eventTypeNonPrefixed);
            if (prevented || abstractItem?.preventOverflowClosing || eventOptions?.preventClosing) {
                return;
            }
            this.closeOverflow();
        }
    }
    /**
     * Private members
     */
    async attachListeners() {
        const popover = await this.getOverflowPopover();
        this.subscribedEvents.forEach((e) => {
            this.itemsDOM?.addEventListener(e, this._onInteract);
            popover?.addEventListener(e, this._onInteract);
        });
    }
    async detachListeners() {
        const popover = await this.getOverflowPopover();
        this.subscribedEvents.forEach((e) => {
            this.itemsDOM?.removeEventListener(e, this._onInteract);
            popover?.removeEventListener(e, this._onInteract);
        });
    }
    onToolbarItemChange() {
        // some items were updated reset the cache and trigger a re-render
        this.itemsToOverflow = [];
        this.contentWidth = 0; // re-render
    }
    getItemsInfo(items) {
        return items.map((item) => {
            const ElementClass = getRegisteredToolbarItem(item.constructor.name);
            if (!ElementClass) {
                return null;
            }
            const toolbarItem = {
                toolbarTemplate: executeTemplate(ElementClass.toolbarTemplate, item),
                toolbarPopoverTemplate: executeTemplate(ElementClass.toolbarPopoverTemplate, item),
            };
            return toolbarItem;
        });
    }
    getItemWidth(item) {
        // Spacer width - always 0 for flexible spacers, so that they shrink, otherwise - measure the width normally
        if (item.ignoreSpace || item.isSeparator) {
            return 0;
        }
        const id = item._id;
        // Measure rendered width for spacers with width, and for normal items
        const renderedItem = this.getRegisteredToolbarItemByID(id);
        let itemWidth = 0;
        if (renderedItem) {
            const ItemCSSStyleSet = getComputedStyle(renderedItem);
            itemWidth = renderedItem.offsetWidth + parsePxValue(ItemCSSStyleSet, "margin-inline-end")
                + parsePxValue(ItemCSSStyleSet, "margin-inline-start");
        }
        else {
            itemWidth = this.getCachedItemWidth(id) || 0;
        }
        return Math.ceil(itemWidth);
    }
    getCachedItemWidth(id) {
        return this.ITEMS_WIDTH_MAP.get(id);
    }
    getItemByID(id) {
        return this.items.find(item => item._id === id);
    }
    getRegisteredToolbarItemByID(id) {
        return this.itemsDOM.querySelector(`[data-ui5-external-action-item-id="${id}"]`);
    }
};
__decorate([
    property({ type: ToolbarAlign, defaultValue: ToolbarAlign.End })
], Toolbar.prototype, "alignContent", void 0);
__decorate([
    property({ validator: Integer })
], Toolbar.prototype, "width", void 0);
__decorate([
    property({ validator: Integer })
], Toolbar.prototype, "contentWidth", void 0);
__decorate([
    property({ type: Boolean })
], Toolbar.prototype, "reverseOverflow", void 0);
__decorate([
    property()
], Toolbar.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], Toolbar.prototype, "accessibleNameRef", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], Toolbar.prototype, "items", void 0);
Toolbar = Toolbar_1 = __decorate([
    customElement({
        tag: "ui5-toolbar",
        languageAware: true,
        renderer: litRender,
        template: ToolbarTemplate,
        staticAreaTemplate: ToolbarPopoverTemplate,
    })
], Toolbar);
Toolbar.define();
export default Toolbar;
//# sourceMappingURL=Toolbar.js.map