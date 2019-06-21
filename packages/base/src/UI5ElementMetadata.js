import DataType from "./types/DataType.js";
import isDescendantOf from "./util/isDescendantOf.js";

class UI5ElementMetadata {
	constructor(metadata) {
		this.metadata = metadata;
	}

	getTag() {
		return this.metadata.tag;
	}

	getNoShadowDOM() {
		return this.metadata.noShadowDOM;
	}

	getDefaultSlot() {
		return this.metadata.defaultSlot || "content";
	}

	getPropsList() {
		return Object.keys(this.getProperties());
	}

	getPublicPropsList() {
		return this.getPropsList().filter(UI5ElementMetadata.isPublicProperty);
	}

	getSlots() {
		return this.metadata.slots || {};
	}

	hasSlots() {
		return !!Object.entries(this.getSlots()).length;
	}

	getProperties() {
		return this.metadata.properties || {};
	}

	getEvents() {
		return this.metadata.events || {};
	}

	static isPublicProperty(prop) {
		return prop.charAt(0) !== "_";
	}

	static validatePropertyValue(value, propData) {
		const isMultiple = propData.multiple;
		if (isMultiple) {
			return value.map(propValue => validateSingleProperty(propValue, propData));
		}
		return validateSingleProperty(value, propData);
	}

	static validateSlotValue(value, slotData) {
		return validateSingleSlot(value, slotData);
	}
}

const validateSingleProperty = (value, propData) => {
	const propertyType = propData.type;

	// Association handling
	if (propData.association) {
		return value;
	}

	if (propertyType === Boolean) {
		return typeof value === "boolean" ? value : false;
	}
	if (propertyType === String) {
		return (typeof value === "string" || typeof value === "undefined" || value === null) ? value : value.toString();
	}
	if (propertyType === Object) {
		return typeof value === "object" ? value : propData.defaultValue;
	}
	if (isDescendantOf(propertyType, DataType)) {
		return propertyType.isValid(value) ? value : propData.defaultValue;
	}
};

const validateSingleSlot = (value, slotData) => {
	if (value === null) {
		return value;
	}

	const getSlottedNodes = el => {
		const isTag = el instanceof HTMLElement;
		const isSlot = isTag && el.tagName.toUpperCase() === "SLOT";

		if (isSlot) {
			return el.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
		}

		return [el];
	};
	const propertyType = slotData.type;

	const slottedNodes = getSlottedNodes(value);
	slottedNodes.forEach(el => {
		if (!(el instanceof propertyType)) {
			const isHTMLElement = el instanceof HTMLElement;
			const tagName = isHTMLElement && el.tagName.toLowerCase();
			const isCustomElement = isHTMLElement && tagName.includes("-");
			if (isCustomElement) {
				window.customElements.whenDefined(tagName).then(() => {
					if (!(el instanceof propertyType)) {
						throw new Error(`${el} is not of type ${propertyType}`);
					}
				});
			}
		}
	});

	return value;
};

export default UI5ElementMetadata;
