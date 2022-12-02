/**
 * Returns a custom element class decorator.
 *
 * @param { string } tag
 * @returns { ClassDecorator }
 */
const customElement = (tag: string): ClassDecorator => {
	return (target: any) => {
		target.getMetadata().metadata.tag = tag;
	};
};

export default customElement;
