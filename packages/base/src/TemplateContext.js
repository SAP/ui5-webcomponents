class TemplateContext {
	// calculate control template context
	static calculate(control) {
		const templateContextMethod = control.constructor.calculateTemplateContext;
		const templateContext = templateContextMethod(control._state);
		if (!templateContext.hasOwnProperty("ariaHidden")) { // eslint-disable-line
			templateContext.ariaHidden = control._state.hidden ? "true" : undefined;
		}

		return templateContext;
	}
}

export default TemplateContext;
