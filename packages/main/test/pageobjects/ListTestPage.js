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
		return (await browser.$$(`${this._sut} ui5-li`))[index];
	}
}

export default new ListTestPage()
