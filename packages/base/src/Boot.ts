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
import { PromiseResolve } from "./types.js";
import { attachThemeRegistered } from "./theming/ThemeRegistered.js";

let booted = false;
let bootPromise: Promise<void>;
const eventProvider = new EventProvider<void, void>();

/**
 * Attaches a callback that will be executed after boot finishes.
 * <b>Note:</b> If the framework already booted, the callback will be immediately executed.
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
	if (bootPromise !== undefined) {
		return bootPromise;
	}

	const bootExecutor = async (resolve: PromiseResolve) => {
		if (typeof document === "undefined") {
			resolve();
			return;
		}

		attachThemeRegistered(onThemeRegistered);

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

		booted = true;
		await eventProvider.fireEventAsync("boot");
	};

	bootPromise = new Promise(bootExecutor as (resolve: PromiseResolve) => void);
	return bootPromise;
};

/**
 * Callback, executed after theme properties registration
 * to apply the newly registered theme.
 * @private
 * @param { string } theme
 */
const onThemeRegistered = (theme: string) => {
	const currentTheme = getTheme();
	if (booted && theme === currentTheme) {
		applyTheme(currentTheme);
	}
};

export {
	boot,
	attachBoot,
};
