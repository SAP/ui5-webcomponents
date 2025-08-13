import { assert } from "chai";

describe("Toolbar general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/ToolbarButton.html`);
	});

	it("Should render the button with the correct text", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const button = await toolbar.$("ui5-toolbar-button").shadow$("ui5-button");
		const buttonText = await button.getText();
		const buttonDesign = await button.getAttribute("design");
		const buttonDisabled = await button.getAttribute("disabled");
		const buttonIcon = await button.getAttribute("icon");
		const buttonEndIcon = await button.getAttribute("end-icon");
		const buttonTooltip = await button.getAttribute("tooltip");

		assert.strictEqual(buttonText, "Back", "Button text is correct");
		assert.strictEqual(buttonDesign, "Emphasized", "Button design is correct");
		assert.strictEqual(buttonDisabled, "true", "Button is disabled");
		assert.strictEqual(buttonIcon, "sap-icon://add", "Button icon is correct");
		assert.strictEqual(buttonEndIcon, "sap-icon://employee", "Button end-icon is correct");
		assert.strictEqual(buttonTooltip, "Add", "Button tooltip is correct");
	});

	it ("Should render the button with the correct accessible name", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const buttonAccName = await toolbar.$("ui5-toolbar-button[accessible-name]").shadow$("ui5-button");
		const buttonAccessibleName = await buttonAccName.getProperty("accessibleName");
		const buttonAccessibleNameRef = await buttonAccName.getAttribute("accessible-name-ref");

		assert.strictEqual(buttonAccessibleName, "Add", "Button accessible name is correct");
		assert.strictEqual(buttonAccessibleNameRef, "btn", "Button accessible name ref is correct");
	});

	it("Should render the button with the correct accessibilityAttributes", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const buttonAccAttributes = await toolbar.$("ui5-toolbar-button[accessible-name]").shadow$("ui5-button").getProperty("accessibilityAttributes");

		assert.strictEqual(buttonAccAttributes.expanded, "true", "Button accessibilityAttributes is correct");
	});

	
});
