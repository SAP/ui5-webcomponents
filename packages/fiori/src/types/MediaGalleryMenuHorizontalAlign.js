import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.MediaGalleryMenuHorizontalAlign.prototype
 * @public
 */
const MediaGalleryMenuHorizontalAligns = {

	/**
	 * The menu is on the left side of the target
	 * @public
	 * @type {Left}
	 */
	Left: "Left",

	/**
	 * Displays the menu on the right side of the target.
	 * @public
	 * @type {Right}
	 */
	Right: "Right",
};

/**
 * @class
 * Defines the horizontal alignment of the thumbnails menu of the MediaGallery component.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.MediaGalleryMenuHorizontalAlign
 * @public
 * @enum {string}
 */
class MediaGalleryMenuHorizontalAlign extends DataType {
	static isValid(value) {
		return !!MediaGalleryMenuHorizontalAligns[value];
	}
}

MediaGalleryMenuHorizontalAlign.generateTypeAccessors(MediaGalleryMenuHorizontalAligns);

export default MediaGalleryMenuHorizontalAlign;
