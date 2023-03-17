import EventProvider from "../EventProvider.js";

type ThemeRegisteredCallback = (theme: string) => void;

const eventProvider = new EventProvider<string, void>();
const THEME_REGISTERED = "themeRegistered";

const attachThemeRegistered = (listener: ThemeRegisteredCallback) => {
	eventProvider.attachEvent(THEME_REGISTERED, listener);
};

const fireThemeRegistered = (theme: string) => {
	return eventProvider.fireEvent(THEME_REGISTERED, theme);
};

export {
	attachThemeRegistered,
	fireThemeRegistered,
};
