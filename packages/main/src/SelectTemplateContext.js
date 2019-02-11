class SelectTemplateContext {
	static calculate(state) {
		const mainClasses = SelectTemplateContext.getMainClasses(state);
		const tabIndex = state.disabled ? "-1" : "0";

		const context = {
			ctr: state,
			tabIndex,
			classes: { main: mainClasses },
			styles: {
				main: {},
			},
		};

		return context;
	}

	static getMainClasses(state) {
		return {
			"sapWCSelect": true,
			"sapWCSelectFocused": state._focused,
			"sapWCSelectDisabled": state.disabled,
			"sapWCSelectOpened": state._opened,
			"sapWCSelectState": state.valueState !== "None",
			[`sapWCSelect${state.valueState}`]: true,
		};
	}
}

export default SelectTemplateContext;
