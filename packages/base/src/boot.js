import whenDOMReady from "./util/whenDOMReady.js";
import insertFontFace from "./FontFace.js";
import { getTheme } from "./config/Theme.js";
import applyTheme from "./theming/applyTheme.js";
import whenPolyfillLoaded from "./compatibility/whenPolyfillLoaded.js";
import { getFeature } from "./FeaturesRegistry.js";

let bootPromise;
const OpenUI5Support = getFeature("OpenUI5Support");

const boot = () => {
	if (bootPromise) {
		return bootPromise;
	}

	bootPromise = new Promise(async resolve => {
		if (OpenUI5Support) {
			await OpenUI5Support.init();
		}

		await whenDOMReady();
		await applyTheme(getTheme());
		OpenUI5Support && OpenUI5Support.attachListeners();
		insertFontFace();
		await whenPolyfillLoaded();
		resolve();
	});

	return bootPromise;
};

export default boot;
