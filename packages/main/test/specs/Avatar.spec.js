const assert = require("chai").assert;


describe("Avatar", () => {
	before(async () => {
		await browser.url(`test/pages/Avatar.html`);
	});

	it("tests rendering of image", async () => {
		const avatar = await browser.$("#myAvatar1");
		const image = await avatar.shadow$('slot:not([name="badge"])');
		const icon = await avatar.shadow$("ui5-avatar-icon");

		// img tag is rendered, ui5-icon - not
		assert.ok(await image.isExisting(), "img is rendered");
		assert.notOk(await icon.isExisting(), "icon is not rendered");
	});

	it("tests rendering of icon", async () => {
		const avatar = await browser.$("#myAvatar2");
		const image = await avatar.shadow$('slot:not([name="badge"])');
		const icon = await avatar.shadow$(".ui5-avatar-icon");

		// ui5-icon tag is rendered, img - not
		assert.notOk(await image.isExisting(), "img is not rendered");
		assert.ok(await icon.isExisting(), "icon is rendered");
	});

	it("tests rendering of image, when all set", async () => {
		const avatar = await browser.$("#myAvatar3");
		const image = await avatar.shadow$('slot:not([name="badge"])');
		const icon = await avatar.shadow$(".ui5-avatar-icon");
		const initials = await avatar.shadow$(".ui5-avatar-initials");

		// ui5-icon tag is rendered, img - not
		assert.ok(await image.isExisting(), "img is rendered");
		assert.notOk(await icon.isExisting(), "icon is not rendered");
		assert.notOk(await initials.isExisting(), "initials are not rendered");
	});

	it("tests rendering of initials", async () => {
		const avatar = await browser.$("#myAvatar4");
		const initials = await avatar.shadow$(".ui5-avatar-initials");

		// initials are rendered
		assert.ok(await initials.isExisting(), "initials are rendered");
	});

	it("Tests noConflict 'ui5-click' event is thrown for interactive avatars", async () => {
		const avatarRoot = await browser.$("#interactive-avatar").shadow$(".ui5-avatar-root");
		const input = await browser.$("#click-event");

		await avatarRoot.click();
		assert.strictEqual(await input.getAttribute("value"), "1", "Mouse click throws event");

		await avatarRoot.keys("Enter");
		assert.strictEqual(await input.getAttribute("value"), "2", "Enter throws event");

		await avatarRoot.keys("Space");
		assert.strictEqual(await input.getAttribute("value"), "3", "Space throws event");
	  });

	  it("Tests noConflict 'ui5-click' event is not thrown for non interactive avatars", async () => {
		const avatarRoot = await browser.$("#non-interactive-avatar").shadow$(".ui5-avatar-root");;
		const input = await browser.$("#click-event");

		await avatarRoot.click();
		assert.strictEqual(await input.getAttribute("value"), "3", "Mouse click throws event");

		await avatarRoot.keys("Enter");
		assert.strictEqual(await input.getAttribute("value"), "3", "Enter throws event");

		await avatarRoot.keys("Space");
		assert.strictEqual(await input.getAttribute("value"), "3", "Space throws event");
	});

	it("Tests native 'click' event thrown", async () => {
		await browser.executeAsync(function(done) {
			window["sap-ui-webcomponents-bundle"].configuration.setNoConflict(false);
			done();
		});

		const avatar = await browser.$("#myInteractiveAvatar");
		const input = await browser.$("#click-event-2");

		await avatar.click();
		assert.strictEqual(await input.getAttribute("value"), "1", "Mouse click throws event");
	});
});

describe("ARIA attributes", () => {
	before(async () => {
		await browser.url(`test/pages/Avatar.html`);
	});

	it ("role set correctly", async () => {
		const avatar = await $("#myInteractiveAvatar");;
		const avatarRoot = await avatar.shadow$(".ui5-avatar-root");

		assert.strictEqual(await avatarRoot.getAttribute("role"), "button", "should have role button for interactive avatar");
	});

	it ("aria-haspopup is correct for interactive avatar", async () => {
		const avatar = await $("#myInteractiveAvatar");;
		const ariaHasPopup = await avatar.getProperty("_ariaHasPopup");

		assert.strictEqual(ariaHasPopup, "menu", "should have aria-haspopup set");
	});

	it ("aria-haspopup is correct for non-interactive avatar", async () => {
		const avatar = await $("#non-interactive-avatar");;
		const ariaHasPopup = await avatar.getProperty("_ariaHasPopup");

		assert.notExists(ariaHasPopup, "should not have aria-haspopup set");
	});
});
