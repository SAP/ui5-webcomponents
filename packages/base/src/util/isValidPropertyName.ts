/**
 * Tells whether the desired property name already exists either on the prototype chain, or as a global HTML attribute (note: these are all lowercase, so the same for property names)
 * @param name
 */
const clashesWithNativeName = (name: string) => {
	const nativeClasses = [
		HTMLElement,
		Element,
		Node,
	];

	const HTMLGlobalAttributes = [
		"accesskey",
		"class",
		"contenteditable",
		"dir",
		"draggable",
		"hidden",
		"id",
		"lang",
		"spellcheck",
		"style",
		"tabindex",
		"title",
		"translate",
	];

	return nativeClasses.some(nativeClass => nativeClass.prototype.hasOwnProperty(name)) || HTMLGlobalAttributes.includes(name); // eslint-disable-line
};

/**
 * We allow some already existing HTML properties to be overridden - an allowList + all aria* props
 * @param name
 */
const nativePropertyNameAllowed = (name: string) => {
	return [
		"title",
		"hidden",
		"role",
		"draggable",
	].includes(name) || name.startsWith("aria");
};

/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name the name of the property to check
 * @param forSlot whether the name will be used for a slot accessor (opposed to property accessor)
 * @returns {boolean}
 */
const isValidPropertyName = (name: string, forSlot = false) => {
	const clashes = clashesWithNativeName(name);

	if (forSlot) {
		return !clashes || name === "title"; // For slots, no exceptions allowed ("title" already used, so we make an exception for it till 2.0 is released)
	}

	return !clashes || nativePropertyNameAllowed(name); // Only for properties some names are allowed to be overridden
};

export default isValidPropertyName;
