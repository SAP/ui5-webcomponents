import { inject as injectCore } from "@ui5/webcomponents-utils/dist/sap/ui/core/Core.js";
import getLocale from "../locale/getLocale.js";
import { getLanguage } from "../config/Language.js";
import { getCalendarType } from "../config/CalendarType.js";
import getDesigntimePropertyAsArray from "../util/getDesigntimePropertyAsArray.js";

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

window.sap = window.sap || {};
window.sap.ui = window.sap.ui || {};
window.sap.ui.getWCCore = () => Core;

injectCore(Core);
