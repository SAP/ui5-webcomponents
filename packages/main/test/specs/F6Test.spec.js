import { assert } from "chai";

describe("F6 Test", () => {
	describe("Forward", () => {
		it("Basic", async () => {
			await browser.url(`test/pages/F6Test1.html`);

			// Go to next group
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("Basic with an empty group", async () => {
			await browser.url(`test/pages/F6Test2.html`);

			// Go to next group
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("Nested groups", async () => {
			await browser.url(`test/pages/F6Test3.html`);

			// Go to next group
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("Nested inside empty fastnav-group parent", async () => {
			await browser.url(`test/pages/F6Test4.html`);

			// Go to next group
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct ");
		});

		it("Basic with group as focusable element", async () => {
			await browser.url(`test/pages/F6Test5.html`);

			// Go to next group
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("Groups without focusable element", async () => {
			await browser.url(`test/pages/F6Test6.html`);

			const button = await browser.$("#first");

			await button.click();
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("One group", async () => {
			await browser.url(`test/pages/F6Test7.html`);

			// Go to next group
			await browser.keys("F6");
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});
	})

	describe("Backward", () => {
		it("Basic", async () => {
			await browser.url(`test/pages/F6Test1.html`);

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys(["Shift", "F6"]);
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("Basic with an empty group", async () => {
			await browser.url(`test/pages/F6Test2.html`);

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys(["Shift", "F6"]);
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("Nested groups", async () => {
			await browser.url(`test/pages/F6Test3.html`);

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys(["Shift", "F6"]);
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("Nested inside empty fastnav-group parent", async () => {
			await browser.url(`test/pages/F6Test4.html`);

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys(["Shift", "F6"]);
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct ");
		});

		it("Basic with group as focusable element", async () => {
			await browser.url(`test/pages/F6Test5.html`);

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("second", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to first group (circle)
			await browser.keys(["Shift", "F6"]);
			assert.equal("third", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("Groups without focusable element", async () => {
			await browser.url(`test/pages/F6Test6.html`);

			const button = await browser.$("#first");

			await button.click();
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});

		it("One group", async () => {
			await browser.url(`test/pages/F6Test7.html`);

			// Go to next group
			await browser.keys(["Shift", "F6"]);
			assert.equal("first", await browser.$(await browser.getActiveElement()).getAttribute("id"), "correct focus");
		});
	})
});
