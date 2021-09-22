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
	/**
	* "TntCodePlaceholder" illustration type.
	* @public
	* @type {TntCodePlaceholder}
	*/
	TntCodePlaceholder: "TntCodePlaceholder",
	/**
	* "TntCompany" illustration type.
	* @public
	* @type {TntCompany}
	*/
	TntCompany: "TntCompany",
	/**
	* "TntExternalLink" illustration type.
	* @public
	* @type {TntExternalLink}
	*/
	TntExternalLink: "TntExternalLink",
	/**
	* "TntFaceID" illustration type.
	* @public
	* @type {TntFaceID}
	*/
	TntFaceID: "TntFaceID",
	/**
	* "TntFingerprint" illustration type.
	* @public
	* @type {TntFingerprint}
	*/
	TntFingerprint: "TntFingerprint",
	/**
	* "TntLock" illustration type.
	* @public
	* @type {TntLock}
	*/
	TntLock: "TntLock",
	/**
	* "TntMission" illustration type.
	* @public
	* @type {TntMission}
	*/
	TntMission: "TntMission",
	/**
	* "TntNoApplications" illustration type.
	* @public
	* @type {TntNoApplications}
	*/
	TntNoApplications: "TntNoApplications",
	/**
	* "TntNoFlows" illustration type.
	* @public
	* @type {TntNoFlows}
	*/
	TntNoFlows: "TntNoFlows",
	/**
	* "TntNoUsers" illustration type.
	* @public
	* @type {TntNoUsers}
	*/
	TntNoUsers: "TntNoUsers",
	/**
	* "TntRadar" illustration type.
	* @public
	* @type {TntRadar}
	*/
	TntRadar: "TntRadar",
	/**
	* "TntServices" illustration type.
	* @public
	* @type {TntServices}
	*/
	TntServices: "TntServices",
	/**
	* "TntSessionExpired" illustration type.
	* @public
	* @type {TntSessionExpired}
	*/
	TntSessionExpired: "TntSessionExpired",
	/**
	* "TntSessionExpiring" illustration type.
	* @public
	* @type {TntSessionExpiring}
	*/
	TntSessionExpiring: "TntSessionExpiring",
	/**
	* "TntSuccess" illustration type.
	* @public
	* @type {TntSuccess}
	*/
	TntSuccess: "TntSuccess",
	/**
	* "TntSuccessfulAuth" illustration type.
	* @public
	* @type {TntSuccessfulAuth}
	*/
	TntSuccessfulAuth: "TntSuccessfulAuth",
	/**
	* "TntUnlock" illustration type.
	* @public
	* @type {TntUnlock}
	*/
	TntUnlock: "TntUnlock",
	/**
	* "TntUnsuccessfulAuth" illustration type.
	* @public
	* @type {TntUnsuccessfulAuth}
	*/
	TntUnsuccessfulAuth: "TntUnsuccessfulAuth",

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
