import DataType from "./DataType";

class URI extends DataType {
	static isValid(value) {
		// TODO: recheck
		return /^((([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?)$/.test(value); // eslint-disable-line
	}
}

export default URI;
