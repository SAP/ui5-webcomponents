import { isDesktop } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
import { getCompactSize } from "@ui5/webcomponents-base/src/Configuration.js";

const SVGConfig = {
	"compact": {
		x: 16,
		y: 16,
		rInner: 3,
		rOuter: 8,
	},
	"default": {
		x: 22,
		y: 22,
		rInner: 5,
		rOuter: 11,
	},
};


class RadioButtonTemplateContext {
	static calculate(state) {
		const compact = getCompactSize();
		const circle = compact ? SVGConfig.compact : SVGConfig.default;

		const mainClasses = RadioButtonTemplateContext.getMainClasses(state),
			innerClasses = RadioButtonTemplateContext.getInnerClasses(state),
			context = {
				ctr: state,
				readonly: state.disabled || state.readonly,
				tabIndex: state.disabled || (!state.selected && state.name) ? "-1" : "0",
				circle,
				strokeWidth: state.valueState === "None" ? "1" : "2",
				classes: { main: mainClasses, inner: innerClasses },
				styles: {
					main: {},
				},
			};

		return context;
	}

	static getMainClasses(state) {
		return {
			sapMRb: true,
			sapMRbHasLabel: state.text && state.text.length > 0,
			sapMRbSel: state.selected,
			sapMRbDis: state.disabled,
			sapMRbRo: state.readonly,
			sapMRbErr: state.valueState === "Error",
			sapMRbWarn: state.valueState === "Warning",
		};
	}

	static getInnerClasses(state) {
		const hoverable = !state.disabled && !state.readonly && isDesktop();

		return {
			sapMRbInner: true,
			sapMRbHoverable: hoverable,
		};
	}
}

export default RadioButtonTemplateContext;
