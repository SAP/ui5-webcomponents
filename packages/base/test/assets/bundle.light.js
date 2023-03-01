import { attachBoot } from "../../dist/Boot.js";
import { boot } from "../../dist/Boot.js";

// Call attachBoot early
attachBoot(() => {
    console.log("framework booted!")
})

import { registerThemePropertiesLoader } from "../../dist/AssetRegistry.js";

const testAssets = {
    registerThemePropsAndReboot: () => {
        registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => {
            return {
                content: `:root{ --var1: red; }`,
                packageName: "",
                fileName: "",
            };
        });
        boot();
    }
}
window["sap-ui-webcomponents-bundle"] = testAssets;