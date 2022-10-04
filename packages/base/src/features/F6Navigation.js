import { registerFeature } from "../FeaturesRegistry.js";
import { isF6Next, isF6Previous } from "../Keys.js";
import { getFirstFocusableElement } from "../util/FocusableElements.js";
import getFastNavigationGroups from "../util/getFastNavigationGroups.js";

class F6Navigation {
	init() {
		this.keydownHandler = this._keydownHandler.bind(this);
		this.attachEventListeners();
		this.selectedGroup = null;
		this.groups = [];
	}

	attachEventListeners() {
		document.addEventListener("keydown", this.keydownHandler);
	}

	async _keydownHandler(event) {
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

			const elementToFocus = await getFirstFocusableElement(nextElement.isUI5Element ? nextElement.getDomRef() : nextElement, true);
			elementToFocus.focus();
		}

		if (isF6Previous(event)) {
			this.updateGroups();

			if (this.groups.length < 1) {
				return;
			}

			event.preventDefault();

			const nextIndex = this.groups.indexOf(this.selectedGroup);
			let nextElement = null;

			if (nextIndex > -1) {
				if (nextIndex - 1 < 0) {
					nextElement = this.groups[this.groups.length - 1];
				} else {
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
				}
			} else {
				nextElement = this.groups[this.groups.length - 1];
			}

			const elementToFocus = await getFirstFocusableElement(nextElement.isUI5Element ? nextElement.getDomRef() : nextElement, true);
			elementToFocus.focus();
		}
	}

	removeEventListeners() {
		document.removeEventListener("keydown", this.keydownHandler);
	}

	updateGroups() {
		this.setSelectedGroup(document.activeElement);
		this.groups = getFastNavigationGroups(document.body);
	}

	setSelectedGroup(element) {
		element = this.deepActive(element);

		while (element && element.getAttribute("data-sap-ui-fastnavgroup") !== "true" && element !== document.querySelector("html")) {
			element = element.parentElement ? element.parentNode : element.parentNode.host;
		}

		this.selectedGroup = element;
	}

	deepActive(element) {
		if (element.shadowRoot) {
			return this.deepActive(element.shadowRoot);
		}

		return element.activeElement;
	}

	destroy() {
		this.removeEventListeners();
	}
}

const F6HelperInstance = new F6Navigation();
registerFeature("F6Navigation", F6HelperInstance);

export default F6Navigation;
