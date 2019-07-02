const ManagedEvents = {};

ManagedEvents.events = [
	"click",
	"dblclick",
	"contextmenu",
	"keydown",
	"keypress",
	"keyup",
	"mousedown",
	"mouseout",
	"mouseover",
	"mouseup",
	"select",
	"selectstart",
	"dragstart",
	"dragenter",
	"dragover",
	"dragleave",
	"dragend",
	"drop",
	"paste",
	"cut",
	"input",
	"touchstart",
	"touchend",
	"touchmove",
	"touchcancel",
];

ManagedEvents.bindAllEvents = callback => {
	if (callback) {
		ManagedEvents.events.forEach(event => {
			document.addEventListener(event, callback);
		});
	}
};

ManagedEvents.unbindAllEvents = callback => {
	if (callback) {
		ManagedEvents.events.forEach(event => {
			document.removeEventListener(event, callback);
		});
	}
};

export default ManagedEvents;
