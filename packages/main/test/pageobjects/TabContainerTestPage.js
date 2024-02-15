class TabContainerTestPage {
	async getRoot() {
		return $(this._sut);
	}

	async getHeader() {
		return browser.$(`${this._sut}`).shadow$(`header`);
	}

	async getItem(index) {
		return (await browser.$$("#list1 ui5-li"))[index];
	}

	async getTabStripItems(tabContainerId) {
		return browser.$(`#${tabContainerId}`).shadow$$(".ui5-tab-strip-item");
	}

	async getDisplayedTabStripItems(tabContainerId) {
		return browser.$(`#${tabContainerId}`).shadow$$(".ui5-tab-strip-item:not([start-overflow]):not([end-overflow])");
	}

	async getRealTabReference(tabRepresentation) {
		const realTabId = await this.getRealTabId(tabRepresentation);

		return browser.$(`#${realTabId}`);
	}

	async getRealTabId(tabRepresentation) {
		const realTabId = await browser.executeAsync((tabRepresentation, done) => {
			done(tabRepresentation.realTabReference.id);
		}, tabRepresentation);

		return realTabId;
	}
}

export default new TabContainerTestPage()
