var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/circle-task-2.js";
import "@ui5/webcomponents-icons/dist/arrow-right.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import SideNavigationItemTemplate from "./generated/templates/SideNavigationItemTemplate.lit.js";
// Styles
import SideNavigationItemCss from "./generated/themes/SideNavigationItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * Represents a navigation action. It can provide sub items.
 * The `ui5-side-navigation-item` is used within `ui5-side-navigation` or `ui5-side-navigation-group` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @abstract
 * @public
 * @since 1.0.0-rc.8
 */
let SideNavigationItem = class SideNavigationItem extends SideNavigationSelectableItemBase {
    constructor() {
        super(...arguments);
        this._onToggleClick = (e) => {
            e.stopPropagation();
            this.expanded = !this.expanded;
        };
        this._onkeydown = (e) => {
            if (isLeft(e)) {
                this.expanded = false;
                return;
            }
            if (isRight(e)) {
                this.expanded = true;
                return;
            }
            super._onkeydown(e);
        };
        this._onkeyup = (e) => {
            super._onkeyup(e);
        };
        this._onfocusin = (e) => {
            super._onfocusin(e);
        };
        this._onclick = (e) => {
            if (!this.sideNavCollapsed
                && this.wholeItemToggleable
                && e.pointerType === "mouse") {
                e.preventDefault();
                e.stopPropagation();
                this.expanded = !this.expanded;
                return;
            }
            super._onclick(e);
        };
        this._onfocusout = () => {
            if (!this.sideNavCollapsed) {
                return;
            }
            this.getDomRef().classList.remove("ui5-sn-item-no-hover-effect");
        };
        this._onmouseenter = () => {
            if (!this.sideNavCollapsed) {
                return;
            }
            this.getDomRef().classList.remove("ui5-sn-item-no-hover-effect");
        };
        this._onmouseleave = () => {
            if (!this.sideNavCollapsed || !this._selected) {
                return;
            }
            this.getDomRef().classList.add("ui5-sn-item-no-hover-effect");
        };
    }
    get overflowItems() {
        return [this];
    }
    get selectableItems() {
        return [this, ...this.items];
    }
    get focusableItems() {
        if (this.sideNavCollapsed) {
            return [this];
        }
        if (this.expanded) {
            return [this, ...this.items];
        }
        return [this];
    }
    get allItems() {
        return [this, ...this.items];
    }
    get _ariaHasPopup() {
        if (!this.disabled && this.sideNavCollapsed && this.items.length) {
            return "tree";
        }
        return undefined;
    }
    get _ariaChecked() {
        if (this.isOverflow) {
            return undefined;
        }
        return this.selected;
    }
    get _groupId() {
        if (!this.items.length) {
            return undefined;
        }
        return `${this._id}-group`;
    }
    get _expanded() {
        if (!this.items.length) {
            return undefined;
        }
        return this.expanded;
    }
    get _toggleIconName() {
        return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
    }
    get classesArray() {
        const classes = super.classesArray;
        if (!this.disabled && this.parentNode.collapsed && this.items.length) {
            classes.push("ui5-sn-item-with-expander");
        }
        if (this._fixed) {
            classes.push("ui5-sn-item-fixed");
        }
        return classes;
    }
    get _selected() {
        if (this.sideNavCollapsed) {
            return this.selected || this.items.some(item => item.selected);
        }
        return this.selected;
    }
};
__decorate([
    property({ type: Boolean })
], SideNavigationItem.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationItem.prototype, "_fixed", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], SideNavigationItem.prototype, "items", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationItem.prototype, "wholeItemToggleable", void 0);
SideNavigationItem = __decorate([
    customElement({
        tag: "ui5-side-navigation-item",
        renderer: litRender,
        template: SideNavigationItemTemplate,
        styles: SideNavigationItemCss,
        dependencies: [
            Icon,
        ],
    })
], SideNavigationItem);
SideNavigationItem.define();
export default SideNavigationItem;
//# sourceMappingURL=SideNavigationItem.js.map