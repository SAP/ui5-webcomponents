var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popover_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { isIOS } from "@ui5/webcomponents-base/dist/Device.js";
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import { getClosedPopupParent } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import clamp from "@ui5/webcomponents-base/dist/util/clamp.js";
import isElementContainingBlock from "@ui5/webcomponents-base/dist/util/isElementContainingBlock.js";
import getParentElement from "@ui5/webcomponents-base/dist/util/getParentElement.js";
import Popup from "./Popup.js";
import PopoverPlacementType from "./types/PopoverPlacementType.js";
import PopoverVerticalAlign from "./types/PopoverVerticalAlign.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import { addOpenedPopover, removeOpenedPopover } from "./popup-utils/PopoverRegistry.js";
// Template
import PopoverTemplate from "./generated/templates/PopoverTemplate.lit.js";
// Styles
import browserScrollbarCSS from "./generated/themes/BrowserScrollbar.css.js";
import PopupsCommonCss from "./generated/themes/PopupsCommon.css.js";
import PopoverCss from "./generated/themes/Popover.css.js";
const ARROW_SIZE = 8;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-popover` component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * ### Structure
 *
 * The popover has three main areas:
 *
 * - Header (optional)
 * - Content
 * - Footer (optional)
 *
 * **Note:** The `ui5-popover` is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * `modal` property.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Popover.js";`
 *
 * **Note: ** We recommend placing popup-like components (`ui5-dialog` and `ui5-popover`)
 * outside any other components. Preferably, the popup-like components should be placed
 * in an upper level HTML element. Otherwise, in some cases the parent HTML elements can break
 * the position and/or z-index management of the popup-like components.
 *
 * **Note:** We don't recommend nesting popup-like components (`ui5-dialog`, `ui5-popover`).
 * @constructor
 * @extends Popup
 * @since 1.0.0-rc.6
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
let Popover = Popover_1 = class Popover extends Popup {
    static get VIEWPORT_MARGIN() {
        return 10; // px
    }
    constructor() {
        super();
    }
    onAfterRendering() {
        super.onAfterRendering();
        if (!this.isOpen() && this.open) {
            let opener;
            if (this.opener instanceof HTMLElement) {
                opener = this.opener;
            }
            else if (typeof this.opener === "string") {
                opener = this.getRootNode().getElementById(this.opener) || document.getElementById(this.opener);
            }
            if (!opener) {
                console.warn("Valid opener id is required."); // eslint-disable-line
                return;
            }
            this.showAt(opener);
        }
        else if (this.isOpen() && !this.open) {
            this.close();
        }
    }
    isOpenerClicked(e) {
        const target = e.target;
        if (target === this._opener) {
            return true;
        }
        const ui5ElementTarget = target;
        if (ui5ElementTarget.getFocusDomRef && ui5ElementTarget.getFocusDomRef() === this._opener) {
            return true;
        }
        return e.composedPath().indexOf(this._opener) > -1;
    }
    /**
     * Shows the popover.
     * @param opener the element that the popover is shown at
     * @param [preventInitialFocus=false] prevents applying the focus inside the popover
     * @public
     * @returns Resolved when the popover is open
     */
    async showAt(opener, preventInitialFocus = false) {
        if (!opener || this.opened) {
            return;
        }
        this._opener = opener;
        this._openerRect = opener.getBoundingClientRect();
        await super._open(preventInitialFocus);
    }
    /**
     * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
     * @private
     */
    _addOpenedPopup() {
        addOpenedPopover(this);
    }
    /**
     * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
     * @private
     */
    _removeOpenedPopup() {
        removeOpenedPopover(this);
    }
    shouldCloseDueToOverflow(placement, openerRect) {
        const threshold = 32;
        const limits = {
            "Right": openerRect.right,
            "Left": openerRect.left,
            "Top": openerRect.top,
            "Bottom": openerRect.bottom,
        };
        const closedPopupParent = getClosedPopupParent(this._opener);
        let overflowsBottom = false;
        let overflowsTop = false;
        if (closedPopupParent.showAt) {
            const contentRect = closedPopupParent.contentDOM.getBoundingClientRect();
            overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
            overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
        }
        return (limits[placement] < 0 || (limits[placement] + threshold > closedPopupParent.innerHeight)) || overflowsBottom || overflowsTop;
    }
    shouldCloseDueToNoOpener(openerRect) {
        return openerRect.top === 0
            && openerRect.bottom === 0
            && openerRect.left === 0
            && openerRect.right === 0;
    }
    isOpenerOutsideViewport(openerRect) {
        return openerRect.bottom < 0
            || openerRect.top > window.innerHeight
            || openerRect.right < 0
            || openerRect.left > window.innerWidth;
    }
    /**
     * @override
     */
    _resize() {
        super._resize();
        if (this.opened) {
            this.reposition();
        }
    }
    reposition() {
        this._show();
    }
    _show() {
        if (!this.opened) {
            this._showOutsideViewport();
        }
        const popoverSize = this.getPopoverSize();
        let placement;
        if (popoverSize.width === 0 || popoverSize.height === 0) {
            // size can not be determined properly at this point, popover will be shown with the next reposition
            return;
        }
        if (this.isOpen()) {
            // update opener rect if it was changed during the popover being opened
            this._openerRect = this._opener.getBoundingClientRect();
        }
        if (this.shouldCloseDueToNoOpener(this._openerRect) && this.isFocusWithin() && this._oldPlacement) {
            // reuse the old placement as the opener is not available,
            // but keep the popover open as the focus is within
            placement = this._oldPlacement;
        }
        else {
            placement = this.calcPlacement(this._openerRect, popoverSize);
        }
        if (this._preventRepositionAndClose || this.isOpenerOutsideViewport(this._openerRect)) {
            return this.close();
        }
        this._oldPlacement = placement;
        this.actualPlacementType = placement.placementType;
        let left = clamp(this._left, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientWidth - popoverSize.width - Popover_1.VIEWPORT_MARGIN);
        if (this.actualPlacementType === PopoverPlacementType.Right) {
            left = Math.max(left, this._left);
        }
        let top = clamp(this._top, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientHeight - popoverSize.height - Popover_1.VIEWPORT_MARGIN);
        if (this.actualPlacementType === PopoverPlacementType.Bottom) {
            top = Math.max(top, this._top);
        }
        this.arrowTranslateX = placement.arrow.x;
        this.arrowTranslateY = placement.arrow.y;
        top = this._adjustForIOSKeyboard(top);
        const containingBlockClientLocation = this._getContainingBlockClientLocation();
        left -= containingBlockClientLocation.left;
        top -= containingBlockClientLocation.top;
        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
        });
        if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && this._width) {
            this.style.width = this._width;
        }
    }
    /**
     * Adjust the desired top position to compensate for shift of the screen
     * caused by opened keyboard on iOS which affects all elements with position:fixed.
     * @private
     * @param top The target top in px.
     * @returns The adjusted top in px.
     */
    _adjustForIOSKeyboard(top) {
        if (!isIOS()) {
            return top;
        }
        const actualTop = Math.ceil(this.getBoundingClientRect().top);
        return top + (Number.parseInt(this.style.top || "0") - actualTop);
    }
    _getContainingBlockClientLocation() {
        let parentElement = getParentElement(this);
        while (parentElement) {
            if (isElementContainingBlock(parentElement)) {
                return parentElement.getBoundingClientRect();
            }
            parentElement = getParentElement(parentElement);
        }
        return { left: 0, top: 0 };
    }
    getPopoverSize() {
        const rect = this.getBoundingClientRect(), width = rect.width, height = rect.height;
        return { width, height };
    }
    _showOutsideViewport() {
        Object.assign(this.style, {
            display: this._displayProp,
            top: "-10000px",
            left: "-10000px",
        });
    }
    get arrowDOM() {
        return this.shadowRoot.querySelector(".ui5-popover-arrow");
    }
    /**
     * @private
     */
    calcPlacement(targetRect, popoverSize) {
        let left = Popover_1.VIEWPORT_MARGIN;
        let top = 0;
        const allowTargetOverlap = this.allowTargetOverlap;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        let maxHeight = clientHeight;
        let maxWidth = clientWidth;
        const placementType = this.getActualPlacementType(targetRect, popoverSize);
        this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placementType, targetRect);
        const isVertical = placementType === PopoverPlacementType.Top
            || placementType === PopoverPlacementType.Bottom;
        if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && isVertical) {
            popoverSize.width = targetRect.width;
            this._width = `${targetRect.width}px`;
        }
        else if (this.verticalAlign === PopoverVerticalAlign.Stretch && !isVertical) {
            popoverSize.height = targetRect.height;
        }
        const arrowOffset = this.hideArrow ? 0 : ARROW_SIZE;
        // calc popover positions
        switch (placementType) {
            case PopoverPlacementType.Top:
                left = this.getVerticalLeft(targetRect, popoverSize);
                top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);
                if (!allowTargetOverlap) {
                    maxHeight = targetRect.top - arrowOffset;
                }
                break;
            case PopoverPlacementType.Bottom:
                left = this.getVerticalLeft(targetRect, popoverSize);
                top = targetRect.bottom + arrowOffset;
                if (allowTargetOverlap) {
                    top = Math.max(Math.min(top, clientHeight - popoverSize.height), 0);
                }
                else {
                    maxHeight = clientHeight - targetRect.bottom - arrowOffset;
                }
                break;
            case PopoverPlacementType.Left:
                left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
                top = this.getHorizontalTop(targetRect, popoverSize);
                if (!allowTargetOverlap) {
                    maxWidth = targetRect.left - arrowOffset;
                }
                break;
            case PopoverPlacementType.Right:
                left = targetRect.left + targetRect.width + arrowOffset;
                top = this.getHorizontalTop(targetRect, popoverSize);
                if (allowTargetOverlap) {
                    left = Math.max(Math.min(left, clientWidth - popoverSize.width), 0);
                }
                else {
                    maxWidth = clientWidth - targetRect.right - arrowOffset;
                }
                break;
        }
        // correct popover positions
        if (isVertical) {
            if (popoverSize.width > clientWidth || left < Popover_1.VIEWPORT_MARGIN) {
                left = Popover_1.VIEWPORT_MARGIN;
            }
            else if (left + popoverSize.width > clientWidth - Popover_1.VIEWPORT_MARGIN) {
                left = clientWidth - Popover_1.VIEWPORT_MARGIN - popoverSize.width;
            }
        }
        else {
            if (popoverSize.height > clientHeight || top < 0) { // eslint-disable-line
                top = 0;
            }
            else if (top + popoverSize.height > clientHeight) {
                top -= top + popoverSize.height - clientHeight;
            }
        }
        this._maxHeight = Math.round(maxHeight - Popover_1.VIEWPORT_MARGIN);
        this._maxWidth = Math.round(maxWidth - Popover_1.VIEWPORT_MARGIN);
        if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
            this._left = Math.round(left);
        }
        if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
            this._top = Math.round(top);
        }
        const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));
        const arrowPos = this.getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius);
        return {
            arrow: arrowPos,
            top: this._top,
            left: this._left,
            placementType,
        };
    }
    /**
     * Calculates the position for the arrow.
     * @private
     * @param targetRect BoundingClientRect of the target element
     * @param popoverSize Width and height of the popover
     * @param left Left offset of the popover
     * @param top Top offset of the popover
     * @param isVertical If the popover is positioned vertically to the target element
     * @param borderRadius Value of the border-radius property
     * @returns  Arrow's coordinates
     */
    getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius) {
        const horizontalAlign = this._actualHorizontalAlign;
        let arrowXCentered = horizontalAlign === PopoverHorizontalAlign.Center || horizontalAlign === PopoverHorizontalAlign.Stretch;
        if (horizontalAlign === PopoverHorizontalAlign.Right && left <= targetRect.left) {
            arrowXCentered = true;
        }
        if (horizontalAlign === PopoverHorizontalAlign.Left && left + popoverSize.width >= targetRect.left + targetRect.width) {
            arrowXCentered = true;
        }
        let arrowTranslateX = 0;
        if (isVertical && arrowXCentered) {
            arrowTranslateX = targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2;
        }
        let arrowTranslateY = 0;
        if (!isVertical) {
            arrowTranslateY = targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2;
        }
        // Restricts the arrow's translate value along each dimension,
        // so that the arrow does not clip over the popover's rounded borders.
        const safeRangeForArrowY = popoverSize.height / 2 - borderRadius - ARROW_SIZE / 2;
        arrowTranslateY = clamp(arrowTranslateY, -safeRangeForArrowY, safeRangeForArrowY);
        const safeRangeForArrowX = popoverSize.width / 2 - borderRadius - ARROW_SIZE / 2;
        arrowTranslateX = clamp(arrowTranslateX, -safeRangeForArrowX, safeRangeForArrowX);
        return {
            x: Math.round(arrowTranslateX),
            y: Math.round(arrowTranslateY),
        };
    }
    /**
     * Fallbacks to new placement, prioritizing `Left` and `Right` placements.
     * @private
     */
    fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
        if (targetRect.left > popoverSize.width) {
            return PopoverPlacementType.Left;
        }
        if (clientWidth - targetRect.right > targetRect.left) {
            return PopoverPlacementType.Right;
        }
        if (clientHeight - targetRect.bottom > popoverSize.height) {
            return PopoverPlacementType.Bottom;
        }
        if (clientHeight - targetRect.bottom < targetRect.top) {
            return PopoverPlacementType.Top;
        }
    }
    getActualPlacementType(targetRect, popoverSize) {
        const placementType = this.placementType;
        let actualPlacementType = placementType;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        switch (placementType) {
            case PopoverPlacementType.Top:
                if (targetRect.top < popoverSize.height
                    && targetRect.top < clientHeight - targetRect.bottom) {
                    actualPlacementType = PopoverPlacementType.Bottom;
                }
                break;
            case PopoverPlacementType.Bottom:
                if (clientHeight - targetRect.bottom < popoverSize.height
                    && clientHeight - targetRect.bottom < targetRect.top) {
                    actualPlacementType = PopoverPlacementType.Top;
                }
                break;
            case PopoverPlacementType.Left:
                if (targetRect.left < popoverSize.width) {
                    actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
                }
                break;
            case PopoverPlacementType.Right:
                if (clientWidth - targetRect.right < popoverSize.width) {
                    actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
                }
                break;
        }
        return actualPlacementType;
    }
    getVerticalLeft(targetRect, popoverSize) {
        const horizontalAlign = this._actualHorizontalAlign;
        let left = Popover_1.VIEWPORT_MARGIN;
        switch (horizontalAlign) {
            case PopoverHorizontalAlign.Center:
            case PopoverHorizontalAlign.Stretch:
                left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
                break;
            case PopoverHorizontalAlign.Left:
                left = targetRect.left;
                break;
            case PopoverHorizontalAlign.Right:
                left = targetRect.right - popoverSize.width;
                break;
        }
        return left;
    }
    getHorizontalTop(targetRect, popoverSize) {
        let top = 0;
        switch (this.verticalAlign) {
            case PopoverVerticalAlign.Center:
            case PopoverVerticalAlign.Stretch:
                top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
                break;
            case PopoverVerticalAlign.Top:
                top = targetRect.top;
                break;
            case PopoverVerticalAlign.Bottom:
                top = targetRect.bottom - popoverSize.height;
                break;
        }
        return top;
    }
    get isModal() {
        return this.modal;
    }
    get shouldHideBackdrop() {
        return this.hideBackdrop;
    }
    get _ariaLabelledBy() {
        if (!this._ariaLabel && this._displayHeader) {
            return "ui5-popup-header";
        }
        return undefined;
    }
    get styles() {
        return {
            ...super.styles,
            root: {
                "max-height": this._maxHeight ? `${this._maxHeight}px` : "",
                "max-width": this._maxWidth ? `${this._maxWidth}px` : "",
            },
            arrow: {
                transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`,
            },
        };
    }
    get classes() {
        const allClasses = super.classes;
        allClasses.root["ui5-popover-root"] = true;
        return allClasses;
    }
    /**
     * Hook for descendants to hide header.
     */
    get _displayHeader() {
        return !!(this.header.length || this.headerText);
    }
    /**
     * Hook for descendants to hide footer.
     */
    get _displayFooter() {
        return true;
    }
    get _actualHorizontalAlign() {
        if (this.effectiveDir === "rtl") {
            if (this.horizontalAlign === PopoverHorizontalAlign.Left) {
                return PopoverHorizontalAlign.Right;
            }
            if (this.horizontalAlign === PopoverHorizontalAlign.Right) {
                return PopoverHorizontalAlign.Left;
            }
        }
        return this.horizontalAlign;
    }
};
__decorate([
    property()
], Popover.prototype, "headerText", void 0);
__decorate([
    property({ type: PopoverPlacementType, defaultValue: PopoverPlacementType.Right })
], Popover.prototype, "placementType", void 0);
__decorate([
    property({ type: PopoverHorizontalAlign, defaultValue: PopoverHorizontalAlign.Center })
], Popover.prototype, "horizontalAlign", void 0);
__decorate([
    property({ type: PopoverVerticalAlign, defaultValue: PopoverVerticalAlign.Center })
], Popover.prototype, "verticalAlign", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "modal", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "hideBackdrop", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "hideArrow", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "allowTargetOverlap", void 0);
__decorate([
    property({ validator: DOMReference })
], Popover.prototype, "opener", void 0);
__decorate([
    property({ type: Boolean })
], Popover.prototype, "disableScrolling", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateX", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateY", void 0);
__decorate([
    property({ type: PopoverPlacementType, defaultValue: PopoverPlacementType.Right })
], Popover.prototype, "actualPlacementType", void 0);
__decorate([
    property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxHeight", void 0);
__decorate([
    property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxWidth", void 0);
__decorate([
    slot({ type: HTMLElement })
], Popover.prototype, "header", void 0);
__decorate([
    slot({ type: HTMLElement })
], Popover.prototype, "footer", void 0);
Popover = Popover_1 = __decorate([
    customElement({
        tag: "ui5-popover",
        styles: [
            browserScrollbarCSS,
            PopupsCommonCss,
            PopoverCss,
        ],
        template: PopoverTemplate,
    })
], Popover);
const instanceOfPopover = (object) => {
    return "showAt" in object;
};
Popover.define();
export default Popover;
export { instanceOfPopover };
//# sourceMappingURL=Popover.js.map