/**
 * Different types of UploadState.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.UploadState
 */
enum UploadState {
	/**
	 * The file has been uploaded successfully.
	 * @public
	 * @type {Complete}
	 */
	Complete = "Complete",

	/**
	 * The file cannot be uploaded due to an error.
	 * @public
	 * @type {Error}
	 */
	Error = "Error",

	/**
	 * The file is awaiting an explicit command to start being uploaded.
	 * @public
	 * @type {Ready}
	 */
	Ready = "Ready",

	/**
	 * The file is currently being uploaded.
	 * @public
	 * @type {Uploading}
	 */
	Uploading = "Uploading",
}

export default UploadState;
