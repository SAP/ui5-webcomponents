/**
 * @lends sap.ui.webcomponents.fiori.types.MediaGalleryItemLayout.prototype
 * @public
 */
enum MediaGalleryItemLayouts {

	/**
	 * Recommended to use when the item contains an image.<br>
	 * When a thumbnail is selected, it makes the corresponding enlarged content appear in a square display area.
	 * @public
	 * @type {Square}
	 */
	 Square = "Square",

	/**
	 * Recommended to use when the item contains video content.<br>
	 * When a thumbnail is selected, it makes the corresponding enlarged content appear in a wide display area
	 * (stretched to fill all of the available width) for optimal user experiance.
	 * @public
	 * @type {Wide}
	 */
	Wide = "Wide",
};

export default MediaGalleryItemLayouts;
