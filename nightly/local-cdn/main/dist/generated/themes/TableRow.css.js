import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TableRow.css.ts", content: `:host{background:var(--sapList_Background)}:host([aria-selected=true]){background-color:var(--sapList_SelectionBackgroundColor);border-bottom:var(--sapList_BorderWidth) solid var(--sapList_SelectionBorderColor)}:host([_interactive]){cursor:pointer}@media (hover: hover){:host([_interactive]:hover){background:var(--sapList_Hover_Background)}:host([_interactive][aria-selected=true]:hover){background:var(--sapList_Hover_SelectionBackground)}}:host([_interactive]:active),:host([_interactive][_active]),:host([_interactive][aria-selected=true]:active),:host([_interactive][aria-selected=true][_active]){background:var(--sapList_Active_Background)}#popin-cell{align-content:initial;flex-direction:column;grid-column:1 / -1}#navigated-cell{grid-row:span 2;min-width:0;padding:0}:host([navigated]) #navigated-cell{background-color:var(--sapList_SelectionBorderColor)}:host([navigated]) #popin-cell{grid-column:1 / -2}
` };
export default styleData;
//# sourceMappingURL=TableRow.css.js.map