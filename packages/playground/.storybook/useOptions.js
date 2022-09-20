import { useEffect, useGlobals } from '@storybook/addons';

export const useOptions = (StoryFn) => {
  const [{ theme, rtl, density }] = useGlobals();
  const themes = {
    QuartzLight: "sap_fiori_3",
    QuartzDark: "sap_fiori_3_dark",
    MorningHorizon: "sap_horizon",
    EveningHorizon: "sap_horizon_dark",
    HorizonHighContrastBlack: "sap_horizon_hcb",
    HorizonHighContrastWhite: "sap_horizon_hcw",
    QuartzHighContrastBlack: "sap_fiori_3_hcb",
    QuartzHighContrastWhite: "sap_fiori_3_hcw"
  }

  useEffect(() => {
    var Conf = window["sap-ui-webcomponents-bundle"].configuration;

    Conf.setTheme(themes[theme.replace(/ /g,'')]);

    document.body.setAttribute("dir", rtl === "RTL"? "rtl": "ltr");

    document.body.classList.remove("sapUiSizeCozy");
    document.body.classList.remove("sapUiSizeCompact");
    document.body.classList.add("sapUiSize" + density);
  }, [theme, rtl, density]);

  return StoryFn();
};