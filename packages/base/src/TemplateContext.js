class TemplateContext {
	// calculate control template context
	static calculate(control) {
		let templateContext;

		// Compatibility - old template context
		if (control.constructor.hasOwnProperty("calculateTemplateContext")) { // eslint-disable-line
			const templateContextMethod = control.constructor.calculateTemplateContext;
			templateContext = templateContextMethod(control);
		} else {
			templateContext = control;
		}

		if (!templateContext.hasOwnProperty("ariaHidden")) { // eslint-disable-line
			templateContext.ariaHidden = control.hidden ? "true" : undefined;
		}

		return templateContext;
	}
}

export default TemplateContext;
