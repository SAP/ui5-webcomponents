import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/NotificationOverflowActionsPopover.css.ts", content: `.ui5-notification-overflow-list{display:flex;flex-direction:column}.ui5-notification-overflow-popover::part(content){padding:var(--_ui5-v1-24-0-notification-overflow-popover-padding)}.ui5-notification-overflow-list-btn::part(button){justify-content:flex-start}
` };
export default styleData;
//# sourceMappingURL=NotificationOverflowActionsPopover.css.js.map