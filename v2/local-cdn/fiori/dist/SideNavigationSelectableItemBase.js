var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
/**
 * Fired when the component is activated either with a
 * click/tap or by using the [Enter] or [Space] keys.
 *
 * @public
 */
let SideNavigationSelectableItemBase = class SideNavigationSelectableItemBase extends SideNavigationItemBase {
    get ariaRole() {
        if (this.sideNavCollapsed) {
            return this.isOverflow ? "menuitem" : "menuitemradio";
        }
        return "treeitem";
    }
    get _href() {
        return (!this.disabled && this.href) ? this.href : undefined;
    }
    get _target() {
        return (!this.disabled && this.target) ? this.target : undefined;
    }
    get isExternalLink() {
        return this.href && this.target === "_blank";
    }
    get _selected() {
        return this.selected;
    }
    get classesArray() {
        const classes = [];
        if (this.disabled) {
            classes.push("ui5-sn-item-disabled");
        }
        if (this._selected) {
            classes.push("ui5-sn-item-selected");
        }
        return classes;
    }
    get _classes() {
        return this.classesArray.join(" ");
    }
    get _ariaCurrent() {
        if (!this.selected) {
            return undefined;
        }
        return "page";
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this._activate(e);
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._activate(e);
        }
    }
    _onclick(e) {
        this._activate(e);
    }
    _onfocusin(e) {
        e.stopPropagation();
        this.sideNavigation?.focusItem(this);
    }
    _activate(e) {
        if (this.isOverflow) {
            this.fireEvent("click");
        }
        else {
            this.sideNavigation?._handleItemClick(e, this);
        }
    }
};
__decorate([
    property()
], SideNavigationSelectableItemBase.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationSelectableItemBase.prototype, "selected", void 0);
__decorate([
    property()
], SideNavigationSelectableItemBase.prototype, "href", void 0);
__decorate([
    property()
], SideNavigationSelectableItemBase.prototype, "target", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationSelectableItemBase.prototype, "isOverflow", void 0);
SideNavigationSelectableItemBase = __decorate([
    event("click")
    /**
     * @class
     * Base class for the navigation items that support actions.
     *
     * @constructor
     * @extends UI5Element
     * @abstract
     * @public
     * @since 1.24.0
     */
    ,
    customElement()
], SideNavigationSelectableItemBase);
export default SideNavigationSelectableItemBase;
//# sourceMappingURL=SideNavigationSelectableItemBase.js.map