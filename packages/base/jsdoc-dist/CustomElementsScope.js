import { html, svg, unsafeStatic,
// @ts-ignore
 } from "lit-html/static.js";
import { setCustomElementsScopingSuffix, getCustomElementsScopingSuffix, setCustomElementsScopingRules, getCustomElementsScopingRules, shouldScopeCustomElement, getEffectiveScopingSuffixForTag, } from "./CustomElementsScopeUtils.js";
import { registerFeature } from "./FeaturesRegistry.js";
class LitStatic {
}
LitStatic.html = html;
LitStatic.svg = svg;
LitStatic.unsafeStatic = unsafeStatic;
registerFeature("LitStatic", LitStatic);
export { LitStatic, setCustomElementsScopingSuffix, getCustomElementsScopingSuffix, setCustomElementsScopingRules, getCustomElementsScopingRules, shouldScopeCustomElement, getEffectiveScopingSuffixForTag, };
//# sourceMappingURL=CustomElementsScope.js.map