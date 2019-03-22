import DataType from "./types/DataType";
import Function from "./types/Function";

class WebComponentMetadata {
	constructor(metadata) {
		this.metadata = metadata;
	}

	getTag() {
		return this.metadata.tag;
	}

	getNoShadowDOM() {
		return this.metadata.noShadowDOM;
	}

	getStyleUrl() {
		return this.metadata.styleUrl || [];
	}

	usesNodeText() {
		return !!this.metadata.usesNodeText;
	}

	getDefaultSlot() {
		return this.metadata.defaultSlot || "content";
	}

	getObservedProps() {
		const properties = this.getProperties();
		const allProps = Object.keys(properties);
		const observedProps = allProps.filter(WebComponentMetadata.isPublicProperty);
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
	const getSlottedElement = el => {
		return el.tagName.toUpperCase() !== "SLOT" ? el : getSlottedElement(el.assignedNodes()[0]);
	};
	const propertyType = propData.type;

	if (value !== null && !(getSlottedElement(value) instanceof propertyType)) {
		throw new Error(`${value} is not of type ${propertyType}`);
	}

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

export default WebComponentMetadata;
