import whenDOMReady from "./util/whenDOMReady.js";
import EventEnrichment from "./events/EventEnrichment.js";
import { insertIconFontFace } from "./IconFonts.js";
import DOMEventHandler from "./DOMEventHandler.js";
import { applyTheme } from "./Theming.js";
import whenPolyfillLoaded from "./compatibility/whenPolyfillLoaded.js";

EventEnrichment.run();

let bootPromise;

const boot = () => {
	if (bootPromise) {
		return bootPromise;
	}

	bootPromise = new Promise(async resolve => {
		await whenDOMReady();
		applyTheme();
		insertIconFontFace();
		DOMEventHandler.start();
		await whenPolyfillLoaded();
		resolve();
	});

	return bootPromise;
};

export default boot;
