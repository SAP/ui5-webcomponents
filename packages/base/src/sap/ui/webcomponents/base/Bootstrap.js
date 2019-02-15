import "./shims/Core-shim";
import "./shims/jquery-shim";

import whenDOMReady from "./util/whenDOMReady";
import EventEnrichment from "./events/EventEnrichment";
import { insertIconFontFace } from "./IconFonts";
import DOMEventHandler from "./DOMEventHandler";
import { getThemeProperties } from "./theming/ThemeProperties";
import { getTheme } from "./Configuration";
import { injectThemeProperties } from "./theming/StyleInjection";

EventEnrichment.run();

let bootPromise;

const Bootstrap = {

	boot() {
		if (bootPromise) {
			return bootPromise;
		}

		// insert theme parameters in head
		getThemeProperties("@ui5/webcomponents", getTheme())
			.then(styles => {
				injectThemeProperties(styles);
			});
		bootPromise = new Promise(resolve => {
			whenDOMReady().then(() => {
				insertIconFontFace();
				DOMEventHandler.start();
				resolve();
			});
		});

		return bootPromise;
	},
};

export default Bootstrap;
