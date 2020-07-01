import { registerI18nBundle, fetchI18nBundle, getI18nBundleData } from "./asset-registries/i18n.js";
import formatMessage from "./util/formatMessage.js";

const I18nBundleInstances = new Map();

class I18nBundle {
	constructor(packageName) {
		this.packageName = packageName;
	}

	getText(textObj, ...params) {
		if (!textObj || !textObj.key || !textObj.defaultText) {
			return "";
		}

		const bundle = getI18nBundleData(this.packageName);
		const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : textObj.defaultText;

		return formatMessage(messageText, params);
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
	registerI18nBundle,
	fetchI18nBundle,
	getI18nBundle,
};
