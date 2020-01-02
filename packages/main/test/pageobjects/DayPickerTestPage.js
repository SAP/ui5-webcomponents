class DayPickerTestHelper {
	set id(id) {
		this._sut = id;
	}

	get getDayPickerRoot() {
		return browser.execute((id) => {
			return document.getElementById(id).shadowRoot.querySelector("ui5-popover") // ui5-popover
				.shadowRoot.querySelector("slot").assignedNodes()[0] // ui5-calendar
				.shadowRoot.querySelector("ui5-daypicker") // ui5-daypicker
				.shadowRoot.querySelector(".ui5-dp-root");
		}, this._sut);
	}

	get currentDate() {
		return browser.execute((id) => {
			const timestamp = document.getElementById(id).shadowRoot.querySelector("ui5-popover") // ui5-popover
			.shadowRoot.querySelector("slot").assignedNodes()[0] // ui5-calendar
			.shadowRoot.querySelector("ui5-daypicker") // ui5-daypicker
			.timestamp;

			return new Date(timestamp*1000).getDate(); //parse the unix timestamp 
		}, this._sut);
	}
};

module.exports = new DayPickerTestHelper();