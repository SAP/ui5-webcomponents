import getEffectiveLinksHrefs from "./getEffectiveLinksHrefs.js";
import createLinkInHead from "../util/createLinkInHead.js";
import { shouldUseLinks, shouldPreloadLinks } from "../CSP.js";
const preloaded = new Set();
const preloadLinks = (ElementClass) => {
    if (!shouldUseLinks() || !shouldPreloadLinks()) {
        return;
    }
    const linksHrefs = getEffectiveLinksHrefs(ElementClass, false) || [];
    const staticAreaLinksHrefs = getEffectiveLinksHrefs(ElementClass, true) || [];
    [...linksHrefs, ...staticAreaLinksHrefs].forEach(href => {
        if (!preloaded.has(href)) {
            createLinkInHead(href, { rel: "preload", as: "style" });
            preloaded.add(href);
        }
    });
};
export default preloadLinks;
//# sourceMappingURL=preloadLinks.js.map