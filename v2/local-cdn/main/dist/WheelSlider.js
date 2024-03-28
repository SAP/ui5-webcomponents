var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { isDown, isUp, isPageUp, isPageDown, } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/navigation-up-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import WheelSliderTemplate from "./generated/templates/WheelSliderTemplate.lit.js";
import Button from "./Button.js";
// Styles
import WheelSliderCss from "./generated/themes/WheelSlider.css.js";
const CELL_SIZE_COMPACT = 32;
const CELL_SIZE_COZY = 46;
/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/WheelSlider.js";`
 * @constructor
 * @extends UI5Element
 * @private
 * @since 1.0.0-rc.6
 */
let WheelSlider = class WheelSlider extends UI5Element {
    constructor() {
        super();
        this._currentElementIndex = 0;
        this._itemsToShow = [];
        this._scroller = new ScrollEnablement(this);
        this._scroller.attachEvent("scroll", this._updateScrolling.bind(this));
        this._scroller.attachEvent("mouseup", this._handleScrollTouchEnd.bind(this));
        this._scroller.attachEvent("touchend", this._handleScrollTouchEnd.bind(this));
    }
    onBeforeRendering() {
        if (!this.expanded && this.cyclic) {
            const index = this._currentElementIndex % this._items.length;
            this._currentElementIndex = (this._timesMultipliedOnCyclic() / 2) * this._items.length + index;
        }
        if (!this.value) {
            this.value = this._items[0];
        }
        this._buildItemsToShow();
    }
    onAfterRendering() {
        if (!this._scroller.scrollContainer) {
            this._scroller.scrollContainer = this.shadowRoot.querySelector(`[id="${this._id}--wrapper"]`);
        }
        if (!this.expanded) {
            this._scroller.scrollTo(0, 0);
        }
        if (this.expanded) {
            const elements = this.shadowRoot.querySelectorAll(".ui5-wheelslider-item");
            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                if (el.textContent === this.value) {
                    this._selectElementByIndex(Number(el.dataset.itemIndex) + this._getCurrentRepetition() * this._items.length);
                    return true;
                }
            }
            this._selectElement(elements[0]);
        }
    }
    get classes() {
        return {
            root: {
                "ui5-wheelslider-root": true,
                "ui5-phone": isPhone(),
            },
        };
    }
    expandSlider() {
        this.expanded = true;
        this.fireEvent("expand", {});
    }
    collapseSlider() {
        this.expanded = false;
        this.fireEvent("collapse", {});
    }
    get _itemCellHeight() {
        const defaultSize = this._density === "compact" ? CELL_SIZE_COMPACT : CELL_SIZE_COZY;
        if (this.shadowRoot.querySelectorAll(".ui5-wheelslider-item").length) {
            const itemComputedStyle = getComputedStyle(this.shadowRoot.querySelector(".ui5-wheelslider-item"));
            const itemHeightValue = itemComputedStyle.getPropertyValue(getScopedVarName("--_ui5_wheelslider_item_height"));
            const onlyDigitsValue = itemHeightValue.replace("px", "");
            return Number(onlyDigitsValue) || defaultSize;
        }
        return defaultSize;
    }
    _updateScrolling() {
        const cellSizeInPx = this._itemCellHeight, scrollWhere = this._scroller.scrollContainer.scrollTop;
        let offsetIndex;
        if (!scrollWhere) {
            return;
        }
        offsetIndex = Math.round(scrollWhere / cellSizeInPx);
        if (this.value === this._itemsToShow[offsetIndex].value) {
            return;
        }
        if (this.cyclic) {
            const newIndex = this._handleArrayBorderReached(offsetIndex);
            if (offsetIndex !== newIndex) {
                offsetIndex = newIndex;
            }
        }
        this.value = this._itemsToShow[offsetIndex].value;
        this._currentElementIndex = offsetIndex;
    }
    _handleScrollTouchEnd() {
        if (this.expanded) {
            this._selectElementByIndex(this._currentElementIndex);
        }
    }
    _selectElement(element) {
        if (element && element.textContent && this._items.indexOf(element.textContent) > -1) {
            this._currentElementIndex = Number(element.dataset.itemIndex);
            this._selectElementByIndex(this._currentElementIndex);
        }
    }
    _getCurrentRepetition() {
        if (this._currentElementIndex) {
            return Math.floor(this._currentElementIndex / this._items.length);
        }
        if (this._items.length > 0 && this.cyclic) {
            return 1;
        }
        return 0;
    }
    _selectElementByIndex(currentIndex) {
        let index = currentIndex;
        const itemsCount = this._itemsToShow.length;
        const cellSizeInPx = this._itemCellHeight;
        const scrollBy = cellSizeInPx * index;
        if (this.cyclic) {
            index = this._handleArrayBorderReached(index);
        }
        if (index < itemsCount && index > -1) {
            this._scroller.scrollTo(0, scrollBy, 5, 100); // sometimes the container isn't painted yet so retry 5 times (although it succeeds on the 1st)
            this._currentElementIndex = index;
            this.value = this._items[index - (this._getCurrentRepetition() * this._items.length)];
            this.fireEvent("select", { value: this.value });
        }
    }
    _timesMultipliedOnCyclic() {
        const minElementsInCyclicWheelSlider = 70;
        const repetitionCount = Math.round(minElementsInCyclicWheelSlider / this._items.length);
        const minRepetitionCount = 3;
        return Math.max(minRepetitionCount, repetitionCount);
    }
    _buildItemsToShow() {
        let itemsToShow = this._items;
        if (this.cyclic) {
            if (itemsToShow.length < this._items.length * this._timesMultipliedOnCyclic()) {
                for (let i = 0; i < this._timesMultipliedOnCyclic(); i++) {
                    itemsToShow = itemsToShow.concat(this._items);
                }
            }
        }
        this._itemsToShow = itemsToShow.map(value => {
            return {
                value,
                "selected": (value === this.value),
            };
        });
    }
    _handleArrayBorderReached(currentIndex) {
        const arrayLength = this._itemsToShow.length;
        const maxVisibleElementsOnOneSide = 7;
        let index = currentIndex;
        if (maxVisibleElementsOnOneSide > index) {
            index += this._items.length * 2;
        }
        else if (index > arrayLength - maxVisibleElementsOnOneSide) {
            index -= this._items.length * 2;
        }
        return index;
    }
    /**
     * The listener for this event can't be passive as it calls preventDefault()
     * @param e Wheel Event
     * @private
     */
    _handleWheel(e) {
        if (!e) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        if (e.timeStamp === this._prevWheelTimestamp || !this.expanded) {
            return;
        }
        if (this._prevWheelTimestamp && (e.timeStamp < this._prevWheelTimestamp + 250 || !this.expanded)) {
            return;
        }
        if (e.deltaY > 0) {
            this._itemUp();
        }
        else if (e.deltaY < 0) {
            this._itemDown();
        }
        this._prevWheelTimestamp = e.timeStamp;
    }
    _onclick(e) {
        const target = e.target;
        if (!target.classList.contains("ui5-wheelslider-item")) {
            return;
        }
        if (this.expanded) {
            this.value = target.textContent || "";
            this._selectElement(target);
            this.fireEvent("select", { value: this.value });
        }
        else {
            this.expanded = true;
        }
    }
    _onArrowDown(e) {
        e.preventDefault();
        this._itemDown();
    }
    _onArrowUp(e) {
        e.preventDefault();
        this._itemUp();
    }
    _itemDown() {
        const nextElementIndex = this._currentElementIndex + 1;
        this._selectElementByIndex(nextElementIndex);
    }
    _itemUp() {
        const nextElementIndex = this._currentElementIndex - 1;
        this._selectElementByIndex(nextElementIndex);
    }
    _onkeydown(e) {
        if (!this.expanded) {
            return;
        }
        if (isUp(e)) {
            this._onArrowUp(e);
        }
        if (isDown(e)) {
            this._onArrowDown(e);
        }
        if (isPageDown(e)) {
            this._selectLimitCell(e, false);
        }
        if (isPageUp(e)) {
            this._selectLimitCell(e, true);
        }
    }
    _selectLimitCell(e, isMax) {
        e.preventDefault();
        const intexIncrease = this.cyclic ? this._items.length : 0;
        if (isMax) {
            this._selectElementByIndex(this._items.length - 1 + intexIncrease);
        }
        else {
            this._selectElementByIndex(intexIncrease);
        }
    }
};
__decorate([
    property({ type: Boolean })
], WheelSlider.prototype, "disabled", void 0);
__decorate([
    property({ defaultValue: "0" })
], WheelSlider.prototype, "value", void 0);
__decorate([
    property({ defaultValue: "" })
], WheelSlider.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], WheelSlider.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], WheelSlider.prototype, "cyclic", void 0);
__decorate([
    property({ multiple: true, compareValues: true })
], WheelSlider.prototype, "_items", void 0);
__decorate([
    property({ type: Object, multiple: true })
], WheelSlider.prototype, "_itemsToShow", void 0);
__decorate([
    property()
], WheelSlider.prototype, "_density", void 0);
WheelSlider = __decorate([
    customElement({
        tag: "ui5-wheelslider",
        renderer: litRender,
        styles: WheelSliderCss,
        template: WheelSliderTemplate,
        dependencies: [Button],
    })
    /**
     * Fires when new value is selected.
     * @public
     * @param {string} value The selected value.
     */
    ,
    event("select", {
        detail: {
            /**
             * @public
             */
            value: {
                type: String,
            },
        },
    })
    /**
     * Fires when the wheel slider is expanded.
     * @public
     */
    ,
    event("expand")
    /**
     * Fires when the wheel slider is collapsed.
     * @public
     */
    ,
    event("collapse")
], WheelSlider);
WheelSlider.define();
export default WheelSlider;
//# sourceMappingURL=WheelSlider.js.map