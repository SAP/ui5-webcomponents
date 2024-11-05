import type UI5Element from "../UI5Element.js";
import type { Slot } from "../UI5ElementMetadata.js";

/**
 * Returns a slot decorator.
 *
 * @param { Slot } slotData
 * @returns { PropertyDecorator }
 */
const slot = (slotData?: Slot) => {
	return <This extends UI5Element, Value>(target: any, ctxOrProp: string | symbol | ClassAccessorDecoratorContext<This, Value>): void => {
		if (ctxOrProp instanceof Object && "kind" in ctxOrProp) {
			// JS decorator
			const ctx = ctxOrProp;
			const propName = ctx.name as string;
			if (ctx.metadata) {
				ctx.metadata.slots ??= {};
				const slotMetadata = ctx.metadata.slots as Record<string, Slot>;

				if (slotData && slotData.default && slotMetadata.default) {
					throw new Error("Only one slot can be the default slot.");
				}

				const key = slotData && slotData.default ? "default" : propName;
				slotData = slotData || { type: HTMLElement };

				if (!slotData.type) {
					slotData.type = HTMLElement;
				}

				if (!slotMetadata[key]) {
					slotMetadata[key] = slotData;
				}

				if (slotData.default) {
					delete slotMetadata.default.default;
					slotMetadata.default.propertyName = propName;
				}
				ctx.metadata.managedSlots = true;
			}
			return {
				get(this: This): Value {
					return this._state[ctx.name as string] as Value;
				},
				set(this: This, value: Value) {
					const oldValue = target.get.call(this);
					const isDifferent = oldValue !== value;
					if (isDifferent) {
						target.set.call(this, value);
						this._invalidate({
							type: "property",
							name: ctx.name as string,
							target: this,
						});
					}
				},
				// init(initialValue: unknown) {
				// 	console.log("init", propertyKey.name, initialValue);
				// 	return initialValue;
				// },
			} as unknown as void;
		}

		const propName: string | symbol = ctxOrProp;
		const ctor = target.constructor as typeof UI5Element;

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

		const key = slotData && slotData.default ? "default" : propName as string;
		slotData = slotData || { type: HTMLElement };

		if (!slotData.type) {
			slotData.type = HTMLElement;
		}

		if (!slotMetadata[key]) {
			slotMetadata[key] = slotData;
		}

		if (slotData.default) {
			delete slotMetadata.default.default;
			slotMetadata.default.propertyName = propName as string;
		}

		ctor.metadata.managedSlots = true;
	};
};

export default slot;
