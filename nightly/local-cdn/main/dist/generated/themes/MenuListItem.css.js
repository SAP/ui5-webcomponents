import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/MenuListItem.css.ts", content: `:host([disabled]){pointer-events:initial;opacity:initial}:host([disabled])::part(content){opacity:var(--_ui5-v1-24-0-rc-2-listitembase_disabled_opacity)}:host([disabled][actionable]:not([active]):not([selected]):hover),:host([disabled][active][actionable]){background:var(--ui5-v1-24-0-rc-2-listitem-background-color)}:host([disabled][active][actionable]) .ui5-li-root .ui5-li-icon{color:var(--sapContent_NonInteractiveIconColor)}:host([focused]:not([active]):not([disabled])){background-color:var(--sapList_Hover_Background)}
` };
export default styleData;
//# sourceMappingURL=MenuListItem.css.js.map