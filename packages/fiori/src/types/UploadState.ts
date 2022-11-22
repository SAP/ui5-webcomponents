/**
 * Different types of UploadState.
 * @lends sap.ui.webcomponents.fiori.types.UploadState.prototype
 * @public
 */
enum UploadStates {
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
};

export default UploadStates;
