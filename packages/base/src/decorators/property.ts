import type UI5Element from "../UI5Element.js";
import { Property } from "../UI5ElementMetadata.js";

/**
 * Returns a property decorator.
 *
 * @param { Property } propData
 * @returns { PropertyDecorator }
 */
const property = (propData: Property): PropertyDecorator => {
	return (target: any, propertyKey: string | symbol) => {
		const ctor = target.constructor as typeof UI5Element;
		const propsMeta = ctor.getMetadata().getProperties();

		if (!propsMeta[propertyKey as string]) {
			propsMeta[propertyKey as string] = propData;
		}
	};
};

export default property;
