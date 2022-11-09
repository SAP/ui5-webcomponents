import { render, html, svg, } from "lit-html";
import { getFeature } from "../FeaturesRegistry.js";
const effectiveHtml = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.html : html;
    return fn(strings, ...values);
};
const effectiveSvg = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.svg : svg;
    return fn(strings, ...values);
};
const litRender = (templateResult, container, styleStrOrHrefsArr, forStaticArea, options) => {
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (openUI5Enablement && !forStaticArea) {
        templateResult = openUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, options.host, templateResult);
    }
    if (typeof styleStrOrHrefsArr === "string") {
        templateResult = effectiveHtml `<style>${styleStrOrHrefsArr}</style>${templateResult}`;
    }
    else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
        templateResult = effectiveHtml `${styleStrOrHrefsArr.map(href => effectiveHtml `<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
    }
    render(templateResult, container, options);
};
const scopeTag = (tag, tags, suffix) => {
    const litStatic = getFeature("LitStatic");
    if (litStatic) {
        return litStatic.unsafeStatic((tags || []).includes(tag) ? `${tag}-${suffix}` : tag);
    }
};
export { effectiveHtml as html, effectiveSvg as svg, };
export { scopeTag };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "./directives/style-map.js";
export { ifDefined } from "lit-html/directives/if-defined.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";
export default litRender;
//# sourceMappingURL=LitRenderer.js.map