const assert = require("chai").assert;

describe("Icon general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Icon.html");

	it("Tests icon rendering", () => {
		const iconRoot = browser.$("#interactive-icon").shadow$("ui5-icon-root");

		assert.ok(iconRoot, "Icon is rendered");
    });

  it("Tests if clicked event is thrown for interactive icons", () => {
    const iconRoot = browser.$("#interactive-icon").shadow$(".ui5-icon-root");
    const input = browser.$("#click-event");

    iconRoot.click();
    assert.strictEqual(input.getAttribute("value"), "1", "Mouse click throws event");

    iconRoot.keys("Enter");
    assert.strictEqual(input.getAttribute("value"), "2", "Enter throws event");

    iconRoot.keys("Space");
    assert.strictEqual(input.getAttribute("value"), "3", "Space throws event");
  });
  
  it("Tests if clicked event is not thrown for non interactive icons", () => {
    const iconRoot = browser.$("#non-interactive-icon");
    const input = browser.$("#click-event");

    iconRoot.click();
    assert.strictEqual(input.getAttribute("value"), "3", "Mouse click throws event");

    iconRoot.keys("Enter");
    assert.strictEqual(input.getAttribute("value"), "3", "Enter throws event");

    iconRoot.keys("Space");
    assert.strictEqual(input.getAttribute("value"), "3", "Space throws event");
	});
});
