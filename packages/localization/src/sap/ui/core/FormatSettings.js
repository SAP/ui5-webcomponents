import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";

const emptyFn = () => {};

/**
 * OpenUI5 FormatSettings shim
 */
const FormatSettings = {
	getFormatLocale: getLocale,
	getLegacyDateFormat: emptyFn,
	getLegacyDateCalendarCustomizing: emptyFn,
	getCustomLocaleData: emptyFn,
};

export default FormatSettings;
