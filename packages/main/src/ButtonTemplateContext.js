class ButtonTemplateContext {
	static calculate(state) {
		return {
			ctr: state,
			tabindex: state._customAttributes.tabindex,
			classes: {
				main: ButtonTemplateContext.getMainClasses(state),
				icon: ButtonTemplateContext.getIconClasses(state),
				text: {
					sapMBtnText: true,
				},
			},
			styles: {
				main: {
				},
			},
			iconSrc: state._active ? state.activeIcon : state.icon,
			ariaDisabled: state.disabled ? "true" : undefined,
		};
	}

	static getMainClasses(state) {
		return {
			sapMBtn: true,
			sapMBtnActive: state._active,
			sapMBtnWithIcon: state.icon,
			sapMBtnNoText: !state.text.length,
			sapMBtnDisabled: state.disabled,
			sapMBtnIconEnd: state.iconEnd,
			[`sapMBtn${state.type}`]: true,
		};
	}

	static getIconClasses() {
		return {
			sapWCIconInButton: true,
		};
	}
}

export default ButtonTemplateContext;
