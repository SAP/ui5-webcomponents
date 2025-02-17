import type { JsxTemplate } from "@ui5/webcomponents-base";
import type MenuItem from "./MenuItem.js";
import type { ListItemHooks } from "./ListItemTemplate.js";
export type MenuItemHooks = ListItemHooks & {
    listItemPostContent: JsxTemplate;
};
export default function MenuItemTemplate(this: MenuItem, hooks?: Partial<MenuItemHooks>): import("@ui5/webcomponents-base").JSX.Element;
