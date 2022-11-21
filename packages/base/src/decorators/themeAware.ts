/**
 * Class decorator, that sets the themeAware metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const themeAware = (target: any): void => {
	target.getMetadata().metadata.themeAware = true;
};

export default themeAware;
