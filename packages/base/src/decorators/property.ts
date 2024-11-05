import type UI5Element from "../UI5Element.js";
import type { Property } from "../UI5ElementMetadata.js";

/**
 * Returns a property decorator.
 *
 * @param { Property } propData
 * @returns { PropertyDecorator }
 */
export default function property(propData?: Property) {
	return function propertyDecorator<This extends UI5Element, Value>(target: any, propertyKey: ClassAccessorDecoratorContext<This, Value> | string | symbol): void {
		if (typeof propertyKey === "object" && "kind" in propertyKey) {
			// JS decorator
			if (propertyKey.metadata) {
				propertyKey.metadata.properties ??= {};
				const propsMetadata = propertyKey.metadata.properties as Record<string, Property>;
				if (!propsMetadata[propertyKey.name as string]) {
					propsMetadata[propertyKey.name as string] = propData ?? {};
				}
			}

			return {
				get(this: This): Value {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return target.get.call(this);
				},
				set(this: This, value: Value) {
					const oldValue = target.get.call(this);
					const isDifferent = oldValue !== value;
					if (isDifferent) {
						target.set.call(this, value);
						this._invalidate({
							type: "property",
							name: propertyKey.name as string,
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

		// experimental decorator
		const ctor = target.constructor as typeof UI5Element;

		if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
			ctor.metadata = {};
		}

		const metadata = ctor.metadata;
		if (!metadata.properties) {
			metadata.properties = {};
		}

		const propsMetadata = metadata.properties;
		if (!propsMetadata[propertyKey as string]) {
			propsMetadata[propertyKey as string] = propData ?? {};
		}
	};
}
