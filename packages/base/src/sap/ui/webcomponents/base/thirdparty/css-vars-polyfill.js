/*!
 * css-var-polyfill.js - v1.1.0
 *
 * Copyright (c) 2018 Aaron Barker <http://aaronbarker.net>
 * Released under the MIT license
 *
 * Date: 2018-04-30
 */


let vars = new Map();

/**
 * Scans the given string, extracts all CSS vars from it and stores them internally
 * @param styleString - string containing CSS variables
 */
const findCSSVars = (styleString) => {
	vars = new Map();
	const couples = styleString.match(/(--[^:)]+:[\s]*[^;}]+)/g) || [];
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
		let getterRegex = new RegExp('var\\(\\s*' + varName + '.*?\\)', 'g');
		styleString = styleString.replace(getterRegex, varValue);
	});

	// Replace all unresolved variables with their default values
	styleString = styleString.replace(/var\(.*?,(.*?)\)/g, "$1");

	return styleString;
};

const CSSVarsPolyfill = {
	findCSSVars,
	applyCSSVars
};

window.CSSVarsPolyfill = CSSVarsPolyfill;

export default CSSVarsPolyfill;
