const _convertClasses = (classes, customStyleClasses) => {
	for (let i in classes) {
		let customStyleClassesToAdd = i === "main" ? customStyleClasses : undefined;
		classes[i] = _convertSingleClass(classes[i], customStyleClassesToAdd);
	}

	return classes;
};

const _convertSingleClass = (oClass, customStyleClasses) => {
	// Push all custom classes first, if any
	if (Array.isArray(customStyleClasses)) {
		customStyleClasses.forEach(function (sClassName) {
			oClass[sClassName] = true;
		});
	}

	return Object.keys(oClass).filter(function (className) {
		return oClass[className];
	}).join(" ");
};

const _convertStyles = function (styles) {

	if (!styles) {
		return;
	}

	for (let i in styles) {
		let stylesNs = styles[i];

		let result = [];
		Object.keys(stylesNs).forEach(function (key) {
			if (stylesNs[key]) {
				result.push(key + ": " + stylesNs[key]);
			}
		});
		styles[i] = result.length ? result.join("; ") : undefined;
	}

	return styles;
};

class TemplateContext {

	// calculate control template context
	static calculate (control) {
		const templateContextMethod = control.constructor.calculateTemplateContext;
		const templateContext = templateContextMethod(control._state);
		if (!templateContext.hasOwnProperty('ariaHidden')) {
			templateContext.ariaHidden = control._state.hidden ? "true" : undefined;
		}

		templateContext.classes = _convertClasses(templateContext.classes, control._customClasses);
		templateContext.styles = _convertStyles(templateContext.styles);

		return templateContext;
	}

}

export default TemplateContext;