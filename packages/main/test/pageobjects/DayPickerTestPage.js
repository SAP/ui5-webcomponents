class DayPickerTestHelper {
	set id(id) {
		this._sut = id;
	}

	get dayPickerRoot() {
		return browser.executeAsync(async (id, done) => {
			await window.RenderScheduler.whenFinished();

			document.getElementById(id).shadowRoot.querySelector("ui5-popover") // ui5-popover
				.shadowRoot.querySelector("slot").assignedNodes()[0] // ui5-calendar
				.shadowRoot.querySelector("ui5-daypicker") // ui5-daypicker
				.shadowRoot.querySelector(".ui5-dp-root");

			return done();
		}, this._sut);
	}

	get currentDate() {
		return browser.executeAsync(async (id, done) => {
			await window.RenderScheduler.whenFinished();

			const timestamp = document.getElementById(id).shadowRoot.querySelector("ui5-popover") // ui5-popover
			.shadowRoot.querySelector("slot").assignedNodes()[0] // ui5-calendar
			.shadowRoot.querySelector("ui5-daypicker") // ui5-daypicker
			.timestamp;

			return done(new Date(timestamp*1000).getDate()); //parse the unix timestamp
		}, this._sut);
	}
}

module.exports = new DayPickerTestHelper();
