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

	switch (destination.placement) {
		case MovePlacement.Before:
			destination.element.before(source.element);
			break;
		case MovePlacement.After:
			destination.element.after(source.element);
			break;
		case MovePlacement.On:
			destination.element.prepend(source.element);
			break;
	}

	const newParent = source.element.parentElement;

	if (newParent.hasAttribute("ui5-tab")) {
		source.element.slot = "items";
	} else {
		source.element.slot = "";
	}
});