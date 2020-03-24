import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different drag and drop overlay modes of UploadCollection.
 * @private
 */
const DndOverlayMode = {
	None: "None",
	Drag: "Drag",
	Drop: "Drop",
};

/**
 * @class
 * Different types of drag and drop overlay modes.
 * @constructor
 * @author SAP SE
 * @private
 * @enum {string}
 */
class UploadCollectionDnDOverlayMode extends DataType {
	static isValid(value) {
		return !!DndOverlayMode[value];
	}
}

UploadCollectionDnDOverlayMode.generataTypeAcessors(DndOverlayMode);

export default UploadCollectionDnDOverlayMode;
