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
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
// Styles
import styles from "./generated/themes/ListItemBase.css.js";
import draggableElementStyles from "./generated/themes/DraggableElement.css.js";
/**
 * @class
 * A class to serve as a foundation
 * for the `ListItem` and `GroupHeaderListItem` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
let ListItemBase = class ListItemBase extends UI5Element {
    _onfocusin(e) {
        this.fireEvent("_request-tabindex-change", e);
        if (e.target !== this.getFocusDomRef()) {
            return;
        }
        this.focused = true;
        this.fireEvent("_focused", e);
    }
    _onfocusout() {
        this.focused = false;
    }
    _onkeydown(e) {
        if (isTabNext(e)) {
            return this._handleTabNext(e);
        }
        if (isTabPrevious(e)) {
            return this._handleTabPrevious(e);
        }
    }
    _onkeyup(e) { } // eslint-disable-line
    _handleTabNext(e) {
        if (this.shouldForwardTabAfter()) {
            if (!this.fireEvent("_forward-after", {}, true)) {
                e.preventDefault();
            }
        }
    }
    _handleTabPrevious(e) {
        const target = e.target;
        if (this.shouldForwardTabBefore(target)) {
            this.fireEvent("_forward-before");
        }
    }
    /*
    * Determines if th current list item either has no tabbable content or
    * [Tab] is performed onto the last tabbale content item.
    */
    shouldForwardTabAfter() {
        const aContent = getTabbableElements(this.getFocusDomRef());
        return aContent.length === 0 || (aContent[aContent.length - 1] === getActiveElement());
    }
    /*
    * Determines if the current list item is target of [SHIFT+TAB].
    */
    shouldForwardTabBefore(target) {
        return this.getFocusDomRef() === target;
    }
    get classes() {
        return {
            main: {
                "ui5-li-root": true,
                "ui5-li--focusable": this._focusable,
            },
        };
    }
    get _ariaDisabled() {
        return this.disabled ? true : undefined;
    }
    get _focusable() {
        return !this.disabled;
    }
    get hasConfigurableMode() {
        return false;
    }
    get _effectiveTabIndex() {
        if (!this._focusable) {
            return -1;
        }
        if (this.selected) {
            return 0;
        }
        return this.forcedTabIndex;
    }
};
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "movable", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "hasBorder", void 0);
__decorate([
    property({ defaultValue: "-1", noAttribute: true })
], ListItemBase.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "focused", void 0);
ListItemBase = __decorate([
    customElement({
        renderer: litRender,
        styles: [styles, draggableElementStyles],
    }),
    event("_request-tabindex-change"),
    event("_focused"),
    event("_forward-after"),
    event("_forward-before")
], ListItemBase);
export default ListItemBase;
//# sourceMappingURL=ListItemBase.js.map