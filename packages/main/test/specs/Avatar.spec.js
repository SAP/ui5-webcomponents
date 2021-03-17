const assert = require("chai").assert;


describe("Avatar", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Avatar.html");
	});

	it("tests rendering of image", () => {
		const avatar = browser.$("#myAvatar1");
		const image = avatar.shadow$(".ui5-avatar-img");
		const icon = avatar.shadow$("ui5-avatar-icon");

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

	it("tests rendering of image, when all set", () => {
		const avatar = browser.$("#myAvatar3");
		const image = avatar.shadow$(".ui5-avatar-img");
		const icon = avatar.shadow$(".ui5-avatar-icon");
		const initials = avatar.shadow$(".ui5-avatar-initials");

		// ui5-icon tag is rendered, img - not
		assert.ok(image.isExisting(), "img is rendered");
		assert.ok(!icon.isExisting(), "icon is not rendered");
		assert.ok(!initials.isExisting(), "initials are not rendered");
	});

	it("tests rendering of initials", () => {
		const avatar = browser.$("#myAvatar4");
		const initials = avatar.shadow$(".ui5-avatar-initials");

		// initials are rendered
		assert.ok(initials.isExisting(), "initials are rendered");
	});

	it("Tests if clicked event is thrown for interactive avatars", () => {
		const avatarRoot = browser.$("#interactive-avatar").shadow$(".ui5-avatar-root");
		const input = browser.$("#click-event");

		avatarRoot.click();
		assert.strictEqual(input.getAttribute("value"), "1", "Mouse click throws event");

		avatarRoot.keys("Enter");
		assert.strictEqual(input.getAttribute("value"), "2", "Enter throws event");

		avatarRoot.keys("Space");
		assert.strictEqual(input.getAttribute("value"), "3", "Space throws event");
	  });

	  it("Tests if clicked event is not thrown for non interactive avatars", () => {
		const avatarRoot = browser.$("#non-interactive-avatar").shadow$(".ui5-avatar-root");;
		const input = browser.$("#click-event");

		avatarRoot.click();
		assert.strictEqual(input.getAttribute("value"), "3", "Mouse click throws event");

		avatarRoot.keys("Enter");
		assert.strictEqual(input.getAttribute("value"), "3", "Enter throws event");

		avatarRoot.keys("Space");
		assert.strictEqual(input.getAttribute("value"), "3", "Space throws event");
		});
});
