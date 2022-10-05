/**
 * Creates a <link> tag in the <head> tag
 * @param href - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createLinkInHead = (href, attributes = {}, successCallback) => {
	const link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";

	Object.entries(attributes).forEach(pair => link.setAttribute(...pair));

	link.href = href;

	link.addEventListener("load", successCallback);

	document.head.appendChild(link);
	return link;
};

export default createLinkInHead;
