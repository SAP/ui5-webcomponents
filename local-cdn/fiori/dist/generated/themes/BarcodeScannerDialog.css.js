import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/BarcodeScannerDialog.css.ts", content: `.ui5-barcode-scanner-dialog-root::part(content){padding:.4375rem}.ui5-barcode-scanner-dialog-video-wrapper,.ui5-barcode-scanner-dialog-video{height:100%;width:100%}.ui5-barcode-scanner-dialog-video{object-fit:cover}.ui5-barcode-scanner-dialog-footer{display:flex;justify-content:flex-end;width:100%}.ui5-barcode-scanner-dialog-busy{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1}.ui5-barcode-scanner-dialog-busy:not([active]){display:none}
` };
export default styleData;
//# sourceMappingURL=BarcodeScannerDialog.css.js.map