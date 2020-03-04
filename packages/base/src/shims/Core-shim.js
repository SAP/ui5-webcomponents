import { inject as injectCore } from "@ui5/webcomponents-utils/dist/sap/ui/core/Core.js";
import * as FormatSettings from "../FormatSettings.js";
import { getLanguage } from "../config/Language.js";
import { getCalendarType } from "../config/CalendarType.js";
import { getFirstDayOfWeek } from "../config/FormatSettings.js";
import getDesigntimePropertyAsArray from "../util/getDesigntimePropertyAsArray.js";

/**
 * Shim for the OpenUI5 core
 * @deprecated - do not add new functionality
 */

const Configuration = {
	getLanguage,
	getCalendarType,
	getFirstDayOfWeek,
	getSupportedLanguages: () => {
		return getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");
	},
	getOriginInfo: () => {},
	getFormatSettings: () => FormatSettings,
};

const Core = {
	/**
	 * @deprecated - must be here for compatibility
	 */
	getConfiguration() {
		return Configuration;
	},

	/**
	 * @deprecated - must be here for compatibility
	 */
	getLibraryResourceBundle() {
	},
};

window.sap = window.sap || {};
window.sap.ui = window.sap.ui || {};

/**
 * @deprecated
 */
window.sap.ui.getWCCore = function getWCCore() {
	return Core;
};

injectCore(Core);
