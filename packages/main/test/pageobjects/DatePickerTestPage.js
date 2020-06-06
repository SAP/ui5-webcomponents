class DatePickerTestPage {
	constructor() {
		this.page = 'http://localhost:8080/test-resources/pages/DatePicker_test_page.html';
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
		return browser.$(browser.getStaticAreaRespPopover(this._sut));
	}

	get popoverContent() {
		return browser.$(this._sut).shadow$("ui5-responsive-popover").shadow$("ui5-popover").shadow$(".ui5-popup-root");
	}

	get calendar() {
		return this.popover.$("ui5-calendar");
	}

	get input() {
		return browser.$(this._sut).shadow$("ui5-input");
	}

	get innerInput() {
		return browser.$(this._sut).shadow$("ui5-input").shadow$("input");
	}

	get inputPopover() {
		const input = this.input;
		return browser.$(browser.execute(async input => {
			const staticAreaItem = await input.getStaticAreaItemDomRef();
			return staticAreaItem.querySelector("ui5-popover");
		}, input));
	}

	hasIcon() {
		return browser.execute(function(id) {
			return !!document.querySelector(id).shadowRoot.querySelector("ui5-icon");
		}, this._sut);
	}

	get valueHelpIcon() {
		return browser.$(this._sut).shadow$("ui5-icon");
	}

	get btnPrev() {
		return this.calendar.shadow$(`ui5-calendar-header`).shadow$(`div[data-sap-cal-head-button="Prev"]`);
	}

	get btnNext() {
		return this.calendar.shadow$(`ui5-calendar-header`).shadow$(`div[data-sap-cal-head-button="Next"]`);
	}

	get btnYear() {
		return this.calendar.shadow$(`ui5-calendar-header`).shadow$(`div[data-sap-show-picker="Year"]`);
	}

	get btnMonth() {
		return this.calendar.shadow$(`ui5-calendar-header`).shadow$(`div[data-sap-show-picker="Month"]`);
	}

	getPickerDate(timestamp) {
		return this.calendar.shadow$(`ui5-daypicker`).shadow$(`div[data-sap-timestamp="${timestamp}"]`);
	}

	getFirstDisplayedDate() {
		return this.calendar.shadow$(`ui5-daypicker`).shadow$(`div.ui5-dp-item`);
	}

	getFirstDisplayedYear() {
		return this.calendar.shadow$(`ui5-yearpicker`).shadow$(`div.ui5-yp-item`);
	}

	getDisplayedYear(index) {
		return this.calendar.shadow$(`ui5-yearpicker`).shadow$(`.ui5-yp-root`)
			.$$(".ui5-yp-item")[index];
	}

	getDisplayedMonth(index) {
		return this.calendar.shadow$(`ui5-monthpicker`).shadow$(`.ui5-mp-root`).$$(".ui5-mp-item")[index];
	}

	getDisplayedDay(index) {
		return this.calendar.shadow$(`ui5-daypicker`).shadow$(`.ui5-dp-root`)
			.$(".ui5-dp-content")
			.$(".ui5-dp-items-container")
			.$$(".ui5-dp-item")[index];
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
