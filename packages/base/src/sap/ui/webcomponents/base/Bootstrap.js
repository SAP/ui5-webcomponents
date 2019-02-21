import "./shims/Core-shim";
import "./shims/jquery-shim";

import ShadowDOM from "./compatibility/ShadowDOM";
import whenDOMReady from "./util/whenDOMReady";
import EventEnrichment from "./events/EventEnrichment";
import patchNodeValue from "./compatibility/patchNodeValue";
import IconFonts from "./IconFonts";
import DOMEventHandler from "./DOMEventHandler";
import { attachThemeChange } from "./Theming";

// This will only have effect if the polyfill is loaded
patchNodeValue();

EventEnrichment.run();

let bootPromise;

const Bootstrap = {

	boot() {
		if (bootPromise) {
			return bootPromise;
		}

		bootPromise = new Promise(resolve => {
			whenDOMReady().then(() => {
				// This will only have effect if the polyfill is loaded
				attachThemeChange(ShadowDOM._applyTheme);

				IconFonts.load();
				DOMEventHandler.start();
				resolve();
			});
		});

		return bootPromise;
	},
};

export default Bootstrap;
