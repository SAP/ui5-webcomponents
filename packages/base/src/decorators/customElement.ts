/**
 * Returns a custom element class decorator.
 *
 * @param { string } tag
 * @returns { ClassDecorator }
 */
const customElement = (tag: string): ClassDecorator => {
	return (target: any) => {
		if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
			target.decoratorMetadata = {};
		}

		target.decoratorMetadata.tag = tag;
	};
};

export default customElement;
