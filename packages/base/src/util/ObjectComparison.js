/**
 * Checks whether or not two objects are shallow equal (equal on their first level).
 * @param {Object} object1 The first object being compared
 * @param {Object} object2 The second object being compared
 * @returns {Boolean} Whether or not the objects are shallow equal
 */
const shallowEqual = (object1, object2) => {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	return keys1.every(key => {
		if (object1[key] !== object2[key]) {
			return false;
		}
		return true;
	});
};

export default shallowEqual;
