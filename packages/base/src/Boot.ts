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
import type { PromiseResolve } from "./types.js";
import { attachThemeRegistered } from "./theming/ThemeRegistered.js";
import fixSafariActiveState from "./util/fixSafariActiveState.js";

let booted = false;
let bootPromise: Promise<void>;
let openUI5ListenersAttached = false;
const eventProvider = new EventProvider<void, void>();

const isBooted = (): boolean => {
	return booted;
};

/**
 * Attaches a callback that will be executed after boot finishes.
 * **Note:** If the framework already booted, the callback will be immediately executed.
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

/**
 * This function may now be called twice - once without OpenUI5Support, and then later again, when OpenUI5 is loaded dynamically
 * In this case, deregister the UI5 Web Components listener
 */
const initF6Navigation = async () => {
	const openUI5Support = getFeature<typeof OpenUI5Support>("OpenUI5Support");
	const isOpenUI5Loaded = openUI5Support ? openUI5Support.isOpenUI5Detected() : false;
	const f6Navigation = getFeature<typeof F6Navigation>("F6Navigation");

	if (openUI5Support) {
		f6Navigation && f6Navigation.destroy(); // F6Navigation is not needed when OpenUI5 is used
		await openUI5Support.init();
	}

	if (f6Navigation && !isOpenUI5Loaded) {
		f6Navigation.init();
	}
};

const attachOpenUI5SupportListeners = () => {
	if (openUI5ListenersAttached) {
		return;
	}

	const openUI5Support = getFeature<typeof OpenUI5Support>("OpenUI5Support");
	if (openUI5Support) {
		openUI5ListenersAttached = openUI5Support.attachListeners(); // listeners will be attached (return true) only if OpenUI5 is loaded
	}
};

const boot = async (): Promise<void> => {
	if (bootPromise !== undefined) {
		return bootPromise;
	}

	const bootExecutor = async (resolve: PromiseResolve) => {
		registerCurrentRuntime();

		if (typeof document === "undefined") {
			resolve();
			return;
		}

		attachThemeRegistered(onThemeRegistered);

		await initF6Navigation(); // depends on OpenUI5Support
		await whenDOMReady();
		await applyTheme(getTheme());
		attachOpenUI5SupportListeners(); // depends on OpenUI5Support
		insertFontFace();
		insertSystemCSSVars();
		fixSafariActiveState();

		resolve();

		booted = true;
		eventProvider.fireEvent("boot");
	};

	bootPromise = new Promise(bootExecutor as (resolve: PromiseResolve) => void);
	return bootPromise;
};

const secondaryBoot = async (): Promise<void> => {
	await boot(); // make sure we're not in the middle of boot before re-running the skipped parts
	await initF6Navigation();
	attachOpenUI5SupportListeners();
};

/**
 * Callback, executed after theme properties registration
 * to apply the newly registered theme.
 * @private
 * @param { string } theme
 */
const onThemeRegistered = (theme: string) => {
	if (booted && theme === getTheme()) { // getTheme should only be called if "booted" is true
		applyTheme(getTheme());
	}
};

export {
	boot,
	secondaryBoot,
	attachBoot,
	isBooted,
};
