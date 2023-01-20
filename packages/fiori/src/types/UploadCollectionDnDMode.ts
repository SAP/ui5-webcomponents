/**
 * Different drag and drop overlay modes of UploadCollection.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.UploadCollectionDnDOverlayMode
 */
enum UploadCollectionDnDOverlayMode {
	/**
	 * No drag or drop indication.
	 * @private
	 * @type {None}
	 */
	None = "None",

	/**
	 * Indication that drag can be performed.
	 * @private
	 * @type {Drag}
	 */
	Drag = "Drag",

	/**
	 * Indication that drop can be performed.
	 * @private
	 * @type {Drop}
	 */
	Drop = "Drop",
}

export default UploadCollectionDnDOverlayMode;
