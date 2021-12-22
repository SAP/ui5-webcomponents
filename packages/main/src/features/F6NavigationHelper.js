import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { isF6Next, isF6Previous } from "@ui5/webcomponents-base/dist/Keys.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";

class F6NavigationHelper {
	constructor() {
		this.attachEventListeners();
		this.selectedGroup = null;
		this.groups = [];
		this.cachedGroups = [];
	}

	attachEventListeners() {
		document.addEventListener("keydown", async event => {
			if (isF6Next(event)) {
				this.eventHandlingPreparation();

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

				const elementToFocus = await getFirstFocusableElement(nextElement.isUI5Element ? nextElement.getDomRef() : nextElement);
				elementToFocus.focus();
			}

			if (isF6Previous(event)) {
				this.eventHandlingPreparation();

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

						const firstFocusable = await getFirstFocusableElement(this.groups[nextIndex - 1]);
						const shouldSkipParent = firstFocusable === await getFirstFocusableElement(this.groups[nextIndex]);

						nextElement = this.groups[shouldSkipParent ? nextIndex - 2 : nextIndex - 1];
					}
				} else {
					nextElement = this.groups[this.groups.length - 1];
				}

				const elementToFocus = await getFirstFocusableElement(nextElement.isUI5Element ? nextElement.getDomRef() : nextElement);
				elementToFocus.focus();
			}
		});
	}

	eventHandlingPreparation() {
		this.cachedGroups = this.groups;
		this.setCurrentGroup(document.activeElement);
		this.setGroups();
	}

	setGroups() {
		this.groups = Array.from(document.querySelectorAll("[data-sap-ui-fastnavgroup='true']")).filter(group => group.clientWidth);
	}

	setCurrentGroup(element = null) {
		while (element.getAttribute("data-sap-ui-fastnavgroup") !== "true" && element !== document.querySelector("html")) {
			element = element.parentElement ? element.parentNode : element.parentNode.host;
		}

		this.selectedGroup = element;
	}
}

const F6HelperInstance = new F6NavigationHelper();

registerFeature("F6Navigation", F6HelperInstance);
