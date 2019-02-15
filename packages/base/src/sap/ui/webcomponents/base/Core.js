import ShadowDOM from './compatibility/ShadowDOM';
import whenDOMReady from './util/whenDOMReady';
import configuration from "./Configuration";
import { inject as injectCore } from "@ui5/webcomponents-core/dist/sap/ui/core/Core";
import "./jquery-shim";
import EventEnrichment from "./events/EventEnrichment";
import patchNodeValue from "./compatibility/patchNodeValue";
import IconFonts from "./IconFonts";
import DOMEventHandler from "./DOMEventHandler";
import { attachThemeChange, setTheme } from "./ThemeManager";

// This will only have effect if the polyfill is loaded
patchNodeValue();

EventEnrichment.run();

let bootPromise;

const Core = {
	/**
	 * @deprecated - must be here for compatibility
	 */
	getConfiguration: function () {
		return configuration;
	},

	setTheme,

	addCustomCSS: function (tag, theme, css) {
		ShadowDOM._addCustomCSS(tag, theme, css);
	},

	attachThemeChange,

	/**
	 * @deprecated - must be here for compatibility
	 */
	getLibraryResourceBundle: function () {
	},

	boot: function() {
		if (bootPromise) {
			return bootPromise;
		}

		bootPromise = new Promise(function (resolve, reject) {
			whenDOMReady().then(function() {

				// This will only have effect if the polyfill is loaded
				attachThemeChange(ShadowDOM._applyTheme);

				IconFonts.load();
				DOMEventHandler.start();
				resolve();

			});
		});

		return bootPromise;
	}

};

window.sap.ui.getWCCore = function() {
	return Core;
};

injectCore(Core);
export default Core;
