import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js";
import defaultTheme from "./sap_fiori_3/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_fiori_3", () => defaultTheme);
export default {packageName:"@ui5/webcomponents-fiori",fileName:"themes/BarcodeScannerDialog.css",content:".ui5-barcode-scanner-dialog-root::part(content){padding:.4375rem}.ui5-barcode-scanner-dialog-video,.ui5-barcode-scanner-dialog-video-wrapper{height:100%;width:100%}.ui5-barcode-scanner-dialog-video{object-fit:cover}.ui5-barcode-scanner-dialog-footer{display:flex;justify-content:flex-end;width:100%}.ui5-barcode-scanner-dialog-busy{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1}.ui5-barcode-scanner-dialog-busy:not([active]){display:none}"}