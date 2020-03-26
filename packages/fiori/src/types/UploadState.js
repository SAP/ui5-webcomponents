import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

const UploadStates = {
	/**
	 * The file has been uploaded successfully.
	 * @public
	 */
	Complete: "Complete",

	/**
	 * The file cannot be uploaded due to an error.
	 * @public
	 */
	Error: "Error",

	/**
	 * The file is awaiting an explicit command to start being uploaded.
	 * @public
	 */
	Ready: "Ready",

	/**
	 * The file is currently being uploaded.
	 * @public
	 */
	Uploading: "Uploading",
};

/**
 * States of the upload process of <code>ui5-upload-collection-item</code>.
 *
 * @class
 * @constructor
 * @author SAP SE
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
