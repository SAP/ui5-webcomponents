import EventProvider from "../EventProvider.js";

type LanguageChangeCallback = (lang: string) => Promise<void | Array<void>>;

const eventProvider = new EventProvider<string, Promise<void | Array<void>>>();
const LANG_CHANGE = "languageChange";

const attachLanguageChange = (listener: LanguageChangeCallback) => {
	eventProvider.attachEvent(LANG_CHANGE, listener);
};

const detachLanguageChange = (listener: LanguageChangeCallback) => {
	eventProvider.detachEvent(LANG_CHANGE, listener);
};

const fireLanguageChange = (lang: string) => {
	return eventProvider.fireEventAsync(LANG_CHANGE, lang);
};

export {
	attachLanguageChange,
	detachLanguageChange,
	fireLanguageChange,
};
