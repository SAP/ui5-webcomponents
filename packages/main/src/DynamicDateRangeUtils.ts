import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "./DynamicDateRange.js";
import DynamicDateRangeDirection from "./types/DynamicDateRangeDirection.js";
import type StepInput from "./StepInput.js";
import type { SelectChangeEventDetail } from "./Select.js";

/**
 * GroupedOption interface for merged options.
 */
export type GroupedOption = IDynamicDateRangeOption & {
	_availableOptions: Array<IDynamicDateRangeOption>;
};

/**
 * Simple check if an option is a grouped option.
 */
export function isGroupedOption(option: IDynamicDateRangeOption): option is GroupedOption {
	return "_availableOptions" in option && Array.isArray((option as GroupedOption)._availableOptions);
}

/**
 * Gets the group key for storing last/next selections.
 * This uses the grouped option's operator without the _GROUPED suffix.
 *
 * @param operator - The operator string
 * @returns The group key for storage
 */
export function getGroupKeyFromOperator(operator: string): string {
	// Handle undefined/null operator
	if (!operator) {
		return "";
	}

	if (operator.endsWith("_GROUPED")) {
		return operator.replace("_GROUPED", "");
	}

	// For individual options, derive group key from direction if available
	if (operator.startsWith("LAST")) {
		return "LAST";
	}
	if (operator.startsWith("NEXT")) {
		return "NEXT";
	}

	return operator;
}

/**
 * Generic callback type for updating current value in DynamicDateRange
 */
export type UpdateValueCallback = (newValue: DynamicDateRangeValue) => void;

/**
 * Common helper to store selection and trigger update callback.
 * Extracted to avoid code duplication between step input and select handlers.
 */
function storeSelectionAndUpdate(
	updatedValue: DynamicDateRangeValue,
	lastGroupedSelections: Record<string, DynamicDateRangeValue>,
	updateCallback: UpdateValueCallback,
): void {
	const groupKey = getGroupKeyFromOperator(updatedValue.operator);
	lastGroupedSelections[groupKey] = { ...updatedValue };
	updateCallback(updatedValue);
}

/**
 * Handler for step input changes in grouped options.
 * Completely decoupled from DynamicDateRange - just needs current value and update callback.
 */
export function handleGroupedStepInputChange(
	e: CustomEvent,
	currentValue: DynamicDateRangeValue | undefined,
	updateCallback: UpdateValueCallback,
	lastGroupedSelections: Record<string, DynamicDateRangeValue>,
): void {
	if (!currentValue) {
		return;
	}

	// StepInput change event has no detail, so we access the value from the component
	const newValue = Number((e.target as StepInput).value);
	const updatedValue = createValueWithNumber(currentValue.operator, newValue);

	storeSelectionAndUpdate(updatedValue, lastGroupedSelections, updateCallback);
}

/**
 * Handler for select changes in grouped options.
 * Completely decoupled from DynamicDateRange.
 */
export function handleGroupedSelectChange(
	e: CustomEvent<SelectChangeEventDetail>,
	currentValue: DynamicDateRangeValue | undefined,
	updateCallback: UpdateValueCallback,
	lastGroupedSelections: Record<string, DynamicDateRangeValue>,
): void {
	if (!currentValue) {
		return;
	}

	// Select change event provides selectedOption in event detail
	const newOperator = String(e.detail.selectedOption.value);
	const currentNumber = (currentValue.values?.[0] as number) || 1;
	const updatedValue = createValueWithNumber(newOperator, currentNumber);

	storeSelectionAndUpdate(updatedValue, lastGroupedSelections, updateCallback);
}

/**
 * Simple merging of options: group Last and Next options together if multiple exist.
 */
export function mergeOptions(rawOptions: Array<IDynamicDateRangeOption>): Array<IDynamicDateRangeOption> {
	// Separate temporal options (with template) from simple options
	const temporalOptions = rawOptions.filter(option => option.template && option.timeUnit && option.direction);
	const simpleOptions = rawOptions.filter(option => !option.template || !option.timeUnit || !option.direction);

	// Group temporal options by direction
	const lastOptions = temporalOptions.filter(option => option.direction === DynamicDateRangeDirection.Last);
	const nextOptions = temporalOptions.filter(option => option.direction === DynamicDateRangeDirection.Next);

	const result: Array<IDynamicDateRangeOption> = [];

	// Add simple options as-is
	result.push(...simpleOptions);

	// Add last options (grouped if multiple, single if one)
	if (lastOptions.length > 1) {
		result.push(createGroupedOption(lastOptions, "Last"));
	} else if (lastOptions.length === 1) {
		result.push(lastOptions[0]);
	}

	// Add next options (grouped if multiple, single if one)
	if (nextOptions.length > 1) {
		result.push(createGroupedOption(nextOptions, "Next"));
	} else if (nextOptions.length === 1) {
		result.push(nextOptions[0]);
	}

	return result;
}

/**
 * Creates a simple grouped option for multiple Last or Next options.
 */
function createGroupedOption(options: Array<IDynamicDateRangeOption>, direction: string): GroupedOption {
	// Create simple grouped text like "Last X Days / Weeks / Months"
	const units = options.map(option => {
		switch (true) {
		case option.timeUnit?.includes("days"):
			return "Days";
		case option.timeUnit?.includes("weeks"):
			return "Weeks";
		case option.timeUnit?.includes("months"):
			return "Months";
		case option.timeUnit?.includes("quarters"):
			return "Quarters";
		case option.timeUnit?.includes("years"):
			return "Years";
		default: {
			const unit = option.timeUnit?.replace(/s$/, "");
			return `${unit?.charAt(0).toUpperCase()}${unit?.slice(1)}s` || "";
		}
		}
	});
	const groupedText = `${direction} X ${units.join(" / ")}`;

	return {
		operator: `${direction.toUpperCase()}_GROUPED`,
		text: groupedText,
		icon: options[0].icon,
		format: (value: DynamicDateRangeValue) => {
			const matchingOption = options.find(option => option.operator === value.operator);
			return matchingOption ? matchingOption.format(value) : "";
		},
		parse: (value: string) => {
			const matchingOption = options.find(option => option.isValidString(value));
			return matchingOption ? matchingOption.parse(value) : undefined;
		},
		toDates: (value: DynamicDateRangeValue) => {
			const matchingOption = options.find(option => option.operator === value.operator);
			return matchingOption ? matchingOption.toDates(value) : [];
		},
		isValidString: (value: string) => {
			return options.some(option => option.isValidString(value));
		},
		template: undefined, // Grouped options use unified template
		_availableOptions: options,
	};
}

/**
 * Creates a DynamicDateRangeValue with date values.
 */
export function createValueWithDates(operator: string, dates: Array<Date>): DynamicDateRangeValue {
	return {
		operator,
		values: dates,
	};
}

/**
 * Creates a DynamicDateRangeValue with a number value (internal format for UI state).
 */
export function createValueWithNumber(operator: string, number: number): DynamicDateRangeValue {
	return {
		operator,
		values: [number],
	};
}

/**
 * Retrieves stored selection from memory.
 */
export function getStoredSelectionForPattern(
	value: DynamicDateRangeValue,
	lastGroupedSelections: Record<string, DynamicDateRangeValue>,
): DynamicDateRangeValue | null {
	if (!value || !value.operator) {
		return null;
	}

	const groupKey = getGroupKeyFromOperator(value.operator);
	const storedSelection = lastGroupedSelections[groupKey];
	if (storedSelection && storedSelection.operator === value.operator) {
		return storedSelection;
	}
	return null;
}

/**
 * Attempts to restore the original number value from date values.
 */
export function restoreNumberFromDates(value: DynamicDateRangeValue): DynamicDateRangeValue | null {
	if (!value.values || value.values.length !== 2 || !(value.values[0] instanceof Date) || !(value.values[1] instanceof Date)) {
		return null;
	}

	const [startDate, endDate] = value.values as [Date, Date];
	const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
	const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

	let estimatedNumber = diffInDays;

	switch (true) {
	case value.operator.includes("WEEKS"):
		estimatedNumber = Math.round(diffInDays / 7);
		break;
	case value.operator.includes("MONTHS"):
		estimatedNumber = Math.round(diffInDays / 30);
		break;
	case value.operator.includes("QUARTERS"):
		estimatedNumber = Math.round(diffInDays / 90);
		break;
	case value.operator.includes("YEARS"):
		estimatedNumber = Math.round(diffInDays / 365);
		break;
	default:
		break;
	}

	return createValueWithNumber(value.operator, estimatedNumber || 1);
}

/**
 * Formats a date range into a readable string.
 */
export function formatDateRange(dates: Array<Date>, i18nText: string): string | null {
	if (dates.length !== 2 || !dates.every(date => date instanceof Date && !Number.isNaN(date.getTime()))) {
		return null;
	}

	const formatter = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	const startDate = formatter.format(dates[0]);
	const endDate = formatter.format(dates[1]);
	return `${i18nText}: ${startDate} – ${endDate}`;
}

/**
 * Simple processing for temporal options.
 */
export function processLastNextOption(
	currentValue: DynamicDateRangeValue,
	lastGroupedSelections: Record<string, DynamicDateRangeValue>,
	option: IDynamicDateRangeOption,
): {
	calculatedDates: Array<Date>;
	finalValue: DynamicDateRangeValue;
	stringValue: string;
	isValid: boolean;
} {
	const groupKey = getGroupKeyFromOperator(currentValue.operator);

	// Store in memory
	lastGroupedSelections[groupKey] = { ...currentValue };

	// Calculate dates and create final value
	const calculatedDates = option.toDates(currentValue);
	const finalValue = createValueWithDates(currentValue.operator, calculatedDates);

	// Format and validate
	const stringValue = option.format(currentValue);
	const isValid = option.isValidString(stringValue);

	return {
		calculatedDates,
		finalValue,
		stringValue,
		isValid,
	};
}
