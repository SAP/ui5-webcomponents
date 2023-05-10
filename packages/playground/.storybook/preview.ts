import "@ui5/webcomponents-fiori/bundle.esm.js";
import getEffectiveContentDensity from "@ui5/webcomponents-base/dist/util/getEffectiveContentDensity.js";
import customElements from "./custom-elements.json";
import { setCustomElementsManifest } from "@storybook/web-components";
import { useOptions, themes } from "./useOptions";
import type { Parameters, GlobalTypes, DecoratorFunction, ArgTypesEnhancer } from '@storybook/types';
import { enhanceArgTypes } from "./args/enhanceArgTypes";

if (customElements?.modules) {
  setCustomElementsManifest(customElements);
}

export const parameters: Parameters = {
  html: {
    removeComments: true,
    root: "#root-inner", // default: #root
    transform: (code: string) => {
      // script tag (if any) is not inside the #root-inner element - we add it to the final result
      const script = document.querySelector('#scripts-root');
      return code + script?.innerHTML;
    }
  },
  actions: { argTypesRegex: "^ui5-[a-z].*" }, // automatically match ui5-* events for actions
  docs: {
    iframeHeight: "300px", // stories including script tags are loaded in an iframe, this is the height of the iframe
    transformSource: (
      source: string // this is called before rendering of the "code" inside the preview of the stories
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
        "Main",
        "Fiori"
      ],
    },
  },
};

export const globalTypes: GlobalTypes = {
  theme: {
    name: "Toggle theme",
    description: "Global theme for components",
    defaultValue: "Morning Horizon",
    toolbar: {
      icon: "",
      items: Object.keys(themes),
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
export const argTypesEnhancers: ArgTypesEnhancer[] = [enhanceArgTypes];
