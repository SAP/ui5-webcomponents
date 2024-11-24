import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DateTimePickerPopoverTemplate from "./DateTimePickerPopoverTemplate.js";

import type DateTimePicker from "./DateTimePicker.js";

export default function (this: DateTimePicker) {
	return (
		<>
			{ DatePickerInputTemplate.call(this) }
			{ DateTimePickerPopoverTemplate.call(this)}
		</>
)};