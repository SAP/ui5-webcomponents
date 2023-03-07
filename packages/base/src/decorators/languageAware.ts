/**
 * Class decorator, that sets the languageAware metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const languageAware = (target: any): void => {
	if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
		target.metadata = {};
	}

	target.metadata.languageAware = true;
};

export default languageAware;
