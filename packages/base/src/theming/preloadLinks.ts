import getEffectiveLinksHrefs from "./getEffectiveLinksHrefs.js";
import createLinkInHead from "../util/createLinkInHead.js";
import { shouldUseLinks, shouldPreloadLinks } from "../CSP.js";
import type UI5Element from "../UI5Element.js";

const preloaded = new Set<string>();

const preloadLinks = (ElementClass: typeof UI5Element) => {
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
