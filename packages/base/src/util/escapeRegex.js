/**
 * Escape a regular expression text so that it can be used in a regular expression.
 * @param {string} text The string to be interpreted literally
 * @returns Regular expression string to pass to regex
 */
function escapeRegex(text) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default escapeRegex;
