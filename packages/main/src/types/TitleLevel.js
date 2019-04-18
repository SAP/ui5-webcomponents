import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const TitleLevels = {
	H1: "H1",
	H2: "H2",
	H3: "H3",
	H4: "H4",
	H5: "H5",
	H6: "H6",
};

class TitleLevel extends DataType {
	static isValid(value) {
		return !!TitleLevels[value];
	}
}

TitleLevel.generataTypeAcessors(TitleLevels);

export default TitleLevel;
