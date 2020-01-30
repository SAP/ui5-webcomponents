import whenDOMReady from "./util/whenDOMReady.js";
import insertFontFace from "./FontFace.js";
import { getTheme } from "./config/Theme.js";
import { _applyTheme } from "./Theming.js";
import whenPolyfillLoaded from "./compatibility/whenPolyfillLoaded.js";

let bootPromise;

const boot = () => {
	if (bootPromise) {
		return bootPromise;
	}

	bootPromise = new Promise(async resolve => {
		await whenDOMReady();
		await _applyTheme(getTheme());
		insertFontFace();
		await whenPolyfillLoaded();
		resolve();
	});

	return bootPromise;
};

export default boot;
