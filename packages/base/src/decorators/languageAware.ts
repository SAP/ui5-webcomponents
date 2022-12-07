/**
 * Class decorator, that sets the languageAware metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const languageAware = (target: any): void => {
	if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
		target.decoratorMetadata = {};
	}

	target.decoratorMetadata.languageAware = true;
};

export default languageAware;
