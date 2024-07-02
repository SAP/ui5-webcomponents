import { useEffect, useGlobals } from "@storybook/preview-api";
export const themes = {
    "Morning Horizon": "sap_horizon",
    "Evening Horizon": "sap_horizon_dark",
    "Horizon High Contrast Black": "sap_horizon_hcb",
    "Horizon High Contrast White": "sap_horizon_hcw",
    "Quartz Light": "sap_fiori_3",
    "Quartz Dark": "sap_fiori_3_dark",
    "Quartz High Contrast Black": "sap_fiori_3_hcb",
    "Quartz High Contrast White": "sap_fiori_3_hcw",
};
export const useOptions = (StoryFn) => {
    const [{ theme, rtl, density }] = useGlobals();
    useEffect(() => {
        const Bundle = window["sap-ui-webcomponents-bundle"];
        const Conf = Bundle.configuration;
        const currentTheme = themes[theme];
        Conf.setTheme(currentTheme);
        document.body.setAttribute("dir", rtl === "RTL" ? "rtl" : "ltr");
        Bundle.applyDirection();
        document.body.setAttribute("data-ui5-theme", currentTheme);
        document.body.classList.remove("sapUiSizeCozy");
        document.body.classList.remove("sapUiSizeCompact");
        document.body.classList.add("sapUiSize" + density);
    }, [theme, rtl, density]);
    return StoryFn();
};
//# sourceMappingURL=useOptions.js.map