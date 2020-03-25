const assert = require("chai").assert;

describe("UploadCollection", () => {
	describe("Rendering", () => {
		browser.url("http://localhost:8081/test-resources/pages/UploadCollection.html");

		it("should show Link when 'fileNameClickable'", () => {
			const firstItem = browser.$("#firstItem");
			assert.ok(firstItem.shadow$("ui5-link"), "Link should be rendered");
		});

		it("should show span when file name is NOT clickable", () => {
			const secondItem = browser.$("#secondItem");
			assert.ok(secondItem.shadow$("span.ui5-uci-file-name"), "span should be rendered");
		});

		it("should show input and buttons when editing", () => {
			const secondItem = browser.$("#secondItem");
			const editButton = secondItem.shadow$(".ui5-li-detailbtn");
			editButton.click();

			assert.ok(secondItem.shadow$(".ui5-uci-edit-container"), "edit container should be rendered");
			assert.ok(secondItem.shadow$(".ui5-uci-edit-buttons"), "edit buttons should be rendered");
			assert.notOk(secondItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button should be hidden");

			// focus out the second item, to hide edit buttons (reset state for the following tests)
			browser.$("#firstItem").click();
		});
	});

	describe("Events", () => {
		it("should fire 'fileRenamed'", () => {
			const secondItem = browser.$("#secondItem");
			const secondItemIndex = 1;
			const editButton = secondItem.shadow$(".ui5-li-detailbtn");

			editButton.click();
			browser.keys("fileNameSuffix");
			browser.keys("Enter");

			assert.strictEqual(parseInt(browser.$("#renamedFileIndex").getText()), secondItemIndex, "renamed file index should be updated after rename")
		});

		it("should fire 'fileDeleted'", () => {
			const uploadCollection = browser.$("#uploadCollection");
			const firstItem = browser.$("#firstItem");

			browser.execute(() => {
				uploadCollection.setAttribute("mode", "Delete");
			});

			const deleteBtn = firstItem.shadow$(".ui5-li-deletebtn");
			deleteBtn.click();

			assert.strictEqual(uploadCollection.getProperty("items").length, 3, "item should be deleted when 'fileDeleted' event is fired");
		});
	});

	describe("Edit - various file names", () => {
		it("should preserve dots in the file name", () => {
			const latestReportsPdf = browser.$("#latestReportsPdf");
			const editButton = latestReportsPdf.shadow$(".ui5-li-detailbtn");
	
			editButton.click();
			browser.keys("-edited");
			browser.keys("Enter");
	
			assert.strictEqual(latestReportsPdf.getProperty("fileName"), "latest.reports-edited.pdf", "dots in the file name should be preserved");
		});

		it("should be able to add extension, if there isn't such", () => {
			const noFileExtensionItem = browser.$("#noFileExtension");
			const editButton = noFileExtensionItem.shadow$(".ui5-li-detailbtn");
	
			editButton.click();
			browser.keys(".newfileextension");
			browser.keys("Enter");
	
			assert.strictEqual(noFileExtensionItem.getProperty("fileName"), "noextension.newfileextension", "the string after last dot is considered as extension");
		});
	});

	describe("Drag and Drop", () => {
		it("should NOT show drag and drop overlay when NOT dragging files", () => {
			const uploadCollection = browser.$("#uploadCollection");
			const draggableElement = browser.$("#draggableElement");
		
			draggableElement.dragAndDrop(uploadCollection);

			assert.notOk(browser.$(".uc-dnd-overlay").isDisplayed(), "the string after last dot is considered as extension");
		});
	});
});
