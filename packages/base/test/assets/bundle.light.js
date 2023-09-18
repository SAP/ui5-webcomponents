import { attachBoot } from "../../dist/Boot.js";
import { boot } from "../../dist/Boot.js";
import { registerThemePropertiesLoader } from "../../dist/AssetRegistry.js";

// attachBoot (no longer triggers "boot")
attachBoot(() => {
    console.log("Listener1: after framework booted!")
})

// boot the framework
boot();

const testAssets = {
    // registerThemePropertiesLoader after boot (and after attachBoot ), will call applyTheme
    registerThemeProps: async () => {
        registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => {
            return {
                content: `:root{ --customCol: #fff; --customBg: #000; }`,
                packageName: "",
                fileName: "",
            };
        });
    },
}
window["sap-ui-webcomponents-bundle"] = testAssets;