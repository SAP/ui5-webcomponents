import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js";
import defaultTheme from "./sap_fiori_3/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme);
export default {packageName:"@ui5/webcomponents",fileName:"themes/CustomListItem.css",content:":host(:not([hidden])){display:block}:host{min-height:var(--_ui5_list_item_base_height);height:auto;box-sizing:border-box}.ui5-li-root.ui5-custom-li-root{padding:0;pointer-events:inherit}.ui5-li-root.ui5-custom-li-root .ui5-li-content{pointer-events:inherit}[ui5-checkbox].ui5-li-singlesel-radiobtn,[ui5-radio-button].ui5-li-singlesel-radiobtn{display:flex;align-items:center}.ui5-li-root.ui5-custom-li-root,[ui5-checkbox].ui5-li-singlesel-radiobtn,[ui5-radio-button].ui5-li-singlesel-radiobtn{min-width:var(--_ui5_custom_list_item_rb_min_width)}"}