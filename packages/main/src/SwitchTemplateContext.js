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
			sapWCSwitch: true,
			sapWCSwitchDisabled: state.disabled,
			sapWCSwitchChecked: state.checked,
		};
	}
}

export default SwitchTemplateContext;
