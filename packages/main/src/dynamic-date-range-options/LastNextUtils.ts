import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import type StepInput from "../StepInput.js";
import { toDatesLastNext } from "./toDates.js";

/**
 * Parses a string value for Last/Next options
 * @param value - The string to parse (e.g., "Last 7 Days")
 * @param option - The option instance
 * @returns Parsed DynamicDateRangeValue
 */
export function parseLastNext(value: string, option: IDynamicDateRangeOption): DynamicDateRangeValue | undefined {
	const returnValue = { operator: "", values: [] } as DynamicDateRangeValue;
	returnValue.operator = option.operator;

	// Extract number from text like "Last 7 Days" or "Next 3 Months"
	const match = value.match(/(\d+)/);
	if (match) {
		returnValue.values = [Number.parseInt(match[1])];
	} else {
		returnValue.values = [1];
	}

	return returnValue;
}

/**
 * Formats a DynamicDateRangeValue for Last/Next options
 * @param value - The value to format
 * @param option - The option instance
 * @returns Formatted string
 */
export function formatLastNext(value: DynamicDateRangeValue, option: IDynamicDateRangeOption): string {
	const amount = value?.values?.[0] as number || 1;
	return option.text.replace("X", amount.toString());
}

/**
 * Validates if a string is valid for Last/Next options
 * @param value - The string to validate
 * @param option - The option instance
 * @returns True if valid, false otherwise
 */
export function isValidStringLastNext(value: string, option: IDynamicDateRangeOption): boolean {
	// Check if string matches the pattern "Last X Days" or "Next X Months"
	const pattern = option.text.replace("X", "\\d+");
	const regex = new RegExp(`^${pattern}$`, "i");
	return regex.test(value);
}

/**
 * Handles selection change events for Last/Next options
 * @param e - The custom event
 * @param option - The option instance
 * @returns Updated DynamicDateRangeValue
 */
export function handleSelectionChangeLastNext(e: CustomEvent, option: IDynamicDateRangeOption): DynamicDateRangeValue | undefined {
	const currentValue = { operator: "", values: [] } as DynamicDateRangeValue;
	currentValue.operator = option.operator;

	// For StepInput, the value is accessed from the target element itself
	const stepInputValue = (e.target as StepInput)?.value;
	currentValue.values = [stepInputValue || 1];

	return currentValue;
}

// Re-export toDatesLastNext for backward compatibility
export { toDatesLastNext };
