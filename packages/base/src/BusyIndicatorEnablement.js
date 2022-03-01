import {
	isTabPrevious,
} from "./Keys.js";

const busyIndicatorMetadata = {
	properties: {
		__isBusy: false
	}
}

const enrichMetadata = element => {
	let metadata = Object.assign({}, element.metadata);
	const metadataKeys = Object.keys(metadata);
	const busyIndicatorMetadataKeys = Object.keys(busyIndicatorMetadata);

	if (!metadataKeys.length) {
		element.metadata = Object.assign({}, busyIndicatorMetadata);
		return;
	}

	busyIndicatorMetadataKeys.forEach(key => {
		metadata[key] = Object.assign(metadata[key] || {}, busyIndicatorMetadata[key]);
	});

	element.metadata = metadata;
}

const enrichMethods = element => {
	element.__redirectFocus = true;

	Object.defineProperties(element, {
		"__suppressFocusBack": {
			get: () => {
				return {
					handleEvent: e => {
						if (isTabPrevious(e)) {
							const beforeElem = element.shadowRoot.querySelector("[busy-indicator-before-span]");

							element.__redirectFocus = false;
							beforeElem.focus();
							element.__redirectFocus = true;
						}
					},
					capture: true,
					passive: false,
				}
			}
		},
		"isOpenUI5Component": { get: () => { return true; } },
		"__isComponentBusy": { get: () => { return element.__isBusy }}
	})

	element.__suppressFocusIn = () => {
		const busyIndicator = element.shadowRoot.querySelector("[busy-indicator]");

		if (busyIndicator && element.__redirectFocus) {
			busyIndicator.focus();
		}
	};
}

const enrich = element => {
	enrichMetadata(element);
	enrichMethods(element);
};

export { enrich };