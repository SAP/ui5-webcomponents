/**
 * Returns a default slot class decorator.
 *
 * @param { string } name The default slot name
 * @returns { ClassDecorator }
 */
const defaultSlot = (name: string): ClassDecorator => {
	return (target: any) => {
		const slotMetadata = target.getMetadata().getSlots();
		const oldSlotData = slotMetadata[name];

		if (oldSlotData) {
			delete slotMetadata[name];
			slotMetadata.default = oldSlotData;
			slotMetadata.default.propertyName = name;
		} else {
			throw new Error(`No slot matches the default slot name: ${name}`);
		}
	};
};

export default defaultSlot;
