const assert = require("chai").assert;

describe("Split Button general interaction", () => {
	it("tests inner buttons design", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const design = await sbDefault.getAttribute("design");
		const textButton = await sbDefault.shadow$(".ui5-split-text-button");
		const arrowButton = await sbDefault.shadow$(".ui5-split-arrow-button");

		assert.strictEqual(await textButton.getAttribute("design"), design, "Text button have proper design");
		assert.strictEqual(await arrowButton.getAttribute("design"), design, "Arrow button have proper design");
	});

	it("tests textContent on 'click'", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbEmpty = await browser.$("#emptySpBtn");
		const textButton1 = await sbEmpty.shadow$(".ui5-split-text-button");
		const sbDefault = await browser.$("#defaultSpBtn");
		const textButton2 = await sbDefault.shadow$(".ui5-split-text-button");
		const field = await browser.$("#displayElement");

		await textButton1.click({x: 1, y: 1});
		assert.strictEqual(await field.getValue(), "", "Button text is empty string");

		await textButton2.click({x: 1, y: 1});
		assert.strictEqual(await field.getValue(), "Default", "Button text is 'Default'");
	});

	it("tests text button 'click' event (mouse)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const textButton = await sbDefault.shadow$(".ui5-split-text-button");
		const field = await browser.$("#displayEvent");

		await textButton.click({x: 1, y: 1});

		assert.strictEqual(await field.getValue(), "ui5-click", "'click' is fired");
	});

	it("tests text button 'click' event (Space)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const textButton = await sbDefault.shadow$(".ui5-split-text-button");
		const field = await browser.$("#displayEvent");

		// tab to focus on first button
		await browser.keys("Tab");

		await textButton.keys("Space");

		assert.strictEqual(await field.getValue(), "ui5-click", "'click' is fired");
	});

	it("tests text button 'click' event (Enter)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const textButton = await sbDefault.shadow$(".ui5-split-text-button");
		const field = await browser.$("#displayEvent");

		// tab to focus on first button
		await browser.keys("Tab");

		await textButton.keys("Enter");

		assert.strictEqual(await field.getValue(), "ui5-click", "'click' is fired");
	});

	it("tests arrow button 'arrow-click' event (mouse)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const arrowButton = await sbDefault.shadow$(".ui5-split-arrow-button");
		const field = await browser.$("#displayEvent");

		await arrowButton.click();

		assert.strictEqual(await field.getValue(), "ui5-arrow-click", "'arrow-click' is fired");
	});

	it("tests arrow button 'arrow-click' event (arrow down)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const arrowButton = await sbDefault.shadow$(".ui5-split-arrow-button");
		const field = await browser.$("#displayEvent");

		// tab to focus on first button
		await browser.keys("Tab");

		await arrowButton.keys("ArrowDown");

		assert.strictEqual(await field.getValue(), "ui5-arrow-click", "'arrow-click' is fired");
	});

	it("tests arrow button 'arrow-click' event (arrow up)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const arrowButton = await sbDefault.shadow$(".ui5-split-arrow-button");
		const field = await browser.$("#displayEvent");

		// tab to focus on first button
		await browser.keys("Tab");

		await arrowButton.keys("ArrowUp");

		assert.strictEqual(await field.getValue(), "ui5-arrow-click", "'arrow-click' is fired");
	});

	it("tests arrow button 'arrow-click' event (alt + arrow down)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const arrowButton = await sbDefault.shadow$(".ui5-split-arrow-button");
		const field = await browser.$("#displayEvent");

		// tab to focus on first button
		await browser.keys("Tab");

		await arrowButton.keys(["Alt", "ArrowDown"]);

		assert.strictEqual(await field.getValue(), "ui5-arrow-click", "'arrow-click' is fired");
	});

	it("tests arrow button 'arrow-click' event (alt + arrow up)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const arrowButton = await sbDefault.shadow$(".ui5-split-arrow-button");
		const field = await browser.$("#displayEvent");

		// tab to focus on first button
		await browser.keys("Tab");

		await arrowButton.keys(["Alt", "ArrowUp"]);

		assert.strictEqual(await field.getValue(), "ui5-arrow-click", "'arrow-click' is fired");
	});

	it("tests arrow button 'arrow-click' event (F4)", async () => {
		await browser.url(`test/pages/SplitButton.html`);
		const sbDefault = await browser.$("#sbDefault");
		const arrowButton = await sbDefault.shadow$(".ui5-split-arrow-button");
		const field = await browser.$("#displayEvent");

		// tab to focus on first button
		await browser.keys("Tab");

		await arrowButton.keys("F4");

		assert.strictEqual(await field.getValue(), "ui5-arrow-click", "'arrow-click' is fired");
	});
});
