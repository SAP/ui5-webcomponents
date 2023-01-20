/**
 * Escapes a regular expression text so that it can be used in a regular expression.
 *
 * @param { string } text the string to be interpreted literally
 * @returns { string } the escaped string
 */
const escapeRegex = (text: string) => {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export default escapeRegex;
