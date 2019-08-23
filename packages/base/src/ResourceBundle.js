import { fetchResourceBundle, getBundleData } from "./asset-registries/i18n.js";
import formatMessage from "./util/formatMessage";

class ResourceBundle {
	constructor(packageId) {
		this.packageId = packageId;
	}

	getText(textObj, ...params) {
		const messages = getBundleData(this.packageId);

		if (!messages || !messages[textObj.key]) {
			return formatMessage(textObj.defaultText, params);
		}

		return formatMessage(messages[textObj.key], params);
	}
}

const getResourceBundle = packageId => {
	return new ResourceBundle(packageId);
};

export { getResourceBundle, fetchResourceBundle };
