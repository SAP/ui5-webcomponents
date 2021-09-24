const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("UploadCollection", () => {
	describe("Rendering", () => {
		before(async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/UploadCollection.html`);
		});

		it("should show Link when 'fileNameClickable'", async () => {
			const firstItem = await browser.$("#firstItem");
			assert.ok(await firstItem.shadow$("ui5-link").isDisplayed(), "Link should be rendered");
		});

		it("should show span when file name is NOT clickable", async () => {
			const secondItem = await browser.$("#secondItem");
			assert.ok(await secondItem.shadow$("span.ui5-uci-file-name").isDisplayed(), "span should be rendered");
		});

		it("should show input and buttons when editing", async () => {
			const secondItem = await browser.$("#secondItem");
			const editButton = await secondItem.shadow$(".ui5-li-detailbtn");
			await editButton.click();

			assert.ok(await secondItem.shadow$(".ui5-uci-edit-container").isDisplayed(), "edit container should be rendered");
			assert.ok(await secondItem.shadow$(".ui5-uci-edit-buttons").isDisplayed(), "edit buttons should be rendered");
			assert.notOk(await secondItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button should be hidden");

			// reset the item
			await browser.$("#secondItem").removeAttribute("_editing");
		});

		it("should show NOT show any buttons besides 'Terminate', when uploadState is 'Uploading'", async () => {
			const uploadingStateItem = await browser.$("#uploadingState");

			assert.ok(await uploadingStateItem.shadow$("ui5-button[icon=stop]").isDisplayed(), "'Terminate' button is displayed'");
			assert.notOk(await uploadingStateItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button should be hidden");
			assert.notOk(await uploadingStateItem.shadow$(".ui5-li-deletebtn").isDisplayed(), "delete button should be hidden");
		});

		it("should show 'Retry' button when uploadState is 'Error'", async () => {
			const errorStateItem = await browser.$("#errorState");

			assert.ok(await errorStateItem.shadow$("ui5-button[icon=refresh]").isDisplayed(), "'Retry' button is displayed");
			assert.ok(await errorStateItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button is also displayed");

			await errorStateItem.shadow$(".ui5-li-detailbtn").click();

			assert.notOk(await errorStateItem.shadow$("ui5-button[icon=refresh]").isDisplayed(), "'Retry' button is NOT displayed when editing");
			assert.notOk(await errorStateItem.shadow$(".ui5-li-detailbtn").isDisplayed(), "detail button is NOT displayed when editing");

			// reset the item
			await browser.$("#errorState").removeAttribute("_editing");
		});

		it("visibility of buttons", async () => {
			const defaultItem = await browser.$("#uc3-default");
			assert.ok(await defaultItem.shadow$(".ui5-li-deletebtn").isDisplayed(), "delete button is visible");

			const defaultItemHiddenDelete = await browser.$("#uc3-default-hidden-delete");
			assert.notOk(await defaultItemHiddenDelete.shadow$(".ui5-li-deletebtn").isDisplayed(), "delete button is not visible");

			const errorItem = await browser.$("#uc3-error");
			assert.ok(await errorItem.shadow$(".ui5-li-deletebtn").isDisplayed(), "delete button is visible");
			assert.ok(await errorItem.shadow$("ui5-button[icon=refresh]").isDisplayed(), "retry button is visible");

			const errorItemHiddenRetry = await browser.$("#uc3-error-hidden-retry");
			assert.ok(await errorItemHiddenRetry.shadow$(".ui5-li-deletebtn").isDisplayed(), "delete button is visible");
			assert.notOk(await errorItemHiddenRetry.shadow$("ui5-button[icon=refresh]").isDisplayed(), "retry button is not visible");

			const uploadingItem = await browser.$("#uc3-uploading");
			assert.notOk(await uploadingItem.shadow$(".ui5-li-deletebtn").isDisplayed(), "delete button is not visible");
			assert.ok(await uploadingItem.shadow$("ui5-button[icon=stop]").isDisplayed(), "terminate button is visible");

			const uploadingItemHiddenTerminate = await browser.$("#uc3-uploading-hidden-terminate");
			assert.notOk(await uploadingItemHiddenTerminate.shadow$(".ui5-li-deletebtn").isDisplayed(), "delete button is not visible");
			assert.notOk(await uploadingItemHiddenTerminate.shadow$("ui5-button[icon=stop]").isDisplayed(), "terminate button is visible");
		});

		it("should forward 'header' and 'accessible-name' to the inner list", async () => {
			const uploadCollection = await browser.$("#uploadCollection");
			const innerList = await uploadCollection.shadow$("ui5-list");

			const headerInnerListSlotContent = browser.executeAsync(done => {
				done(document.getElementById("uploadCollection").shadowRoot.querySelector("ui5-list").shadowRoot.querySelector("slot[name='header']").assignedNodes()[0].assignedNodes()[0].querySelector("#uploadCollectionTitle"));
			});

			assert.strictEqual(await uploadCollection.getAttribute("accessible-name"), await innerList.getAttribute("accessible-name"), "accessible-name is forwarded");
			assert.ok(headerInnerListSlotContent, "header is forwarded");
		});
	});

	describe("Events", () => {
		it("item should fire 'rename'", async () => {
			const secondItem = await browser.$("#secondItem");
			const secondItemIndex = 1;
			const editButton = await secondItem.shadow$(".ui5-li-detailbtn");

			await editButton.click();
			await browser.keys("fileNameSuffix");
			await browser.keys("Enter");

			assert.strictEqual(parseInt(await browser.$("#renamedFileIndex").getText()), secondItemIndex, "renamed file index should be updated after rename");

			// reset the item
			await browser.$("#secondItem").removeAttribute("_editing");
		});

		it("upload collection should fire 'item-delete'", async () => {
			const uploadCollection = await browser.$("#uploadCollection");
			const firstItem = await browser.$("#firstItem");

			await uploadCollection.setAttribute("mode", "Delete");

			const deleteBtn = await firstItem.shadow$(".ui5-li-deletebtn");
			await deleteBtn.click();

			assert.strictEqual((await uploadCollection.getProperty("items")).length, 4, "item should be deleted when 'item-delete' event is fired");
		});

		it("item should fire 'retry'", async () => {
			const errorStateItem = await browser.$("#errorState");

			await errorStateItem.shadow$("ui5-button[icon=refresh]").click();

			const eventText = await browser.$("#uploadStateEvent").getText();
			assert.include(eventText, "Retry", "Retry event is fired");
		});

		it("item should fire 'terminate'", async () => {
			const uploadingStateItem = await browser.$("#uploadingState");

			await uploadingStateItem.shadow$("ui5-button[icon=stop]").click();

			const eventText = await browser.$("#uploadStateEvent").getText();
			assert.include(eventText, "Terminate", "Terminate event is fired");
		});
	});

	describe("Edit - various file names", async () => {
		it("should preserve dots in the file name", async () => {
			const latestReportsPdf = await browser.$("#latestReportsPdf");
			const editButton = await latestReportsPdf.shadow$(".ui5-li-detailbtn");

			await editButton.click();
			await browser.keys("last.reports-edited");
			await browser.keys("Enter");

			// assert.strictEqual(await latestReportsPdf.getProperty("fileName"), "last.reports-edited.pdf", "file extension '.pdf' should be preserved");

			// reset the item
			await browser.$("#latestReportsPdf").removeAttribute("_editing");
		});

		it("should be able to add extension, if there isn't such", async () => {
			const noFileExtensionItem = await browser.$("#noFileExtension");
			const editButton = await noFileExtensionItem.shadow$(".ui5-li-detailbtn");
			const newFileName = "newFileName.newExtension";

			await editButton.click();
			await browser.keys(newFileName);
			await browser.keys("Enter");

			assert.strictEqual(await noFileExtensionItem.getProperty("fileName"), newFileName, "file name should be changed");

			const newFileName2 = "newFileName2";

			await editButton.click();
			await browser.keys(newFileName2);
			await browser.keys("Enter");

			assert.strictEqual(await noFileExtensionItem.getProperty("fileName"), newFileName2 + ".newExtension", "the string after the last dot is considered as extension");

			// reset the item
			await browser.$("#noFileExtension").removeAttribute("_editing");
		});

		it("should NOT consider hidden file name as extension", async () => {
			const secondItem = await browser.$("#secondItem");
			const editButton = await secondItem.shadow$(".ui5-li-detailbtn");

			await editButton.click();

			assert.notOk(await secondItem.shadow$(".ui5-uci-file-extension").getText(), "no extension is calculated for .gitignore.");

			// reset the item
			await browser.$("#secondItem").removeAttribute("_editing");
		});

		it("tests cancelling of name change via keyboard", async () => {
			const secondItem = await browser.$("#keyboardNavigation");
			const editButton = await secondItem.shadow$(".ui5-li-detailbtn");

			await editButton.click();

			await browser.keys("new name");

			await browser.keys("Tab");
			await browser.keys("Tab");

			await browser.keys("Enter"); // Press cancel button

			assert.strictEqual(await secondItem.shadow$(".ui5-uci-file-name").getText(), "Graph.docx", "The name of the file is not changed");

			// reset the item
			await browser.$("#keyboardNavigation").removeAttribute("_editing");
		});
	});

	describe("Drag and Drop", () => {
		it("should NOT show drag and drop overlay when NOT dragging files", async () => {
			const uploadCollection = await browser.$("#uploadCollection");
			const draggableElement = await browser.$("#draggableElement");

			await draggableElement.scrollIntoView();
			await draggableElement.dragAndDrop(uploadCollection);

			assert.notOk(await browser.$(".uc-dnd-overlay").isDisplayed(), "drag and drop overlay is not displayed");
		});
	});
});
