import DataType from "./types/DataType.js";
import isDescendantOf from "./util/isDescendantOf.js";

class UI5ElementMetadata {
	constructor(metadata) {
		this.metadata = metadata;
	}

	getTag() {
		return this.metadata.tag;
	}

	getImplementedInterfaces() {
		return this.metadata.interfaces;
	}

	hasAttribute(propName) {
		const propData = this.getProperties()[propName];
		return propData.type !== Object && !propData.noAttribute;
	}

	getPropsList() {
		return Object.keys(this.getProperties());
	}

	getAttributesList() {
		return this.getPropsList().filter(this.hasAttribute, this);
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
		const isSlot = isTag && el.localName === "slot";

		if (isSlot) {
			return el.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
		}

		return [el];
	};
	const requiredType = slotData.type;
	const requiredInterface = slotData.interface;

	const slottedNodes = getSlottedNodes(value);
	slottedNodes.forEach(el => {
		if (requiredType) { // Check for class compatibility
			const isInstanceOfClass = el instanceof requiredType;
			if (!isInstanceOfClass) {
				throw new Error(`${el} is not of type ${requiredType}`);
			}
		} else { // Check for interface compatibility
			const implementsInterface = el.isUI5Element && el.constructor.implementsInterface(requiredInterface);
			if (!implementsInterface) {
				throw new Error(`${el} does not implement interface ${requiredInterface}`);
			}
		}
	});

	return value;
};

export default UI5ElementMetadata;
