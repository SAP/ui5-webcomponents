import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";

import isLegacyBrowser from "./isLegacyBrowser.js";
import whenPolyfillLoaded from "./whenPolyfillLoaded.js";
import adaptCSSForIE from "./theming/adaptCSSForIE.js";
import createComponentStyleTag from "./theming/createComponentStyleTag.js";
import {
	ponyfillNeeded,
	runPonyfill,
	schedulePonyfill,
} from "./theming/CSSVarsPonyfill.js";

registerFeature("LegacyBrowsersSupport", {
	isLegacyBrowser,
	whenPolyfillLoaded,
	adaptCSSForIE,
	createComponentStyleTag,
	ponyfillNeeded,
	runPonyfill,
	schedulePonyfill,
});
