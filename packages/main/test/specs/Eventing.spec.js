// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const assert = require("chai").assert;

describe("Eventing", () => {

	it("Default prevented", () => {
		browser.url("http://localhost:8080/test-resources/pages/Eventing.html");

		const innerLink = browser.$("#defaultPreventedLink");
		innerLink.click();

		const hrefIsSame = browser.execute(() => {
			return location.href.endsWith("Eventing.html");
		});
		assert.ok(hrefIsSame, "When default was prevented, URL did not change");
	});

	it("Default not prevented", () => {
		browser.url("http://localhost:8080/test-resources/pages/Eventing.html");

		const innerLink = browser.$("#normalLink");
		innerLink.click();

		const hrefChanged = browser.execute(() => {
			return location.href.endsWith("Eventing.html#new");
		});
		assert.ok(hrefChanged, "When default was not prevented, the URL did change");
	});
});
