var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popup_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { isChrome, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import { getFirstFocusableElement, getLastFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import getEffectiveScrollbarStyle from "@ui5/webcomponents-base/dist/util/getEffectiveScrollbarStyle.js";
import { hasStyle, createStyle } from "@ui5/webcomponents-base/dist/ManagedStyles.js";
import { isEnter, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import { getNextZIndex, getFocusedElement, isFocusedElementWithinNode } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import PopupTemplate from "./generated/templates/PopupTemplate.lit.js";
import PopupBlockLayer from "./generated/templates/PopupBlockLayerTemplate.lit.js";
import PopupAccessibleRole from "./types/PopupAccessibleRole.js";
import { addOpenedPopup, removeOpenedPopup } from "./popup-utils/OpenedPopupsRegistry.js";
// Styles
import popupStlyes from "./generated/themes/Popup.css.js";
import popupStaticAreaStyles from "./generated/themes/PopupStaticAreaStyles.css.js";
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
 * If you need to create your own popup-like custom UI5 Web Components, it is highly recommended that you extend
 * at least Popup in order to have consistency with other popups in terms of modal behavior and z-index management.
 *
 * 1. The Popup class handles modality:
 *  - The "isModal" getter can be overridden by derivatives to provide their own conditions when they are modal or not
 *  - Derivatives may call the "blockPageScrolling" and "unblockPageScrolling" static methods to temporarily remove scrollbars on the html element
 *  - Derivatives may call the "open" and "close" methods which handle focus, manage the popup registry and for modal popups, manage the blocking layer
 *
 *  2. Provides blocking layer (relevant for modal popups only):
 *   - It is in the static area
 *   - Controlled by the "open" and "close" methods
 *
 * 3. The Popup class "traps" focus:
 *  - Derivatives may call the "applyInitialFocus" method (usually when opening, to transfer focus inside the popup)
 *
 * 4. The Popup class automatically assigns "z-index"
 *  - Each time a popup is opened, it gets a higher than the previously opened popup z-index
 *
 * 5. The template of this component exposes two inline partials you can override in derivatives:
 *  - beforeContent (upper part of the box, useful for header/title/close button)
 *  - afterContent (lower part, useful for footer/action buttons)
 * @constructor
 * @extends UI5Element
 * @public
 */
let Popup = Popup_1 = class Popup extends UI5Element {
    constructor() {
        super();
        this._resizeHandler = this._resize.bind(this);
    }
    onBeforeRendering() {
        this._blockLayerHidden = !this.isOpen() || !this.isTopModalPopup;
    }
    onAfterRendering() {
        this._updateMediaRange();
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._resizeHandler);
    }
    onExitDOM() {
        if (this.isOpen()) {
            Popup_1.unblockPageScrolling(this);
            this._removeOpenedPopup();
        }
        ResizeHandler.deregister(this, this._resizeHandler);
    }
    get _displayProp() {
        return "block";
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
        this.fireEvent("scroll", {
            scrollTop: e.target.scrollTop,
            targetRef: e.target,
        });
    }
    _onkeydown(e) {
        const isTabOutAttempt = e.target === this._root && isTabPrevious(e);
        // if the popup is closed, focus is already moved, so Enter keydown may result in click on the newly focused element
        const isEnterOnClosedPopupChild = isEnter(e) && !this.isOpen();
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
        if (!isSafari()) { // Remove when adopting native dialog
            this._root.removeAttribute("tabindex");
        }
        if (this.shadowRoot.contains(e.target)) {
            this._shouldFocusRoot = true;
        }
        else {
            this._shouldFocusRoot = false;
        }
    }
    _onmouseup() {
        if (!isSafari()) { // Remove when adopting native dialog
            this._root.tabIndex = -1;
        }
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
     * Use this method to focus the element denoted by "initialFocus", if provided, or the first focusable element otherwise.
     * @protected
     */
    async applyInitialFocus() {
        await this.applyFocus();
    }
    /**
     * Focuses the element denoted by `initialFocus`, if provided,
     * or the first focusable element otherwise.
     * @public
     * @returns Promise that resolves when the focus is applied
     */
    async applyFocus() {
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
    /**
     * Tells if the component is opened
     * @public
     */
    isOpen() {
        return this.opened;
    }
    isFocusWithin() {
        return isFocusedElementWithinNode(this._root);
    }
    /**
     * Shows the block layer (for modal popups only) and sets the correct z-index for the purpose of popup stacking
     * @protected
     */
    async _open(preventInitialFocus) {
        const prevented = !this.fireEvent("before-open", {}, true, false);
        if (prevented) {
            return;
        }
        if (this.isModal && !this.shouldHideBackdrop) {
            // create static area item ref for block layer
            this.getStaticAreaItemDomRef();
            this._blockLayerHidden = false;
            Popup_1.blockPageScrolling(this);
        }
        this._zIndex = getNextZIndex();
        this.style.zIndex = this._zIndex?.toString() || "";
        this._focusedElementBeforeOpen = getFocusedElement();
        this._show();
        if (this.getDomRef()) {
            this._updateMediaRange();
        }
        this._addOpenedPopup();
        this.opened = true;
        this.open = true;
        await renderFinished();
        if (!this._disableInitialFocus && !preventInitialFocus) {
            await this.applyInitialFocus();
        }
        this.fireEvent("after-open", {}, false, false);
    }
    _updateMediaRange() {
        this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
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
     * @public
     */
    close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
        if (!this.opened) {
            return;
        }
        const prevented = !this.fireEvent("before-close", { escPressed }, true, false);
        if (prevented) {
            return;
        }
        if (this.isModal) {
            this._blockLayerHidden = true;
            Popup_1.unblockPageScrolling(this);
        }
        this.hide();
        this.opened = false;
        this.open = false;
        if (!preventRegistryUpdate) {
            this._removeOpenedPopup();
        }
        if (!this.preventFocusRestore && !preventFocusRestore) {
            this.resetFocus();
        }
        this.fireEvent("after-close", {}, false, false);
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
        if (!this._focusedElementBeforeOpen) {
            return;
        }
        this._focusedElementBeforeOpen.focus();
        this._focusedElementBeforeOpen = null;
    }
    /**
     * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
     * @protected
     */
    _show() {
        this.style.display = this._displayProp;
    }
    /**
     * Sets "none" display to the popup
     * @protected
     */
    hide() {
        this.style.display = "none";
    }
    /**
     * Ensures ariaLabel is never null or empty string
     * @protected
     */
    get _ariaLabel() {
        return getEffectiveAriaLabelText(this);
    }
    get _root() {
        return this.shadowRoot.querySelector(".ui5-popup-root");
    }
    get _role() {
        return (this.accessibleRole === PopupAccessibleRole.None) ? undefined : this.accessibleRole.toLowerCase();
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
            blockLayer: {
                "zIndex": this._zIndex ? this._zIndex - 1 : "",
            },
        };
    }
    get classes() {
        return {
            root: {
                "ui5-popup-root": true,
                "ui5-content-native-scrollbars": getEffectiveScrollbarStyle(),
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
    property({ type: Boolean })
], Popup.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Popup.prototype, "opened", void 0);
__decorate([
    property({ defaultValue: undefined })
], Popup.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], Popup.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: PopupAccessibleRole, defaultValue: PopupAccessibleRole.Dialog })
], Popup.prototype, "accessibleRole", void 0);
__decorate([
    property()
], Popup.prototype, "mediaRange", void 0);
__decorate([
    property({ type: Boolean })
], Popup.prototype, "_disableInitialFocus", void 0);
__decorate([
    property({ type: Boolean })
], Popup.prototype, "_blockLayerHidden", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Popup.prototype, "isTopModalPopup", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Popup.prototype, "content", void 0);
Popup = Popup_1 = __decorate([
    customElement({
        renderer: litRender,
        styles: popupStlyes,
        template: PopupTemplate,
        staticAreaTemplate: PopupBlockLayer,
        staticAreaStyles: popupStaticAreaStyles,
    })
    /**
     * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening. **This event does not bubble.**
     * @public
     * @allowPreventDefault
     */
    ,
    event("before-open")
    /**
     * Fired after the component is opened. **This event does not bubble.**
     * @public
     */
    ,
    event("after-open")
    /**
     * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. **This event does not bubble.**
     * @public
     * @allowPreventDefault
     * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
     */
    ,
    event("before-close", {
        detail: {
            /**
             * @public
             */
            escPressed: {
                type: Boolean,
            },
        },
    })
    /**
     * Fired after the component is closed. **This event does not bubble.**
     * @public
     */
    ,
    event("after-close")
    /**
     * Fired whenever the popup content area is scrolled
     * @private
     */
    ,
    event("scroll")
], Popup);
export default Popup;
//# sourceMappingURL=Popup.js.map