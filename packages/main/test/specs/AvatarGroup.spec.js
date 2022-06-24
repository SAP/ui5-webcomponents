const assert = require("chai").assert;

async function getResourceBundleTexts(keys) {
	return browser.executeAsync((keys, done) => {
		const avatarGroup = document.getElementById("avatar-group-group");

		const texts = keys.reduce((result, key) => {
			result[key] = avatarGroup.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts[key])
			return result;
		}, {});
		done(texts);

	}, keys);
}

describe("avatar-group rendering", () => {
	before(async () => {
		await browser.url(`test/pages/AvatarGroup.html`);
	});

	it("tests if web component is correctly rendered", async () => {
		const avatarGroupIndividual = await browser.$("#avatar-group-individual").shadow$("div");
		const avatarGroupGroup = await browser.$("#avatar-group-group").shadow$("div");

		assert.ok(avatarGroupIndividual, "AvatarGroup mode 'Individual' rendered");
		assert.ok(avatarGroupGroup, "AvatarGroup mode 'Group' rendered");
	});


	it("tests if _background-design attribute is automatically set to avatars", async () => {
		const avatars = await browser.$$("#avatar-group-group ui5-avatar");

		let index = 0;

		avatars.forEach(async avatar => {
			const avatarBackgroundColor = await avatar.getAttribute("_color-scheme");

			if (++index > 10) {
				index = 1;
			}

			assert.strictEqual(avatarBackgroundColor, `Accent${index}`, "AvatarGroup _color-scheme property is assigned to avatars _size property");
		});
	});

	it("tests click event when avatar is clicked", async () => {
		const avatar = await browser.$("#avatar-1");

		const eventTargetRef = await browser.$("#event-target");
		const eventOverflowButtonClicked = await browser.$("#event-overflow-button-clicked");
		const resetBtn = await browser.$("#reset-btn");


		await resetBtn.click();
		await avatar.click();

		assert.strictEqual(await eventTargetRef.getValue(), await avatar.getProperty("tagName"), "Event should be called with ui5-avatar as targetRef");
		assert.strictEqual(await eventOverflowButtonClicked.getValue(), "false", "Event should be called with overflowButtonClicked equal to false");
	});

	it("tests click event when overflow button is clicked", async () => {
		const overflowButton = await browser.$("#avatar-group-individual").shadow$("ui5-button");

		const eventTargetRef = await browser.$("#event-target");
		const eventOverflowButtonClicked = await browser.$("#event-overflow-button-clicked");
		const resetBtn = await browser.$("#reset-btn");

		await resetBtn.click();
		await overflowButton.click();

		assert.strictEqual(await eventTargetRef.getValue(), await overflowButton.getProperty("tagName"), "Event should be called with ui5-button as targetRef");
		assert.strictEqual(await eventOverflowButtonClicked.getValue(), "true", "Event should be called with overflowButtonClicked equal to true");
	});

	it("tests click event avatar group with type group is clicked", async () => {
		const avatarGroup = await browser.$("#avatar-group-group");

		const eventTargetRef = await browser.$("#event-target");
		const eventOverflowButtonClicked = await browser.$("#event-overflow-button-clicked");
		const resetBtn = await browser.$("#reset-btn");

		await resetBtn.click();
		await avatarGroup.click();

		assert.strictEqual(await eventTargetRef.getValue(), "DIV.ui5-avatar-group-items", "Event should be called with ui5-button as targetRef");
		assert.strictEqual(await eventOverflowButtonClicked.getValue(), "false", "Event should be called with overflowButtonClicked equal to false");
	});

	it("tests if hiddenItems is correctly displayed in the overflow button", async () => {
		await browser.setWindowSize(200, 1080);

		const avatarGroup = await browser.$("#avatar-group-individual");
		const overflowButton = await browser.$("#avatar-group-individual").shadow$("ui5-button");

		const hiddenItemsCount = (await avatarGroup.getProperty("hiddenItems")).length;
		const overflowButtonText = await overflowButton.getText();

		assert.strictEqual(`+${hiddenItemsCount}`, overflowButtonText, "Overflow button shows the hidden items count correctly");
	});

	it("tests if click event is firing only once", async () => {
		await browser.url(`test/pages/AvatarGroup.html`);
		let eventCounter = 0;

		const avatar = await browser.$("#avatar-1-test-events");
		const overflowButton = await browser.$("#avatar-group-individual-events").shadow$("ui5-button");
		const avatarGroupTypeGroup = await browser.$("#avatar-group-group-events");
		const eventAvatarsClicked = await browser.$("#event-avatars-clicked");
		const getEventsCount = async () => parseInt(await eventAvatarsClicked.getValue());

		await avatar.click() // set focus (important for the keys interaction to take action)
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per mouse click interaction - Avatar");
		await avatar.keys('Enter');
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Enter' interaction - Avatar");
		await avatar.keys('Space');
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Space' interaction - Avatar");

		await overflowButton.click() // set focus (important for the keys interaction to take action)
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per mouse click interaction - Overflow Button");
		await overflowButton.keys('Enter');
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Enter' interaction - Overflow Button");
		await overflowButton.keys('Space');
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Space' interaction - Overflow Button");

		await avatarGroupTypeGroup.click() // set focus (important for the keys interaction to take action)
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per mouse click interaction - Avatar Group type Group");
		await avatarGroupTypeGroup.keys('Enter');
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Enter' interaction - Avatar Group type Group");
		await avatarGroupTypeGroup.keys('Space');
		assert.strictEqual(await getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Space' interaction - Avatar Group type Group");
	});
});

describe("ARIA attributes", () => {
	before(async () => {
		await browser.url(`test/pages/AvatarGroup.html`);
	});

	describe("Type Individual", () => {

		it("role is correct", async () => {
			const avatarGroup = await browser.$("#avatar-group-individual");
			const role = await avatarGroup.getProperty("_role");

			assert.strictEqual(role, "group", "should have role group for individual avatars");
		});

		it("aria-haspopup is correct", async () => {
			const avatarGroup = await browser.$("#avatar-group-individual");
			const ariaHasPopupContainer = await avatarGroup.getProperty("_containerAriaHasPopup");
			const overflowButtonAccAttributes = await avatarGroup.getProperty("_overflowButtonAccAttributes");

			// container
			assert.notExists(ariaHasPopupContainer, "should not have aria-haspopup attribute");
			// overflow button
			assert.strictEqual(overflowButtonAccAttributes.hasPopup, "menu", "overflow button should have aria-haspopup for type individual");
		});

		it("aria-label is correct", async () => {
			const avatarGroup = await browser.$("#avatar-group-individual");
			const ariaLabel = await avatarGroup.getProperty("_ariaLabelText");
			const overflowButtonLabel = await avatarGroup.getProperty("_overflowButtonAriaLabelText");

			const keys = [
				"AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL",
				"AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL",
				"AVATAR_GROUP_MOVE",
			];
			const texts = await getResourceBundleTexts(keys);

			// container
			assert.include(ariaLabel, texts.AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL, "aria-label type message reference is correct");
			assert.notInclude(ariaLabel, texts.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL, "should not have aria-label activate message");
			assert.include(ariaLabel, texts.AVATAR_GROUP_MOVE, "aria-label navigation message reference is correct");
			// overflow button
			assert.include(overflowButtonLabel, texts.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL, "overflow button should have aria-label for type individual");
		});
	});

	describe("Type Group", () => {

		it("role is correct", async () => {
			const avatarGroup = await browser.$("#avatar-group-group");
			const role = await avatarGroup.getProperty("_role");

			assert.strictEqual(role, "button", "should have role button for grouped avatars");
		});

		it("aria-haspopup is correct", async () => {
			const avatarGroup = await browser.$("#avatar-group-group");
			const ariaHasPopupContainer = await avatarGroup.getProperty("_containerAriaHasPopup");
			const overflowButtonAccAttributes = await avatarGroup.getProperty("_overflowButtonAccAttributes");

			// container
			assert.strictEqual(ariaHasPopupContainer, "menu", "should have 'menu' set to aria-haspopup attribute");
			// overflow button
			assert.notExists(overflowButtonAccAttributes.ariaHaspopup, "overflow button should not have aria-haspopup for type group");
		});

		it("aria-label is correct", async () => {
			const avatarGroup = await browser.$("#avatar-group-group");
			const ariaLabel = await avatarGroup.getProperty("_ariaLabelText");
			const overflowButtonLabel = await avatarGroup.getProperty("_overflowButtonAriaLabelText");

			const keys = [
				"AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL",
				"AVATAR_GROUP_ARIA_LABEL_GROUP",
				"AVATAR_GROUP_MOVE"
			];
			const texts = await getResourceBundleTexts(keys);

			// container
			assert.include(ariaLabel, texts.AVATAR_GROUP_ARIA_LABEL_GROUP, "aria-label type message reference is correct");
			assert.include(ariaLabel, texts.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL, "should have aria-label activate message");
			assert.notInclude(ariaLabel, texts.AVATAR_GROUP_MOVE, "should not have aria-label navigation message");
			// overflow button
			assert.notExists(overflowButtonLabel, "overflow button should not have aria-label activate message");
		});
	});
});
