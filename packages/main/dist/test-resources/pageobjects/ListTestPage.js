class ListTestPage {
	set id(id) {
		this._sut = id;
	}

	async getRoot() {
		return $(this._sut);
	}

	async getHeader() {
		return browser.$(`${this._sut}`).shadow$(`header`);
	}

	async getItem(index) {
		return (await browser.$$("#list1 ui5-li"))[index];
	}
}

module.exports = new ListTestPage();
