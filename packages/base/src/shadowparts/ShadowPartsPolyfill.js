import supportsShadowParts from "./supportsShadowParts";
import { addCustomCSS } from "../Theming";

/**
 * converts from part pseudo selectors to host and attribute selectors
 *
 *      ui5-card.online::part(status) {
 *          color: green;
 *      }
 *
 *  becomes
 *
 *      host(.online) [part=status] {
 *          color: green;
 *      }
 *
 * and applies it to the shadow dom of the specific component only (ui5-card in this examople)
 */
const polyfillStyles = (selector) => {
    if (supportsShadowParts()) {
        return;
    }

    const styleTag = document.querySelector(selector);
    if (!styleTag) {
        return;
    }

    const rulesFor = new Map();
    const inp = styleTag.textContent;
    const rules = inp.trim().split("}").filter(_ => _.includes("{"));

    rules.forEach(rule => {
        const [selector, content] = rule.split("{");
        const componentWithPart = selector.match(/(ui5-\w+).*::part\(([\w-]+)\)/);
        if (componentWithPart) {
            const component = componentWithPart[1];
            const part = componentWithPart[2];
            let newSelector = selector.trim().replace(component, ":host(");
            newSelector += ")";
            newSelector = newSelector.replace(`::part(${part})`, "");
            newSelector += ` [part='${part}']`;

            if (window.ShadyDOM) {
                // Shadow DOM polyfill running, adjust onply part selector
                newSelector = selector.trim().replace(`::part(${part})`, "");
                newSelector += ` [part='${part}']`;
            }

            if (!rulesFor.has(component)) {
                rulesFor.set(component, []);
            }
            rulesFor.get(component).push(`${newSelector} { ${content} }`);
        };

    });

    for (const [component, newRules] of rulesFor.entries()) {
        addCustomCSS(component, "sap_fiori_3", newRules.join(""));
    }

}

export default polyfillStyles;