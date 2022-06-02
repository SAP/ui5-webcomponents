const assert = require("chai").assert;

describe("Properties and attributes convert to each other", () => {
	before(async () => {
		await browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("Tests that properties with default values are initialized with the default value", async () => {
		const el = await browser.$("#gen");

		assert.strictEqual(await el.getProperty("defaultValueProp"), "Hello", "defaultValueProp is properly initialized");
	});

	it("Tests that prop-attr conversion works for string properties", async () => {
		const el = await browser.$("#gen");

		await el.setProperty("strProp", "test1");
		assert.strictEqual(await el.getAttribute("str-prop"), "test1", "Attribute affected by property change");

		await el.setAttribute("str-prop", "test2");
		assert.strictEqual(await el.getProperty("strProp"), "test2", "Property affected by attribute change");
	});

	it("Tests that prop-attr conversion works for boolean properties", async () => {
		const el = await browser.$("#gen");

		await el.setProperty("boolProp", true);
		assert.strictEqual(await el.getAttribute("bool-prop"), "", "Attribute affected by property change");

		await el.setProperty("boolProp", false);
		assert.strictEqual(await el.getAttribute("bool-prop"), null, "Attribute affected by property change");

		await el.setAttribute("bool-prop", "");
		assert.strictEqual(await el.getProperty("boolProp"), true, "Property affected by attribute change");

		await el.removeAttribute("bool-prop");
		assert.strictEqual(await el.getProperty("boolProp"), false, "Property affected by attribute change");
	});

	it("Tests that object properties have no attributes", async () => {
		const el = await browser.$("#gen");

		await el.setProperty("objectProp", {});
		assert.strictEqual(await el.getAttribute("object-prop"), null, "Attribute not there");
	});

	it("Tests that array properties have no attributes", async () => {
		const el = await browser.$("#gen");

		await el.setProperty("multiProp", ["a", "b"]);
		assert.strictEqual(await el.getAttribute("multi-prop"), null, "Attribute not there");
	});

	it("Tests that noAttribute properties have no attributes", async () => {
		const el = await browser.$("#gen");

		await el.setProperty("noAttributeProp", "some value");
		assert.strictEqual(await el.getAttribute("no-attribute-prop"), null, "Attribute not there");
	});

	it("Tests that properties with default values do not automatically set attributes", async () => {
		const el = await browser.$("#gen");

		assert.strictEqual(await el.getAttribute("default-value-prop"), null, "Attribute not there for defaultValueProp");
	});

});
