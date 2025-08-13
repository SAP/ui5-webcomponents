import { boot, attachBoot } from "../../dist/Boot.js";
import { registerThemePropertiesLoader } from "../../dist/AssetRegistry.js";
import { hasStyle } from "../../dist/ManagedStyles.js";

// attachBoot (no longer triggers "boot")
attachBoot(() => {
    console.log("Listener1: after framework booted!")
})

// boot the framework
boot();

const testAssets = {
    // registerThemePropertiesLoader after boot (and after attachBoot ), will call applyTheme
    hasStyle: hasStyle,
    registerThemeProps: async () => {
        registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", () => {
            return {
                content: `:root{ --customCol: #fff; --customBg: #000; }`,
                packageName: "",
                fileName: "",
            };
        });
    },
}
window["sap-ui-webcomponents-bundle"] = testAssets;