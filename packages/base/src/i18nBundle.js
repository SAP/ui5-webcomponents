import { registerI18nLoader, fetchI18nBundle as originalFetchI18nBundle, getI18nBundleData } from "./asset-registries/i18n.js";
import formatMessage from "./util/formatMessage.js";

const I18nBundleInstances = new Map();

let customFetchI18nBundle;
let customGetI18nBundle;

/**
 * @class
 * @public
 */
class I18nBundle {
	constructor(packageName) {
		this.packageName = packageName;
	}

	/**
	 * Returns a text in the currently loaded language
	 *
	 * @public
	 * @param {Object|String} textObj key/defaultText pair or just the key
	 * @param params Values for the placeholders
	 * @returns {*}
	 */
	getText(textObj, ...params) {
		if (typeof textObj === "string") {
			textObj = { key: textObj, defaultText: textObj };
		}

		if (!textObj || !textObj.key) {
			return "";
		}

		const bundle = getI18nBundleData(this.packageName);
		if (bundle && !bundle[textObj.key]) {
			console.warn(`Key ${textObj.key} not found in the i18n bundle, the default text will be used`); // eslint-disable-line
		}
		const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : (textObj.defaultText || textObj.key);

		return formatMessage(messageText, params);
	}
}

const getI18nBundle = packageName => {
	if (customGetI18nBundle) {
		return customGetI18nBundle(packageName);
	}

	if (I18nBundleInstances.has(packageName)) {
		return I18nBundleInstances.get(packageName);
	}

	const i18nBundle = new I18nBundle(packageName);
	I18nBundleInstances.set(packageName, i18nBundle);
	return i18nBundle;
};

const fetchI18nBundle = async packageName => {
	if (customFetchI18nBundle) {
		return customFetchI18nBundle(packageName);
	}

	return originalFetchI18nBundle(packageName);
};

const registerCustomI18nHandlers = ({ fetch, get }) => {
	customFetchI18nBundle = fetch;
	customGetI18nBundle = get;
};

export {
	registerI18nLoader,
	fetchI18nBundle,
	getI18nBundle,
	registerCustomI18nHandlers,
};
