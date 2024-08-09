import { getUrl } from "../CSP.js";
import { getFeature } from "../FeaturesRegistry.js";
const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers
const getEffectiveLinksHrefs = (ElementClass, forStaticArea = false) => {
    const stylesData = ElementClass[forStaticArea ? "staticAreaStyles" : "styles"];
    if (!stylesData) {
        return;
    }
    const stylesDataArray = Array.isArray(stylesData) ? stylesData : [stylesData];
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (openUI5Enablement) {
        stylesDataArray.push(openUI5Enablement.getBusyIndicatorStyles());
    }
    return stylesDataArray.flat(MAX_DEPTH_INHERITED_CLASSES).filter(data => !!data).map(data => getUrl(data.packageName, data.fileName));
};
export default getEffectiveLinksHrefs;
//# sourceMappingURL=getEffectiveLinksHrefs.js.map