/**
	* Escape a regular expression text so that it can be used in a regular expression.
	* @param {string} text The raw text
	* @returns The regular expression text, with special characters having been escaped.
	*/
export function escapeRegex(text) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
	* Replace all instances of a particular find text.˝
	* @param {string} text The text to find/replace on
	* @param {string} find The string to find
	* @param {string|function} replace The replace string or function
	* @param {boolean=} caseInsensitive true if the replace is case insensitive, false by default
	* @return {string} The string with all matches replaced.
	*/
export function replaceAll(text, find, replace, caseInsensitive) {
	return text.replace(new RegExp(escapeRegex(find), `${caseInsensitive ? "i" : ""}g`), replace);
}

// HTML needs to escape all characters that are used to delimit markup
const dangerousReplacements = {
	'&lt;': /</g,
	'&amp;': /&/g,
	'&quot;': /"/g,
	'&gt;': />/g,
	'&apos;': /'/g
};

/**
	* Escape all html special characters in a string to their html entity equivalent.
	* @param {string} text The raw text, which may contain markup
	* @return {string} The escaped text
	*/
export function escapeHTML(text) {
	Object.keys(dangerousReplacements).map((replacement) => {
		text = text.replace(dangerousReplacements[replacement], replacement);
	});
	return text;
}

/**
	* Encode an object as html attributes.
	* @param {string|object=} attributes Optional object, if falsy return empty string.
	* @return {string} The html attribute string encoded safely
	*/
export function encodeHTMLAttributes(attributes) {
	if (typeof attributes == 'string') {
		// Add a space at the beginning to separate the tag name and attribute string
		return ` ${attributes}`;
	}
	return Object.keys(attributes || {}).map(attributeName => `${attributeName}="${escapeHTML(attributes[attributeName])}"`);
}

/**
	* Generate markup for a raw string where a particular text is wrapped with some tag, by default `<b>` (bold) tag.
	* @param {string} text The text to add highlighting to, all characters are interpretted literally (and not considered markup)
	* @param {string} input The search text to highlight, all characters are interpretted literally (and not considered markup)
	* @param {string=} highlightTagName The tag name to use for the highlight markup, default is "b"
	* @param {string|object=} highlightAttributes Optionally add attributes to the rendered highlight markup tag,
	*   e.g. either {class:"highlight"} or 'class="highlight"' would be acceptable
	* @return {string} the markup HTML which contains all occurrances of the input text surrounded with the markup start/end tags.
	*/
export function generateHighlightedMarkup(text, input, highlightTagName = "b", highlightTagAttributes) {
	if (!text) {
		return text;
	}
	const makeToken = i => {
		// create a replace token that is not found in either text or input strings.
		while (text.indexOf(i) >= 0 || input.indexOf(i) >= 0) {
			i = `[${i}]`;
		}
		return i;
	};
	const highlightStart = `<${highlightTagName}${encodeHTMLAttributes(highlightTagAttributes)}>`;
	const highlightEnd = `</${highlightTagName}>`;
	const start = makeToken("[b]");
	const end = makeToken("[/b]");
	let result = replaceAll(text, input, match => `${start}${match}${end}`, true);
	result = escapeHTML(result);
	[[start, highlightStart], [end, highlightEnd]].forEach(([find, replace]) => {
		result = replaceAll(result, find, replace);
	});
	return result;
}
