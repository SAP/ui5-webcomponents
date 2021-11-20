const assert = require("chai").assert;

describe("ViewSettingsDialog general interaction", () => {
	before(() => {
		browser.url(`http://localhost:8081/test-resources/pages/ViewSettingsDialog.html`);
	});

	// it("test ViewSettingsDialog initial value", ()=>{
	// 	const btnOpenDialog = $("#btnOpenDialog");
	// 	const viewSettingsDialog = browser.$("#vsd");
	// 	btnOpenDialog.click();

	// 	assert.ok(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText().includes("Ascending"), "initially sortOrder has correct value");
	// 	assert.notOk(viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").isExisting(), "initially sortBy should not have an option selected");

	// 	browser.keys("Escape");
	// });

	// it("test ViewSettingsDialog - sortOrder confirm selected settings", ()=>{
	// 	const btnOpenDialog = $("#btnOpenDialog");
	// 	const viewSettingsDialog = browser.$("#vsd");
	// 	btnOpenDialog.click();

	// 	viewSettingsDialog.shadow$("ui5-list").$$("ui5-li")[1].click();

	// 	viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();

	// 	btnOpenDialog.click();

	// 	assert.ok(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText().includes("Descending"), "SortOrder should properly change value");

	// 	browser.keys("Escape");
	// });

	// it("test ViewSettingsDialog - sortBy confirm selected settings", ()=>{
	// 	const btnOpenDialog = $("#btnOpenDialog");
	// 	const viewSettingsDialog = browser.$("#vsd");
	// 	btnOpenDialog.click();

	// 	assert.notOk(viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").isExisting(), "sortBy should not have an option selected");

	// 	viewSettingsDialog.shadow$("[sort-by]").$("ui5-li").click();
	// 	viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();

	// 	btnOpenDialog.click();

	// 	assert.ok(viewSettingsDialog.shadow$("[sort-by]").$("ui5-li").getText().includes("Name"), "sortBy should  have an option selected");

	// 	browser.keys("Escape");
	// });

	// it("test ViewSettingsDialog change selected settings", ()=>{
	// 	const btnOpenDialog = $("#btnOpenDialog");
	// 	const viewSettingsDialog = browser.$("#vsd");
	// 	btnOpenDialog.click();

	// 	assert.ok(viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").getText().includes("Name"), "sortBy should have an option selected");

	// 	viewSettingsDialog.shadow$("[sort-by]").$$("ui5-li")[1].click();
	// 	viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$("ui5-button").click();
	// 	btnOpenDialog.click();

	// 	assert.ok(viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").getText().includes("Position"), "sortBy should change selected option");

	// 	browser.keys("Escape");
	// })

	// it("test ViewSettingsDialog cancel selected settings", ()=>{
	// 	const btnOpenDialog = $("#btnOpenDialog");
	// 	const viewSettingsDialog = browser.$("#vsd");
	// 	btnOpenDialog.click();

	// 	assert.ok(viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").getText().includes("Position"),  "sortBy should have an option selected");
	// 	assert.ok(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText().includes("Descending"), "sortOrder should have correct option selected");
	
	// 	viewSettingsDialog.shadow$("ui5-list").$$("ui5-li")[0].click();
	// 	viewSettingsDialog.shadow$$("ui5-li")[0].click();

	// 	viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$$("ui5-button")[1].click();
	// 	btnOpenDialog.click();

	// 	assert.ok(viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").getText().includes("Position"), "sortBy should not have a change in the selected option");
	// 	assert.ok(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText().includes("Descending"), "sortOrder should not have a change in the selected option");

	// 	browser.keys("Escape");
	// })
	
	// it("test ViewSettingsDialog reset settings", ()=>{
	// 	const btnOpenDialog = $("#btnOpenDialog");
	// 	const viewSettingsDialog = browser.$("#vsd");
	// 	btnOpenDialog.click();

	// 	viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-header").$("ui5-button").click();

	// 	assert.ok(viewSettingsDialog.shadow$("ui5-list").$("ui5-li[selected]").getText().includes("Ascending"), "sortOrder has returned to the initial state");
	// 	assert.notOk(viewSettingsDialog.shadow$("[sort-by]").$("ui5-li[selected]").isExisting(), "sortBy has returned to the initial state");
		
	// 	viewSettingsDialog.shadow$("ui5-dialog").$(".ui5-vsd-footer").$$("ui5-button")[1].click();
	// });

});
