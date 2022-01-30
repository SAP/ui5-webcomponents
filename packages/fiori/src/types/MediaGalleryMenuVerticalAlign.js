import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.MediaGalleryMenuVerticalAlign.prototype
 * @public
 */
const MediaGalleryMenuVerticalAligns = {
	/**
	 * Displays the menu at the top of the reference control.
	 * @public
	 * @type {Top}
	 */
	Top: "Top",

	/**
	 * Displays the menu at the bottom of the reference control.
	 * @public
	 * @type {Bottom}
	 */
	Bottom: "Bottom",
};

/**
 * @class
 * Types for the vertical alignment of the thumbnails menu of the <code>ui5-media-gallery</code> component.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.MediaGalleryMenuVerticalAlign
 * @public
 * @enum {string}
 */
class MediaGalleryMenuVerticalAlign extends DataType {
	static isValid(value) {
		return !!MediaGalleryMenuVerticalAligns[value];
	}
}

MediaGalleryMenuVerticalAlign.generateTypeAccessors(MediaGalleryMenuVerticalAligns);

export default MediaGalleryMenuVerticalAlign;
