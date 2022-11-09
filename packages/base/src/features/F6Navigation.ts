import { registerFeature } from "../FeaturesRegistry.js";
import { isF6Next, isF6Previous } from "../Keys.js";
import { instanceOfUI5Element } from "../UI5Element.js";
import { getFirstFocusableElement } from "../util/FocusableElements.js";
import getFastNavigationGroups from "../util/getFastNavigationGroups.js";

class F6Navigation {
	keydownHandler: (event: KeyboardEvent) => Promise<void> = async () => {};
	selectedGroup: HTMLElement | null = null;
	groups: Array<HTMLElement | null> = [];

	// TODO: replace init with a constructor
	init() {
		this.keydownHandler = this._keydownHandler.bind(this);
		this.attachEventListeners();
	}

	attachEventListeners() {
		document.addEventListener("keydown", this.keydownHandler);
	}

	async _keydownHandler(event: KeyboardEvent) {
		if (isF6Next(event)) {
			this.updateGroups();

			if (this.groups.length < 1) {
				return;
			}

			event.preventDefault();

			const nextIndex = this.groups.indexOf(this.selectedGroup);
			let nextElement = null;

			if (nextIndex > -1) {
				if (nextIndex + 1 >= this.groups.length) {
					nextElement = this.groups[0];
				} else {
					nextElement = this.groups[nextIndex + 1];
				}
			} else {
				nextElement = this.groups[0];
			}

			const elementToFocus = await getFirstFocusableElement(instanceOfUI5Element(nextElement) ? nextElement.getDomRef() : nextElement, true);
			elementToFocus?.focus();
		}

		if (isF6Previous(event)) {
			this.updateGroups();

			if (this.groups.length < 1) {
				return;
			}

			event.preventDefault();

			const nextIndex = this.groups.indexOf(this.selectedGroup);
			let nextElement = null;

			if (nextIndex > 0) {
				// Handle the situation where the first focusable element of two neighbor groups is the same
				// For example:
				// <ui5-flexible-column-layout>
				//     <ui5-list>
				//         <ui5-li>List Item</ui5-li>
				//     </ui5-list>
				// </ui5-flexible-column-layout>
				// Here for both FCL & List the firstFoccusableElement is the same (the ui5-li)

				const firstFocusable = await getFirstFocusableElement(this.groups[nextIndex - 1], true);
				const shouldSkipParent = firstFocusable === await getFirstFocusableElement(this.groups[nextIndex], true);

				nextElement = this.groups[shouldSkipParent ? nextIndex - 2 : nextIndex - 1];
			} else {
				nextElement = this.groups[this.groups.length - 1];
			}

			const elementToFocus = await getFirstFocusableElement(instanceOfUI5Element(nextElement) ? nextElement.getDomRef() : nextElement, true);
			elementToFocus?.focus();
		}
	}

	removeEventListeners() {
		document.removeEventListener("keydown", this.keydownHandler);
	}

	updateGroups() {
		this.setSelectedGroup();
		this.groups = getFastNavigationGroups(document.body);
	}

	setSelectedGroup(root: DocumentOrShadowRoot = window.document) {
		const htmlElement = window.document.querySelector("html");
		let element: Element | null | ParentNode = this.deepActive(root);

		while (element && (element as Element).getAttribute("data-sap-ui-fastnavgroup") !== "true" && element !== htmlElement) {
		   element = element.parentElement ? element.parentNode : (element.parentNode as ShadowRoot).host;
		}

		this.selectedGroup = element as HTMLElement;
	 }

	 deepActive(root: DocumentOrShadowRoot): Element | null {
		if (root.activeElement && root.activeElement.shadowRoot) {
		   return this.deepActive(root.activeElement.shadowRoot);
		}

		return root.activeElement;
	 }

	destroy() {
		this.removeEventListeners();
	}
}

const F6HelperInstance = new F6Navigation();
registerFeature("F6Navigation", F6HelperInstance);

export default F6Navigation;
