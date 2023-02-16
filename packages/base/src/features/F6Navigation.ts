import { registerFeature } from "../FeaturesRegistry.js";
import { isF6Next, isF6Previous } from "../Keys.js";
import { instanceOfUI5Element } from "../UI5Element.js";
import { getFirstFocusableElement } from "../util/FocusableElements.js";
import getFastNavigationGroups from "../util/getFastNavigationGroups.js";
import isElementClickable from "../util/isElementClickable.js";

class F6Navigation {
	static _instance: F6Navigation;
	keydownHandler: (event: KeyboardEvent) => void;
	selectedGroup: HTMLElement | null = null;
	groups: Array<HTMLElement> = [];

	constructor() {
		this.keydownHandler = this._keydownHandler.bind(this) as (event: KeyboardEvent) => void;
		this.attachEventListeners();
	}

	attachEventListeners() {
		document.addEventListener("keydown", this.keydownHandler);
	}

	async groupElementToFocus(nextElement: HTMLElement) {
		const nextElementDomRef = instanceOfUI5Element(nextElement) ? nextElement.getDomRef() : nextElement;

		if (nextElementDomRef) {
			if (isElementClickable(nextElementDomRef)) {
				return nextElementDomRef;
			}

			const elementToFocus = await getFirstFocusableElement(nextElementDomRef);

			if (elementToFocus) {
				return elementToFocus;
			}
		}
	}

	async findNextFocusableGroupElement(currentIndex: number) {
		let elementToFocus;

		/* eslint-disable no-await-in-loop */
		for (let index = 0; index < this.groups.length; index++) {
			let nextElement;

			if (currentIndex > -1) {
				if (currentIndex + 1 >= this.groups.length) {
					currentIndex = 0;
					nextElement = this.groups[currentIndex];
				} else {
					currentIndex += 1;
					nextElement = this.groups[currentIndex];
				}
			} else {
				currentIndex = 0;
				nextElement = this.groups[currentIndex];
			}

			elementToFocus = await this.groupElementToFocus(nextElement);

			if (elementToFocus) {
				break;
			}
		}
		/* eslint-enable no-await-in-loop */

		return elementToFocus;
	}

	async findPreviousFocusableGroupElement(currentIndex: number) {
		let elementToFocus;

		/* eslint-disable no-await-in-loop */
		for (let index = 0; index < this.groups.length; index++) {
			let nextElement;

			if (currentIndex > 0) {
				// Handle the situation where the first focusable element of two neighbor groups is the same
				// For example:
				// <ui5-flexible-column-layout>
				//     <ui5-list>
				//         <ui5-li>List Item</ui5-li>
				//     </ui5-list>
				// </ui5-flexible-column-layout>
				// Here for both FCL & List the firstFoccusableElement is the same (the ui5-li)
				const firstFocusable = await this.groupElementToFocus(this.groups[currentIndex - 1]);
				const shouldSkipParent = firstFocusable === await this.groupElementToFocus(this.groups[currentIndex]);

				currentIndex = shouldSkipParent ? currentIndex - 2 : currentIndex - 1;

				if (currentIndex < 0) {
					currentIndex = this.groups.length - 1;
				}

				nextElement = this.groups[currentIndex];
			} else {
				currentIndex = this.groups.length - 1;
				nextElement = this.groups[currentIndex];
			}

			elementToFocus = await this.groupElementToFocus(nextElement);

			if (elementToFocus) {
				break;
			}
		}
		/* eslint-enable no-await-in-loop */

		return elementToFocus;
	}

	async _keydownHandler(event: KeyboardEvent) {
		const forward = isF6Next(event);
		const backward = isF6Previous(event);
		if (!(forward || backward)) {
			return;
		}

		this.updateGroups();

		if (this.groups.length < 1) {
			return;
		}

		event.preventDefault();

		let elementToFocus;

		if (this.groups.length === 0) {
			elementToFocus = await this.groupElementToFocus(this.groups[0]);

			return elementToFocus?.focus();
		}

		let currentIndex = -1;

		if (this.selectedGroup) {
			currentIndex = this.groups.indexOf(this.selectedGroup);
		}

		if (forward) {
			elementToFocus = await this.findNextFocusableGroupElement(currentIndex);
		}

		if (backward) {
			elementToFocus = await this.findPreviousFocusableGroupElement(currentIndex);
		}

		elementToFocus?.focus();
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

	static init() {
		if (!this._instance) {
			this._instance = new F6Navigation();
		}

		return this._instance;
	}
}

registerFeature("F6Navigation", F6Navigation);

export default F6Navigation;
