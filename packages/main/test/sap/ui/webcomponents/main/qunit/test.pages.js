(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.tests = factory();
	}
}(this, function () {
	return [
		"Button",
		"Calendar",
		"Card",
		// "DatePicker",
		// "DayPicker",
		"Dialog",
		"Icon",
		"Input",
		"Label",
		"Link",
		"List",
		"ListItem",
		"Panel",
		"Popover",
		"RadioButton",
		"TabContainer",
		"Table",
		"TextArea",
		"Title",
		"ToggleButton",
	];
}));
