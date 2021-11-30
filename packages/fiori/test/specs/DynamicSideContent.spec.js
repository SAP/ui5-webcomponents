const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("'sideContentPosition' property: ", () => {
	it("set to 'End'", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-position", "End");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-main").getCSSProperty("order")).value, 1, "The main content have order 1");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-side").getCSSProperty("order")).value, 2, "The side content have order 2");
	});

	it("set to 'Start'", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-position", "Start");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-main").getCSSProperty("order")).value, 2, "The main content have order 2");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-side").getCSSProperty("order")).value, 1, "The side content have order 1");
	});
});

describe("'equalSplit' property: ", () => {
	it("set to 'true'", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		await dynamicSideContent.setAttribute("equal-split", "");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-6"), "The main content takes 50% of the width");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-6"), "The side content takes 50% of the width");
	});
});

describe("'hideMainContent' property: ", () => {
	it("set to 'true'", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);

		// hide only main content
		await dynamicSideContent.setAttribute("hide-main-content", "");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-0"), "The main content is not visible");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-main").getCSSProperty("display")).value, "none", "The main content's 'display' property is 'none'");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content takes 100% of the width");

		// hide side content too
		await dynamicSideContent.setAttribute("hide-side-content", "");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-0"), "The main content is not visible");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-main").getCSSProperty("display")).value, "none", "The main content's 'display' property is 'none'");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-side").getCSSProperty("display")).value, "none", "The side content's 'display' property is 'none'");
	});
});

describe("'hideSideContent' property: ", () => {
	it("set to 'true'", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);

		// hide side content
		await dynamicSideContent.setAttribute("hide-side-content", "");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-side").getCSSProperty("display")).value, "none", "The side content's 'display' property is 'none'");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-12"), "The main content takes 100% of the width");

		// hide main content too
		await dynamicSideContent.setAttribute("hide-main-content", "");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-side").getCSSProperty("display")).value, "none", "The side content's 'display' property is 'none'");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-0"), "The main content is not visible");
		assert.strictEqual((await dynamicSideContent.shadow$(".ui5-dsc-main").getCSSProperty("display")).value, "none", "The main content's 'display' property is 'none'");
	});
});

describe("containers widths on XL size: ", () => {
	it("check for proper width", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-9"), "The main content takes 75% of the width");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content takes 25% of the width");
	});
});

describe("containers widths on L size: ", () => {
	it("check for proper width", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-8"), "The main content takes 66.66% of the width");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content takes 33.33% of the width");
	});
});

describe("containers widths on M size: ", () => {
	it("check for proper width", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-fixed"), "The main content takes the width-340px");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-fixed"), "The side content takes fixed size of 340px");

		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-12"), "The main content takes 100% of the width");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content takes 100% of the width");
	});
});

describe("containers widths on S size: ", () => {
	it("check for proper width", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-12"), "The main content takes 100% of the width");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is invisible");
	});
});

describe("'sideContentVisibility' property: ", () => {
	it("'AlwaysShow' - side content is always visible", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-visibility", "AlwaysShow");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content is visible");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content is visible");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-fixed"), "The side content is visible");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content is visible");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content is visible");
	});

	it("'ShowAboveL' - side content is visible only on XL size", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-visibility", "ShowAboveL");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content is visible");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
	});

	it("'ShowAboveM' - side content is visible on L and XL sizes", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-visibility", "ShowAboveM");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content is visible");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content not visible");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
	});

	it("'ShowAboveS' - side content is visible on M, L and XL sizes", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-visibility", "ShowAboveS");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content is visible");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content not visible");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-fixed"), "The side content is visible");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content is visible");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
	});

	it("'NeverShow' - side content is not visible on any size", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-visibility", "NeverShow");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
	});
});

describe("'sideContentFallDown' property: ", () => {
	it("'BelowXL' - side content falls down on sizes below XL", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-fall-down", "BelowXL");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content does not fall down");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content falls down");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content falls down");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content falls down");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
	});

	it("'BelowL' - side content falls down on sizes below L", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-fall-down", "BelowL");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content does not fall down");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content does not fall down");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content falls down");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content falls down");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
	});

	it("'BelowM' - side content falls down on sizes below M", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-fall-down", "BelowM");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content does not fall down");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content does not fall down");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-fixed"), "The side content does not fall down");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-fixed"), "The side content does not fall down");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
	});

	it("'onMinimumWidth' - side content falls down on sizes below M1 (960px)", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		await dynamicSideContent.setAttribute("side-content-fall-down", "OnMinimumWidth");
		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content does not fall down");
		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1400, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content does not fall down");
		// set outer container width to > 960 and < 1024 (M1)
		await browser.setWindowSize(1020, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-fixed"), "The side content does not fall down");
		// set outer container width to > 720 and < 960 (M2)
		await browser.setWindowSize(950, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content falls down");
		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is not visible");
	});
});

describe("'toggleContents' method: ", () => {
	it("toggles contents on S size", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to < 720 (S)
		await browser.setWindowSize(700, 500);

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-12"), "The main content takes 100% of the width");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is invisible");

		await browser.executeAsync(function(done) {
			document.getElementById("dynamicSideContent").toggleContents();
			done();
		});

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-0"), "The main content is invisible");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content takes 100% of the width");

		await browser.executeAsync(function(done) {
			document.getElementById("dynamicSideContent").toggleContents();
			done();
		});

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-12"), "The main content takes 100% of the width");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-0"), "The side content is invisible");
	});

	it("does nothing on M size", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 720 (M)
		await browser.setWindowSize(900, 500);

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-12"), "The main content is visible");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content is visible");

		await browser.executeAsync(function(done) {
			document.getElementById("dynamicSideContent").toggleContents();
			done();
		});

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-12"), "The main content is visible");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-12"), "The side content is visible");
	});

	it("does nothing on L size", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 1024 (L)
		await browser.setWindowSize(1300, 500);

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-8"), "The main content is visible");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content is visible");

		await browser.executeAsync(function(done) {
			document.getElementById("dynamicSideContent").toggleContents();
			done();
		});

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-8"), "The main content is visible");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-4"), "The side content is visible");
	});

	it("does nothing on XL size", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-9"), "The main content is visible");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content is visible");

		await browser.executeAsync(function(done) {
			document.getElementById("dynamicSideContent").toggleContents();
			done();
		});

		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-main").getAttribute("class")).includes("ui5-dsc-span-9"), "The main content is visible");
		assert.ok((await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("class")).includes("ui5-dsc-span-3"), "The side content is visible");
	});
});

describe("'layout-change' event: ", () => {
	it("fired when change the breakpoint", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");
		const currentBreakpoint = await browser.$("#currentBreakpoint");
		const previousBreakpoint = await browser.$("#previousBreakpoint");
		const mainVisible = await browser.$("#mainVisible");
		const sideVisible = await browser.$("#sideVisible");

		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);

		// set outer container width to > 1024 and < 1440 (L)
		await browser.setWindowSize(1200, 500);
		assert.strictEqual(await currentBreakpoint.getValue(), "L", "The event returns correct breakpoint");
		assert.strictEqual(await previousBreakpoint.getValue(), "XL", "The event returns correct previous breakpoint");
		assert.strictEqual(await mainVisible.getValue(), "1", "The event returns correct main content visibility");
		assert.strictEqual(await sideVisible.getValue(), "1", "The event returns correct side content visibility");

		// set outer container width to > 720 and < 1024 (M)
		await browser.setWindowSize(800, 500);
		assert.strictEqual(await currentBreakpoint.getValue(), "M", "The event returns correct breakpoint");
		assert.strictEqual(await previousBreakpoint.getValue(), "L", "The event returns correct previous breakpoint");
		assert.strictEqual(await mainVisible.getValue(), "1", "The event returns correct main content visibility");
		assert.strictEqual(await sideVisible.getValue(), "1", "The event returns correct side content visibility");

		// set outer container width to < 720 (S)
		await browser.setWindowSize(600, 500);
		assert.strictEqual(await currentBreakpoint.getValue(), "S", "The event returns correct breakpoint");
		assert.strictEqual(await previousBreakpoint.getValue(), "M", "The event returns correct previous breakpoint");
		assert.strictEqual(await mainVisible.getValue(), "1", "The event returns correct main content visibility");
		assert.strictEqual(await sideVisible.getValue(), "0", "The event returns correct side content visibility");

		// set outer container width to > 1440 (XL)
		await browser.setWindowSize(1600, 500);
		assert.strictEqual(await currentBreakpoint.getValue(), "XL", "The event returns correct breakpoint");
		assert.strictEqual(await previousBreakpoint.getValue(), "S", "The event returns correct previous breakpoint");
		assert.strictEqual(await mainVisible.getValue(), "1", "The event returns correct main content visibility");
		assert.strictEqual(await sideVisible.getValue(), "1", "The event returns correct side content visibility");
	});
});

describe("ARIA attributes: ", () => {
	it("exist", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DynamicSideContent.html`);
		const dynamicSideContent = await browser.$("ui5-dynamic-side-content");

		assert.strictEqual(await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("aria-label"), "Side Content", "'aria-label' attribute is set correctly");
		assert.strictEqual(await dynamicSideContent.shadow$(".ui5-dsc-side").getAttribute("role"), "complementary", "'role' attribute is set correctly");
	});
});
