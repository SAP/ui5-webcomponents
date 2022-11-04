const isDescendantOf = (klass: any, baseKlass: Function, inclusive = false) => {
	if (typeof klass !== "function" || typeof baseKlass !== "function") {
		return false;
	}
	if (inclusive && klass === baseKlass) {
		return true;
	}
	let parent = klass;
	do {
		parent = Object.getPrototypeOf(parent);
	} while (parent !== null && parent !== baseKlass);
	return parent === baseKlass;
};

export default isDescendantOf;
