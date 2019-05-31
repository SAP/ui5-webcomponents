import { inject as injectCore } from "@ui5/webcomponents-core/dist/sap/ui/core/Core.js";
import * as Configuration from "../Configuration.js";
import * as FormatSettings from "../FormatSettings.js";

/**
 * Shim for the OpenUI5 core
 * @deprecated - do not add new functionality
 */

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

	getFormatSettings() {
		return FormatSettings;
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
