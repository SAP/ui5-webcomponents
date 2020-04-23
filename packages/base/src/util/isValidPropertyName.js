// Note: disabled is present in IE so we explicitly allow it here.
// Others, such as ariaLabel, we explicitly override, so valid too
const whitelist = ["disabled", "ariaLabel"];

/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = name => {
	if (whitelist.includes(name)) {
		return true;
	}
	const classes = [
		HTMLElement,
		Element,
		Node,
	];
	return !classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

export default isValidPropertyName;
