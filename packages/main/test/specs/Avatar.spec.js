import { assert } from "chai";

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

	it("tests rendering of accented characters", async () => {
		const avatar = await browser.$("#myAvatar6");
		const initials = await avatar.shadow$(".ui5-avatar-initials");

		// initials are rendered
		assert.ok(await initials.isExisting(), "initials are rendered");
	});

	it("tests rendering of default fallback icon when initials are overflowing ", async () => {
		const avatar = await browser.$("#myAvatar5");
		const icon = await avatar.shadow$(".ui5-avatar-icon");
		const iconName = await icon.getAttribute("name");

		// icon is rendered
		assert.ok(await icon.isExisting(), "icon should be rendered, when the initials are overflowing");
		assert.strictEqual(await iconName, "employee", "the default fallback icon is renderen");

	});

	it("tests rendering of custom fallback icon when initials are overflowing ", async () => {
		const avatar = await browser.$("#myAvatar7");
		const fbIcon = await avatar.shadow$(".ui5-avatar-icon-fallback");
		const fbIconName = await fbIcon.getAttribute("name");

		// icon is rendered
		assert.ok(await fbIcon.isExisting(), "fallback icon should be rendered, when it is set and the initials are overflowing");
		assert.strictEqual(await fbIconName, "alert", "the custom fallback icon is renderen");

	});

	it("tests clicking on interactive disabled avatar", async () => {

		const avatarRoot = await browser.$("#interactive-disabled").shadow$(".ui5-avatar-root");
		const input3 = await browser.$("#click-event");

		await avatarRoot.click();
		assert.strictEqual(await input3.getAttribute("value"), "0", "Mouse click event not thrown when avatar is interactive + disabled");
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
		const nonInteractiveAvatar = await $("#non-interactive-avatar");;
		const nonInteractiveavatarRoot = await nonInteractiveAvatar.shadow$(".ui5-avatar-root");

		assert.strictEqual(await avatarRoot.getAttribute("role"), "button", "should have role button for interactive avatar");

		assert.strictEqual(await nonInteractiveavatarRoot.getAttribute("role"), "img", "should have role img for non-interactive avatar");
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

	it ("aria-label is correctly set", async () => {
		const avatar = await $("#interactive-avatar"),
			  avatarRoot = avatar.shadow$(".ui5-avatar-root");

		assert.equal(await avatarRoot.getAttribute("aria-label"), await avatar.getAttribute("accessible-name"), "aria-label should be set according to accessibleName property");
	});
});
