const deepEqual = (a, b, ignoreFunctions, maxDepth, contains, depth) => {
	if (typeof maxDepth === "boolean") {
		contains = maxDepth;
		maxDepth = undefined;
	}

	if (!depth) {
		depth = 0;
	}

	if (!maxDepth) {
		maxDepth = 10;
	}

	if (depth > maxDepth) {
		return false;
	}

	if (a === b) {
		return true;
	}

	if (ignoreFunctions && typeof a === "function" && typeof b === "function") {
		return true;
	}

	const bIsReallyNaN = typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
	if (bIsReallyNaN) {
		return true;
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		if (!contains && a.length !== b.length) {
			return false;
		}

		if (a.length > b.length) {
			return false;
		}

		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i], ignoreFunctions, maxDepth, contains, depth + 1)) {
				return false;
			}
		}
		return true;
	}

	if (typeof a === "object" && typeof b === "object") {
		if (!a || !b) {
			return false;
		}

		if (a.constructor !== b.constructor) {
			return false;
		}

		if (!contains && Object.keys(a).length !== Object.keys(b).length) {
			return false;
		}

		if (a instanceof Node) {
			return a.isEqualNode(b);
		}

		if (a instanceof Date) {
			return a.valueOf() === b.valueOf();
		}

		return !Object.keys(a).some(i => {
			return !deepEqual(a[i], b[i], ignoreFunctions, maxDepth, contains, depth + 1);
		});
	}

	return false;
};

const isNaN = () => {
	return Number.isNaN || window.isNaN; // eslint-disable-line
};

export default deepEqual;
