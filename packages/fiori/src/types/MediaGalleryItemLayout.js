import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.MediaGalleryItemLayout.prototype
 * @public
 */
const MediaGalleryItemLayouts = {

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
 * @alias sap.ui.webcomponents.fiori.types.MediaGalleryItemLayout
 * @public
 * @enum {string}
 */
class MediaGalleryItemLayout extends DataType {
	static isValid(value) {
		return !!MediaGalleryItemLayouts[value];
	}
}

MediaGalleryItemLayout.generateTypeAccessors(MediaGalleryItemLayouts);

export default MediaGalleryItemLayout;
