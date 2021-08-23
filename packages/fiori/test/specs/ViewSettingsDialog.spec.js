const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("ViewSettingsDialog general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ViewSettingsDialog.html`);
	});

	it("test ViewSettingsDialog initial value", ()=>{
		const btnOpenDialog = $("#btnOpenDialog");
		const viewSettingsDialog = browser.$("#vsd");
		btnOpenDialog.click();

		assert.strictEqual(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText(), "Ascending", "initially sortOrder has correct value");
		assert.notOk(viewSettingsDialog.$("ui5-li[selected]").isExisting(), "initially sortBy should not have an option selected");

		browser.keys("Escape");
	});

	it("test ViewSettingsDialog - sortOrder confirm selected settings", ()=>{
		const btnOpenDialog = $("#btnOpenDialog");
		const viewSettingsDialog = browser.$("#vsd");
		btnOpenDialog.click();

		viewSettingsDialog.shadow$("ui5-list").$$("ui5-li")[1].click();

		viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();

		btnOpenDialog.click();

		assert.strictEqual(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText(), "Descending", "SortOrder should properly change value");

		browser.keys("Escape");
	});

	it("test ViewSettingsDialog - sortBy confirm selected settings", ()=>{
		const btnOpenDialog = $("#btnOpenDialog");
		const viewSettingsDialog = browser.$("#vsd");
		btnOpenDialog.click();

		assert.notOk(viewSettingsDialog.$("ui5-li[selected]").isExisting(), "sortBy should not have an option selected");

		viewSettingsDialog.$$("ui5-li")[0].click();
		viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();

		btnOpenDialog.click();

		assert.strictEqual(viewSettingsDialog.$("ui5-li[selected]").getText(), "Name", "sortBy should  have an option selected");

		browser.keys("Escape");
	});

	it("test ViewSettingsDialog change selected settings", ()=>{
		const btnOpenDialog = $("#btnOpenDialog");
		const viewSettingsDialog = browser.$("#vsd");
		btnOpenDialog.click();

		assert.strictEqual(viewSettingsDialog.$("ui5-li[selected]").getText(), "Name", "sortBy should have an option selected");

		viewSettingsDialog.$$("ui5-li")[1].click();
		viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();
		btnOpenDialog.click();

		assert.strictEqual(viewSettingsDialog.$("ui5-li[selected]").getText(), "Position", "sortBy should change selected option");

		browser.keys("Escape");
	})

	it("test ViewSettingsDialog cancel selected settings", ()=>{
		const btnOpenDialog = $("#btnOpenDialog");
		const viewSettingsDialog = browser.$("#vsd");
		btnOpenDialog.click();

		assert.strictEqual(viewSettingsDialog.$("ui5-li[selected]").getText(),"Position", "sortBy should have an option selected");
		assert.strictEqual(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText(), "Descending", "sortOrder should have correct option selected");
	
		viewSettingsDialog.shadow$("ui5-list").$$("ui5-li")[0].click();
		viewSettingsDialog.$$("ui5-li")[0].click();

		viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$$("ui5-button")[1].click();
		btnOpenDialog.click();

		assert.strictEqual(viewSettingsDialog.$("ui5-li[selected]").getText(),"Position", "sortBy should not have a change in the selected option");
		assert.strictEqual(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText(), "Descending", "sortOrder should not have a change in the selected option");

		browser.keys("Escape");
	})
	
	it("test ViewSettingsDialog reset settings", ()=>{
		const btnOpenDialog = $("#btnOpenDialog");
		const viewSettingsDialog = browser.$("#vsd");
		btnOpenDialog.click();

		viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-header").$("ui5-button").click();

		assert.strictEqual(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText(), "Ascending", "sortOrder has returned to the initial state");
		assert.notOk(viewSettingsDialog.$("ui5-li[selected]").isExisting(), "sortBy has returned to the initial state");
		
		viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$$("ui5-button")[1].click();
	});

});