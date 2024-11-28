import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";

import type DatePicker from "./DatePicker.js";

export default function (this: DatePicker) {
	return [
		DatePickerInputTemplate.call(this),
		DatePickerPopoverTemplate.call(this),
	];
};
