const KeyCodes = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	CONTROL: 17,
	ALT: 18,
	BREAK: 19,
	CAPS_LOCK: 20,
	ESCAPE: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	ARROW_LEFT: 37,
	ARROW_UP: 38,
	ARROW_RIGHT: 39,
	ARROW_DOWN: 40,
	PRINT: 44,
	INSERT: 45,
	DELETE: 46,
	DIGIT_0: 48,
	DIGIT_1: 49,
	DIGIT_2: 50,
	DIGIT_3: 51,
	DIGIT_4: 52,
	DIGIT_5: 53,
	DIGIT_6: 54,
	DIGIT_7: 55,
	DIGIT_8: 56,
	DIGIT_9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	WINDOWS: 91,
	CONTEXT_MENU: 93,
	TURN_OFF: 94,
	SLEEP: 95,
	NUMPAD_0: 96,
	NUMPAD_1: 97,
	NUMPAD_2: 98,
	NUMPAD_3: 99,
	NUMPAD_4: 100,
	NUMPAD_5: 101,
	NUMPAD_6: 102,
	NUMPAD_7: 103,
	NUMPAD_8: 104,
	NUMPAD_9: 105,
	NUMPAD_ASTERISK: 106,
	NUMPAD_PLUS: 107,
	NUMPAD_MINUS: 109,
	NUMPAD_COMMA: 110,
	NUMPAD_SLASH: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	NUM_LOCK: 144,
	SCROLL_LOCK: 145,
	OPEN_BRACKET: 186,
	PLUS: 187,
	COMMA: 188,
	SLASH: 189,
	DOT: 190,
	PIPE: 191,
	SEMICOLON: 192,
	MINUS: 219,
	GREAT_ACCENT: 220,
	EQUALS: 221,
	SINGLE_QUOTE: 222,
	BACKSLASH: 226,
};

const isEnter = event => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);

const isSpace = event => (event.key ? (event.key === "Spacebar" || event.key === " ") : event.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event);

const isLeft = event => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && !hasModifierKeys(event);

const isRight = event => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && !hasModifierKeys(event);

const isUp = event => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && !hasModifierKeys(event);

const isDown = event => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && !hasModifierKeys(event);

const isHome = event => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && !hasModifierKeys(event);

const isEnd = event => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && !hasModifierKeys(event);

const isEscape = event => (event.key ? event.key === "Escape" || event.key === "Esc" : event.keyCode === KeyCodes.ESCAPE) && !hasModifierKeys(event);

const isTabNext = event => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && !hasModifierKeys(event);

const isTabPrevious = event => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ false, /* Shift */ true);

const isBackSpace = event => (event.key ? event.key === "Backspace" : event.keyCode === KeyCodes.BACKSPACE) && !hasModifierKeys(event);

const isDelete = event => (event.key ? event.key === "Delete" : event.keyCode === KeyCodes.DELETE) && !hasModifierKeys(event);

const isShow = event => {
	if (event.key) {
		return (event.key === "F4" && !hasModifierKeys(event)) || (((event.key === "ArrowDown" || event.key === "Down") || (event.key === "ArrowUp" || event.key === "Up")) && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false));
	}

	return (event.keyCode === KeyCodes.F4 && !hasModifierKeys(event)) || (event.keyCode === KeyCodes.ARROW_DOWN && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false));
};

const hasModifierKeys = event => event.shiftKey || event.altKey || getCtrlKey(event);

const getCtrlKey = event => !!(event.metaKey || event.ctrlKey); // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.

const checkModifierKeys = (oEvent, bCtrlKey, bAltKey, bShiftKey) => oEvent.shiftKey === bShiftKey && oEvent.altKey === bAltKey && getCtrlKey(oEvent) === bCtrlKey;

export {
	isEnter,
	isSpace,
	isLeft,
	isRight,
	isUp,
	isDown,
	isHome,
	isEnd,
	isEscape,
	isTabNext,
	isTabPrevious,
	isBackSpace,
	isDelete,
	isShow,
};
