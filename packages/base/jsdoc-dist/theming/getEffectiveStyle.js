import { getCustomCSS, attachCustomCSSChange } from "./CustomStyle.js";
import getStylesString from "./getStylesString.js";
import { getFeature } from "../FeaturesRegistry.js";
const effectiveStyleMap = new Map();
attachCustomCSSChange((tag) => {
    effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});
const getEffectiveStyle = (ElementClass, forStaticArea = false) => {
    const tag = ElementClass.getMetadata().getTag();
    const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (!effectiveStyleMap.has(key)) {
        let effectiveStyle;
        let busyIndicatorStyles = "";
        if (openUI5Enablement) {
            busyIndicatorStyles = getStylesString(openUI5Enablement.getBusyIndicatorStyles());
        }
        if (forStaticArea) {
            effectiveStyle = getStylesString(ElementClass.staticAreaStyles);
        }
        else {
            const customStyle = getCustomCSS(tag) || "";
            const builtInStyles = getStylesString(ElementClass.styles);
            effectiveStyle = `${builtInStyles} ${customStyle}`;
        }
        effectiveStyle = `${effectiveStyle} ${busyIndicatorStyles}`;
        effectiveStyleMap.set(key, effectiveStyle);
    }
    return effectiveStyleMap.get(key); // The key is guaranteed to exist
};
export default getEffectiveStyle;
//# sourceMappingURL=getEffectiveStyle.js.map