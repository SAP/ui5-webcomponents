class DatePickerTestPage {
	constructor() {
		this.page = 'http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/DatePicker_test_page.html';
	}

	set id(id) {
		this._sut = id;
	}

	get root() {
		return $(this._sut);
	}

	set page(url) {
		this._url = url;
	}

	get popover() {
		return browser.findElementDeep(this._sut + " >>> ui5-popover");
	}

	get popoverContent() {
		return browser.findElementDeep(this._sut + " >>> ui5-popover >>> .sapMPopup");
	}

	get calendar() {
		return browser.findElementDeep(this._sut + " >>> ui5-calendar");
	}

	get input() {
		return browser.findElementDeep(this._sut + " >>> ui5-input");
	}

	get innerInput() {
		return browser.findElementDeep(this._sut + " >>> ui5-input >>> input");
	}

	hasIcon() {
		return browser.execute(function(id) {
			return !!document.querySelector(id).shadowRoot.querySelector("ui5-icon");
		}, this._sut);
	}

	get valueHelpIcon() {
		return browser.findElementDeep(this._sut + " >>> ui5-icon");
	}

	get btnNextMonth() {
		return browser.findElementDeep(this._sut + " >>> ui5-calendar >>> ui5-calendar-header >>> [data-sap-cal-head-button='Next']");
	}

	getPickerDate(timestamp) {
		return browser.findElementDeep(`${this._sut} >>> ui5-calendar >>> ui5-daypicker >>> [data-sap-timestamp='${timestamp}']`);
	}

	getFirstDisplayedDate() {
		return browser.findElementDeep(`${this._sut} >>> ui5-calendar >>> ui5-daypicker >>> .sapWCDayPickerItem`);
	}

	isValid(value) {
		return browser.execute((id, value) => {
			return document.querySelector(id).isValid(value);
		}, this._sut, value);
	}

	isPickerOpen() {
		return browser.execute((id) => {
			return document.querySelector(id).isOpen();
		}, this._sut);
	}

	openPicker(options) {
		return browser.execute((id, options) => {
			return document.querySelector(id).openPicker(options);
		}, this._sut, options);
	}

	open() {
		browser.url(this._url);
	}
}

module.exports = new DatePickerTestPage();
