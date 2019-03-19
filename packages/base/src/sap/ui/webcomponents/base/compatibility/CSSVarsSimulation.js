let vars = new Map();

/**
 * Scans the given string, extracts all CSS vars from it and stores them internally
 * @param styleString - string containing CSS variables
 */
const findCSSVars = styleString => {
	vars = new Map();
	const couples = styleString.match(/--[^:)]+:\s*[^;}]+/g) || [];
	couples.forEach(couple => {
		const [varName, varValue] = couple.split(/:\s*/);
		vars.set(varName, varValue);
	});
};

/**
 * Replaces all occurrences of CSS vars with their values (and fallback values)
 * @param styleString - string containing CSS selectors
 * @returns {*}
 */
const applyCSSVars = styleString => {
	// Replace all variables, with or without default value (default value removed too)
	styleString = styleString.replace(/var\(\s*([^,]+),?\s*(.*?)?\)/g, (match, name, fallback) => {
		return vars.get(name) || fallback || "";
	});

	return styleString;
};

const CSSVarsSimulation = {
	findCSSVars,
	applyCSSVars,
};

window.CSSVarsSimulation = CSSVarsSimulation;

export default CSSVarsSimulation;
