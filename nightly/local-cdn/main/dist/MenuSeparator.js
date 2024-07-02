var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import menuSeparatorTemplate from "./generated/templates/MenuSeparatorTemplate.lit.js";
import menuSeparatorCss from "./generated/themes/MenuSeparator.css.js";
import ListItemBase from "./ListItemBase.js";
import ListItemCustom from "./ListItemCustom.js";
/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends ListItemBase
 * @implements {IMenuItem}
 * @public
 * @since 2.0
 */
let MenuSeparator = class MenuSeparator extends ListItemBase {
    get isSeparator() {
        return true;
    }
    get classes() {
        return {
            main: {
                "ui5-menu-separator": true,
            },
        };
    }
    /**
     * @override
     */
    get _focusable() {
        return false;
    }
    /**
     * @override
     */
    get _pressable() {
        return false;
    }
};
MenuSeparator = __decorate([
    customElement({
        tag: "ui5-menu-separator",
        renderer: litRender,
        styles: [menuSeparatorCss],
        template: menuSeparatorTemplate,
        dependencies: [
            ListItemCustom,
        ],
    })
], MenuSeparator);
MenuSeparator.define();
export default MenuSeparator;
//# sourceMappingURL=MenuSeparator.js.map