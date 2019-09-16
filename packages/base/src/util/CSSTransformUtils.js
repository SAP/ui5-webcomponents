const findClosingParenthesisPos = (str, openingParenthesisPos) => {
	let opened = 1;
	for (let pos = openingParenthesisPos + 1; pos < str.length; pos++) {
		const char = str.charAt(pos);
		if (char === "(") {
			opened++;
		} else if (char === ")") {
			opened--;
		}
		if (opened === 0) {
			return pos;
		}
	}
};

const replaceSelector = (str, selector, selectorStartPos, replacement) => {
	const charAfterSelectorPos = selectorStartPos + selector.length;
	const charAfterSelector = str.charAt(charAfterSelectorPos);

	const upToSelector = str.substring(0, selectorStartPos) + replacement;
	if (charAfterSelector === "(") {
		const closingParenthesisPos = findClosingParenthesisPos(str, charAfterSelectorPos);
		return upToSelector + str.substring(charAfterSelectorPos + 1, closingParenthesisPos) + str.substring(closingParenthesisPos + 1);
	}

	return upToSelector + str.substring(charAfterSelectorPos);
};

/**
 * :host => ui5-button
 * :host([expr]) => ui5-button[expr]
 * ::slotted(expr) => expr
 * @param str - source string
 * @param selector - :host or ::slotted
 * @param replacement - normally tag name
 * @returns {*}
 */
const replaceSelectors = (str, selector, replacement) => {
	let selectorStartPos = str.indexOf(selector);
	while (selectorStartPos !== -1) {
		str = replaceSelector(str, selector, selectorStartPos, replacement);
		selectorStartPos = str.indexOf(selector);
	}
	return str;
};

export default replaceSelectors;
