import type DynamicDateRange from "../DynamicDateRange.js";
import type { DynamicDateRangeValue } from "../DynamicDateRange.js";
import StepInput from "../StepInput.js";
import Select from "../Select.js";
import type { SelectChangeEventDetail } from "../Select.js";
import Option from "../Option.js";
import Label from "../Label.js";

export default function LastNextTemplate(this: DynamicDateRange) {
	const currentOption = this._currentOption;
	if (!currentOption) {
		return <div>No option selected</div>;
	}

	// Check if there are multiple options available (grouped)
	const availableOptions = (currentOption as any).availableOptions;
	const isGrouped = Boolean(availableOptions && availableOptions.length > 1);

	// Extract current values
	const currentNumber = getCurrentNumber(this.currentValue);
	const currentOperator = this.currentValue?.operator || currentOption.operator;

	// Input handlers
	const handleNumberChange = (e: CustomEvent) => {
		const newValue = Number((e.target as StepInput).value);
		this.updateCurrentValue({
			operator: currentOperator,
			values: [newValue],
		});
	};

	const handleUnitChange = (e: CustomEvent<SelectChangeEventDetail>) => {
		const newOperator = String(e.detail.selectedOption.value);
		this.updateCurrentValue({
			operator: newOperator,
			values: [currentNumber],
		});
	};

	return (
		<div class="ui5-last-next-container" style={{ padding: "0 1rem 0.5rem 1rem" }}>
			<div class="ui5-ddr-input-container" style={{ textAlign: "right" }}>
				<Label style={{ margin: "1rem 0 0.5rem 0", textAlign: "left" }}>Value for X</Label>
				<StepInput
					value={currentNumber}
					min={1}
					max={isGrouped ? 9999 : 999}
					onChange={handleNumberChange}
				/>

				{isGrouped && (
					<>
						<Label style={{ margin: "1rem 0 0.5rem 0", textAlign: "left" }}>Unit of Time</Label>
						<Select value={currentOperator} onChange={handleUnitChange}>
							{availableOptions.map((option: any) => (
								<Option value={option.operator}>
									{option.unitText}
								</Option>
							))}
						</Select>
					</>
				)}
			</div>
		</div>
	);
}

// Simple helper function - no complex date conversion, just get the number
function getCurrentNumber(currentValue: DynamicDateRangeValue | undefined): number {
	// Default to 1
	if (!currentValue?.values) {
		return 1;
	}

	// If it's already a number, return it
	if (typeof currentValue.values[0] === "number") {
		return currentValue.values[0];
	}

	// For any other case (like dates), just return 1 and let the option handle conversion
	return 1;
}
