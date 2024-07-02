import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { getLegacyDateCalendarCustomizing } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
const emptyFn = () => { };
/**
 * OpenUI5 FormatSettings shim
 */
const FormatSettings = {
    getFormatLocale: getLocale,
    getLegacyDateFormat: emptyFn,
    getCustomLocaleData: emptyFn,
    getLegacyDateCalendarCustomizing,
};
export default FormatSettings;
//# sourceMappingURL=FormatSettings.js.map