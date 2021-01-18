import EventProvider from "../EventProvider.js";

const eventProvider = new EventProvider();
const THEME_LOADED = "themeLoaded";
const BEFORE_THEME_LOADED = "beforeThemeLoaded";

const attachThemeLoaded = listener => {
	eventProvider.attachEvent(THEME_LOADED, listener);
};

const detachThemeLoaded = listener => {
	eventProvider.detachEvent(THEME_LOADED, listener);
};

const fireThemeLoaded = theme => {
	return eventProvider.fireEvent(THEME_LOADED, theme);
};

const attachBeforeThemeLoaded = listener => {
	eventProvider.attachEvent(BEFORE_THEME_LOADED, listener);
};

const detachBeforeThemeLoaded = listener => {
	eventProvider.detachEvent(BEFORE_THEME_LOADED, listener);
};

const fireBeforeThemeLoaded = theme => {
	return eventProvider.fireEvent(BEFORE_THEME_LOADED, theme);
};

export {
	attachThemeLoaded,
	detachThemeLoaded,
	fireThemeLoaded,
	attachBeforeThemeLoaded,
	detachBeforeThemeLoaded,
	fireBeforeThemeLoaded,
};
