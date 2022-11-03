import EventProvider from "../EventProvider.js";

const eventProvider = new EventProvider();
const LANG_CHANGE = "languageChange";

const attachLanguageChange = (listener: Function) => {
	eventProvider.attachEvent(LANG_CHANGE, listener);
};

const detachLanguageChange = (listener: Function) => {
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
