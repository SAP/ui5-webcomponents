var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { isDown, isUp, } from "@ui5/webcomponents-base/dist/Keys.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import CalendarLegendTemplate from "./generated/templates/CalendarLegendTemplate.lit.js";
import CalendarLegendItem from "./CalendarLegendItem.js";
// Styles
import CalendarLegendCss from "./generated/themes/CalendarLegend.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-calendar-legend` component is designed for use within the `ui5-calendar` to display a legend.
 * Each `ui5-calendar-legend-item` represents a unique date type, specifying its visual style
 * and a corresponding textual label.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CalendarLegend.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.23.0
 */
let CalendarLegend = class CalendarLegend extends UI5Element {
    constructor() {
        super();
        this._lastFocusedItemIndex = null;
    }
    onAfterRendering() {
        if (!this._itemNavigation) {
            this._itemNavigation = new ItemNavigation(this, {
                navigationMode: NavigationMode.Horizontal,
                behavior: ItemNavigationBehavior.Static,
                getItemsCallback: () => this.focusableElements,
            });
            const focusableItemIndex = this._lastFocusedItemIndex !== null ? this._lastFocusedItemIndex : 0;
            this._itemNavigation.setCurrentItem(this.focusableElements[focusableItemIndex]);
        }
    }
    _onMouseDown(e) {
        e.stopPropagation();
        const target = e.target;
        this._itemNavigation.setCurrentItem(target);
        this._itemNavigation._focusCurrentItem();
        this._lastFocusedItemIndex = this.focusableElements.indexOf(target);
    }
    _onFocusIn(e) {
        const target = e.target;
        this.fireEvent("_calendar-legend-selection-change", {
            item: target,
        });
        this._lastFocusedItemIndex = this.focusableElements.indexOf(target);
    }
    _onFocusOut() {
        this.fireEvent("_calendar-legend-focus-out");
    }
    _onItemKeyDown(e) {
        const items = this.focusableElements;
        const itemsCount = items.length;
        const currentItem = e.target;
        const currentIndex = items.indexOf(currentItem);
        if (isDown(e)) {
            e.preventDefault();
            const nextIndex = currentIndex + 1;
            if (nextIndex < itemsCount) {
                this._itemNavigation.setCurrentItem(items[nextIndex]);
                this._itemNavigation._focusCurrentItem();
                this._lastFocusedItemIndex = nextIndex;
            }
        }
        if (isUp(e)) {
            e.preventDefault();
            const nextIndex = currentIndex - 1;
            if (nextIndex >= 0) {
                this._itemNavigation.setCurrentItem(items[nextIndex]);
                this._itemNavigation._focusCurrentItem();
                this._lastFocusedItemIndex = nextIndex;
            }
        }
    }
    get focusableElements() {
        const allFocusableItems = [...this.shadowRoot.querySelectorAll("[ui5-calendar-legend-item]"), ...this.legendItems];
        return allFocusableItems;
    }
    get legendItems() {
        const items = this.getSlottedNodes("items");
        return items.filter(item => item instanceof CalendarLegendItem);
    }
    get defaultItemsMapping() {
        const typeMapping = [
            { type: [CalendarLegendItemType.Today], hide: this.hideToday },
            { type: [CalendarLegendItemType.Selected], hide: this.hideSelectedDay },
            { type: [CalendarLegendItemType.Working], hide: this.hideWorkingDay },
            { type: [CalendarLegendItemType.NonWorking], hide: this.hideNonWorkingDay },
        ];
        return typeMapping;
    }
};
__decorate([
    property({ type: Boolean })
], CalendarLegend.prototype, "hideToday", void 0);
__decorate([
    property({ type: Boolean })
], CalendarLegend.prototype, "hideSelectedDay", void 0);
__decorate([
    property({ type: Boolean })
], CalendarLegend.prototype, "hideNonWorkingDay", void 0);
__decorate([
    property({ type: Boolean })
], CalendarLegend.prototype, "hideWorkingDay", void 0);
__decorate([
    slot({
        type: HTMLElement,
        invalidateOnChildChange: true,
        individualSlots: true,
        "default": true,
    })
], CalendarLegend.prototype, "items", void 0);
CalendarLegend = __decorate([
    customElement({
        tag: "ui5-calendar-legend",
        renderer: litRender,
        styles: CalendarLegendCss,
        template: CalendarLegendTemplate,
        dependencies: [CalendarLegendItem],
    }),
    event("_calendar-legend-selection-change", {
        detail: {
            item: { type: CalendarLegendItem },
        },
    }),
    event("_calendar-legend-focus-out")
], CalendarLegend);
CalendarLegend.define();
export default CalendarLegend;
//# sourceMappingURL=CalendarLegend.js.map