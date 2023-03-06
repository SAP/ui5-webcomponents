import { attachBoot } from "../../dist/Boot.js";
import { boot } from "../../dist/Boot.js";

// Call attachBoot early
attachBoot(() => {
    console.log("Listener1: after framework booted!")
})

attachBoot(() => {
    console.log("Listener2: after framework booted!")
})

attachBoot(() => {
    console.log("Listener3: after framework booted!")
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
        // call "boot" multiple times as if multiple web components start upgrading
        console.log("Booting...");
        boot();
        boot();
        boot();
        boot();
        boot();
        boot();
    },
    attachBootAfterBoot: () => {
        attachBoot(() => {
            console.log("Listener4: after framework booted!")
        })
    }
}
window["sap-ui-webcomponents-bundle"] = testAssets;