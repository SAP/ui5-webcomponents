// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

class ListTestPage {
	set id(id) {
		this._sut = id;
	}

	get root() {
		return $(this._sut);
	}

	get header() {
		return browser.$(`${this._sut}`).shadow$(`header`);
	}

	getItem(index) {
		return browser.$$("#list1 ui5-li")[index];
	}
}

module.exports = new ListTestPage();
