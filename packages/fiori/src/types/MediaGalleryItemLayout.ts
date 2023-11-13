/**
 * Defines the layout of the content displayed in the <code>ui5-media-gallery-item</code>.
 *
 * @public
 */
enum MediaGalleryItemLayout {

	/**
	 * Recommended to use when the item contains an image.<br>
	 * When a thumbnail is selected, it makes the corresponding enlarged content appear in a square display area.
	 * @public
	 */
	 Square = "Square",

	/**
	 * Recommended to use when the item contains video content.<br>
	 * When a thumbnail is selected, it makes the corresponding enlarged content appear in a wide display area
	 * (stretched to fill all of the available width) for optimal user experiance.
	 * @public
	 */
	Wide = "Wide",
}

export default MediaGalleryItemLayout;
