class TabContainerTestPage {
	async getItemsIds(tabContainerId) {
		const items = await browser.$$(`#${tabContainerId} > *`);

		return Promise.all([...items].map(item => item.getAttribute("id")));
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

	getStartOverflow(tabContainerId) {
		return browser.$(`#${tabContainerId}`).shadow$(".ui5-tc__overflow--start [ui5-button]");
	}

	getEndOverflow(tabContainerId) {
		return browser.$(`#${tabContainerId}`).shadow$(".ui5-tc__overflow--end [ui5-button]");
	}

	async getCurrentPopoverItems(tabContainerId) {
		const popover = await browser.$(`#${tabContainerId}`).shadow$("ui5-responsive-popover");

		return popover.$$("[ui5-li-custom]");
	}
}

export default new TabContainerTestPage()
