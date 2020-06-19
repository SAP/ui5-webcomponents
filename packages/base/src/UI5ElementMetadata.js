import DataType from "./types/DataType.js";
import isDescendantOf from "./util/isDescendantOf.js";
import { camelToKebabCase } from "./util/StringHelper.js";
import isSlot from "./util/isSlot.js";

/**
 *
 * @class
 * @public
 */
class UI5ElementMetadata {
	constructor(metadata) {
		this.metadata = metadata;
	}

	/**
	 * Only intended for use by UI5Element.js
	 * @protected
	 */
	static validatePropertyValue(value, propData) {
		const isMultiple = propData.multiple;
		if (isMultiple) {
			return value.map(propValue => validateSingleProperty(propValue, propData));
		}
		return validateSingleProperty(value, propData);
	}

	/**
	 * Only intended for use by UI5Element.js
	 * @protected
	 */
	static validateSlotValue(value, slotData) {
		return validateSingleSlot(value, slotData);
	}

	/**
	 * Returns the tag of the UI5 Element
	 * @public
	 */
	getTag() {
		return this.metadata.tag;
	}

	/**
	 * Used to get the tag we need to register for backwards compatibility
	 * @public
	 */
	getAltTag() {
		return this.metadata.altTag;
	}

	/**
	 * Determines whether a property should have an attribute counterpart
	 * @public
	 * @param propName
	 * @returns {boolean}
	 */
	hasAttribute(propName) {
		const propData = this.getProperties()[propName];
		return propData.type !== Object && !propData.noAttribute;
	}

	/**
	 * Returns an array with the properties of the UI5 Element (in camelCase)
	 * @public
	 * @returns {string[]}
	 */
	getPropertiesList() {
		return Object.keys(this.getProperties());
	}

	/**
	 * Returns an array with the attributes of the UI5 Element (in kebab-case)
	 * @public
	 * @returns {string[]}
	 */
	getAttributesList() {
		return this.getPropertiesList().filter(this.hasAttribute, this).map(camelToKebabCase);
	}

	/**
	 * Returns an object with key-value pairs of slots and their metadata definitions
	 * @public
	 */
	getSlots() {
		return this.metadata.slots || {};
	}

	/**
	 * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
	 * @returns {boolean}
	 */
	canSlotText() {
		const defaultSlot = this.getSlots().default;
		return defaultSlot && defaultSlot.type === Node;
	}

	/**
	 * Determines whether this UI5 Element supports any slots
	 * @public
	 */
	hasSlots() {
		return !!Object.entries(this.getSlots()).length;
	}

	/**
	 * Determines whether this UI5 Element supports any slots with "individualSlots: true"
	 * @public
	 */
	hasIndividualSlots() {
		return this.slotsAreManaged() && Object.entries(this.getSlots()).some(([_slotName, slotData]) => slotData.individualSlots);
	}

	/**
	 * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
	 * @public
	 */
	slotsAreManaged() {
		return !!this.metadata.managedSlots;
	}

	/**
	 * Returns an object with key-value pairs of properties and their metadata definitions
	 * @public
	 */
	getProperties() {
		return this.metadata.properties || {};
	}

	/**
	 * Returns an object with key-value pairs of events and their metadata definitions
	 * @public
	 */
	getEvents() {
		return this.metadata.events || {};
	}

	/**
	 * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
	 * @returns {boolean}
	 */
	isLanguageAware() {
		return !!this.metadata.languageAware;
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
		if (isSlot(el)) {
			return el.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
		}

		return [el];
	};

	const slottedNodes = getSlottedNodes(value);
	slottedNodes.forEach(el => {
		if (!(el instanceof slotData.type)) {
			throw new Error(`${el} is not of type ${slotData.type}`);
		}
	});

	return value;
};

export default UI5ElementMetadata;
