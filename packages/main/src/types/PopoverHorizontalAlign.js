import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const PopoverHorizontalAligns = {
	Center: "Center",
	Left: "Left",
	Right: "Right",
	Stretch: "Stretch",
};

class PopoverHorizontalAlign extends DataType {
	static isValid(value) {
		return !!PopoverHorizontalAligns[value];
	}
}

PopoverHorizontalAlign.generataTypeAcessors(PopoverHorizontalAligns);

export default PopoverHorizontalAlign;
