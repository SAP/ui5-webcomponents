/**
 * Class decorator, that sets the themeAware metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const themeAware = (target: any): void => {
	if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
		target.metadata = {};
	}

	target.metadata.themeAware = true;
};

export default themeAware;
