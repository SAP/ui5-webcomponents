import { getIconInfo } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/IconPool";
import { getRTL } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";

const dir = getRTL() ? "rtl" : "ltr";

class IconTemplateContext {
	static calculate(state) {
		const iconInfo = getIconInfo(state.src) || {};
		const role = "presentation";

		const context = {
			ctr: state,
			iconContent: iconInfo.content,
			role: state._customAttributes.role || role,
			ariaExpanded: state._customAttributes["aria-expanded"],
			ariaLabelledBy: state._customAttributes["aria-labelledby"],
			classes: {
				main: IconTemplateContext.getMainClasses(state, iconInfo),
			},
			styles: {
				main: {
					"font-family": `'${iconInfo.fontFamily}'`,
				},
			},
			dir,
		};

		return context;
	}

	static getMainClasses(state, iconInfo) {
		return {
			sapWCIcon: true,
			sapWCIconMirrorInRTL: !iconInfo.suppressMirroring,
		};
	}

	static getARIALabel(iconInfo) {
		return iconInfo.text || iconInfo.name;
	}
}

export default IconTemplateContext;
