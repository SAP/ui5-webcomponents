import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const PopoverVerticalAligns = {
	Center: "Center",
	Top: "Top",
	Bottom: "Bottom",
	Stretch: "Stretch",
};


class PopoverVerticalAlign extends DataType {
	static isValid(value) {
		return !!PopoverVerticalAligns[value];
	}
}

PopoverVerticalAlign.generataTypeAcessors(PopoverVerticalAligns);

export default PopoverVerticalAlign;
