import LocaleData from "@ui5/webcomponents-utils/dist/sap/ui/core/LocaleData.js";
import "../shims/Core-shim.js";
import { getFirstDayOfWeek } from "../config/FormatSettings.js";


const original = LocaleData.prototype.getFirstDayOfWeek;

// in UI5 Web Components the global firstDayOfWeek configuration has precedence over the locale
LocaleData.prototype.getFirstDayOfWeek = function firstDayOfWeekCustom() {
	return getFirstDayOfWeek() !== undefined ? getFirstDayOfWeek() : original.call(this);
};

export default LocaleData;
