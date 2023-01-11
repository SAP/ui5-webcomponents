import "@ui5/webcomponents-fiori/bundle.esm.js";
import getEffectiveContentDensity from "@ui5/webcomponents-base/dist/util/getEffectiveContentDensity.js";
import customElements from "./custom-elements.json";
import { setCustomElementsManifest } from "@storybook/web-components";
import { Parameters, DecoratorFunction } from "@storybook/addons";
import { useOptions } from "./useOptions";

if (customElements?.modules) {
  setCustomElementsManifest(customElements);
}

export const parameters: Parameters = {
  html: {
    removeComments: true,
  },
  actions: { argTypesRegex: "^ui5-[a-z].*" }, // automatically match ui5-* events for actions
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    iframeHeight: "300px", // stories including script tags are loaded in an iframe, this is the height of the iframe
    transformSource: (
      source // this is called before rendering of the "code" inside the preview of the stories
    ) =>
      source
        // Clean empty boolean attribute values
        .replace(/=\"\"/g, "")
        // Clean empty lines (empty slots)
        .replace(/^\s*[\r\n]/gm, ""),
  },
  options: {
    storySort: {
      order: [
        "Docs",
        [
          "Getting started",
          "Advanced",
          "Customizing",
          "Frameworks",
          "Development",
          "Contributing",
          "FAQ",
          "Changelog",
        ],
        "Components",
      ],
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Toggle theme",
    description: "Global theme for components",
    defaultValue:
      window["sap-ui-webcomponents-bundle"].configuration.getTheme(),
    toolbar: {
      icon: "",
      items: [
        "Quartz Light",
        "Quartz Dark",
        "Quartz High Contrast Black",
        "Quartz High Contrast White",
        "Morning Horizon",
        "Evening Horizon",
        "Horizon High Contrast Black",
        "Horizon High Contrast White",
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  rtl: {
    name: "Direction",
    description: "Global rtl mode for components",
    defaultValue: window["sap-ui-webcomponents-bundle"].configuration.getRTL(),
    toolbar: {
      icon: "",
      items: ["LTR", "RTL"],
      showName: true,
      dynamicTitle: true,
    },
  },
  density: {
    name: "Content Density",
    description: "Global content density mode for components",
    defaultValue:
      getEffectiveContentDensity(document.body) === "cozy" ? "Cozy" : "Compact",
    toolbar: {
      icon: "",
      items: ["Cozy", "Compact"],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const decorators: DecoratorFunction[] = [useOptions];
