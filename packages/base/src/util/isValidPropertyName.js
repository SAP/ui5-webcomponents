/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 * Note: disabled is present in IE so we explicitly allow it here.
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = name => {
	if (name === "disabled") {
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
