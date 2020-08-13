// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const assert = require("chai").assert;


describe("BusyIndicator general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/BusyIndicator.html");

	it("tests event propagation", () => {
		const busyIndicator = browser.$("#busy-tree");
		const dynamicItem = busyIndicator.$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree")[2].shadow$(".ui5-li-tree-toggle-box");
		const input = browser.$("#tree-input");

		dynamicItem.click();
		dynamicItem.keys("Space");

		assert.strictEqual(input.getProperty("value"), "0", "itemClick is not thrown");
	});

});
