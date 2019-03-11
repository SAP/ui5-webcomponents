let vars = new Map();

/**
 * Scans the given string, extracts all CSS vars from it and stores them internally
 * @param styleString - string containing CSS variables
 */
const findCSSVars = (styleString) => {
	vars = new Map();
	const couples = styleString.match(/--[^:)]+:\s*[^;}]+/g) || [];
	couples.forEach(couple => {
		let [varName, varValue] = couple.split(/:\s*/);
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
	vars.forEach((varValue, varName) => {
		const re = new RegExp(`var\\(\\s*${varName}.*?\\)`, "g");
		styleString = styleString.replace(re, varValue);
	});

	// Replace all unresolved variables with their default values
	styleString = styleString.replace(/var\(.*?,\s*(.*?)\)/g, "$1");

	return styleString;
};

const CSSVarsSimulation = {
	findCSSVars,
	applyCSSVars
};

window.CSSVarsSimulation = CSSVarsSimulation;

export default CSSVarsSimulation;
