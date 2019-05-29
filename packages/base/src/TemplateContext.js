class TemplateContext {
	// calculate control template context
	static calculate(control) {
		const templateContext = control;
		if (!templateContext.hasOwnProperty("ariaHidden")) { // eslint-disable-line
			templateContext.ariaHidden = control.hidden ? "true" : undefined;
		}

		return templateContext;
	}
}

export default TemplateContext;
