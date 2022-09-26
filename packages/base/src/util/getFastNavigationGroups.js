let groups = [];

const isFastNavGroup = $el => {
	return $el.hasAttribute("data-sap-ui-fastnavgroup") && $el.getAttribute("data-sap-ui-fastnavgroup") === "true";
};

const isElementVisible = $el => {
	const style = window.getComputedStyle($el);

	return style.width !== "0px"
		&& style.height !== "0px"
		&& style.opacity !== "0"
		&& style.display !== "none"
		&& style.visibility !== "hidden";
};

const findFastNavigationGroups = async (container, startFromContainer) => {
	let child,
		assignedElements,
		index = 0;

	if (!isElementVisible(container)) {
		return;
	}

	if (isFastNavGroup(container)) {
		groups.push(container);
	}

	if (container.shadowRoot) {
		child = container.shadowRoot.firstChild;
	} else if (container.assignedNodes && container.assignedNodes()) {
		assignedElements = container.assignedNodes();
		child = assignedElements[0];
	} else if (startFromContainer) {
		child = container;
	} else {
		child = container.firstElementChild;
	}

	/* eslint-disable no-await-in-loop */
	while (child) {
		const originalChild = child;
		if (!child) {
			return;
		}

		if (child.nodeType === 1) {
			await findFastNavigationGroups(child, false);
		}

		child = assignedElements && assignedElements.length ? assignedElements[++index] : originalChild.nextElementSibling;
	}
	/* eslint-disable no-await-in-loop */
};

const getFastNavigationGroups = async container => {
	groups = [];

	await findFastNavigationGroups(container, true);

	return groups;
};

export default getFastNavigationGroups;
