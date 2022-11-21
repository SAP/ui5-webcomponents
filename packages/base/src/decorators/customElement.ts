/**
 * Returns a class decorator.
 *
 * @param { tag } tag
 * @returns { ClassDecorator }
 */
const customElement = (tag: string): ClassDecorator => {
	return (target: any) => {
		target.getMetadata().metadata.tag = tag;
	};
};

export default customElement;
