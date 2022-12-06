/**
 * Class decorator, that sets the fastNavigation metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const fastNavigation = (target: any): void => {
	target.getMetadata().metadata.fastNavigation = true;
};

export default fastNavigation;
