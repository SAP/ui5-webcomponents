import EventProvider from "./EventProvider.js";
import whenDOMReady from "./util/whenDOMReady.js";
import insertFontFace from "./FontFace.js";
import insertSystemCSSVars from "./SystemCSSVars.js";
import { getTheme } from "./config/Theme.js";
import applyTheme from "./theming/applyTheme.js";
import { getFeature } from "./FeaturesRegistry.js";

let bootPromise;
const eventProvider = new EventProvider();

/**
 * Attach a callback that will be executed before the framework has booted
 * @public
 * @param listener
 */
const attachBeforeBoot = listener => {
	eventProvider.attachEvent("beforeBoot", listener);
};

/**
 * Detach a callback that was passed with "attachBeforeBoot"
 * @public
 * @param listener
 */
const detachBeforeBoot = listener => {
	eventProvider.detachEvent("beforeBoot", listener);
};


const boot = () => {
	if (bootPromise) {
		return bootPromise;
	}

	bootPromise = new Promise(async resolve => {
		const OpenUI5Support = getFeature("OpenUI5Support");
		if (OpenUI5Support) {
			await OpenUI5Support.init();
		}

		await whenDOMReady();
		await applyTheme(getTheme());
		OpenUI5Support && OpenUI5Support.attachListeners();
		insertFontFace();
		insertSystemCSSVars();
		await Promise.all(eventProvider.fireEvent("beforeBoot"));

		resolve();
	});

	return bootPromise;
};

export {
	boot,
	attachBeforeBoot,
	detachBeforeBoot,
};
