import { shouldIgnoreCustomElement } from "./IgnoreCustomElements.js";

const elementTimeouts = new Map<string, Promise<void>>();

/**
 * Awaits for all direct children that are custom elements to be defined and force upgrades them
 */
const childrenDefinedAndUpgraded = (el: HTMLElement) => {
	return Promise.all([...el.children].map(async child => {
		if (child instanceof HTMLSlotElement) {
			await childrenDefinedAndUpgraded(child);
		} else {
			const localName = child.localName;
			const shouldWaitForCustomElement = localName.includes("-") && !shouldIgnoreCustomElement(localName);
			if (shouldWaitForCustomElement) {
				const isDefined = customElements.get(localName);
				if (!isDefined) {
					const whenDefinedPromise = customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
					let timeoutPromise = elementTimeouts.get(localName);
					if (!timeoutPromise) {
						timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
						elementTimeouts.set(localName, timeoutPromise);
					}
					await Promise.race([whenDefinedPromise, timeoutPromise]);
				}
				customElements.upgrade(child);
			}
		}
	}));
};

export default childrenDefinedAndUpgraded;
