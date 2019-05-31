import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const PanelAccessibleRoles = {

	Complementary: "Complementary",

	Form: "Form",

	Region: "Region",
};

class PanelAccessibleRole extends DataType {
	static isValid(value) {
		return !!PanelAccessibleRoles[value];
	}
}

PanelAccessibleRole.generataTypeAcessors(PanelAccessibleRoles);

export default PanelAccessibleRole;
