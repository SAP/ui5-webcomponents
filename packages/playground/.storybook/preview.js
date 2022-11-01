import { useOptions } from './useOptions';
import getEffectiveContentDensity from "@ui5/webcomponents-base/dist/util/getEffectiveContentDensity.js";
// import ui5
import "@ui5/webcomponents-fiori/bundle.esm.js";

export const parameters = {
  actions: { argTypesRegex: "^ui5-[a-z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    transformSource: source =>
      source
        // Clean empty boolean attribute values
        .replace(/=\"\"/g, '')
        // Clean empty lines (empty slots)
        .replace(/^\s*[\r\n]/gm, "")
  },
}

export const globalTypes = {
  theme: {
    name: 'Toggle theme',
    description: 'Global theme for components',
    defaultValue: window["sap-ui-webcomponents-bundle"].configuration.getTheme(),
    toolbar: {
      icon: '',
      items: ['Quartz Light', 'Quartz Dark', "Quartz High Contrast Black",
        "Quartz High Contrast White", "Morning Horizon", "Evening Horizon", "Horizon High Contrast Black", "Horizon High Contrast White"],
      showName: true,
      dynamicTitle: true
    }
  },
  rtl: {
    name: 'Direction',
    description: 'Global rtl mode for components',
    defaultValue: window["sap-ui-webcomponents-bundle"].configuration.getRTL(),
    toolbar: {
      icon: '',
      items: ['LTR', 'RTL'],
      showName: true,
      dynamicTitle: true
    }
  },
  density: {
    name: 'Content Density',
    description: 'Global content density mode for components',
    defaultValue: getEffectiveContentDensity(document.body) === "cozy" ? "Cozy" : "Compact",
    toolbar: {
      icon: '',
      items: ['Cozy', 'Compact'],
      showName: true,
      dynamicTitle: true
    }
  }
}

export const decorators = [useOptions];