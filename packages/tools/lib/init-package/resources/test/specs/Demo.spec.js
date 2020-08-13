// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const assert = require("assert");

describe("INIT_PACKAGE_VAR_TAG rendering", () => {
	browser.url("http://localhost:INIT_PACKAGE_VAR_PORT/test-resources/pages/index.html");

	it("tests if web component is correctly rendered", () => {

		const innerContent = browser.$("#myFirstComponent").shadow$("div");

		assert.ok(innerContent, "content rendered");
	});
});
