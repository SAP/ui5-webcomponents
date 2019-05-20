const _convertClasses = (classes, customStyleClasses) => {
	for (const i in classes) { // eslint-disable-line
		const customStyleClassesToAdd = i === "main" ? customStyleClasses : undefined;
		classes[i] = _convertSingleClass(classes[i], customStyleClassesToAdd);
	}

	return classes;
};

const _convertSingleClass = (oClass, customStyleClasses) => {
	// Push all custom classes first, if any
	if (Array.isArray(customStyleClasses)) {
		customStyleClasses.forEach(sClassName => {
			oClass[sClassName] = true;
		});
	}

	return Object.keys(oClass).filter(className => {
		return oClass[className];
	}).join(" ");
};

const _convertStyles = function _convertStyles(styles) {
	if (!styles) {
		return "";
	}

	for (const i in styles) { // eslint-disable-line
		const stylesNs = styles[i];

		const result = [];
		Object.keys(stylesNs).forEach(key => {
			if (stylesNs[key]) {
				result.push(`${key}: ${stylesNs[key]}`);
			}
		});
		styles[i] = result.length ? result.join("; ") : "";
	}

	return styles || "";
};

class TemplateContext {
	// calculate control template context
	static calculate(control) {
		const templateContextMethod = control.constructor.calculateTemplateContext;
		const templateContext = templateContextMethod(control._state);
		if (!templateContext.hasOwnProperty("ariaHidden")) { // eslint-disable-line
			templateContext.ariaHidden = control._state.hidden ? "true" : undefined;
		}

		templateContext.classes = _convertClasses(templateContext.classes, control._customClasses);
		templateContext.styles = _convertStyles(templateContext.styles);

		return templateContext;
	}
}

export default TemplateContext;
