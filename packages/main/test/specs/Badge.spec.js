// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const assert = require("chai").assert;

describe("Badge rendering", () => {
	browser.url("http://localhost:8080/test-resources/pages/Badge.html");

	it("tests label not rendered if not text content", () => {

		const badgeLabel = browser.$("#badgeIconOnly").shadow$(".ui5-badge-text");

		assert.ok(badgeLabel, "bagde label tag not rendered.");
	});
});
