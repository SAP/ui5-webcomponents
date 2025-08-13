class TabContainerTestPage {
	getItemsIds(tabContainerId) {
		return browser.executeAsync((tabContainerId, done) => {
			const tabContainer = document.getElementById(tabContainerId);

			const buildTree = (el) => {
				return el.items.map((item) => {
					if (item.isSeparator) {
						return {
							id: item.id
						};
					}

					return {
						id: item.id,
						items: buildTree(item)
					}
				});
			}

			buildTree(tabContainer);

			done(buildTree(tabContainer));
		}, tabContainerId)
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

	async focusItem(tabId) {
		await browser.executeAsync(async (tabId, done) => {
			await document.getElementById(tabId).focus();
			done();
		}, tabId);
	}
}

export default new TabContainerTestPage()
