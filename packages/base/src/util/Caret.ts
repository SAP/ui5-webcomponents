/**
 * Returns the caret (cursor) position of the specified text field (field).
 * Return value range is 0-field.value.length.
 */
const getCaretPosition = (field: HTMLInputElement): number | null => {
	// Initialize
	let caretPos: number | null = 0;

	if (field.selectionStart || field.selectionStart === 0) { // Firefox support
		caretPos = field.selectionDirection === "backward" ? field.selectionStart : field.selectionEnd;
	}

	return caretPos;
};

const setCaretPosition = (field: HTMLInputElement, caretPos: number | null) => {
	if (field.selectionStart) {
		field.focus();
		field.setSelectionRange(caretPos, caretPos);
	} else {
		field.focus();
	}
};

export {
	getCaretPosition,
	setCaretPosition,
};
