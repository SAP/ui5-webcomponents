import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/BrowserScrollbar.css.ts", content: `:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:horizontal{height:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:vertical{width:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar{background-color:var(--sapScrollBar_TrackColor);border-left:var(--browser_scrollbar_border)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb{border-radius:var(--browser_scrollbar_border_radius);background-color:var(--sapScrollBar_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb:hover{background-color:var(--sapScrollBar_Hover_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-corner{background-color:var(--sapScrollBar_TrackColor)}
` };
export default styleData;
//# sourceMappingURL=BrowserScrollbar.css.js.map