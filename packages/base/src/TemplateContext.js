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

		return templateContext;
	}
}

export default TemplateContext;
