import { fetchI18nBundle, getI18nBundleData } from "./asset-registries/i18n.js";
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

		if (!bundle || !bundle[textObj.key]) {
			return formatMessage(textObj.defaultText, params); // Fallback to "en"
		}

		return formatMessage(bundle[textObj.key], params);
	}
}

const getI18nBundle = packageName => {
	if (I18nBundleInstances.has(packageName)) {
		return I18nBundleInstances.get(packageName);
	}

	const i18nBunle = new I18nBundle(packageName);
	I18nBundleInstances.set(packageName, i18nBunle);
	return i18nBunle;
};

export { fetchI18nBundle, getI18nBundle };
