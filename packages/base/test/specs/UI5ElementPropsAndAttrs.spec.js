const assert = require("chai").assert;

describe("Properties and attributes convert to each other", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("Tests that properties with default values are initialized with the default value", () => {
		const el = browser.$("#gen");

		assert.strictEqual(el.getProperty("defaultValueProp"), "Hello", "defaultValueProp is properly initialized");
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

	it("Tests that object properties have no attributes", () => {
		const el = browser.$("#gen");

		el.setProperty("objectProp", {});
		assert.strictEqual(el.getAttribute("object-prop"), null, "Attribute not there");
	});

	it("Tests that array properties have no attributes", () => {
		const el = browser.$("#gen");

		el.setProperty("multiProp", ["a", "b"]);
		assert.strictEqual(el.getAttribute("multi-prop"), null, "Attribute not there");
	});

	it("Tests that noAttribute properties have no attributes", () => {
		const el = browser.$("#gen");

		el.setProperty("noAttributeProp", "some value");
		assert.strictEqual(el.getAttribute("no-attribute-prop"), null, "Attribute not there");
	});

	it("Tests that properties with default values do not automatically set attributes", () => {
		const el = browser.$("#gen");

		assert.strictEqual(el.getAttribute("default-value-prop"), null, "Attribute not there for defaultValueProp");
	});

});
