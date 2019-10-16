import whenDOMReady from "./util/whenDOMReady.js";
import EventEnrichment from "./events/EventEnrichment.js";
import DOMEventHandler from "./DOMEventHandler.js";
import { getTheme } from "./config/Theme.js";
import { _applyTheme } from "./Theming.js";
import whenPolyfillLoaded from "./compatibility/whenPolyfillLoaded.js";

EventEnrichment.run();

let bootPromise;

const boot = () => {
	if (bootPromise) {
		return bootPromise;
	}

	bootPromise = new Promise(async resolve => {
		await whenDOMReady();
		await _applyTheme(getTheme());
		DOMEventHandler.start();
		await whenPolyfillLoaded();
		resolve();
	});

	return bootPromise;
};

export default boot;
