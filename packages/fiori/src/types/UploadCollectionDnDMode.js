import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different drag and drop overlay modes of UploadCollection.
 *
 * @lends sap.ui.webcomponents.fiori.types.UploadCollectionDnDOverlayMode.prototype
 * @private
 */
const DndOverlayModes = {
	/**
	 * No drag or drop indication.
	 * @private
	 * @type {None}
	 */
	None: "None",

	/**
	 * Indication that drag can be performed.
	 * @private
	 * @type {Drag}
	 */
	Drag: "Drag",

	/**
	 * Indication that drop can be performed.
	 * @private
	 * @type {Drop}
	 */
	Drop: "Drop",
};

/**
 * @class
 * Different types of drag and drop overlay modes.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.UploadCollectionDnDOverlayMode
 * @private
 * @enum {string}
 */
class UploadCollectionDnDOverlayMode extends DataType {
	static isValid(value) {
		return !!DndOverlayModes[value];
	}
}

UploadCollectionDnDOverlayMode.generataTypeAcessors(DndOverlayModes);

export default UploadCollectionDnDOverlayMode;
