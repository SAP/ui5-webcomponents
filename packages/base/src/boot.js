import whenDOMReady from "./util/whenDOMReady.js";
import insertFontFace from "./FontFace.js";
import insertSystemCSSVars from "./SystemCSSVars.js";
import { getTheme } from "./config/Theme.js";
import applyTheme from "./theming/applyTheme.js";
import { getFeature } from "./FeaturesRegistry.js";
import { onLegacyBoot } from "./LegacyBrowsersAdapter.js";

let bootPromise;

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
		await onLegacyBoot();

		resolve();
	});

	return bootPromise;
};

export default boot;
