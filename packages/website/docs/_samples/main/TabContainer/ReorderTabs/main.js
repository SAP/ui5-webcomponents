import "@ui5/webcomponents/dist/TabContainer.js";
import "@ui5/webcomponents/dist/Tab.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

const tabContainer = document.getElementById("tabContainer");

tabContainer.addEventListener("move-over", (event) => {
	const { source } = event.detail;

	if (tabContainer.contains(source.element)) {
		event.preventDefault();
	}
});

tabContainer.addEventListener("move", (event) => {
	const { source, destination } = event.detail;
	const currentParent = destination.element.parentElement;

	if (destination.placement === MovePlacement.Before) {
		currentParent.insertBefore(source.element, destination.element);
	} else if (destination.placement === MovePlacement.After) {
		const nextElement = Array.from(currentParent.children).at(Array.from(currentParent.children).indexOf(destination.element) + 1);
		currentParent.insertBefore(source.element, nextElement);
	} else if (destination.placement === MovePlacement.On) {
		destination.element.prepend(source.element);
	}

	const newParent = source.element.parentElement;

	if (newParent.hasAttribute("ui5-tab")) {
		source.element.slot = "items";
	} else {
		source.element.slot = "";
	}
});