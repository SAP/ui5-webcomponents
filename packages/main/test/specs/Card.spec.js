// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const assert = require('chai').assert;

describe("Card general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Card.html");

	it("tests initial rendering", () => {
		const card = browser.$("#card");

		assert.ok(card.isExisting(), "The component has shadow root.");
	});

	it("tests status not rendered, when action is set", () => {
		const status = browser.$("#actionCard").shadow$(".ui5-card-status");

		assert.notOk(status.isExisting(), "The status DOM is not rendered.");
	});

	it("tests headerPress upon click, Enter and Space", () => {
		const cardHeader = browser.$("#card").shadow$(".ui5-card-header");
		const cardHeader2 = browser.$("#card2").shadow$(".ui5-card-header");
		const field = browser.$("#field");

		cardHeader.click();
		cardHeader.keys("Space");
		cardHeader.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "The headerPress event should be called 3 times.");

		cardHeader2.click();
		cardHeader2.keys("Space");
		cardHeader2.keys("Enter");

		assert.strictEqual(field.getProperty("value"), "3", "The events count should remain 3 as the header is not interactive.");
	});
});
