/**
 * Returns the caret (cursor) position of the specified text field (field).
 * Return value range is 0-field.value.length.
 */
const getCaretPosition = field => {
	// Initialize
	let caretPos = 0;

	// IE Support
	if (document.selection) {
		// Set focus on the element
		field.focus();

		// To get cursor position, get empty selection range
		const selection = document.selection.createRange();

		// Move selection start to 0 position
		selection.moveStart("character", -field.value.length);

		// The caret position is selection length
		caretPos = selection.text.length;
	} else if (field.selectionStart || field.selectionStart === "0") { // Firefox support
		caretPos = field.selectionDirection === "backward" ? field.selectionStart : field.selectionEnd;
	}

	return caretPos;
};

const setCaretPosition = (field, caretPos) => {
	if (field.createTextRange) {
		const range = field.createTextRange();
		range.move("character", caretPos);
		range.select();
	} else if (field.selectionStart) {
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
