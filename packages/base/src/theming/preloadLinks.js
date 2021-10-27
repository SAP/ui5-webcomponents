import getEffectiveLinksHrefs from "./getEffectiveLinksHrefs.js";
import createLinkInHead from "../util/createLinkInHead.js";
import { shouldUseLinks, shouldPreloadLinks } from "../CSP.js";

const preloadLinks = ElementClass => {
	if (!shouldUseLinks() || !shouldPreloadLinks()) {
		return;
	}

	const linksHrefs = getEffectiveLinksHrefs(ElementClass, false) || [];
	const staticAreaLinksHrefs = getEffectiveLinksHrefs(ElementClass, true) || [];

	[...linksHrefs, ...staticAreaLinksHrefs].forEach(href => {
		createLinkInHead(href, { rel: "preload", as: "style" });
	});
};

export default preloadLinks;
