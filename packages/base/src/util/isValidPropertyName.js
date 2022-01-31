/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param {string} name
 * @returns {boolean}
 */
const isValidPropertyName = name => {
	if (name.startsWith("aria")) {
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
