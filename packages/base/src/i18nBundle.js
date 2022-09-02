import { registerI18nLoader, fetchI18nBundle, getI18nBundleData } from "./asset-registries/i18n.js";
import formatMessage from "./util/formatMessage.js";

const I18nBundleInstances = new Map();

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

		return params.length ? formatMessage(messageText, params) : messageText;
	}
}

const getI18nBundleSync = packageName => {
	if (I18nBundleInstances.has(packageName)) {
		return I18nBundleInstances.get(packageName);
	}

	const i18nBundle = new I18nBundle(packageName);
	I18nBundleInstances.set(packageName, i18nBundle);
	return i18nBundle;
};

/**
 * Allows developers to provide a custom getI18nBundle implementation
 * If this function is called, the custom implementation will be used for all components and will completely
 * replace the default implementation.
 *
 * @public
 * @param customGet the function to use instead of the standard getI18nBundle implementation
 */
const registerCustomI18nBundleGetter = customGet => {
	customGetI18nBundle = customGet;
};

/**
 * Fetches and returns the I18nBundle instance for the given package
 *
 * @public
 * @param packageName
 * @returns {Promise<I18nBundle>}
 */
const getI18nBundle = async packageName => {
	if (customGetI18nBundle) {
		return customGetI18nBundle(packageName);
	}

	await fetchI18nBundle(packageName);
	return getI18nBundleSync(packageName);
};

export {
	registerI18nLoader,
	getI18nBundle,
	registerCustomI18nBundleGetter,
};
