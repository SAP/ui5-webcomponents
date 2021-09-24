const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ViewSettingsDialog general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/ViewSettingsDialog.html`);
	});

	it("test ViewSettingsDialog initial value", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialog");
		const viewSettingsDialog = await browser.$("#vsd");
		await btnOpenDialog.click();

		const selectedLiText = await viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText();
		assert.include(selectedLiText, "Ascending", "initially sortOrder has correct value");
		assert.notOk(await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").isExisting(), "initially sortBy should not have an option selected");

		await browser.keys("Escape");
	});

	it("test ViewSettingsDialog - sortOrder confirm selected settings", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialog");
		const viewSettingsDialog = await browser.$("#vsd");
		await btnOpenDialog.click();

		await (await viewSettingsDialog.shadow$("ui5-list").$$("ui5-li"))[1].click();

		await viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();

		await btnOpenDialog.click();

		const selectedLiText = await viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText();
		assert.include(selectedLiText, "Descending", "SortOrder should properly change value");

		await browser.keys("Escape");
	});

	it("test ViewSettingsDialog - sortBy confirm selected settings", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialog");
		const viewSettingsDialog = await browser.$("#vsd");
		await btnOpenDialog.click();

		assert.notOk(await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").isExisting(), "sortBy should not have an option selected");

		await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li").click();
		await viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();

		await btnOpenDialog.click();

		const sortByLiText = await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li").getText();
		assert.include(sortByLiText, "Name", "sortBy should  have an option selected");

		await browser.keys("Escape");
	});

	it("test ViewSettingsDialog change selected settings", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialog");
		const viewSettingsDialog = await browser.$("#vsd");
		await btnOpenDialog.click();

		let sortBySelectedLiText = await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").getText();
		assert.include(sortBySelectedLiText, "Name", "sortBy should have an option selected");

		await (await viewSettingsDialog.shadow$("[sort-by]").$$("ui5-li"))[1].click();
		await viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();
		await btnOpenDialog.click();

		sortBySelectedLiText = await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").getText();
		assert.include(sortBySelectedLiText, "Position", "sortBy should change selected option");

		await browser.keys("Escape");
	})

	it("test ViewSettingsDialog cancel selected settings", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialog");
		const viewSettingsDialog = await browser.$("#vsd");
		await btnOpenDialog.click();

		let sortBySelectedLiText = await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").getText();
		assert.include(sortBySelectedLiText, "Position",  "sortBy should have an option selected");
		let selectedLiText = await viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText();
		assert.include(selectedLiText, "Descending", "sortOrder should have correct option selected");

		await (await viewSettingsDialog.shadow$("ui5-list").$$("ui5-li"))[0].click();
		await (await viewSettingsDialog.shadow$$("ui5-li"))[0].click();

		await (await viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$$("ui5-button"))[1].click();
		await btnOpenDialog.click();

		sortBySelectedLiText = await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").getText();
		assert.include(sortBySelectedLiText, "Position", "sortBy should not have a change in the selected option");
		selectedLiText = await viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText();
		assert.include(selectedLiText, "Descending", "sortOrder should not have a change in the selected option");

		await browser.keys("Escape");
	})

	it("test ViewSettingsDialog reset settings", async () => {
		const btnOpenDialog = await browser.$("#btnOpenDialog");
		const viewSettingsDialog = await browser.$("#vsd");
		await btnOpenDialog.click();

		await viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-header").$("ui5-button").click();

		const selectedLiText = await viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText();
		assert.include(selectedLiText, "Ascending", "sortOrder has returned to the initial state");
		assert.notOk(await viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").isExisting(), "sortBy has returned to the initial state");

		await (await viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$$("ui5-button"))[1].click();
	});

});
