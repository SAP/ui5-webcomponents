/**
 * Class decorator, that sets the fastNavigation metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const fastNavigation = (target: any): void => {
	if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
		target.decoratorMetadata = {};
	}

	target.decoratorMetadata.fastNavigation = true;
};

export default fastNavigation;
