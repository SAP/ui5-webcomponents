/**
 * Class decorator, that sets the themeAware metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const themeAware = (target: any): void => {
	if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
		target.decoratorMetadata = {};
	}

	target.decoratorMetadata.themeAware = true;
};

export default themeAware;
