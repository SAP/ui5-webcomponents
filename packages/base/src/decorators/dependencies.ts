import type UI5Element from "../UI5Element.js";

/**
 * Class decorator to define component dependencies.
 * @param { Array<UI5Element> } deps
 * @returns { ClassDecorator }
 */
const dependencies = (deps: Array<typeof UI5Element>): ClassDecorator => {
	return (target: any) => {
		Object.defineProperty(target, "dependencies", {
			get: () => deps,
		});
	};
};

export default dependencies;
