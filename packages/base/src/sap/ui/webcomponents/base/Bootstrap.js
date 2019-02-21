import "./shims/Core-shim";
import "./shims/jquery-shim";

import whenDOMReady from "./util/whenDOMReady";
import EventEnrichment from "./events/EventEnrichment";
import patchNodeValue from "./compatibility/patchNodeValue";
import IconFonts from "./IconFonts";
import DOMEventHandler from "./DOMEventHandler";


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
				IconFonts.load();
				DOMEventHandler.start();
				resolve();
			});
		});

		return bootPromise;
	},
};

export default Bootstrap;
