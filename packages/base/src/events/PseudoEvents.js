import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js";

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

const isBackSpace = event => (event.key ? (event.key === "Backspace" || event.key === "Backspace") : event.keyCode === KeyCodes.BACKSPACE) && !hasModifierKeys(event);

const isDelete = event => (event.key ? (event.key === "Delete" || event.key === "Delete") : event.keyCode === KeyCodes.DELETE) && !hasModifierKeys(event);

const isShow = event => {
	if (event.key) {
		return (event.key === "F4" && !hasModifierKeys(event)) || ((event.key === "ArrowDown" || event.key === "Down") && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false));
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
