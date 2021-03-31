import { registerI18nLoader, fetchI18nBundle, getI18nBundleData } from "./asset-registries/i18n.js";
import formatMessage from "./util/formatMessage.js";

const I18nBundleInstances = new Map();

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
	 * @param {instance} textObj the web component on which the text is applied
	 * @param {Object|String} textObj key/defaultText pair or just the key
	 * @param params Values for the placeholders
	 * @returns {*}
	 */
	getText(instance, textObj, ...params) {
		if (typeof instance !== "object" || !instance.isUI5Element) { // instance not given (old format) - shift parameters
			params = textObj ? [textObj, ...params] : [];
			textObj = instance;
			instance = undefined;
		}

		if (typeof textObj === "string") {
			textObj = { key: textObj, defaultText: textObj };
		}

		if (!textObj || !textObj.key) {
			return "";
		}

		const messageText = this._getMessageText(instance, textObj);

		return formatMessage(messageText, params);
	}

	_getMessageText(instance, textObj) {
		const key = textObj.key;

		if (instance) {
			// "data-i18n-*" attribute on the instance
			if (instance.hasAttribute(`data-i18n-${key}`)) {
				return instance.getAttribute(`data-i18n-${key}`);
			}

			// "i18nData" bundle object on the instance/class
			if (typeof instance.i18nData === "object" && instance.i18nData[key]) {
				return instance.i18nData[key];
			}
		}

		// Use the message bundle
		const bundle = getI18nBundleData(this.packageName);
		return bundle && bundle[key] ? bundle[key] : (textObj.defaultText || key);
	}
}

const getI18nBundle = packageName => {
	if (I18nBundleInstances.has(packageName)) {
		return I18nBundleInstances.get(packageName);
	}

	const i18nBundle = new I18nBundle(packageName);
	I18nBundleInstances.set(packageName, i18nBundle);
	return i18nBundle;
};

export {
	registerI18nLoader,
	fetchI18nBundle,
	getI18nBundle,
};
