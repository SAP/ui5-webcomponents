import { fetchI18nBundle, getI18nBundle } from "./asset-registries/i18n.js";
import formatI18nText from "./util/formatI18nText";

const I18nBundleInstances = new Map();

class I18nBundle {
	constructor() {
		this.data = null;
	}

	getText(textObj, ...params) {
		if (!this.data || !this.data[textObj.key]) {
			return formatI18nText(textObj.defaultText, params);
		}

		return formatI18nText(this.data[textObj.key], params);
	}
}

const getI18nProvider = async packageName => {
	if (!I18nBundleInstances.has(packageName)) {
		const i18nBunle = new I18nBundle();
		i18nBunle.data = await getI18nBundle(packageName);
		I18nBundleInstances.set(packageName, i18nBunle);
	}

	return I18nBundleInstances.get(packageName);
};

export { fetchI18nBundle, getI18nBundle, getI18nProvider };
