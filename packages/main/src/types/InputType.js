import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const InputTypes = {
	Text: "Text",
	Email: "Email",
	Number: "Number",
	Password: "Password",
	Tel: "Tel",
	URL: "URL",
};

class InputType extends DataType {
	static isValid(value) {
		return !!InputTypes[value];
	}
}

InputType.generataTypeAcessors(InputTypes);

export default InputType;
