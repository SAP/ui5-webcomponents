import getEffectiveLinks from "./getEffectiveLinks.js";
import createLinkInHead from "../util/createLinkInHead.js";
import { shouldUseLinks, shouldPreloadLinks } from "../CSP.js";

const preloadLinks = ElementClass => {
	if (!shouldUseLinks() || !shouldPreloadLinks()) {
		return;
	}

	const styles = getEffectiveLinks(ElementClass, false) || [];
	const staticAreaStyles = getEffectiveLinks(ElementClass, true) || [];

	[...styles, ...staticAreaStyles].forEach(href => {
		createLinkInHead(href, { rel: "preload" });
	});
};

export default preloadLinks;
