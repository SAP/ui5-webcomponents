import "@ui5/webcomponents-fiori/dist/bundle.esm.js";
import getEffectiveContentDensity from "@ui5/webcomponents-base/dist/util/getEffectiveContentDensity.js";
import customElements from "./custom-elements.json";
import { setCustomElementsManifest } from "@storybook/web-components";
import { useOptions, themes, usePreventKeys } from "./decorators";
import { enhanceArgTypes } from "./args/enhanceArgTypes";
import { htmlTransformation } from "./addons/html/HTMLTransformation";
if (customElements?.modules) {
    setCustomElementsManifest(customElements);
}
export const parameters = {
    html: {
        removeComments: true,
        root: "#root-inner",
        transform: (code) => {
            // script tag (if any) is not inside the #root-inner element - we add it to the final result
            const script = document.querySelector('#scripts-root');
            const html = htmlTransformation.transform(code);
            return html + script?.innerHTML;
        }
    },
    actions: { argTypesRegex: "^ui5-[a-z].*" },
    docs: {
        iframeHeight: "300px",
        transformSource: (source // this is called before rendering of the "code" inside the preview of the stories
        ) => source
            // Clean empty boolean attribute values
            .replace(/=\"\"/g, "")
            // Clean empty lines (empty slots)
            .replace(/^\s*[\r\n]/gm, ""),
    },
    options: {
        // @ts-ignore
        storySort: (a, b) => {
            // Define the sorting order
            const sortOrder = {
                "Docs": 1,
                "Main": 2,
                "Fiori": 3,
            };
            const sortSubOrder = ['Overview', 'Basic'];
            // Function to get the order value for a given category
            // @ts-ignore
            function getOrder(category) {
                // @ts-ignore
                return sortOrder[category] || 4;
            }
            // Function to get sub-order for 'Main' and 'Fiori'
            // @ts-ignore
            function getSubOrder(title) {
                let index = sortSubOrder.findIndex(keyword => title.endsWith(keyword));
                return index === -1 ? sortSubOrder.length : index; // Default sub-order for titles not listed or found at the end
            }
            const aTitle = `${a.title}/${a.name}`;
            const bTitle = `${b.title}/${b.name}`;
            const partsA = aTitle.split('/');
            const partsB = bTitle.split('/');
            // Sort by primary category (Docs, Main, Fiori)
            const orderA = getOrder(partsA[0]);
            const orderB = getOrder(partsB[0]);
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            // Within 'Main' and 'Fiori', sort by sub-order
            if (partsA[0] === 'Main' || partsA[0] === 'Fiori') {
                const subOrderA = getSubOrder(partsA[2]);
                const subOrderB = getSubOrder(partsB[2]);
                if (subOrderA !== subOrderB) {
                    return subOrderA - subOrderB;
                }
            }
            return 1;
        }
    },
};
export const globalTypes = {
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
        defaultValue: "LTR",
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
        defaultValue: getEffectiveContentDensity(document.body) === "cozy" ? "Cozy" : "Compact",
        toolbar: {
            icon: "",
            items: ["Cozy", "Compact"],
            showName: true,
            dynamicTitle: true,
        },
    },
};
export const decorators = [useOptions, usePreventKeys];
export const argTypesEnhancers = [enhanceArgTypes];
//# sourceMappingURL=preview.js.map