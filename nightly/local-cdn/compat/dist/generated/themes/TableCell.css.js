import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-compat", "sap_horizon", async () => defaultTheme);
export default `:host{display:table-cell;font-family:"72override",var(--sapFontFamily);font-size:.875rem;height:var(--ui5-v2-11-0-rc-2_table_row_height);box-sizing:border-box;color:var(--sapList_TextColor);word-break:break-word;vertical-align:middle}td{display:contents}:host([popined]){padding-left:0;padding-top:.25rem}:host([_popined-inline]){padding-top:0}::slotted([ui5-label]){color:inherit}
`;
//# sourceMappingURL=TableCell.css.js.map