var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TableRowActionBaseTemplate from "./generated/templates/TableRowActionBaseTemplate.lit.js";
import TableRowActionBaseStyles from "./generated/themes/TableRowActionBase.css.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
let MenuConstructor;
let MenuItemConstructor;
/**
 * @class
 * The `TableRowActionBase` class serves as a foundation for table row actions.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.7.0
 * @public
 */
let TableRowActionBase = class TableRowActionBase extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the visibility of the row action.
         *
         * **Note:** Invisible row actions still take up space, allowing to hide the action while maintaining its position.
         *
         * @default false
         * @public
         */
        this.invisible = false;
    }
    static async showMenu(actions, opener) {
        if (!MenuConstructor) {
            [MenuConstructor, MenuItemConstructor] = await Promise.all([
                import("./Menu.js").then(module => module.default),
                import("./MenuItem.js").then(module => module.default),
            ]);
        }
        if (!this._menu || !this._menu.isConnected) {
            this._menu = new MenuConstructor();
            this._menu.addEventListener("item-click", ((e) => {
                const menuItem = e.detail.item;
                const rowAction = this._menuItems.get(menuItem);
                rowAction._onActionClick();
            }));
            document.body.append(this._menu);
        }
        const menuItems = actions.map(action => {
            const menuItem = new MenuItemConstructor();
            menuItem.icon = action._icon;
            menuItem.text = action._text;
            menuItem.disabled = !action._isInteractive;
            this._menuItems.set(menuItem, action);
            return menuItem;
        });
        this._menu.replaceChildren(...menuItems);
        this._menu.opener = opener;
        this._menu.open = true;
    }
    isFixedAction() {
        return false;
    }
    onEnterDOM() {
        this.toggleAttribute("_fixed", this.isFixedAction());
    }
    _onActionClick() {
        const row = this.parentElement;
        const table = row.parentElement;
        table._onRowActionClick(this);
    }
    get _text() {
        return this.getRenderInfo().text;
    }
    get _icon() {
        return this.getRenderInfo().icon;
    }
    get _isInteractive() {
        return this.getRenderInfo().interactive;
    }
};
TableRowActionBase._menuItems = new WeakMap();
__decorate([
    property({ type: Boolean })
], TableRowActionBase.prototype, "invisible", void 0);
TableRowActionBase = __decorate([
    customElement({
        renderer: litRender,
        styles: TableRowActionBaseStyles,
        template: TableRowActionBaseTemplate,
        dependencies: [Button, Icon],
    })
], TableRowActionBase);
export default TableRowActionBase;
//# sourceMappingURL=TableRowActionBase.js.map