import whenDOMReady from "./util/whenDOMReady";
import EventEnrichment from "./events/EventEnrichment";
import { insertIconFontFace } from "./IconFonts";
import DOMEventHandler from "./DOMEventHandler";
import whenPolyfillLoaded from "./compatibility/whenPolyfillLoaded";

EventEnrichment.run();

let bootPromise;

const Bootstrap = {

	boot() {
		if (bootPromise) {
			return bootPromise;
		}

		bootPromise = new Promise(async resolve => {
			await whenDOMReady();
			insertIconFontFace();
			DOMEventHandler.start();
			await whenPolyfillLoaded();
			resolve();
		});

		return bootPromise;
	},
};

export default Bootstrap;
