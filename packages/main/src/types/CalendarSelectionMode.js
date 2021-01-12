import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

const CalendarSelectionModes = {
	Single: "Single",
	Multiple: "Multiple",
	Range: "Range",
};

class CalendarSelectionMode extends DataType {
	static isValid(value) {
		return !!CalendarSelectionModes[value];
	}
}

CalendarSelectionMode.generateTypeAccessors(CalendarSelectionModes);

export default CalendarSelectionMode;
