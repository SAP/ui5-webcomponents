import { inject as injectCore } from "@ui5/webcomponents-core/dist/sap/ui/core/Core";
import * as Configuration from "../Configuration";

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
};

if (!window.sap) {
	window.sap = {
		ui: {},
	};
}

/**
 * @deprecated
 */
window.sap.ui.getWCCore = function getWCCore() {
	return Core;
};

injectCore(Core);
