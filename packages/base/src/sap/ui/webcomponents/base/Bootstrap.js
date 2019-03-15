import whenDOMReady from "./util/whenDOMReady";
import EventEnrichment from "./events/EventEnrichment";
import { insertIconFontFace } from "./IconFonts";
import DOMEventHandler from "./DOMEventHandler";

EventEnrichment.run();

let bootPromise;

const Bootstrap = {

	boot() {
		if (bootPromise) {
			return bootPromise;
		}

		bootPromise = new Promise(resolve => {
			whenDOMReady().then(() => {
				insertIconFontFace();
				DOMEventHandler.start();

				if (window.WebComponents && window.WebComponents.waitFor) {
					// the polyfill loader is present
					window.WebComponents.waitFor(() => {
						// the polyfills are loaded, safe to execute code depending on their APIs
						resolve();
					});
				} else {
					// polyfill loader missing, modern browsers only
					resolve();
				}
			});
		});

		return bootPromise;
	},
};

export default Bootstrap;
