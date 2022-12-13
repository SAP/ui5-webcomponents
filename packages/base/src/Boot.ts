import whenDOMReady from "./util/whenDOMReady.js";
import insertFontFace from "./FontFace.js";
import insertSystemCSSVars from "./SystemCSSVars.js";
import { getTheme } from "./config/Theme.js";
import applyTheme from "./theming/applyTheme.js";
import { registerCurrentRuntime } from "./Runtimes.js";
import { getFeature } from "./FeaturesRegistry.js";
import type OpenUI5Support from "./features/OpenUI5Support.js";
import type F6Navigation from "./features/F6Navigation.js";
import { PromiseResolve } from "./types.js";

let bootPromise: Promise<void>;

/**
 * Attach  a callback that will be executed on boot
 * @public
 * @param listener
 */
const attachBoot = async (listener: () => void) => {
	await boot();
	listener();
};

const boot = async (): Promise<void> => {
	if (bootPromise !== undefined) {
		return bootPromise;
	}

	const bootExecutor = async (resolve: PromiseResolve) => {
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

		resolve();
	};

	bootPromise = new Promise(bootExecutor as (resolve: PromiseResolve) => void);

	return bootPromise;
};

export {
	boot,
	attachBoot,
};
