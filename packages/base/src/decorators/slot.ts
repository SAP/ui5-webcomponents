import type UI5Element from "../UI5Element.js";
import { Slot } from "../UI5ElementMetadata.js";

/**
 * Returns a slot decorator.
 *
 * @param { Slot } slotData
 * @returns { PropertyDecorator }
 */
const slot = (slotData: Slot): PropertyDecorator => {
	return (target: any, slotKey: string | symbol) => {
		const ctor = target.constructor as typeof UI5Element;

		if (!Object.prototype.hasOwnProperty.call(ctor, "decoratorMetadata")) {
			ctor.decoratorMetadata = {};
		}

		const decoratorMetadata = ctor.decoratorMetadata;
		if (!decoratorMetadata.slots) {
			decoratorMetadata.slots = {};
		}

		const slotMetadata = decoratorMetadata.slots;
		if (!slotMetadata[slotKey as string]) {
			slotMetadata[slotKey as string] = slotData;
		}

		ctor.getMetadata().metadata.managedSlots = true;
	};
};

export default slot;
