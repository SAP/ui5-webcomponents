/**
 * Creates a <link> tag in the <head> tag
 * @param href - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createLinkInHead = (href, attributes = {}) => {
	const link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";

	Object.entries(attributes).forEach(pair => link.setAttribute(...pair));

	link.href = href;

	document.head.appendChild(link);

	return new Promise(resolve => {
		link.addEventListener("load", resolve);
		link.addEventListener("error", resolve);
	});
};

export default createLinkInHead;
