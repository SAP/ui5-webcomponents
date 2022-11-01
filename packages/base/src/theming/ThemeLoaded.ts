import EventProvider from "../EventProvider.js";

const eventProvider = new EventProvider();
const THEME_LOADED = "themeLoaded";

const attachThemeLoaded = (listener: Function) => {
	eventProvider.attachEvent(THEME_LOADED, listener);
};

const detachThemeLoaded = (listener: Function) => {
	eventProvider.detachEvent(THEME_LOADED, listener);
};

const fireThemeLoaded = (theme: string) => {
	return eventProvider.fireEvent(THEME_LOADED, theme);
};

export {
	attachThemeLoaded,
	detachThemeLoaded,
	fireThemeLoaded,
};
