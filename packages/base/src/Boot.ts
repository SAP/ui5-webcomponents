import whenDOMReady from "./util/whenDOMReady.js";
import EventProvider from "./EventProvider.js";
import insertFontFace from "./FontFace.js";
import insertSystemCSSVars from "./SystemCSSVars.js";
import { getTheme } from "./config/Theme.js";
import applyTheme from "./theming/applyTheme.js";
import { registerCurrentRuntime } from "./Runtimes.js";
import { getFeature } from "./FeaturesRegistry.js";
import type OpenUI5Support from "./features/OpenUI5Support.js";
import type F6Navigation from "./features/F6Navigation.js";

const eventProvider = new EventProvider<void, void>();
let booted = false;

/**
 * Attaches a callback that will be executed after boot finishes.
 * @public
 * @param { Function } listener
 */
const attachBoot = (listener: () => void) => {
	if (!booted) {
		eventProvider.attachEvent("boot", listener);
		return;
	}

	listener();
};

const boot = async (): Promise<void> => {
	if (booted) {
		return;
	}

	if (typeof document === "undefined") {
		return;
	}

	registerCurrentRuntime();

	const openUI5Support = getFeature<typeof OpenUI5Support>("OpenUI5Support");
	const isOpenUI5Loaded = openUI5Support ? openUI5Support.isLoaded() : false;
	const f6Navigation = getFeature<typeof F6Navigation>("F6Navigation");

	if (openUI5Support) {
		await openUI5Support.init();
	}

	if (f6Navigation && !isOpenUI5Loaded) {
		f6Navigation.init();
	}

	await whenDOMReady();
	await applyTheme(getTheme());
	openUI5Support && openUI5Support.attachListeners();
	insertFontFace();
	insertSystemCSSVars();

	await eventProvider.fireEventAsync("boot");
	booted = true;
};

export {
	boot,
	attachBoot,
};
