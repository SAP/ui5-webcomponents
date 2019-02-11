class ListTestPage {
	set id(id) {
		this._sut = id;
	}

	get root() {
		return $(this._sut);
	}

	get header() {
		return browser.findElementDeep(`${this._sut} >>> header`);
	}

	getItem(index) {
		return browser.$$("#list1 ui5-li")[index];
	}
}

module.exports = new ListTestPage();
