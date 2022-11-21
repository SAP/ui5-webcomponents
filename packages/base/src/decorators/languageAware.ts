/**
 * Class decorator, that sets the languageAware metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const languageAware = (target: any): void => {
	target.getMetadata().metadata.languageAware = true;
};

export default languageAware;
