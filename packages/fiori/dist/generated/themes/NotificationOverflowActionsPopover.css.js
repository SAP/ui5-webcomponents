import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js";
import defaultTheme from "./sap_fiori_3/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_fiori_3", () => defaultTheme);
export default {packageName:"@ui5/webcomponents-fiori",fileName:"themes/NotificationOverflowActionsPopover.css",content:".ui5-notification-overflow-list{display:flex;flex-direction:column}.ui5-notification-overflow-popover::part(content){padding:var(--_ui5-notification-overflow-popover-padding)}"}