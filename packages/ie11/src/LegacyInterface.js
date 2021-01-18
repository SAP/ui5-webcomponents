import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import whenPolyfillLoaded from "./whenPolyfillLoaded.js";
import { observeDOMNode, unobserveDOMNode } from "./DOMObserver.js";
import createComponentStyleTag from "./theming/createComponentStyleTag.js";
import { runPonyfill } from "./theming/CSSVarsPonyfill.js";

const isLegacyBrowser = () => !!window.ShadyDOM;

// Executed once on boot
const onBoot = async () => {
	await (isLegacyBrowser() ? whenPolyfillLoaded() : Promise.resolve());
};

// Executed on each theme application
const onApplyTheme = () => {
	isLegacyBrowser() && runPonyfill();
};

// Executed on each component render
const onComponentRender = component => {
	if (!isLegacyBrowser()) {
		return;
	}

	if (component.constructor._needsShadowDOM() || component.constructor._needsStaticArea()) {
		createComponentStyleTag(component.constructor);
	}
};

registerFeature("LegacyInterface", {
	isLegacyBrowser,
	onBoot,
	onApplyTheme,
	onComponentRender,
	observeDOMNode,
	unobserveDOMNode,
});
