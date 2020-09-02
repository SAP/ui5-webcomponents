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

	get staticAreaItemClassName() {
		return browser.getStaticAreaItemClassName(this._sut);
	}

	get popover() {
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
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

	get inputStaticAreaItem() {
		return browser.$(`.${this.input.getProperty("_id")}`);
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
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$("ui5-calendar").shadow$(`ui5-calendar-header`).shadow$(`div[data-sap-cal-head-button="Prev"]`);
	}

	get btnNext() {
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$("ui5-calendar").shadow$(`ui5-calendar-header`).shadow$(`div[data-sap-cal-head-button="Next"]`);
	}

	get btnYear() {
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$("ui5-calendar").shadow$(`ui5-calendar-header`).shadow$(`div[data-sap-show-picker="Year"]`);
	}

	get btnMonth() {
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$("ui5-calendar").shadow$(`ui5-calendar-header`).shadow$(`div[data-sap-show-picker="Month"]`);
	}

	get dayPicker() {
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
	}

	getPickerDate(timestamp) {
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`).shadow$(`div[data-sap-timestamp="${timestamp}"]`);
	}

	getFirstDisplayedDate() {
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`).shadow$(`div.ui5-dp-item`);
	}

	getFirstDisplayedYear() {
		return browser.$(`.${this.staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-yearpicker`).shadow$(`div.ui5-yp-item`);
	}

	getDisplayedYear(index) {
		return browser
			.$(`.${this.staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-yearpicker`).shadow$(`.ui5-yp-root`)
			.$$(".ui5-yp-item")[index];
	}

	getDisplayedMonth(index) {
		return browser
			.$(`.${this.staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-monthpicker`).shadow$(`.ui5-mp-root`)
			.$$(".ui5-mp-item")[index];
	}

	getDisplayedDay(index) {
		return browser
			.$(`.${this.staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`).shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$$(".ui5-dp-item")[index];
	}

	getDayPickerContent() {
	return browser
		.$(`.${this.staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`).shadow$(`.ui5-dp-root`).$$(".ui5-dp-content > div");
	}

	getDayPickerDayNames() {
		const dayNames = Array.from(this.getDayPickerContent());
		return dayNames[0].$$("div");
	}
	
	getDayPickerDatesRow(index) {
		const data = Array.from(this.getDayPickerContent());
		return data[index].$$("div");
	}

	getDayPickerNumbers() {
		const dayNames = Array.from(this.getDayPickerContent());

		return dayNames;
	}

	getFullDayName(index){
		return 
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
