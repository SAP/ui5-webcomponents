import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import getDesigntimePropertyAsArray from "@ui5/webcomponents-base/dist/util/getDesigntimePropertyAsArray.js";
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

/**
 * OpenUI5 Configuration Shim
 */
const Configuration = {
	getLanguage,
	getCalendarType,
	getSupportedLanguages: () => getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$"),
	getOriginInfo: emptyFn,
	getFormatSettings: () => FormatSettings,
};

/**
 * OpenUI5 Core shim
 */
const Core = {
	getConfiguration: () => Configuration,
	getLibraryResourceBundle: emptyFn(),
	getFormatSettings: () => FormatSettings,
};

export default Core;
