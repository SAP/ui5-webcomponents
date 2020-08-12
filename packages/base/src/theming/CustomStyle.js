import RenderScheduler from "../RenderScheduler.js";
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

const addCustomCSS = (tag, css) => {
	if (!customCSSFor[tag]) {
		customCSSFor[tag] = [];
	}
	customCSSFor[tag].push(css);
	fireCustomCSSChange(tag);

	RenderScheduler.reRenderAllUI5Elements({ tag });
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
