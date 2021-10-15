import { registerCustomI18nHandlers } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Third-party i18n library that has an async "load" function that fetches the i18n bundle and returns an object with a "get" method
const i18n = {
	load: async () => {
		await Promise.resolve();
		return {
			get: () => "Some third-party text",
		};
	},
};

let instance;
registerCustomI18nHandlers({
	// register fetch (custom fetchI18nBundle implementation) - call the third-party i18n "fetch" function and store the result
	fetch: async packageName => {
		instance = await i18n.load(); // potentially use the packageName parameter too
	},
	// register get (custom getI18nBundle implementation) - return an object that has a "getText" function (used by all components) that proxies to the "get" function of the third-party
	get: packageName => {
		return {
			getText: instance.get, // potentially use the packageName parameter too
		};
	},
});
