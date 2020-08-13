// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

class DayPickerTestHelper {
	set id(id) {
		this._sut = id;
	}

	get dayPickerRoot() {
		return browser.executeAsync(async (id, done) => {
			await window.RenderScheduler.whenFinished();

			const el = document.getElementById(id)
				.shadowRoot.querySelector(".ui5-dp-root");

			return done(el);
		}, this._sut);
	}
}

module.exports = new DayPickerTestHelper();
