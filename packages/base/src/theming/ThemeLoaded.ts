import EventProvider from "../EventProvider.js";

type ThemeLoadedCallback = (theme: string) => void;

const eventProvider = new EventProvider<string, void>();
const THEME_LOADED = "themeLoaded";

const attachThemeLoaded = (listener: ThemeLoadedCallback) => {
	eventProvider.attachEvent(THEME_LOADED, listener);
};

const detachThemeLoaded = (listener: ThemeLoadedCallback) => {
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
