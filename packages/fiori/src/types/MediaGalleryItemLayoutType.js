import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.MediaGalleryItemLayoutType.prototype
 * @public
 */
const MediaGalleryItemLayoutTypes = {

	/**
	 * TODO
	 * @public
	 * @type {Square}
	 */
	 Square: "Square",

	/**
	 * TODO
	 * @public
	 * @type {Wide}
	 */
	Wide: "Wide",
};

/**
 * @class
 * Defines the type of the content
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.MediaGalleryItemLayoutType
 * @public
 * @enum {string}
 */
class MediaGalleryItemLayoutType extends DataType {
	static isValid(value) {
		return !!MediaGalleryItemLayoutTypes[value];
	}
}

MediaGalleryItemLayoutType.generateTypeAccessors(MediaGalleryItemLayoutTypes);

export default MediaGalleryItemLayoutType;
