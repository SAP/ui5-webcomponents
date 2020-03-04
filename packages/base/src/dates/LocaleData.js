import LocaleData from "@ui5/webcomponents-utils/dist/sap/ui/core/LocaleData.js";
import "../shims/Core-shim.js";
import { getFirstDayOfWeek } from "../config/FormatSettings.js";

// Override getFirstDayOfWeek to favor global configuration over Locale
const original = LocaleData.prototype.getFirstDayOfWeek;
LocaleData.prototype.getFirstDayOfWeek = function () {
	const configuredValue = getFirstDayOfWeek();
	if (configuredValue !== undefined) {
		return configuredValue;
	}

	return original.call(this);
};

export default LocaleData;
