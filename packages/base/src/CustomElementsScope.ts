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

class LitStatic {
	static html = html;
	static svg = svg;
	static unsafeStatic: (value: string) => object = unsafeStatic;
}

registerFeature("LitStatic", LitStatic);

export {
	LitStatic,
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
	setCustomElementsScopingRules,
	getCustomElementsScopingRules,
	shouldScopeCustomElement,
	getEffectiveScopingSuffixForTag,
};
