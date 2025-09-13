var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import MenuItemGroup from "@ui5/webcomponents/dist/MenuItemGroup.js";
import UserMenuItemGroupTemplate from "./UserMenuItemGroupTemplate.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-user-menu-item-group` component represents a group of items designed for use inside a `ui5-user-menu`.
 * Items belonging to the same group should be wrapped by a `ui5-user-menu-item-group`.
 * Each group can have an `itemCheckMode` property, which defines the check mode for the items within the group.
 * The possible values for `itemCheckMode` are:
 * - 'None' (default) - no items can be checked
 * - 'Single' - Only one item can be checked at a time
 * - 'Multiple' - Multiple items can be checked simultaneously
 *
 * **Note:** If the `itemCheckMode` property is set to 'Single', only one item can remain checked at any given time.
 * If multiple items are marked as checked, the last checked item will take precedence.
 *
 * ### Usage
 *
 * `ui5-user-menu-item-group` represents a collection of `ui5-user-menu-item` components that can have the same check mode.
 * The items are addeed to the group's `items` slot.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/UserMenuItemGroup.js";`
 * @constructor
 * @extends MenuItemGroup
 * @experimental
 * @since 2.12.0
 * @public
 */
let UserMenuItemGroup = class UserMenuItemGroup extends MenuItemGroup {
};
UserMenuItemGroup = __decorate([
    customElement({
        tag: "ui5-user-menu-item-group",
        template: UserMenuItemGroupTemplate,
    })
], UserMenuItemGroup);
const isInstanceOfUserMenuItemGroup = (object) => {
    return "isGroup" in object;
};
UserMenuItemGroup.define();
export default UserMenuItemGroup;
export { isInstanceOfUserMenuItemGroup, };
//# sourceMappingURL=UserMenuItemGroup.js.map