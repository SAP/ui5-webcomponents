import EventProvider from "./EventProvider.js";
import whenDOMReady from "./util/whenDOMReady.js";
import insertFontFace from "./FontFace.js";
import insertSystemCSSVars from "./SystemCSSVars.js";
import { getTheme } from "./config/Theme.js";
import applyTheme from "./theming/applyTheme.js";
import { registerCurrentRuntime } from "./Runtimes.js";
import { getFeature } from "./FeaturesRegistry.js";

let booted = false;
const eventProvider = new EventProvider();

/**
 * Attach a callback that will be executed on boot
 * @public
 * @param listener
 */
const attachBoot = listener => {
	eventProvider.attachEvent("boot", listener);
};

const boot = async () => {
	if (booted) {
		return;
	}

	registerCurrentRuntime();

	const OpenUI5Support = getFeature("OpenUI5Support");
	const F6Navigation = getFeature("F6Navigation");
	if (OpenUI5Support) {
		await OpenUI5Support.init();
	} else if (F6Navigation) {
		F6Navigation.init();
	}

	await whenDOMReady();
	await applyTheme(getTheme());
	OpenUI5Support && OpenUI5Support.attachListeners();
	insertFontFace();
	insertSystemCSSVars();
	await eventProvider.fireEventAsync("boot");
	booted = true;
};

export {
	boot,
	attachBoot,
};
