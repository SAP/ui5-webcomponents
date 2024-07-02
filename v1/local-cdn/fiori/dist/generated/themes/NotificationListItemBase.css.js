import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/NotificationListItemBase.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:block;width:100%;min-height:var(--_ui5-v1-24-0_list_item_base_height);background:var(--ui5-v1-24-0-listitem-background-color);cursor:pointer}:host([has-border]){border-bottom:var(--ui5-v1-24-0-listitem-border-bottom)}:host([focused]) .ui5-nli-focusable{outline:none}:host([focused]) .ui5-nli-focusable:after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;inset:0;pointer-events:none}:host([busy]){opacity:.6;pointer-events:none}:host([busy]) .ui5-nli-busy{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.ui5-nli-action{flex-shrink:0;margin-inline-end:.5rem}.ui5-nli-overflow-btn{margin-inline-end:.5rem}
` };
export default styleData;
//# sourceMappingURL=NotificationListItemBase.css.js.map