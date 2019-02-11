import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

const BackgroundDesigns = {
	Solid: "Solid",

	Transparent: "Transparent",
};

class BackgroundDesign extends DataType {
	static isValid(value) {
		return !!BackgroundDesigns[value];
	}
}

BackgroundDesign.generataTypeAcessors(BackgroundDesigns);

export default BackgroundDesign;
