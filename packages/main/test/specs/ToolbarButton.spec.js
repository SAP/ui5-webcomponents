import { assert } from "chai";

describe("Toolbar general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/ToolbarButton.html`);
	});

	it("Should render the button with the correct text", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const button = await toolbar.shadow$("ui5-button")
		const buttonText = await button.getText();
		const buttonDesign = await button.getAttribute("design");
		const buttonDisabled = await button.getAttribute("disabled");
		const buttonIcon = await button.getAttribute("icon");
		const buttonIconEnd = await button.getAttribute("icon-end");
		const buttonTooltip = await button.getAttribute("tooltip");

		assert.strictEqual(buttonText, "Back", "Button text is correct");
		assert.strictEqual(buttonDesign, "Emphasized", "Button design is correct");
		assert.strictEqual(buttonDisabled, "true", "Button is disabled");
		assert.strictEqual(buttonIcon, "sap-icon://add", "Button icon is correct");
		assert.strictEqual(buttonIconEnd, "", "Button icon-end is correct");
		assert.strictEqual(buttonTooltip, "Add", "Button tooltip is correct");
	});

	it ("Should render the button with the correct accessible name", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const buttonAccName = await toolbar.shadow$("ui5-button[accessible-name]");
		const buttonAccessibleName = await buttonAccName.getAttribute("accessible-name");
		const buttonAccessibleNameRef = await buttonAccName.getAttribute("accessible-name-ref");

		assert.strictEqual(buttonAccessibleName, "Add", "Button accessible name is correct");
		assert.strictEqual(buttonAccessibleNameRef, "btn", "Button accessible name ref is correct");
	});

	it("Should render the button with the correct accessibilityAttributes", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const buttonAccAttributes = await toolbar.shadow$("ui5-button[accessible-name]").getProperty("accessibilityAttributes");

		assert.strictEqual(buttonAccAttributes.expanded, "true", "Button accessibilityAttributes is correct");
	});

	it("Should render the button with the correct text inside the popover", async () => {
		await browser.setWindowSize(100, 1080);

		const toolbar = await browser.$("#otb_d");
		const overflowButton = await toolbar.shadow$(".ui5-tb-overflow-btn");
		await overflowButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#otb_d");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const buttonText = await popover.$("ui5-button").getText();
		const buttonDesign = await popover.$("ui5-button").getAttribute("design");
		const buttonDisabled = await popover.$("ui5-button").getAttribute("disabled");
		const buttonIcon = await popover.$("ui5-button").getAttribute("icon");
		const buttonIconEnd = await popover.$("ui5-button").getAttribute("icon-end");
		const buttonTooltip = await popover.$("ui5-button").getAttribute("tooltip");

		assert.strictEqual(buttonText, "Back", "Button's text is correct inside popover");
		assert.strictEqual(buttonDesign, "Emphasized", "Button's design is correct inside popover");
		assert.strictEqual(buttonDisabled, "true", "Button is disabled inside popover");
		assert.strictEqual(buttonIcon, "sap-icon://add", "Button's icon is correct inside popover");
		assert.strictEqual(buttonIconEnd, "", "Button's icon-end is correct inside popover");
		assert.strictEqual(buttonTooltip, "Add", "Button's tooltip is correct inside popover");
	});

	it ("Should render the button with the correct accessible name inside the popover", async () => {
		await browser.setWindowSize(100, 1080);

		const toolbar = await browser.$("#otb_d");
		const overflowButton = await toolbar.shadow$(".ui5-tb-overflow-btn");
		await overflowButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#otb_d");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const buttonAccName = await popover.$("ui5-button[accessible-name]");
		const buttonAccessibleName = await buttonAccName.getAttribute("accessible-name");
		const buttonAccessibleNameRef = await buttonAccName.getAttribute("accessible-name-ref");

		assert.strictEqual(buttonAccessibleName, "Add", "Button accessible name is correct inside popover");
		assert.strictEqual(buttonAccessibleNameRef, "btn", "Button accessible name ref is correct inside popover");
	});

	it("Should render the button with the correct accessibilityAttributes inside the popover", async () => {
		await browser.setWindowSize(100, 1080);

		const toolbar = await browser.$("#otb_d");
		const overflowButton = await toolbar.shadow$(".ui5-tb-overflow-btn");
		await overflowButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#otb_d");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const buttonAccAttributes = await popover.$("ui5-button[accessible-name]").getProperty("accessibilityAttributes");

		assert.strictEqual(buttonAccAttributes.expanded, "true", "Button accessibilityAttributes is correct inside popover");
	});
});
