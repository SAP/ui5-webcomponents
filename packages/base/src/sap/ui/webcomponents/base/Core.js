import ShadowDOM from './compatibility/ShadowDOM';
import whenDOMReady from './util/whenDOMReady';
import setupBrowser from './util/setupBrowser';
import setupOS from './util/setupOS';
import setupSystem from './util/setupSystem';
import configuration from "./Configuration";
import { inject as injectCore } from "@ui5/webcomponents-core/dist/sap/ui/core/Core";
import "./jquery-shim";
import EventEnrichment from "./events/EventEnrichment";
import patchNodeValue from "./compatibility/patchNodeValue";
import IconFonts from "./IconFonts";
import DOMEventHandler from "./DOMEventHandler";

// This will only have effect if the polyfill is loaded
patchNodeValue();

EventEnrichment.run();

let bootPromise;

const themeChangeCallbacks = [];

const attachThemeChange = function (callback) {
	if (themeChangeCallbacks.indexOf(callback) === -1) {
		themeChangeCallbacks.push(callback);
	}
};

const Core = {
	/**
	 * @deprecated - must be here for compatibility
	 */
	getConfiguration: function () {
		return configuration;
	},

	setTheme: function (theme) {
		if (theme === configuration.getTheme()) {
			return;
		}

		configuration._setTheme(theme);
		themeChangeCallbacks.forEach(callback => callback(theme));
	},

	addCustomCSS: function (tag, theme, css) {
		ShadowDOM._addCustomCSS(tag, theme, css);
	},

	attachThemeChange: attachThemeChange,

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
				ShadowDOM.setWebComponentRootOnHTML();
				attachThemeChange(ShadowDOM._applyTheme);

				setupBrowser(document.documentElement);
				setupOS(document.documentElement);
				setupSystem(document.documentElement);

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
