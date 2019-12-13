const assert = require("chai").assert;

describe("TabContainer general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/TabContainer.html");

	it("tests itemSelect event", () => {
		const item = browser.$("#tabContainer1").shadow$(".ui5-tc__headerItem:nth-child(3)");
		const result = browser.$("#result");

		const SELECTED_TAB_TEXT = "Laptops";

		item.click();

		assert.strictEqual(result.getText(), SELECTED_TAB_TEXT, "Item text is retrieved correctly.");
	});

	it("scroll works on iconsOnly TabContainer", () => {
		browser.setWindowSize(520, 1080);
		browser.pause(2000);

		const arrowLeft = $("#tabContainerIconOnly").shadow$(".ui5-tc__headerArrowLeft");
		const arrowRight = $("#tabContainerIconOnly").shadow$(".ui5-tc__headerArrowRight");

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be initially shown");

		arrowRight.click();
		browser.pause(1000); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(arrowLeft.isDisplayed(), "'Left Arrow' should be visible after 'Right arrow' click");

		arrowLeft.click();
		browser.pause(1000); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be hidden after 'Left arrow' click");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be visible  after 'Left arrow' click");
	});

	it("scroll works on textOnly TabContainer", () => {
		browser.setWindowSize(520, 1080);
		browser.pause(2000);

		let arrowLeft = browser.$("#tabContainerTextOnly").shadow$(".ui5-tc__headerArrowLeft");
		let arrowRight = browser.$("#tabContainerTextOnly").shadow$(".ui5-tc__headerArrowRight");

		assert.ok(!arrowLeft.shadow$("svg").isDisplayed(), "'Left Arrow' should be initially hidden");
		assert.ok(arrowRight.shadow$("svg").isDisplayed(), "'Right Arrow' should be initially shown");

		arrowRight.click();
		browser.pause(1000); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(arrowLeft.isDisplayed(), "'Left Arrow' should be visible after 'Right arrow' click");

		arrowLeft.click();
		browser.pause(1000); // TODO: wait for animation finish. Remove when solved on framework level

		assert.ok(!arrowLeft.isDisplayed(), "'Left Arrow' should be hidden after 'Left arrow' click");
		assert.ok(arrowRight.isDisplayed(), "'Right Arrow' should be visible  after 'Left arrow' click");
	});


	it("tests if content is scrollable when tabcontainer takes limited height by its parent", () => {
		const { tcHeight, tcScrollHeight } = browser.execute(() => {
			const scrollableContent = document.getElementById("tc-scrollable-child");
	
			return {
				tcHeight: scrollableContent.offsetHeight,
				tcScrollHeight: scrollableContent.scrollHeight,
			}
		});
	
	
		const { tabHeight, tabScrollHeight } = browser.execute(() => {
			const scrollableContent = document.getElementById("scrollable-tab").shadowRoot.querySelector("div");
	
			return {
				tabHeight: scrollableContent.offsetHeight,
				tabScrollHeight: scrollableContent.scrollHeight,
			}
		});
	
		assert.ok(tabHeight < tabScrollHeight, "Tab Content is scrollable");
		assert.ok(tcHeight >= tcScrollHeight, "TabContainer is not scrollable scrollable");
	});
});
