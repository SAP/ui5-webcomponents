const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("MediaGallery general interaction", () => {
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

	it("does not fire selection-change on click on already selected item", async () => {
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

	it("fires selection-change after keyboard handling", async () => {
		const gallery = await browser.$("#mGallery2").shadow$(".ui5-media-gallery-root"),
			item0 = await browser.$$("#mGallery2 ui5-media-gallery-item")[0];

		// Act: move the selection to the second item using KBH
		await item0.click();
		await gallery.keys("ArrowDown");
		await gallery.keys("Enter");

		// Check
		const result = await browser.$("#selectedIndexLabel");
		assert.strictEqual(await result.getHTML(false), "1", "event for selected item is thrown");

		// Act: move the selection back to the first item using KBH
		await gallery.keys("ArrowUp");
		await gallery.keys("Space");

		// Check
		const result1 = await browser.$("#selectedIndexLabel");
		assert.strictEqual(await result1.getHTML(false), "0", "event for selected item is thrown");
	});

	it("changes selection when selected item is disabled", async () => {
		const gallery = await browser.$("#mGallery2").shadow$(".ui5-media-gallery-root"),
			item0 = await browser.$$("#mGallery2 ui5-media-gallery-item")[0],
			item1 = await browser.$$("#mGallery2 ui5-media-gallery-item")[1];

		// Act: move the selection to the second item using KBH
		await item0.click();
		await item0.setProperty("disabled", true);

		// Check
		assert.strictEqual(await item0.getProperty("selected"), false, "disabled item is no longer seleted");
		assert.strictEqual(await item1.getProperty("selected"), true, "selection changed to the second item");
	});

});

describe("MediaGallery layout", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/MediaGallery.html`);
	});

	it("auto layout S size", async () => {

		const newWidth = 599, // S size
			marginSize = 16,
			expectedEffectiveLayout = "Vertical",
			expectedDisplayWidth = newWidth - (2 * marginSize),
			expectedDisplayHeight = expectedDisplayWidth;

		// Act: apply new width
		await browser.executeAsync(async (newWidth, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			done();
		}, newWidth);

		// Check
		const gallery = await browser.$("#mGallery1");
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");

		assert.strictEqual(await gallery.getProperty("effectiveLayout"), expectedEffectiveLayout, "correct effective layout");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("auto layout M size", async () => {

		const newWidth = 600, // M size
			marginSize = 16,
			thumbnailWidth = 64,
			thumbnailsMenuWidth = thumbnailWidth + (2 * marginSize),
			expectedEffectiveLayout = "Horizontal",
			expectedDisplayWidth = newWidth - thumbnailsMenuWidth - (2 * marginSize),
			expectedDisplayHeight = expectedDisplayWidth;

		// Act: apply new width
		await browser.executeAsync(async (newWidth, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			done();
		}, newWidth);

		// Check
		const gallery = await browser.$("#mGallery1");
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");

		assert.strictEqual(await gallery.getProperty("effectiveLayout"), expectedEffectiveLayout, "correct effective layout");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("auto layout L size and restricted height", async () => {

		const newWidth = 1024, // L size
			marginSize = 16,
			parentHeight = 800,
			expectedEffectiveLayout = "Horizontal",
			expectedDisplayWidth = parentHeight - (2 * marginSize),
			expectedDisplayHeight = expectedDisplayWidth;

		// Act: apply new width
		await browser.executeAsync(async (newWidth, parentHeight, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			document.getElementById("mGallery1").parentElement.style.height = `${parentHeight}px`;
			done();
		}, newWidth, parentHeight);

		// Check
		const gallery = await browser.$("#mGallery1");
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");

		assert.strictEqual(await gallery.getProperty("effectiveLayout"), expectedEffectiveLayout, "correct effective layout");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("auto layout L size and unrestricted height", async () => {

		const newWidth = 1024, // L size
			marginSize = 16,
			parentHeight = 3000, // a big enough value
			thumbnailWidth = 64,
			thumbnailsMenuWidth = thumbnailWidth + (2 * marginSize),
			expectedEffectiveLayout = "Horizontal",
			expectedDisplayWidth = newWidth - thumbnailsMenuWidth - (2 * marginSize),
			expectedDisplayHeight = expectedDisplayWidth;

		// Act: apply new width
		await browser.executeAsync(async (newWidth, parentHeight, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			document.getElementById("mGallery1").parentElement.style.height = `${parentHeight}px`;
			document.getElementById("mGallery1")._updateLayout();
			done();
		}, newWidth, parentHeight);

		// Check
		const gallery = await browser.$("#mGallery1");
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");

		assert.strictEqual(await gallery.getProperty("effectiveLayout"), expectedEffectiveLayout, "correct effective layout");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("vertical layout L size and unrestricted height", async () => {

		const newWidth = 1024, // L size
			marginSize = 16,
			parentHeight = 3000, // a big enough value
			expectedEffectiveLayout = "Vertical",
			expectedDisplayWidth = newWidth - (2 * marginSize),
			expectedDisplayHeight = expectedDisplayWidth;

		const gallery = await browser.$("#mGallery1");

		// Setup
		await browser.executeAsync(async (newWidth, parentHeight, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			document.getElementById("mGallery1").parentElement.style.height = `${parentHeight}px`;
			done();
		}, newWidth, parentHeight);

		// Act
		await gallery.setProperty("layout", "Vertical");

		// Check
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");

		assert.strictEqual(await gallery.getProperty("effectiveLayout"), expectedEffectiveLayout, "correct effective layout");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("vertical layout L size and restricted height", async () => {

		const newWidth = 1024, // L size
			marginSize = 16,
			parentHeight = 600,
			thumbnailWidth = 64,
			thumbnailsMenuWidth = thumbnailWidth + (2 * marginSize),
			expectedEffectiveLayout = "Vertical",
			expectedDisplayWidth = parentHeight - thumbnailsMenuWidth - (2 * marginSize),
			expectedDisplayHeight = expectedDisplayWidth;

		const gallery = await browser.$("#mGallery1");

		// Setup
		await browser.executeAsync(async (newWidth, parentHeight, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			document.getElementById("mGallery1").parentElement.style.height = `${parentHeight}px`;
			done();
		}, newWidth, parentHeight);

		// Act
		await gallery.setProperty("layout", "Vertical");

		// Check
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");

		assert.strictEqual(await gallery.getProperty("effectiveLayout"), expectedEffectiveLayout, "correct effective layout");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("horizontal layout S size and restricted height", async () => {

		const newWidth = 599, // S size
			marginSize = 16,
			parentHeight = 400,
			expectedEffectiveLayout = "Horizontal",
			expectedDisplayWidth = parentHeight - (2 * marginSize),
			expectedDisplayHeight = expectedDisplayWidth;

		const gallery = await browser.$("#mGallery1");

		// Setup
		await browser.executeAsync(async (newWidth, parentHeight, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			document.getElementById("mGallery1").parentElement.style.height = `${parentHeight}px`;
			done();
		}, newWidth, parentHeight);

		// Act
		await gallery.setProperty("layout", "Horizontal");

		// Check
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");

		assert.strictEqual(await gallery.getProperty("effectiveLayout"), expectedEffectiveLayout, "correct effective layout");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("horizontal layout S size and unrestricted height", async () => {

		const newWidth = 599, // S size
			marginSize = 16,
			parentHeight = 3000, // big enough value
			thumbnailWidth = 64,
			thumbnailsMenuWidth = thumbnailWidth + (2 * marginSize),
			expectedEffectiveLayout = "Horizontal",
			expectedDisplayWidth = newWidth - thumbnailsMenuWidth - (2 * marginSize),
			expectedDisplayHeight = expectedDisplayWidth;

		const gallery = await browser.$("#mGallery1");

		// Setup
		await browser.executeAsync(async (newWidth, parentHeight, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			document.getElementById("mGallery1").parentElement.style.height = `${parentHeight}px`;
			done();
		}, newWidth, parentHeight);

		// Act
		await gallery.setProperty("layout", "Horizontal");

		// Check
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");

		assert.strictEqual(await gallery.getProperty("effectiveLayout"), expectedEffectiveLayout, "correct effective layout");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("item with 'Wide' layout and all thumbnails shown", async () => {

		const newWidth = 1400, // L size
			parentHeight = 800,
			marginSize = 16,
			expectedDisplayWidth = 1006, // 3/4 of the available width
			expectedDisplayHeight = parentHeight - (2 * marginSize);

		const gallery = await browser.$("#mGallery1"),
			item0 = await browser.$$("#mGallery1 ui5-media-gallery-item")[0];

		// Setup
		await browser.executeAsync(async (newWidth, parentHeight, done) => {
			document.getElementById("mGallery1").style.width = `${newWidth}px`;
			document.getElementById("mGallery1").parentElement.style.height = `${parentHeight}px`;
			done();
		}, newWidth, parentHeight);

		// item width 'wide' layout while all thumbnails shown
		await gallery.setProperty("showAllThumbnails", true);
		await item0.setProperty("layout", "Wide");

		// Act: select the item width 'wide' layout
		await item0.setProperty("selected", true);

		// Check
		const display = await browser.$("#mGallery1").shadow$(".ui5-media-gallery-display ui5-media-gallery-item");
		assert.strictEqual(await display.getProperty("offsetWidth"), expectedDisplayWidth, "correct display width");
		assert.strictEqual(await display.getProperty("offsetHeight"), expectedDisplayHeight, "correct display height");
	});

	it("narrow container", async () => {

		const newWidth = 80, // width allows only the overflow button to be displayed; all items will overflow
			gallery = await browser.$("#galleryInNarrowContainer"),
			itemsCount = await browser.$$("#galleryInNarrowContainer ui5-media-gallery-item").length;

		// Setup
		await browser.executeAsync(async (newWidth, done) => {
			document.getElementById("galleryInNarrowContainer").style.width = `${newWidth}px`;
			done();
		}, newWidth);

		// Check
		assert.strictEqual(await gallery.getProperty("_overflowSize"), itemsCount, "correct overflow size");
	});
});