var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popup_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { isChrome, isDesktop, isPhone, } from "@ui5/webcomponents-base/dist/Device.js";
import { getFirstFocusableElement, getLastFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import { registerUI5Element, getEffectiveAriaLabelText, getEffectiveAriaDescriptionText, getAllAccessibleDescriptionRefTexts, deregisterUI5Element, } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { hasStyle, createStyle } from "@ui5/webcomponents-base/dist/ManagedStyles.js";
import { isEnter, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import { getFocusedElement, isFocusedElementWithinNode } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import PopupTemplate from "./PopupTemplate.js";
import PopupAccessibleRole from "./types/PopupAccessibleRole.js";
import { addOpenedPopup, removeOpenedPopup } from "./popup-utils/OpenedPopupsRegistry.js";
// Styles
import popupStlyes from "./generated/themes/Popup.css.js";
import popupBlockLayerStyles from "./generated/themes/PopupBlockLayer.css.js";
import globalStyles from "./generated/themes/PopupGlobal.css.js";
const createBlockingStyle = () => {
    if (!hasStyle("data-ui5-popup-scroll-blocker")) {
        createStyle(globalStyles, "data-ui5-popup-scroll-blocker");
    }
};
createBlockingStyle();
const pageScrollingBlockers = new Set();
/**
 * @class
 * ### Overview
 * Base class for all popup Web Components.
 *
 * If you need to create your own popup-like custom UI5 Web Components.
 *
 * 1. The Popup class handles modality:
 *  - The "isModal" getter can be overridden by derivatives to provide their own conditions when they are modal or not
 *  - Derivatives may call the "blockPageScrolling" and "unblockPageScrolling" static methods to temporarily remove scrollbars on the html element
 *  - Derivatives may call the "openPopup" and "closePopup" methods which handle focus, manage the popup registry and for modal popups, manage the blocking layer
 *
 *  2. Provides blocking layer (relevant for modal popups only):
 *   - Controlled by the "open" and "close" methods
 *
 * 3. The Popup class "traps" focus:
 *  - Derivatives may call the "applyInitialFocus" method (usually when opening, to transfer focus inside the popup)
 *
 * 4. The template of this component exposes two inline partials you can override in derivatives:
 *  - beforeContent (upper part of the box, useful for header/title/close button)
 *  - afterContent (lower part, useful for footer/action buttons)
 * @constructor
 * @extends UI5Element
 * @public
 */
let Popup = Popup_1 = class Popup extends UI5Element {
    constructor() {
        super();
        /**
         * Defines if the focus should be returned to the previously focused element,
         * when the popup closes.
         * @default false
         * @public
         * @since 1.0.0-rc.8
        */
        this.preventFocusRestore = false;
        /**
         * Allows setting a custom role.
         * @default "Dialog"
         * @public
         * @since 1.10.0
         */
        this.accessibleRole = "Dialog";
        /**
         * Indicates whether initial focus should be prevented.
         * @public
         * @default false
         * @since 2.0.0
         */
        this.preventInitialFocus = false;
        /**
         * Indicates if the element is the top modal popup
         *
         * This property is calculated automatically
         * @private
         * @default false
         */
        this.isTopModalPopup = false;
        /**
         * @private
         */
        this.onPhone = false;
        /**
         * @private
         */
        this.onDesktop = false;
        this._opened = false;
        this._open = false;
        this._resizeHandlerRegistered = false;
        this._resizeHandler = this._resize.bind(this);
        this._getRealDomRef = () => {
            return this.shadowRoot.querySelector("[root-element]");
        };
    }
    onBeforeRendering() {
        this.onPhone = isPhone();
        this.onDesktop = isDesktop();
    }
    onAfterRendering() {
        renderFinished().then(() => {
            this._updateMediaRange();
        });
        if (this.open) {
            this._registerResizeHandler();
        }
        else {
            this._deregisterResizeHandler();
        }
    }
    onEnterDOM() {
        this.setAttribute("popover", "manual");
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
        this.tabIndex = -1;
        this.handleOpenOnEnterDOM();
        this.setAttribute("data-sap-ui-fastnavgroup-container", "true");
        registerUI5Element(this, this._updateAssociatedLabelsTexts.bind(this));
    }
    handleOpenOnEnterDOM() {
        if (this.open) {
            this.showPopover();
            this.openPopup();
        }
    }
    onExitDOM() {
        if (this._opened) {
            Popup_1.unblockPageScrolling(this);
            this._removeOpenedPopup();
        }
        ResizeHandler.deregister(this, this._resizeHandler);
        deregisterUI5Element(this);
    }
    /**
     * Indicates if the element is open
     * @public
     * @default false
     * @since 1.2.0
     */
    set open(value) {
        if (this._open === value) {
            return;
        }
        this._open = value;
        if (value) {
            this.openPopup();
        }
        else {
            this.closePopup();
        }
    }
    get open() {
        return this._open;
    }
    async openPopup() {
        if (this._opened) {
            return;
        }
        const prevented = !this.fireDecoratorEvent("before-open");
        if (prevented) {
            this.open = false;
            return;
        }
        if (this.isModal) {
            Popup_1.blockPageScrolling(this);
        }
        this._focusedElementBeforeOpen = getFocusedElement();
        this._show();
        this._opened = true;
        if (this.getDomRef()) {
            this._updateMediaRange();
        }
        this._addOpenedPopup();
        this.open = true;
        // initial focus, if focused element is statically created
        await this.applyInitialFocus();
        await renderFinished();
        if (this.isConnected) {
            this.fireDecoratorEvent("open");
        }
    }
    _resize() {
        this._updateMediaRange();
    }
    /**
     * Prevents the user from interacting with the content under the block layer
     */
    _preventBlockLayerFocus(e) {
        e.preventDefault();
    }
    /**
     * Temporarily removes scrollbars from the html element
     * @protected
     */
    static blockPageScrolling(popup) {
        pageScrollingBlockers.add(popup);
        if (pageScrollingBlockers.size !== 1) {
            return;
        }
        document.documentElement.classList.add("ui5-popup-scroll-blocker");
    }
    /**
     * Restores scrollbars on the html element, if needed
     * @protected
     */
    static unblockPageScrolling(popup) {
        pageScrollingBlockers.delete(popup);
        if (pageScrollingBlockers.size !== 0) {
            return;
        }
        document.documentElement.classList.remove("ui5-popup-scroll-blocker");
    }
    _scroll(e) {
        this.fireDecoratorEvent("scroll", {
            scrollTop: e.target.scrollTop,
            targetRef: e.target,
        });
    }
    _onkeydown(e) {
        const isTabOutAttempt = e.target === this._root && isTabPrevious(e);
        // if the popup is closed, focus is already moved, so Enter keydown may result in click on the newly focused element
        const isEnterOnClosedPopupChild = isEnter(e) && !this.open;
        if (isTabOutAttempt || isEnterOnClosedPopupChild) {
            e.preventDefault();
        }
    }
    _onfocusout(e) {
        // relatedTarget is the element, which will get focus. If no such element exists, focus the root.
        // This happens after the mouse is released in order to not interrupt text selection.
        if (!e.relatedTarget) {
            this._shouldFocusRoot = true;
        }
    }
    _onmousedown(e) {
        if (this.shadowRoot.contains(e.target)) {
            this._shouldFocusRoot = true;
        }
        else {
            this._shouldFocusRoot = false;
        }
    }
    _onmouseup() {
        if (this._shouldFocusRoot) {
            if (isChrome()) {
                this._root.focus();
            }
            this._shouldFocusRoot = false;
        }
    }
    /**
     * Focus trapping
     * @private
     */
    async forwardToFirst() {
        const firstFocusable = await getFirstFocusableElement(this);
        if (firstFocusable) {
            firstFocusable.focus();
        }
        else {
            this._root.focus();
        }
    }
    /**
     * Focus trapping
     * @private
     */
    async forwardToLast() {
        const lastFocusable = await getLastFocusableElement(this);
        if (lastFocusable) {
            lastFocusable.focus();
        }
        else {
            this._root.focus();
        }
    }
    /**
     * Use this method to focus the element denoted by "initialFocus", if provided,
     * or the first focusable element otherwise.
     * @protected
     */
    async applyInitialFocus() {
        if (!this.preventInitialFocus) {
            await this.applyFocus();
        }
    }
    /**
     * Focuses the element denoted by `initialFocus`, if provided,
     * or the first focusable element otherwise.
     * @public
     * @returns Promise that resolves when the focus is applied
     */
    async applyFocus() {
        // do nothing if the standard HTML autofocus is used
        if (this.querySelector("[autofocus]")) {
            return;
        }
        await this._waitForDomRef();
        if (this.getRootNode() === this) {
            return;
        }
        let element;
        if (this.initialFocus) {
            element = this.getRootNode().getElementById(this.initialFocus)
                || document.getElementById(this.initialFocus);
        }
        element = element || await getFirstFocusableElement(this) || this._root; // in case of no focusable content focus the root
        if (element) {
            if (element === this._root) {
                element.tabIndex = -1;
            }
            element.focus();
        }
    }
    isFocusWithin() {
        return isFocusedElementWithinNode(this._root);
    }
    _updateMediaRange() {
        this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
    }
    _updateAssociatedLabelsTexts() {
        this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
    }
    /**
     * Adds the popup to the "opened popups registry"
     * @protected
     */
    _addOpenedPopup() {
        addOpenedPopup(this);
    }
    /**
     * Closes the popup.
     */
    closePopup(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
        if (!this._opened) {
            return;
        }
        const prevented = !this.fireDecoratorEvent("before-close", { escPressed });
        if (prevented) {
            this.open = true;
            return;
        }
        this._opened = false;
        if (this.isModal) {
            Popup_1.unblockPageScrolling(this);
        }
        this.hide();
        this.open = false;
        if (!preventRegistryUpdate) {
            this._removeOpenedPopup();
        }
        if (!this.preventFocusRestore && !preventFocusRestore) {
            this.resetFocus();
        }
        this.fireDecoratorEvent("close");
    }
    /**
     * Removes the popup from the "opened popups registry"
     * @protected
     */
    _removeOpenedPopup() {
        removeOpenedPopup(this);
    }
    /**
     * Returns the focus to the previously focused element
     * @protected
     */
    resetFocus() {
        this._focusedElementBeforeOpen?.focus();
        this._focusedElementBeforeOpen = null;
    }
    /**
     * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
     * @protected
     */
    _show() {
        if (this.isConnected) {
            this.setAttribute("popover", "manual");
            this.showPopover();
        }
    }
    _registerResizeHandler() {
        if (!this._resizeHandlerRegistered) {
            ResizeHandler.register(this, this._resizeHandler);
            this._resizeHandlerRegistered = true;
        }
    }
    _deregisterResizeHandler() {
        if (this._resizeHandlerRegistered) {
            ResizeHandler.deregister(this, this._resizeHandler);
            this._resizeHandlerRegistered = false;
        }
    }
    /**
     * Sets "none" display to the popup
     * @protected
     */
    hide() {
        this.isConnected && this.hidePopover();
    }
    /**
     * Ensures ariaLabel is never null or empty string
     * @protected
     */
    get _ariaLabel() {
        return getEffectiveAriaLabelText(this);
    }
    get _accInfoAriaDescription() {
        return this.ariaDescriptionText || "";
    }
    get ariaDescriptionText() {
        return this._associatedDescriptionRefTexts || getEffectiveAriaDescriptionText(this);
    }
    get ariaDescriptionTextId() {
        return this.ariaDescriptionText ? "accessibleDescription" : "";
    }
    get ariaDescribedByIds() {
        return [
            this.ariaDescriptionTextId,
        ].filter(Boolean).join(" ");
    }
    get _root() {
        return this.shadowRoot.querySelector(".ui5-popup-root");
    }
    get _role() {
        return (this.accessibleRole === PopupAccessibleRole.None) ? undefined : toLowercaseEnumValue(this.accessibleRole);
    }
    get _ariaModal() {
        return this.accessibleRole === PopupAccessibleRole.None ? undefined : "true";
    }
    get contentDOM() {
        return this.shadowRoot.querySelector(".ui5-popup-content");
    }
    get styles() {
        return {
            root: {},
            content: {},
        };
    }
    get classes() {
        return {
            root: {
                "ui5-popup-root": true,
            },
            content: {
                "ui5-popup-content": true,
            },
        };
    }
};
__decorate([
    property()
], Popup.prototype, "initialFocus", void 0);
__decorate([
    property({ type: Boolean })
], Popup.prototype, "preventFocusRestore", void 0);
__decorate([
    property()
], Popup.prototype, "accessibleName", void 0);
__decorate([
    property()
], Popup.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], Popup.prototype, "accessibleRole", void 0);
__decorate([
    property()
], Popup.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], Popup.prototype, "accessibleDescriptionRef", void 0);
__decorate([
    property({ noAttribute: true })
], Popup.prototype, "_associatedDescriptionRefTexts", void 0);
__decorate([
    property()
], Popup.prototype, "mediaRange", void 0);
__decorate([
    property({ type: Boolean })
], Popup.prototype, "preventInitialFocus", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Popup.prototype, "isTopModalPopup", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Popup.prototype, "content", void 0);
__decorate([
    property({ type: Boolean })
], Popup.prototype, "onPhone", void 0);
__decorate([
    property({ type: Boolean })
], Popup.prototype, "onDesktop", void 0);
__decorate([
    property({ type: Boolean })
], Popup.prototype, "open", null);
Popup = Popup_1 = __decorate([
    customElement({
        renderer: jsxRender,
        styles: [popupStlyes, popupBlockLayerStyles],
        template: PopupTemplate,
    })
    /**
     * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening.
     * @public
     */
    ,
    event("before-open", {
        cancelable: true,
    })
    /**
     * Fired after the component is opened.
     * @public
     */
    ,
    event("open")
    /**
     * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing.
     * @public
     * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
     */
    ,
    event("before-close", {
        cancelable: true,
    })
    /**
     * Fired after the component is closed.
     * @public
     */
    ,
    event("close")
    /**
     * Fired whenever the popup content area is scrolled
     * @private
     */
    ,
    event("scroll", {
        bubbles: true,
    })
], Popup);
export default Popup;
//# sourceMappingURL=Popup.js.map