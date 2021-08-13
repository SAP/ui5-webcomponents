import { reRenderAllUI5Elements } from "../Render.js";
import EventProvider from "../EventProvider.js";

const eventProvider = new EventProvider();
const CUSTOM_CSS_CHANGE = "CustomCSSChange";

const attachCustomCSSChange = listener => {
	eventProvider.attachEvent(CUSTOM_CSS_CHANGE, listener);
};

const detachCustomCSSChange = listener => {
	eventProvider.detachEvent(CUSTOM_CSS_CHANGE, listener);
};

const fireCustomCSSChange = tag => {
	return eventProvider.fireEvent(CUSTOM_CSS_CHANGE, tag);
};

const customCSSFor = {};

/**
 *
 * @param {string} tag tag-name where the custom css should be added, e.g. `ui5-button`
 * @param {string} css
 * @return {Promise<void>}
 */
const addCustomCSS = (tag, css) => {
	if (!customCSSFor[tag]) {
		customCSSFor[tag] = [];
	}
	customCSSFor[tag].push(css);
	fireCustomCSSChange(tag);

	return reRenderAllUI5Elements({ tag });
};

const getCustomCSS = tag => {
	return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};

export {
	addCustomCSS,
	getCustomCSS,
	attachCustomCSSChange,
	detachCustomCSSChange,
};
