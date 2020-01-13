const assert = require("chai").assert;


describe("Avatar", () => {
	browser.url("http://localhost:8080/test-resources/pages/Avatar.html");

	it("tests rendering of image", () => {
		const avatar = browser.$("#myAvatar1");
		const image = avatar.shadow$("img");
		const icon = avatar.shadow$("ui5-icon");

		// img tag is rendered, ui5-icon - not
		assert.ok(image.isExisting(), "img is rendered");
		assert.ok(!icon.isExisting(), "icon is not rendered");
	});

	it("tests rendering of icon", () => {
		const avatar = browser.$("#myAvatar2");
		const image = avatar.shadow$(".ui5-avatar-img");
		const icon = avatar.shadow$(".ui5-avatar-icon");

		// ui5-icon tag is rendered, img - not
		assert.ok(!image.isExisting(), "img is not rendered");
		assert.ok(icon.isExisting(), "icon is rendered");
	});

	it("tests rendering of image, when both set", () => {
		const avatar = browser.$("#myAvatar3");
		const image = avatar.shadow$(".ui5-avatar-img");
		const icon = avatar.shadow$(".ui5-avatar-icon");

		// ui5-icon tag is rendered, img - not
		assert.ok(image.isExisting(), "img is rendered");
		assert.ok(!icon.isExisting(), "icon is not rendered");
	});
});
