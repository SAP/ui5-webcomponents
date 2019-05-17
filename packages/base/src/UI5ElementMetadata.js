import DataType from "./types/DataType.js";
import Function from "./types/Function.js";

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

	getObservedProps() {
		const properties = this.getProperties();
		const allProps = Object.keys(properties);
		const observedProps = allProps.filter(UI5ElementMetadata.isPublicProperty);
		return observedProps;
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
		const isMultiple = slotData.multiple;
		if (isMultiple) {
			return value.map(propValue => validateSingleSlot(propValue, slotData));
		}
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
	if (propertyType === Function) {
		return typeof value === "function" ? value : undefined;
	}
	if (isDescendantOf(propertyType, DataType)) {
		return propertyType.isValid(value) ? value : propData.defaultValue;
	}
};

const validateSingleSlot = (value, propData) => {
	if (value === null) {
		return value;
	}

	const getSlottedNodes = el => {
		const isTag = el instanceof HTMLElement;
		const isSlot = isTag && el.tagName.toUpperCase() === "SLOT";

		if (isSlot) {
			return el.assignedElements({ flatten: true });
		}

		return [el];
	};
	const propertyType = propData.type;

	const slottedNodes = getSlottedNodes(value);
	slottedNodes.forEach(el => {
		if (!(el instanceof propertyType)) {
			throw new Error(`${el} is not of type ${propertyType}`);
		}
	});

	return value;
};

const isDescendantOf = (klass, baseKlass, inclusive = false) => {
	if (typeof klass !== "function" || typeof baseKlass !== "function") {
		return false;
	}
	if (inclusive && klass === baseKlass) {
		return true;
	}
	let parent = klass;
	do {
		parent = Object.getPrototypeOf(parent);
	} while (parent !== null && parent !== baseKlass);
	return parent === baseKlass;
};

export default UI5ElementMetadata;
