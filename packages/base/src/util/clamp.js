/**
 * Returns a value clamped between an upper bound 'max' and lower bound 'min'.
 * @param {number} val value
 * @param {number} min lower bound
 * @param {number} max upper bound
 * @returns {number}
 */
const clamp = (val, min, max) => {
	return Math.min(Math.max(val, min), max);
};

export default clamp;
