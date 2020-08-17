import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of UploadState.
 * @lends sap.ui.webcomponents.fiori.types.UploadState.prototype
 * @public
 */
const UploadStates = {
	/**
	 * The file has been uploaded successfully.
	 * @public
	 * @type {Complete}
	 */
	Complete: "Complete",

	/**
	 * The file cannot be uploaded due to an error.
	 * @public
	 * @type {Error}
	 */
	Error: "Error",

	/**
	 * The file is awaiting an explicit command to start being uploaded.
	 * @public
	 * @type {Ready}
	 */
	Ready: "Ready",

	/**
	 * The file is currently being uploaded.
	 * @public
	 * @type {Uploading}
	 */
	Uploading: "Uploading",
};

/**
 * States of the upload process of <code>ui5-upload-collection-item</code>.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.UploadState
 * @public
 * @enum {string}
 */
class UploadState extends DataType {
	static isValid(value) {
		return !!UploadStates[value];
	}
}

UploadState.generataTypeAcessors(UploadStates);

export default UploadState;
