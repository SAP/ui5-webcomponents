/**
 * Defines the layout type of the thumbnails list of the <code>ui5-media-gallery</code> component.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.MediaGalleryLayout
 */
enum MediaGalleryLayout {

	/**
	 * The layout is determined automatically.
	 * @public
	 * @type {Auto}
	 */
	 Auto = "Auto",

	/**
	 * Displays the layout as a vertical split between the thumbnails list and the selected image.
	 * @public
	 * @type {Vertical}
	 */
	Vertical = "Vertical",

	/**
	 * Displays the layout as a horizontal split between the thumbnails list and the selected image.
	 * @public
	 * @type {Horizontal}
	 */
	Horizontal = "Horizontal",
}

export default MediaGalleryLayout;
