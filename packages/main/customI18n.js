import { registerCustomGetI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Third-party i18n library that has an async "load" function that fetches the i18n bundle and returns an object with a "get" method
const i18n = {
	load: async () => {
		await Promise.resolve();
		return {
			get: (key, paramsArr, defaultText) => `key: ${key}, params: ${paramsArr.join(", ")}, defaultText: ${defaultText}`,
		};
	},
};

let bundle;
registerCustomGetI18nBundle(async packageName => {
	if (!bundle) {
		bundle = await i18n.load(); // potentially use the packageName parameter too
	}
	return {
		getText: (keyObj, ...params) => {
			return bundle.get(keyObj.key, params, keyObj.defaultText);
		},
	};
});
