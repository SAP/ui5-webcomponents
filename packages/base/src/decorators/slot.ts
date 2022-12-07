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
		const slotMetadata = ctor.getMetadata().getSlots();

		if (slotData.default && slotMetadata.default) {
			throw new Error("Only one slot can be the default slot.");
		}

		const key = slotData.default ? "default" : slotKey as string;

		if (!slotMetadata[key]) {
			slotMetadata[key] = slotData;
		}

		if (slotData.default) {
			delete slotMetadata.default.default;
			slotMetadata.default.propertyName = slotKey as string;
		}

		ctor.getMetadata().metadata.managedSlots = true;
	};
};

export default slot;
