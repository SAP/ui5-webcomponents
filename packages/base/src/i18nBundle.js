import { fetchI18nBundle, getI18nBundleData } from "./asset-registries/i18n.js";
import formatMessage from "./util/formatMessage";

class i18nBundle {
	constructor(packageId) {
		this.packageId = packageId;
	}

	getText(textObj, ...params) {
		const messages = getI18nBundleData(this.packageId);

		if (!messages || !messages[textObj.key]) {
			return formatMessage(textObj.defaultText, params);
		}

		return formatMessage(messages[textObj.key], params);
	}
}

const getI18nBundle = packageId => {
	return new i18nBundle(packageId);
};

export { fetchI18nBundle, getI18nBundle };
