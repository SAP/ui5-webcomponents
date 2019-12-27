const assert = require("chai").assert;

describe("The framework can define web components", () => {
	browser.url("http://localhost:9191/test-resources/pages/GenericElement.html");

	it("Tests that element is rendered", () => {
		const el = browser.$("#gen");

		assert.strictEqual(el.shadow$("div>p").isExisting(), true, "Shadow root content created");
	});

	it("Tests that prop-attr conversion works for string properties", () => {
		const el = browser.$("#gen");

		el.setProperty("strProp", "test1");
		assert.strictEqual(el.getAttribute("str-prop"), "test1", "Attribute affected by property change");

		el.setAttribute("str-prop", "test2");
		assert.strictEqual(el.getProperty("strProp"), "test2", "Property affected by attribute change");
	});

	it("Tests that prop-attr conversion works for boolean properties", () => {
		const el = browser.$("#gen");

		el.setProperty("boolProp", true);
		assert.strictEqual(el.getAttribute("bool-prop"), "", "Attribute affected by property change");

		el.setProperty("boolProp", false);
		assert.strictEqual(el.getAttribute("bool-prop"), null, "Attribute affected by property change");

		el.setAttribute("bool-prop", "");
		assert.strictEqual(el.getProperty("boolProp"), true, "Property affected by attribute change");

		el.removeAttribute("bool-prop");
		assert.strictEqual(el.getProperty("boolProp"), false, "Property affected by attribute change");
	});

});
