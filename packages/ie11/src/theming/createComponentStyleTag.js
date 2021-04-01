import createStyleInHead from "@ui5/webcomponents-base/dist/util/createStyleInHead.js";
import getEffectiveStyle from "@ui5/webcomponents-base/dist/theming/getEffectiveStyle.js";
import { attachCustomCSSChange } from "@ui5/webcomponents-base/dist/theming/CustomStyle.js";
import StaticAreaItem from "@ui5/webcomponents-base/dist/StaticAreaItem.js";
import adaptCSSForIE from "./adaptCSSForIE.js";
import { schedulePonyfill } from "./CSSVarsPonyfill.js";

const IEStyleSet = new Set();

attachCustomCSSChange(tag => {
	IEStyleSet.delete(tag);
});

const createComponentStyleTag = component => {
	const ElementClass = component.constructor;

	if (!ElementClass._needsShadowDOM() && !ElementClass._needsStaticArea()) {
		return;
	}

	const tag = ElementClass.getMetadata().getTag();
	const pureTag = ElementClass.getMetadata().getPureTag();
	if (IEStyleSet.has(tag)) {
		return;
	}

	let cssContent = getEffectiveStyle(ElementClass);
	cssContent = adaptCSSForIE(cssContent, tag, pureTag);

	// Append static CSS, if any, for IE
	let staticCssContent = getEffectiveStyle(ElementClass, true);
	if (staticCssContent) {
		staticCssContent = adaptCSSForIE(staticCssContent, StaticAreaItem.getTag());
		cssContent = `${cssContent} ${staticCssContent}`;
	}

	createStyleInHead(cssContent, {
		"data-ui5-element-styles": tag,
	});

	schedulePonyfill();

	IEStyleSet.add(tag);
};

export default createComponentStyleTag;
