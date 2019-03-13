import whenDOMReady from "./util/whenDOMReady";
import EventEnrichment from "./events/EventEnrichment";
import { insertIconFontFace } from "./IconFonts";
import DOMEventHandler from "./DOMEventHandler";
import { initConfiguration } from "./Configuration";
import { applyTheme } from "./Theming";

EventEnrichment.run();

let bootPromise;

const Bootstrap = {

	boot() {
		if (bootPromise) {
			return bootPromise;
		}

		bootPromise = new Promise(resolve => {
			whenDOMReady().then(() => {
				initConfiguration();
				applyTheme();
				insertIconFontFace();
				DOMEventHandler.start();
				resolve();
			});
		});

		return bootPromise;
	},
};

export default Bootstrap;
