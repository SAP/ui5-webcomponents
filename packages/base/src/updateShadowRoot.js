import executeTemplate from "./renderer/executeTemplate.js";
import getConstructableStyle from "./theming/getConstructableStyle.js";
import getEffectiveStyle from "./theming/getEffectiveStyle.js";
import isLegacyBrowser from "./isLegacyBrowser.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
	let styleToPrepend;
	const template = forStaticArea ? "staticAreaTemplate" : "template";
	const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
	const renderResult = executeTemplate(element.constructor[template], element);

	if (document.adoptedStyleSheets) { // Chrome
		shadowRoot.adoptedStyleSheets = getConstructableStyle(element.constructor, forStaticArea);
	} else if (!isLegacyBrowser()) { // FF, Safari
		styleToPrepend = getEffectiveStyle(element.constructor, forStaticArea);
	}

	element.constructor.render(renderResult, shadowRoot, styleToPrepend, { eventContext: element });

	// Apply styles with imperative APIs
	if (typeof element.styles === "object") {
		applyStyles(shadowRoot, element.styles);
	}
};

/**
 * Applies styles to one or more DOM nodes in the shadow root of the component with imperative APIs instead of rendering "style" attributes for CSP compliance
 *
 * @param shadowRoot The normal or static area shadow root where styles must be applied
 * @param styles The object, returned by "get styles()" in the component class
 * @param path The current path in the object keys (for when "get styles()" has several nested levels such as arrows.right / arrows.left)
 */
const applyStyles = (shadowRoot, styles, path = "") => {
	for (const key in styles) { // eslint-disable-line
		const obj = styles[key];
		if (isStylesObject(obj)) { // top-level object (containing the styles themselves) in "get styles"
			const styleRefValue = `${path}${key}`; // path is something like "root", "content" or "arrows.left"
			const el = shadowRoot.querySelector(`[data-ui5-style-ref="${styleRefValue}"]`); // the element from the .hbs where the styles must be applied
			if (el) {
				for (const styleName in obj) { // eslint-disable-line
					const styleValue = obj[styleName];
					if (!Number.isNaN(styleValue) && styleValue !== undefined) {
						el.style[styleName] = styleValue;
					}
				}
			}
		} else {
			applyStyles(shadowRoot, obj, `${path}${key}.`); // set the path to f.e. "arrows." and continue walking the object
		}
	}
};

/**
 * Determines whether obj is a top-level object in "get styles" (one containing the styles definitions themselves).
 * Otherwise, it is a nested object and the styles definitions are on some of the next levels.
 * @param obj
 * @returns {boolean}
 */
const isStylesObject = obj => {
	return !Object.values(obj).some(value => value !== null && typeof value === "object"); // if one or more of the values in this object are objects, this is not a styles object
};

export default updateShadowRoot;
