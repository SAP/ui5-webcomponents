import type UI5Element from "../UI5Element.js";

type i18nDecorator = (target: typeof UI5Element, propertyName: string) => void;

/**
 * A decorator that converts a static class member into an accessor for the i18n bundle with a specified name
 *
 * @param { string } bundleName name of the i18n bundle to load
 * @returns { i18nDecorator }
 *
 * ```ts
 * class MyComponnet extends UI5Element {
 *   @i18n('@ui5/webcomponents')
 *   i18nBundle: I18nBundle;
 * }
 * ```
 */
const i18n = (bundleName: string) => {
	return (target: any, propertyName: string | ClassAccessorDecoratorContext): void => {
		if (propertyName instanceof Object && "kind" in propertyName) {
			// JS decorator
			if (propertyName.metadata) {
				propertyName.metadata.i18n ??= {};
				const i18nData = propertyName.metadata.i18n as Record<string, { bundleName: string, target: typeof UI5Element }>;
				i18nData[propertyName.name as string] = {
					bundleName,
					// eslint-disable-next-line @typescript-eslint/unbound-method
					target: propertyName.access.set.bind(this) as any,
				};
			}
			return {
				get(this: typeof UI5Element): any {
					return (propertyName.access as any).get.call(this);
				},
				// set(this: UI5Element, value: any) {
				// 	target.set.call(this, value);
				// },
			} as unknown as void;
		}
		if (!target.metadata.i18n) {
			target.metadata.i18n = {};
		}
		target.metadata.i18n[propertyName] = {
			bundleName,
			target,
		};
	};
};

export default i18n;
