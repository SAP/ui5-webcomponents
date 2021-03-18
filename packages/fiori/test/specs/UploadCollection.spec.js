const assert = require("chai").assert;

describe("UploadCollection", () => {
	describe("Rendering", () => {
		before(() => {
			browser.url("http://localhost:8081/test-resources/pages/UploadCollection.html");
		});

		it("should show Link when 'fileNameClickable'", () => {
			const firstItem = browser.$("#firstItem");
			assert.ok(firstItem.shadow$("ui5-link").isDisplayed(), "Link should be rendered");
		});

		it("should show span when file name is NOT clickable", () => {
			const secondItem = browser.$("#secondItem");
			assert.ok(secondItem.shadow$("span.ui5-uci-file-name").isDisplayed(), "span should be rendered");
		});

		it("should show input and buttons when editing", () => {
			const secondItem = browser.$("#secondItem");
			const editButton = secondItem.shadow$(".ui5-li-detailbtn");
			editButton.click();

			assert.ok(secondItem.shadow$(".ui5-uci-edit-container").isDisplayed(), "edit container should be rendered");
			assert.ok(secondItem.shadow$(".ui5-uci-edit-buttons").isDisplayed(), "edit buttons should be rendered");
			assert.notOk(secondItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button should be hidden");

			// focus out the second item, to hide edit buttons (reset state for the following tests)
			browser.$("#firstItem").click();
		});

		it("should show NOT show any buttons besides 'Terminate', when uploadState is 'Uploading'", () => {
			const uploadingStateItem = browser.$("#uploadingState");

			assert.ok(uploadingStateItem.shadow$("ui5-button[icon=stop]").isDisplayed(), "'Terminate' button is displayed'");
			assert.notOk(uploadingStateItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button should be hidden");
			assert.notOk(uploadingStateItem.shadow$(".ui5-li-deletebtn").isDisplayed(), "detail button should be hidden");
		});

		it("should show 'Retry' button when uploadState is 'Error'", () => {
			const errorStateItem = browser.$("#errorState");

			assert.ok(errorStateItem.shadow$("ui5-button[icon=refresh]").isDisplayed(), "'Retry' button is displayed");
			assert.ok(errorStateItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button is also displayed");

			errorStateItem.shadow$(".ui5-li-detailbtn").click();

			assert.notOk(errorStateItem.shadow$("ui5-button[icon=refresh]").isDisplayed(), "'Retry' button is NOT displayed when editing");
			assert.notOk(errorStateItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button is NOT displayed when editing");
		});
	});

	describe("Events", () => {
		it("item should fire 'rename'", () => {
			const secondItem = browser.$("#secondItem");
			const secondItemIndex = 1;
			const editButton = secondItem.shadow$(".ui5-li-detailbtn");

			editButton.click();
			browser.keys("fileNameSuffix");
			browser.keys("Enter");

			assert.strictEqual(parseInt(browser.$("#renamedFileIndex").getText()), secondItemIndex, "renamed file index should be updated after rename")
		});

		it("upload collection should fire 'fileDeleted'", () => {
			const uploadCollection = browser.$("#uploadCollection");
			const firstItem = browser.$("#firstItem");

			browser.execute(() => {
				uploadCollection.setAttribute("mode", "Delete");
			});

			const deleteBtn = firstItem.shadow$(".ui5-li-deletebtn");
			deleteBtn.click();

			assert.strictEqual(uploadCollection.getProperty("items").length, 4, "item should be deleted when 'fileDeleted' event is fired");
		});

		it("item should fire 'retry'", () => {
			const errorStateItem = browser.$("#errorState");

			errorStateItem.shadow$("ui5-button[icon=refresh]").click();

			assert.ok(browser.$("#uploadStateEvent").getText().includes("Retry"), "Retry event is fired");
		});

		it("item should fire 'terminate'", () => {
			const uploadingStateItem = browser.$("#uploadingState");

			uploadingStateItem.shadow$("ui5-button[icon=stop]").click();

			assert.ok(browser.$("#uploadStateEvent").getText().includes("Terminate"), "Terminate event is fired");
		});
	});

	describe("Edit - various file names", () => {
		it("should preserve dots in the file name", () => {
			const latestReportsPdf = browser.$("#latestReportsPdf");
			const editButton = latestReportsPdf.shadow$(".ui5-li-detailbtn");

			editButton.click();
			browser.keys("last.reports-edited");
			browser.keys("Enter");

			assert.strictEqual(latestReportsPdf.getProperty("fileName"), "last.reports-edited.pdf", "file extension '.pdf' should be preserved");
		});

		it("should be able to add extension, if there isn't such", () => {
			const noFileExtensionItem = browser.$("#noFileExtension");
			const editButton = noFileExtensionItem.shadow$(".ui5-li-detailbtn");
			const newFileName = "newFileName.newExtension";

			editButton.click();
			browser.keys(newFileName);
			browser.keys("Enter");

			assert.strictEqual(noFileExtensionItem.getProperty("fileName"), newFileName, "file name should be changed");

			const newFileName2 = "newFileName2";

			editButton.click();
			browser.keys(newFileName2);
			browser.keys("Enter");

			assert.strictEqual(noFileExtensionItem.getProperty("fileName"), newFileName2 + ".newExtension", "the string after the last dot is considered as extension");
		});

		it("should NOT consider hidden file name as extension", () => {
			const secondItem = browser.$("#secondItem");
			const editButton = secondItem.shadow$(".ui5-li-detailbtn");

			editButton.click();

			assert.notOk(secondItem.shadow$(".ui5-uci-file-extension").getText(), "no extension is calculated for .gitignore.");

		});

		it("tests cancelling of name change via keyboard", () => {
			const secondItem = browser.$("#keyboardNavigation");
			const editButton = secondItem.shadow$(".ui5-li-detailbtn");

			editButton.click();

			browser.keys("new name");

			browser.keys("Tab");
			browser.keys("Tab");

			browser.keys("Enter"); // Press cancel button

			assert.strictEqual(secondItem.shadow$(".ui5-uci-file-name").getText(), "Graph.docx", "The name of the file is not changed");
		});
	});

	describe("Drag and Drop", () => {
		it("should NOT show drag and drop overlay when NOT dragging files", () => {
			const uploadCollection = browser.$("#uploadCollection");
			const draggableElement = browser.$("#draggableElement");

			draggableElement.scrollIntoView();
			draggableElement.dragAndDrop(uploadCollection);

			assert.notOk(browser.$(".uc-dnd-overlay").isDisplayed(), "drag and drop overlay is not displayed");
		});
	});
});
