const assert = require("chai").assert;
const PORT = require("./_port.js");

function getResourceBundleTexts(keys) {
	return browser.execute((keys) => {
		const avatarGroup = document.getElementById("avatar-group-group");

		return keys.reduce((result, key) => {
			result[key] = avatarGroup.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts[key])
			return result;
		}, {});

	}, keys);
}

describe("avatar-group rendering", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/AvatarGroup.html`);
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

	it("tests if _background-design attribute is automatically set to avatars", () => {
		const avatars = browser.$$("#avatar-group-group ui5-avatar");

		let index = 0;

		avatars.forEach(avatar => {
			const avatarBackgroundColor = avatar.getAttribute("_color-scheme");

			if (++index > 10) {
				index = 1;
			}

			assert.strictEqual(avatarBackgroundColor, `Accent${index}`, "AvatarGroup _color-scheme property is assigned to avatars _size property");
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

	it("tests if click event is firing only once", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/AvatarGroup.html`);
		let eventCounter = 0;

		const avatar = browser.$("#avatar-1-test-events");
		const overflowButton = browser.$("#avatar-group-individual-events").shadow$("ui5-button");
		const avatarGroupTypeGroup = browser.$("#avatar-group-group-events");
		const eventAvatarsClicked = browser.$("#event-avatars-clicked");
		const getEventsCount = () => parseInt(eventAvatarsClicked.getValue())

		avatar.click() // set focus (important for the keys interaction to take action)
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per mouse click interaction - Avatar");
		avatar.keys('Enter');
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Enter' interaction - Avatar");
		avatar.keys('Space');
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Space' interaction - Avatar");

		overflowButton.click() // set focus (important for the keys interaction to take action)
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per mouse click interaction - Overflow Button");
		overflowButton.keys('Enter');
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Enter' interaction - Overflow Button");
		overflowButton.keys('Space');
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Space' interaction - Overflow Button");

		avatarGroupTypeGroup.click() // set focus (important for the keys interaction to take action)
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per mouse click interaction - Avatar Group type Group");
		avatarGroupTypeGroup.keys('Enter');
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Enter' interaction - Avatar Group type Group");
		avatarGroupTypeGroup.keys('Space');
		assert.strictEqual(getEventsCount(), ++eventCounter, "Avatar group 'click' event only fires once per keyboard 'Space' interaction - Avatar Group type Group");


	});
});

describe("ARIA attributes", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/AvatarGroup.html`);
	});

	describe("Type Individual", () => {

		it("role is correct", () => {
			const avatarGroup = $("#avatar-group-individual");
			const role = avatarGroup.getProperty("_role");
	
			assert.strictEqual(role, "group", "should have role group for individual avatars");
		});

		it("aria-haspopup is correct", () => {
			const avatarGroup = $("#avatar-group-individual");
			const ariaHasPopupContainer = avatarGroup.getProperty("_containerAriaHasPopup");
			const overflowButtonAccInfo = avatarGroup.getProperty("_overflowButtonAccInfo");

			// container
			assert.notExists(ariaHasPopupContainer, "should not have aria-haspopup attribute");
			// overflow button
			assert.strictEqual(overflowButtonAccInfo.ariaHaspopup, "menu", "overflow button should have aria-haspopup for type individual");
		});

		it("aria-label is correct", () => {
			const avatarGroup = $("#avatar-group-individual");
			const ariaLabel = avatarGroup.getProperty("_ariaLabelText");
			const overflowButtonLabel = avatarGroup.getProperty("_overflowButtonAriaLabelText");
	
			const keys = [
				"AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL",
				"AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL",
				"AVATAR_GROUP_MOVE",
			];
			const texts = getResourceBundleTexts(keys);
	
			// container
			assert.include(ariaLabel, texts.AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL, "aria-label type message reference is correct");
			assert.notInclude(ariaLabel, texts.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL, "should not have aria-label activate message");
			assert.include(ariaLabel, texts.AVATAR_GROUP_MOVE, "aria-label navigation message reference is correct");
			// overflow button
			assert.include(overflowButtonLabel, texts.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL, "overflow button should have aria-label for type individual");
		});
	});

	describe("Type Group", () => {

		it("role is correct", () => {
			const avatarGroup = $("#avatar-group-group");
			const role = avatarGroup.getProperty("_role");

			assert.strictEqual(role, "button", "should have role button for grouped avatars");
		});

		it("aria-haspopup is correct", () => {
			const avatarGroup = $("#avatar-group-group");
			const ariaHasPopupContainer = avatarGroup.getProperty("_containerAriaHasPopup");
			const overflowButtonAccInfo = avatarGroup.getProperty("_overflowButtonAccInfo");
	
			// container 
			assert.strictEqual(ariaHasPopupContainer, "menu", "should have 'menu' set to aria-haspopup attribute");
			// overflow button
			assert.notExists(overflowButtonAccInfo.ariaHaspopup, "overflow button should not have aria-haspopup for type group");
		});

		it("aria-label is correct", () => {
			const avatarGroup = $("#avatar-group-group");
			const ariaLabel = avatarGroup.getProperty("_ariaLabelText");
			const overflowButtonLabel = avatarGroup.getProperty("_overflowButtonAriaLabelText");
	
			const keys = [
				"AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL",
				"AVATAR_GROUP_ARIA_LABEL_GROUP",
				"AVATAR_GROUP_MOVE"
			];
			const texts = getResourceBundleTexts(keys);
	
			// container 
			assert.include(ariaLabel, texts.AVATAR_GROUP_ARIA_LABEL_GROUP, "aria-label type message reference is correct");
			assert.include(ariaLabel, texts.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL, "should have aria-label activate message");
			assert.notInclude(ariaLabel, texts.AVATAR_GROUP_MOVE, "should not have aria-label navigation message");
			// overflow button
			assert.notExists(overflowButtonLabel, "overflow button should not have aria-label activate message");
		});
	});
});