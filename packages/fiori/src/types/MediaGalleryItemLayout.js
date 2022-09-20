import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.MediaGalleryItemLayout.prototype
 * @public
 */
const MediaGalleryItemLayouts = {

	/**
	 * Recommended to use when the item contains an image.<br />
	 * When a thumbnail is selected, it makes the corresponding enlarged content appear in a square display area.
	 * @public
	 * @type {Square}
	 */
	 Square: "Square",

	/**
	 * Recommended to use when the item contains video content.<br />
	 * When a thumbnail is selected, it makes the corresponding enlarged content appear in a wide display area
	 * (stretched to fill all of the available width) for optimal user experiance.
	 * @public
	 * @type {Wide}
	 */
	Wide: "Wide",
};

/**
 * @class
 * Defines the layout of the content displayed in the <code>ui5-media-gallery-item</code>.
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
