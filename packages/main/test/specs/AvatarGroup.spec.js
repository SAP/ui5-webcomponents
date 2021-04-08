const assert = require("chai").assert;

describe("avatar-group rendering", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/AvatarGroup.html");
	});

	it("tests if web component is correctly rendered", () => {
		const avatarGroupIndividual = browser.$("#avatar-group-individual").shadow$("div");
		const avatarGroupGroup = browser.$("#avatar-group-group").shadow$("div");

		assert.ok(avatarGroupIndividual, "AvatarGroup mode 'Individual' rendered");
		assert.ok(avatarGroupGroup, "AvatarGroup mode 'Group' rendered");
	});

	it("tests if _size attribute is correctly set to avatars", () => {
		const avatarGroup = browser.$("#avatar-group-individual");
		const avatars = browser.$$("#avatar-group-individual ui5-avatar");

		const avatarGroupSize = avatarGroup.getAttribute("avatar-size");

		avatars.forEach(avatar => {
			const avatarSize = avatar.getAttribute("_size");
			assert.strictEqual(avatarSize, avatarGroupSize, "AvatarGroup avatar-size property is assigned to avatars _size property");
		});
	});

	it("tests change of avatar-size attribute triggers change in avatar _size attribute", () => {
		const avatarGroup = browser.$("#avatar-group-individual");
		const avatars = browser.$$("#avatar-group-group ui5-avatar");
		const newAvatarSize = "M";

		avatarGroup.setAttribute("avatar-size", newAvatarSize)

		avatars.forEach(avatar => {
			const avatarSize = avatar.getAttribute("_size");
			assert.strictEqual(avatarSize, newAvatarSize, "AvatarGroup avatar-size property is assigned to avatars _size property");
		});
	});

	it("tests if _background-color attribute is automatically set to avatars", () => {
		const avatars = browser.$$("#avatar-group-group ui5-avatar");

		let index = 0;

		avatars.forEach(avatar => {
			const avatarBackgroundColor = avatar.getAttribute("_background-color");

			if (++index > 10) {
				index = 1;
			}

			assert.strictEqual(avatarBackgroundColor, `Accent${index}`, "AvatarGroup avatar-size property is assigned to avatars _size property");
		});
	});

	it("tests click event when avatar is clicked", () => {
		const avatar = browser.$("#avatar-1");

		const eventTargetRef = browser.$("#event-target");
		const eventOverflowButtonClicked = browser.$("#event-overflow-button-clicked");
		const resetBtn = browser.$("#reset-btn");


		resetBtn.click();
		avatar.click();

		assert.strictEqual(eventTargetRef.getValue(), avatar.getProperty("tagName"), "Event should be called with ui5-avatar as targetRef");
		assert.strictEqual(eventOverflowButtonClicked.getValue(), "false", "Event should be called with overflowButtonClicked equal to false");
	});

	it("tests click event when overflow button is clicked", () => {
		const overflowButton = browser.$("#avatar-group-individual").shadow$("ui5-button");

		const eventTargetRef = browser.$("#event-target");
		const eventOverflowButtonClicked = browser.$("#event-overflow-button-clicked");
		const resetBtn = browser.$("#reset-btn");

		resetBtn.click();
		overflowButton.click();

		assert.strictEqual(eventTargetRef.getValue(), overflowButton.getProperty("tagName"), "Event should be called with ui5-button as targetRef");
		assert.strictEqual(eventOverflowButtonClicked.getValue(), "true", "Event should be called with overflowButtonClicked equal to true");
	});

	it("tests click event avatar group with type group is clicked", () => {
		const avatarGroup = browser.$("#avatar-group-group");

		const eventTargetRef = browser.$("#event-target");
		const eventOverflowButtonClicked = browser.$("#event-overflow-button-clicked");
		const resetBtn = browser.$("#reset-btn");

		resetBtn.click();
		avatarGroup.click();

		assert.strictEqual(eventTargetRef.getValue(), "DIV.ui5-avatar-group-items", "Event should be called with ui5-button as targetRef");
		assert.strictEqual(eventOverflowButtonClicked.getValue(), "false", "Event should be called with overflowButtonClicked equal to false");
	});

	it("tests if hiddenItems is correctly displayed in the overflow button", () => {
		browser.setWindowSize(200, 1080);

		const avatarGroup = browser.$("#avatar-group-individual");
		const overflowButton = browser.$("#avatar-group-individual").shadow$("ui5-button");

		const hiddenItemsCount = avatarGroup.getProperty("hiddenItems").length;
		const overflowButtonText = overflowButton.getText();

		assert.strictEqual(`+${hiddenItemsCount}`, overflowButtonText, "Overflow button shows the hidden items count correctly");
	});

});
