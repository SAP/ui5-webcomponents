import propertyV1 from "./property.js";
import { PropertyV2 } from "../UI5ElementMetadata.js";

/**
 * Returns a property decorator.
 *
 * @param { Property } propData
 * @returns { PropertyDecorator }
 */
const property = (propData?: PropertyV2): PropertyDecorator => {
	propData ??= {};
	propData.hasInitializer = true;
	return propertyV1(propData);
};

export default property;
