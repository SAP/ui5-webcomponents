import configuration from "../Configuration";
import { inject as injectCore } from "@ui5/webcomponents-core/dist/sap/ui/core/Core";

/**
 * Shim for the OpenUI5 core
 * @deprecated - do not add new functionality
 */
const Core = {
	/**
	 * @deprecated - must be here for compatibility
	 */
	getConfiguration: function () {
		return configuration;
	},

	/**
	 * @deprecated - must be here for compatibility
	 */
	getLibraryResourceBundle: function () {
	},
};

/**
 * @deprecated
 */
window.sap.ui.getWCCore = function() {
	return Core;
};

injectCore(Core);
