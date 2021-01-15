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

const adaptLinePart = (line, tag, pureTag) => {
	line = line.trim();
	line = replaceSelectors(line, "::slotted", ``); // first remove all ::slotted() occurrences

	// Host selector - replace it
	if (line.startsWith(":host")) {
		return replaceSelector(line, ":host", 0, tag);
	}

	// Leave out @keyframes and keyframe values (0%, 100%, etc...)
	// csso shortens '100%' -> 'to', make sure to leave it untouched
	if (line.match(/^[@0-9]/) || line === "to" || line === "to{") {
		return line;
	}

	// IE specific selector (directly written with the tag, f.e. ui5-button {}) - keep it
	if (line.match(new RegExp(`^${tag}[^a-zA-Z0-9-]`))) {
		return line;
	}

	// IE specific selector (directly written with the tag attribute, f.e. [ui5-button] {}) - keep it
	if (pureTag && line.startsWith(`[${pureTag}]`)) {
		return line;
	}

	// No host and no tag in the beginning of the selector - prepend the tag
	return `${tag} ${line}`;
};

const adaptCSSForIE = (str, tag, pureTag) => {
	str = str.replace(/\n/g, ` `);
	str = str.replace(/([{}])/g, `$1\n`);
	let result = ``;
	const lines = str.split(`\n`);
	lines.forEach(line => {
		const mustProcess = line.match(/{$/); // Only work on lines that end on {, otherwise just append to result
		if (mustProcess) {
			const lineParts = line.split(",");
			const processedLineParts = lineParts.map(linePart => {
				return adaptLinePart(linePart, tag, pureTag);
			});
			line = processedLineParts.join(",");
		}
		result = `${result}${line}`;
	});
	return result;
};

export default adaptCSSForIE;
