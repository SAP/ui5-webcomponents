import { assert } from "chai";

describe("Default Tooltips", () => {
	before(async () => {
		await browser.url(`test/pages/base/Tooltips.html?sap-ui-enableDefaultTooltips=false`);
	});

	it("Tooltips turned off", async () => {
		const btn = await browser.$("#btn").shadow$(".ui5-button-root");
		const btnIcon = await browser.$("#btn").shadow$(".ui5-button-icon");
		const rt = await browser.$("#rt").shadow$(".ui5-rating-indicator-root");
		const segBtnItem = await browser.$("#segBtnItem").shadow$(".ui5-button-root");
		const segBtnItemIcon = await browser.$("#segBtnItem").shadow$(".ui5-button-icon");

		const btnTitle = await btn.getAttribute("title");
		const btnIconTitle = await btnIcon.getAttribute("title");
		const rtTitle = await rt.getAttribute("title");
		const segBtnItemTitle = await segBtnItem.getAttribute("title");
		const segBtnItemIconTitle = await segBtnItemIcon.getAttribute("title");

		assert.notOk(btnTitle, "An icon only Button has no default tooltip.");
		assert.notOk(btnIconTitle, "An icon only Button icon has no default tooltip.");
		assert.notOk(rtTitle, "The Rating Indicator has no default tooltip.");
		assert.notOk(segBtnItemTitle, "An icon only Segmented Button Item has no default tooltip");
		assert.notOk(segBtnItemIconTitle, "An icon only Segmented Button Item icon has no default tooltip");
	});
});
