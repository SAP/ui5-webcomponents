import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.MediaGalleryLayout.prototype
 * @public
 */
const MediaGalleryLayouts = {

	/**
	 * The layout is determined automatically.
	 * @public
	 * @type {Left}
	 */
	 Auto: "Auto",

	/**
	 * Displays the layout as a vertical split between the thumbnails list and the selected image.
	 * @public
	 * @type {Left}
	 */
	Vertical: "Vertical",

	/**
	 * Displays the layout as a horizontal split between the thumbnails list and the selected image.
	 * @public
	 * @type {Right}
	 */
	Horizontal: "Horizontal",
};

/**
 * @class
 * Defines the layout type of the thumbnails list of the <code>ui5-media-gallery</code> component.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.MediaGalleryLayout
 * @public
 * @enum {string}
 */
class MediaGalleryLayout extends DataType {
	static isValid(value) {
		return !!MediaGalleryLayouts[value];
	}
}

MediaGalleryLayout.generateTypeAccessors(MediaGalleryLayouts);

export default MediaGalleryLayout;
