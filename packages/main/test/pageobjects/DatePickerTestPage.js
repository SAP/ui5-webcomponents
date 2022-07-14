class DatePickerTestPage {
	constructor() {
		this.page = 'test/pages/DatePicker_test_page.html';
	}

	set id(id) {
		this._sut = id;
	}

	async getRoot() {
		return $(this._sut);
	}

	set page(url) {
		this._url = url;
	}

	async getStaticAreaItemClassName() {
		return browser.getStaticAreaItemClassName(this._sut);
	}

	async getPopover() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
	}

	async getPopoverContent() {
		return browser.$(this._sut).shadow$("ui5-responsive-popover").shadow$("ui5-popover").shadow$(".ui5-popup-root");
	}

	async getCalendar() {
		const popover = await this.getPopover();
		return popover.$("ui5-calendar");
	}

	async getInput() {
		return browser.$(this._sut).shadow$("ui5-input");
	}

	async getInnerInput() {
		return browser.$(this._sut).shadow$("ui5-input").shadow$("input");
	}

	async getInputStaticAreaItem() {
		const input = await this.getInput();
		return browser.$(`.${await input.getProperty("_id")}`);
	}

	async hasIcon() {
		return browser.executeAsync(function(id, done) {
			done(!!document.querySelector(id).shadowRoot.querySelector("ui5-icon"));
		}, this._sut);
	}

	async getValueHelpIcon() {
		return browser.$(this._sut).shadow$("ui5-icon");
	}

	async getBtnPrev() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-calendar").shadow$(`ui5-calendar-header`).shadow$(`div[data-ui5-cal-header-btn-prev]`);
	}

	async getBtnNext() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-calendar").shadow$(`ui5-calendar-header`).shadow$(`div[data-ui5-cal-header-btn-next]`);
	}

	async getBtnYear() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-calendar").shadow$(`ui5-calendar-header`).shadow$(`div[data-ui5-cal-header-btn-year]`);
	}

	async getBtnMonth() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-calendar").shadow$(`ui5-calendar-header`).shadow$(`div[data-ui5-cal-header-btn-month]`);
	}

	async getDayPicker() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`);
	}

	async getPickerDate(timestamp) {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`).shadow$(`div[data-sap-timestamp="${timestamp}"]`);
	}

	async getFirstDisplayedDate() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`).shadow$(`div.ui5-dp-item`);
	}

	async getFirstDisplayedYear() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-yearpicker`).shadow$(`div.ui5-yp-item`);
	}

	async getDisplayedYear(index) {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		const items = await browser
			.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-yearpicker`).shadow$(`.ui5-yp-root`)
			.$$(".ui5-yp-item");

		return items[index];
	}

	async getDisplayedMonth(index) {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		const items = await browser
			.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-monthpicker`).shadow$(`.ui5-mp-root`)
			.$$(".ui5-mp-item");

		return items[index];
	}

	async getDisplayedDay(index) {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		const items = await browser
			.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`).shadow$(`.ui5-dp-root`).$(".ui5-dp-content").$$(".ui5-dp-item");

		return items[index];
	}

	async getDayPickerContent() {
		const staticAreaItemClassName = await this.getStaticAreaItemClassName();
		return browser
			.$(`.${staticAreaItemClassName}`).shadow$(`ui5-calendar`).shadow$(`ui5-daypicker`).shadow$(`.ui5-dp-root`).$$(".ui5-dp-content > div");
	}

	async getDayPickerDayNames() {
		const dayNames = Array.from(await this.getDayPickerContent());
		return dayNames[0].$$("div");
	}

	async getDayPickerDatesRow(index) {
		const data = Array.from(await this.getDayPickerContent());
		return data[index].$$("div");
	}

	async getDayPickerNumbers() {
		return Array.from(await this.getDayPickerContent());
	}

	async isValid(value) {
		return browser.executeAsync((id, value, done) => {
			done(document.querySelector(id).isValid(value));
		}, this._sut, value);
	}

	async isPickerOpen() {
		return browser.executeAsync((id, done) => {
			done(document.querySelector(id).isOpen());
		}, this._sut);
	}

	async openPicker(options) {
		return browser.executeAsync((id, options, done) => {
			done(document.querySelector(id).openPicker(options));
		}, this._sut, options);
	}

	async open() {
		await browser.url(this._url);
	}
}

module.exports = new DatePickerTestPage();
