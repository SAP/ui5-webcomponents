import {
	html,
	svg,
	unsafeStatic,
} from "lit-html/static.js";

import {
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
	setCustomElementsScopingRules,
	getCustomElementsScopingRules,
	shouldScopeCustomElement,
	getEffectiveScopingSuffixForTag,
} from "./CustomElementsScopeUtils.js";
import { registerFeature } from "./FeaturesRegistry.js";

registerFeature("LitStatic", {
	html,
	svg,
	unsafeStatic,
});

export {
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
	setCustomElementsScopingRules,
	getCustomElementsScopingRules,
	shouldScopeCustomElement,
	getEffectiveScopingSuffixForTag,
};
