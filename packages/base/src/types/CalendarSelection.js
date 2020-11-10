import DataType from "./DataType.js";

const CalendarSelections = {
	Single: "Single",
	Multiple: "Multiple",
	Range: "Range",
};

class CalendarSelection extends DataType {
	static isValid(value) {
		return !!CalendarSelections[value];
	}
}

CalendarSelection.generataTypeAcessors(CalendarSelections);

export default CalendarSelection;
