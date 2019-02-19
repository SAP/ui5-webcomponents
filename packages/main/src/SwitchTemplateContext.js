class SwitchTemplateContext {
	static calculate(state) {
		const mainClasses = SwitchTemplateContext.getMainClasses(state);

		const context = {
			ctr: state,
			readOnly: !state.disabled,
			tabIndex: state.disabled ? undefined : "0",
			classes: { main: mainClasses },
			styles: {
				main: {},
			},
		};

		return context;
	}

	static getMainClasses(state) {
		return {
			"ui5-switch": true,
			"ui5-switch-disabled": state.disabled,
			"ui5-switch-checked": state.checked,
		};
	}
}

export default SwitchTemplateContext;
