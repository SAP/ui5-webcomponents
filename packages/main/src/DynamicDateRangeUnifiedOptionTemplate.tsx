import type DynamicDateRange from "./DynamicDateRange.js";
import { isGroupedOption, handleGroupedStepInputChange, handleGroupedSelectChange } from "./DynamicDateRangeUtils.js";
import StepInput from "./StepInput.js";
import Select from "./Select.js";
import type { SelectChangeEventDetail } from "./Select.js";
import Option from "./Option.js";
import Label from "./Label.js";

export default function DynamicDateRangeUnifiedOptionTemplate(this: DynamicDateRange) {
	if (!this._currentOption || !isGroupedOption(this._currentOption)) {
		return null;
	}

	const groupedOption = this._currentOption;
	const currentNumber = (this.currentValue?.values?.[0] as number) || 1;
	const currentOperator = this.currentValue?.operator || groupedOption._availableOptions[0].operator;

	const availableUnits = groupedOption._availableOptions.map(option => {
		let unitText = "Days";

		switch (true) {
		case option.operator.includes("WEEKS"):
			unitText = "Weeks";
			break;
		case option.operator.includes("MONTHS"):
			unitText = "Months";
			break;
		case option.operator.includes("QUARTERS"):
			unitText = "Quarters";
			break;
		case option.operator.includes("YEARS"):
			unitText = "Years";
			break;
		default:
			unitText = "Days";
			break;
		}

		return {
			value: option.operator,
			text: unitText,
		};
	});

	const handleStepInputChange = (e: CustomEvent) => {
		handleGroupedStepInputChange(e, this.currentValue, this.updateCurrentValue.bind(this), this._lastGroupedSelections);
	};

	const handleSelectChange = (e: CustomEvent<SelectChangeEventDetail>) => {
		handleGroupedSelectChange(e, this.currentValue, this.updateCurrentValue.bind(this), this._lastGroupedSelections);
	};

	return (
		<div class="ui5-dynamic-date-range-unified-option" style={{ padding: "0 1rem 0.5rem 1rem" }}>
			<div class="ui5-ddr-input-container" style={{ textAlign: "right" }}>
				<Label style={{ margin: "1rem 0 0.5rem 0", textAlign: "left" }}>Value for X</Label>
				<StepInput
					value={currentNumber}
					min={1}
					max={9999}
					step={1}
					onChange={handleStepInputChange}
				/>
				<Label style={{ margin: "1rem 0 0.5rem 0", textAlign: "left" }}>Unit of Time</Label>
				<Select
					value={currentOperator}
					onChange={handleSelectChange}
				>
					{availableUnits.map(unit => (
						<Option value={unit.value}>
							{unit.text}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
}
