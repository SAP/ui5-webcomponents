var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SideNavigationGroup_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { isLeft, isRight, } from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationGroupTemplate from "./generated/templates/SideNavigationGroupTemplate.lit.js";
import { SIDE_NAVIGATION_GROUP_HEADER_DESC, } from "./generated/i18n/i18n-defaults.js";
// Styles
import SideNavigationGroupCss from "./generated/themes/SideNavigationGroup.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * Represents a group of navigation actions within `ui5-side-navigation`.
 * The `ui5-side-navigation-group` can only be used inside a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";`
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @public
 * @abstract
 * @since 1.24.0
 */
let SideNavigationGroup = SideNavigationGroup_1 = class SideNavigationGroup extends SideNavigationItemBase {
    constructor() {
        super(...arguments);
        this._onkeydown = (e) => {
            if (isLeft(e)) {
                this.expanded = false;
                return;
            }
            if (isRight(e)) {
                this.expanded = true;
            }
        };
        this._onclick = () => {
            this._toggle();
        };
        this._onfocusin = (e) => {
            e.stopPropagation();
            this.sideNavigation?.focusItem(this);
        };
    }
    get overflowItems() {
        const separator1 = this.shadowRoot.querySelector(".ui5-sn-item-separator:first-child");
        const separator2 = this.shadowRoot.querySelector(".ui5-sn-item-separator:last-child");
        const overflowItems = this.items.reduce((result, item) => {
            return result.concat(item.overflowItems);
        }, new Array());
        return [separator1, ...overflowItems, separator2];
    }
    get selectableItems() {
        return this.items.reduce((result, item) => {
            return result.concat(item.selectableItems);
        }, new Array());
    }
    get focusableItems() {
        if (this.sideNavCollapsed) {
            return this.items;
        }
        if (this.expanded) {
            return this.items.reduce((result, item) => {
                return result.concat(item.focusableItems);
            }, new Array(this));
        }
        return [this];
    }
    get allItems() {
        return this.items.reduce((result, item) => {
            return result.concat(item.allItems);
        }, new Array(this));
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
    get belowGroupClassName() {
        if (this.previousElementSibling instanceof SideNavigationGroup_1) {
            return "ui5-sn-item-group-below-group";
        }
        return "";
    }
    get accDescription() {
        return SideNavigationGroup_1.i18nBundle.getText(SIDE_NAVIGATION_GROUP_HEADER_DESC);
    }
    _toggle() {
        this.expanded = !this.expanded;
    }
    static async onDefine() {
        [SideNavigationGroup_1.i18nBundle] = await Promise.all([
            getI18nBundle("@ui5/webcomponents-fiori"),
            super.onDefine(),
        ]);
    }
};
__decorate([
    property({ type: Boolean })
], SideNavigationGroup.prototype, "expanded", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], SideNavigationGroup.prototype, "items", void 0);
SideNavigationGroup = SideNavigationGroup_1 = __decorate([
    customElement({
        tag: "ui5-side-navigation-group",
        renderer: litRender,
        template: SideNavigationGroupTemplate,
        styles: SideNavigationGroupCss,
        dependencies: [
            Icon,
        ],
    })
], SideNavigationGroup);
SideNavigationGroup.define();
export default SideNavigationGroup;
//# sourceMappingURL=SideNavigationGroup.js.map