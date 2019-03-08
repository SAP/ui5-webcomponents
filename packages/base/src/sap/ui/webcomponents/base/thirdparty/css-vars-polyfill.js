/*!
 * css-var-polyfill.js - v1.1.0
 *
 * Copyright (c) 2018 Aaron Barker <http://aaronbarker.net>
 * Released under the MIT license
 *
 * Date: 2018-04-30
 */


const vars = new Map();

/**
 * Scans the given string, extracts all CSS vars from it and stores them internally
 * @param styleString - string containing CSS variables
 */
const findCSSVars = (styleString) => {
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
	vars.forEach((varValue, varName) => {
		let getterRegex = new RegExp('var\\(\\s*' + varName + '\\s*\\)', 'g');
		styleString = styleString.replace(getterRegex, varValue);

		// now check for any getters that are left that have fallbacks
		let getterRegex2 = new RegExp('var\\(\\s*.+\\s*,\\s*(.+)\\)', 'g');
		let matches = styleString.match(getterRegex2);
		if (matches) {
			matches.forEach(function(match) {
				styleString = styleString.replace(match, match.match(/var\(.+,\s*(.+)\)/)[1]);
			});
		}
	});
	return styleString;
};

const CSSVarsPolyfill = {
	findCSSVars,
	applyCSSVars
};

window.CSSVarsPolyfill = CSSVarsPolyfill;

export default CSSVarsPolyfill;
