/**
 * Returns a slot decorator.
 *
 * @param { Slot } slotData
 * @returns { PropertyDecorator }
 */
const slot = (slotData) => {
    return (target, slotKey) => {
        const ctor = target.constructor;
        if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
            ctor.metadata = {};
        }
        const metadata = ctor.metadata;
        if (!metadata.slots) {
            metadata.slots = {};
        }
        const slotMetadata = metadata.slots;
        if (slotData && slotData.default && slotMetadata.default) {
            throw new Error("Only one slot can be the default slot.");
        }
        const key = slotData && slotData.default ? "default" : slotKey;
        slotData = slotData || { type: HTMLElement };
        if (!slotData.type) {
            slotData.type = HTMLElement;
        }
        if (!slotMetadata[key]) {
            slotMetadata[key] = slotData;
        }
        if (slotData.default) {
            delete slotMetadata.default.default;
            slotMetadata.default.propertyName = slotKey;
        }
        ctor.metadata.managedSlots = true;
    };
};
export default slot;
//# sourceMappingURL=slot.js.map