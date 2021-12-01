const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("MediaGallery Behavior", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/MediaGallery.html`);
	});

	it("fires selection-change on thumbnail click", async () => {
		const item = await browser.$$("#mGallery2 ui5-media-gallery-item")[1];

		// Act
		await item.click();
		//await browser.debug();

		// Check
		const result = await browser.$("#selectedIndexLabel");
		assert.strictEqual(await result.getHTML(false), "1", "event for selected item is thrown");
	});

	it("changes selection-flag on selection-change", async () => {
		const oldSelectedItem = await browser.$("#mGallery2 ui5-media-gallery-item[selected]");
		const newSelectedItem = await browser.$$("#mGallery2 ui5-media-gallery-item")[2];

		// Act
		await newSelectedItem.click();

		// Check
		assert.strictEqual(await newSelectedItem.getProperty("selected"), true, "flag of pevious is updated");
		assert.strictEqual(await oldSelectedItem.getProperty("selected"), false, "flag of newly selected is updated");
	});

	it("does not fire selection-change on selected item click", async () => {
		// Setup
		const clearOldResults = await browser.$("#clearBtn");
		await clearOldResults.click();

		const oldSelectedItem = await browser.$("#mGallery2 ui5-media-gallery-item[selected]");

		// Act: click on the already selected item
		await oldSelectedItem.click();

		// Check
		const result = await browser.$("#selectedIndexLabel");
		assert.strictEqual(await result.getHTML(false), "", "event is not fired");
	});

	it("fires overflow-click on overflow button click", async () => {
		// Setup
		const clearOldResults = await browser.$("#clearBtn");
		await clearOldResults.click();

		const overflowBtn = await browser.$("#mGallery2").shadow$(".ui5-media-gallery-overflow ui5-button");

		// Act
		await overflowBtn.click();

		// Check
		const result = await browser.$("#overflowClickCallCountLabel");
		assert.strictEqual(await result.getHTML(false), "1", "event is fired");
	});

	it("fires display-area-click", async () => {
		// Setup
		const clearOldResults = await browser.$("#clearBtn");
		await clearOldResults.click();

		const gallery = await browser.$("#mGallery2");
		await gallery.setProperty("interactiveDisplayArea", true);
		const displayArea = gallery.shadow$(".ui5-media-gallery-display");

		// Act
		await displayArea.click();

		// Check
		const result = await browser.$("#displayAreaClickCallCountLabel");
		assert.strictEqual(await result.getHTML(false), "1", "event is fired");
	});

	it("does not fire display-area-click when interactiveDisplayArea==false", async () => {
		// Setup
		const clearOldResults = await browser.$("#clearBtn");
		await clearOldResults.click();

		const gallery = await browser.$("#mGallery2");
		await gallery.setProperty("interactiveDisplayArea", false);
		const displayArea = gallery.shadow$(".ui5-media-gallery-display");

		// Act
		await displayArea.click();

		// Check
		const result = await browser.$("#displayAreaClickCallCountLabel");
		assert.strictEqual(await result.getHTML(false), "", "no event is fired");
	});

});
