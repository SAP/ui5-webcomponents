import { registerCustomI18nBundleGetter } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Third-party i18n library that has an async "load" function that fetches the i18n bundle and returns an object with a "get" method
const i18n = {
	load: async () => {
		await Promise.resolve(); // fetch the data here
		return {
			get: (key, paramsArr, defaultText) => `key: ${key}, params: ${paramsArr.join(", ")}, defaultText: ${defaultText}`,
		};
	},
};

let bundle;
registerCustomI18nBundleGetter(async packageName => {
	if (!bundle) {
		bundle = await i18n.load(); // potentially use the packageName parameter too
	}
	return {
		getText: (keyObj, ...params) => {
			const key = typeof keyObj === "string" ? keyObj : keyObj.key;
			return bundle.get(key, params, keyObj.defaultText);
		},
	};
});

/*
// Example with the i18next library

import i18next from "i18next";
registerCustomI18nBundleGetter(async packageName => {
	await i18next.init({
		lng: "en", // pass the desired language
		debug: true,
		resources: { // potentially use packageName to determine which translations to load - hardcoded for this example
			en: {
				translation: {
					"key": "hello world",
				},
			},
		},
	});
	return {
		getText: (keyObj, ...params) => {
			let key = typeof keyObj === "string" ? keyObj : keyObj.key;
			key = key.replace(/{{/g, "{").replace(/}}/g, "}"); // the key will be with {{0}}, {{1}}, etc. placeholders
			return i18next.t(key); // also pass the parameters, with keys "0", "1", etc.
		},
	};
});
*/
