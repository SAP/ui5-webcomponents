export default `//import "@ui5/webcomponents/dist/Assets.js";

const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(e => {
        // console.log({e})
        const htmlHeight = e.target.parentElement.getBoundingClientRect().height;
        parent.postMessage({height: htmlHeight}, "*");
    })
});
resizeObserver.observe(document.body);

import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
const loadThemeProperties = async (themeName) => {
    switch (themeName) {
        case "sap_belize": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-belize-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_belize/parameters-bundle.css.js")).default;
        case "sap_belize_hcb": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-belize_hcb-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_belize_hcb/parameters-bundle.css.js")).default;
        case "sap_belize_hcw": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-belize_hcw-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_belize_hcw/parameters-bundle.css.js")).default;
        case "sap_fiori_3": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-fiori_3-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")).default;
        case "sap_fiori_3_dark": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-fiori_3_dark-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_fiori_3_dark/parameters-bundle.css.js")).default;
        case "sap_fiori_3_hcb": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-fiori_3_hcb-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_fiori_3_hcb/parameters-bundle.css.js")).default;
        case "sap_fiori_3_hcw": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-fiori_3_hcw-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_fiori_3_hcw/parameters-bundle.css.js")).default;
        case "sap_horizon": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-horizon-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_horizon/parameters-bundle.css.js")).default;
        case "sap_horizon_dark": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-horizon_dark-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_horizon_dark/parameters-bundle.css.js")).default;
        case "sap_horizon_dark_exp": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-horizon_dark_exp-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_horizon_dark_exp/parameters-bundle.css.js")).default;
        case "sap_horizon_exp": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-horizon_exp-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_horizon_exp/parameters-bundle.css.js")).default;
        case "sap_horizon_hcb": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-horizon_hcb-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_horizon_hcb/parameters-bundle.css.js")).default;
        case "sap_horizon_hcb_exp": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-horizon_hcb_exp-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_horizon_hcb_exp/parameters-bundle.css.js")).default;
        case "sap_horizon_hcw": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-horizon_hcw-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_horizon_hcw/parameters-bundle.css.js")).default;
        case "sap_horizon_hcw_exp": return (await import(/* webpackChunkName: "ui5-webcomponents-sap-horizon_hcw_exp-parameters-bundle" */ "@ui5/webcomponents/dist/generated/themes/sap_horizon_hcw_exp/parameters-bundle.css.js")).default;
        default: throw "unknown theme";
    }
};
const loadAndCheck = async (themeName) => {
    const data = await loadThemeProperties(themeName);
    if (typeof data === "string" && data.endsWith(".json")) {
        throw new Error("error");
    }
    const result = {_:data}
    console.log(result  )
    return result;
};

["sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3", "sap_fiori_3_dark", "sap_fiori_3_hcb", "sap_fiori_3_hcw", "sap_horizon", "sap_horizon_dark", "sap_horizon_dark_exp", "sap_horizon_exp", "sap_horizon_hcb", "sap_horizon_hcb_exp", "sap_horizon_hcw", "sap_horizon_hcw_exp"]
    .forEach(themeName => registerThemePropertiesLoader("@ui5/webcomponents", themeName, loadAndCheck));

// theming loaders
const loadThemeProperties2 = async (themeName) => {
    switch (themeName) {
        case "sap_belize": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-belize-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_belize/parameters-bundle.css.js")).default;
        case "sap_belize_hcb": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-belize_hcb-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_belize_hcb/parameters-bundle.css.js")).default;
        case "sap_belize_hcw": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-belize_hcw-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_belize_hcw/parameters-bundle.css.js")).default;
        case "sap_fiori_3": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-fiori_3-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")).default;
        case "sap_fiori_3_dark": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-fiori_3_dark-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3_dark/parameters-bundle.css.js")).default;
        case "sap_fiori_3_hcb": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-fiori_3_hcb-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3_hcb/parameters-bundle.css.js")).default;
        case "sap_fiori_3_hcw": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-fiori_3_hcw-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3_hcw/parameters-bundle.css.js")).default;
        case "sap_horizon": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-horizon-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js")).default;
        case "sap_horizon_dark": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-horizon_dark-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon_dark/parameters-bundle.css.js")).default;
        case "sap_horizon_dark_exp": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-horizon_dark_exp-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon_dark_exp/parameters-bundle.css.js")).default;
        case "sap_horizon_exp": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-horizon_exp-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon_exp/parameters-bundle.css.js")).default;
        case "sap_horizon_hcb": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-horizon_hcb-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon_hcb/parameters-bundle.css.js")).default;
        case "sap_horizon_hcb_exp": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-horizon_hcb_exp-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon_hcb_exp/parameters-bundle.css.js")).default;
        case "sap_horizon_hcw": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-horizon_hcw-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon_hcw/parameters-bundle.css.js")).default;
        case "sap_horizon_hcw_exp": return (await import(/* webpackChunkName: "ui5-webcomponents-theming-sap-horizon_hcw_exp-parameters-bundle" */ "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon_hcw_exp/parameters-bundle.css.js")).default;
        default: throw "unknown theme";
    }
};
const loadAndCheck2 = async (themeName) => {
    const data = await loadThemeProperties2(themeName);
    if (typeof data === "string" && data.endsWith(".json")) {
        throw new Error("error");
    }
    return {_:data};
};
["sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3", "sap_fiori_3_dark", "sap_fiori_3_hcb", "sap_fiori_3_hcw", "sap_horizon", "sap_horizon_dark", "sap_horizon_dark_exp", "sap_horizon_exp", "sap_horizon_hcb", "sap_horizon_hcb_exp", "sap_horizon_hcw", "sap_horizon_hcw_exp"]
    .forEach(themeName => registerThemePropertiesLoader("@ui5/webcomponents-theming", themeName, loadAndCheck2));

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
//setTheme("sap_horizon_dark");
window.addEventListener("message", async (event) => {
    if (event.data.theme) {
    // await loadThemeProperties(event.data.theme);
    setTheme(event.data.theme);
    }
});`