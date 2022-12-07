import type UI5Element from "../UI5Element.js";
import { Property } from "../UI5ElementMetadata.js";

/**
 * Returns a property decorator.
 *
 * @param { Property } propData
 * @returns { PropertyDecorator }
 */
const property = (propData?: Property): PropertyDecorator => {
	return (target: any, propertyKey: string | symbol) => {
		const ctor = target.constructor as typeof UI5Element;

		if (!Object.prototype.hasOwnProperty.call(ctor, "decoratorMetadata")) {
			ctor.decoratorMetadata = {};
		}

		const decoratorMetadata = ctor.decoratorMetadata;
		if (!decoratorMetadata.properties) {
			decoratorMetadata.properties = {};
		}

		const propsMetadata = decoratorMetadata.properties;
		if (!propsMetadata[propertyKey as string]) {
			propsMetadata[propertyKey as string] = propData || { type: String };
		}
	};
};

export default property;
