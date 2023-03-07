/**
 * Class decorator, that sets the fastNavigation metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const fastNavigation = (target: any): void => {
	if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
		target.metadata = {};
	}

	target.metadata.fastNavigation = true;
};

export default fastNavigation;
