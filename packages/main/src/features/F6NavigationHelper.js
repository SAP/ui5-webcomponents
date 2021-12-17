import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { isF6Next, isF6Previous } from "@ui5/webcomponents-base/dist/Keys.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";

class F6NavigationHelper {
	constructor() {
		this.attachEventListeners();
		this.selectedGroup = null;
	}

	attachEventListeners() {
		document.addEventListener("keydown", async event => {
			this.setCurrentGroup(document.activeElement);
			this.setAllGroups();

			if (isF6Next(event)) {
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
				const nextIndex = this.groups.indexOf(this.selectedGroup);
				let nextElement = null;

				if (nextIndex > -1) {
					if (nextIndex - 1 < 0) {
						nextElement = this.groups[this.groups.length - 1];
					} else {
						nextElement = this.groups[nextIndex - 1];
					}
				} else {
					nextElement = this.groups[this.groups.length - 1];
				}

				const elementToFocus = await getFirstFocusableElement(nextElement.isUI5Element ? nextElement.getDomRef() : nextElement);
				elementToFocus.focus();
			}
		});
	}

	setAllGroups() {
		this.groups = Array.from(document.querySelectorAll("[data-sap-ui-fastnavgroup='true']"));
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
