import "./shims/Core-shim";
import "./shims/jquery-shim";

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
				resolve();
			});
		});

		return bootPromise;
	},
};

export default Bootstrap;
