import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.IllustrationMessageType.prototype
 * @public
 */
const IllustrationMessageTypes = {
	/**
	 * "BeforeSearch" illustration type.
	 * @public
	 * @type {BeforeSearch}
	 */
	BeforeSearch: "BeforeSearch",
	/**
	 * "NoActivities" illustration type.
	 * @public
	 * @type {NoActivities}
	 */
	NoActivities: "NoActivities",
	/**
	 * "NoData" illustration type.
	 * @public
	 * @type {NoData}
	 */
	NoData: "NoData",
	/**
	 * "NoEntries" illustration type.
	 * @public
	 * @type {NoEntries}
	 */
	NoEntries: "NoEntries",
	/**
	 * "NoMail" illustration type.
	 * @public
	 * @type {NoMail}
	 */
	NoMail: "NoMail",
	/**
	 * "NoNotifications" illustration type.
	 * @public
	 * @type {NoNotifications}
	 */
	NoNotifications: "NoNotifications",
	/**
	 * "NoSavedItems" illustration type.
	 * @public
	 * @type {NoSavedItems}
	 */
	NoSavedItems: "NoSavedItems",
	/**
	 * "NoSearchResults" illustration type.
	 * @public
	 * @type {NoSearchResults}
	 */
	NoSearchResults: "NoSearchResults",
	/**
	 * "NoTasks" illustration type.
	 * @public
	 * @type {NoTasks}
	 */
	NoTasks: "NoTasks",
	/**
	 * "UnableToLoad" illustration type.
	 * @public
	 * @type {UnableToLoad}
	 */
	UnableToLoad: "UnableToLoad",
	/**
	 * "UnableToUpload" illustration type.
	 * @public
	 * @type {UnableToUpload}
	 */
	UnableToUpload: "UnableToUpload",
};

/**
 * @class
 * Different illustration types of Illustrated Message.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.IllustrationMessageType
 * @public
 * @enum {string}
 */
class IllustrationMessageType extends DataType {
	static isValid(value) {
		return !!IllustrationMessageTypes[value];
	}
}

IllustrationMessageType.generateTypeAccessors(IllustrationMessageTypes);

export default IllustrationMessageType;
