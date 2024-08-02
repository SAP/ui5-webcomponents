import { getAnimationMode } from "../../src/config/AnimationMode.js";
import { getCalendarType } from "../../src/config/CalendarType.js";
import { getDefaultFontLoading } from "../../src/config/Fonts.js";
import { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "../../src/config/FormatSettings.js";
import { getLanguage } from "../../src/config/Language.js";
import { getNoConflict } from "../../src/config/NoConflict.js";
import { getTheme } from "../../src/config/Theme.js";
import { resetConfiguration } from "../../src/InitialConfiguration.js";

describe("Configuration script", () => {
	const configurationObject = {
		"theme": "sap_horizon_hcb",
		"animationMode": "basic",
		"rtl": true,
		"language": "ja",
		"calendarType": "Japanese",
		"formatSettings": {
			"firstDayOfWeek": 0,
			"legacyDateCalendarCustomizing": [
				{
					"dateFormat": "A",
					"islamicMonthStart": "14351201",
					"gregDate": "20140925",
				},
				{
					"dateFormat": "A",
					"islamicMonthStart": "14360101",
					"gregDate": "20141024",
				},
				{
					"dateFormat": "A",
					"islamicMonthStart": "14360201",
					"gregDate": "20141123",
				},
			],
		},
		"noConflict": {
			"events": ["selection-change", "header-click"],
		},
		"defaultFontLoading": false,
	};

	before(() => {
		cy.mount(`<ui5-test-generic></ui5-test-generic>`, {
			ui5Configuration: configurationObject,
		});

		cy.then(() => resetConfiguration(true));

		cy.get("script[data-ui5-config]")
			.should("exist")
			.then($el => {
				return $el.get(0).innerHTML;
			})
			.should("equal", JSON.stringify(configurationObject));
	});

	it("getLanguage", () => {
		cy.then(() => getLanguage())
			.should("equal", configurationObject.language);
	});

	it("getCalendarType", () => {
		cy.then(() => getCalendarType())
			.should("equal", configurationObject.calendarType);
	});

	it("getFirstDayOfWeek", () => {
		cy.then(() => getFirstDayOfWeek())
			.should("equal", configurationObject.formatSettings.firstDayOfWeek);
	});

	it("getLegacyDateCalendarCustomizing", () => {
		cy.then(() => getLegacyDateCalendarCustomizing())
			.should("deep.equal", configurationObject.formatSettings.legacyDateCalendarCustomizing);
	});

	it("getAnimationMode", () => {
		cy.then(() => getAnimationMode())
			.should("equal", configurationObject.animationMode);
	});

	it("getTheme", () => {
		cy.then(() => getTheme())
			.should("equal", configurationObject.theme);
	});

	it("getNoConflict", () => {
		cy.then(() => getNoConflict())
			.should("deep.equal", configurationObject.noConflict)
			.its("events")
			.should("deep.equal", configurationObject.noConflict.events);
	});

	it("getDefaultFontLoading", () => {
		cy.then(() => getDefaultFontLoading())
			.should("equal", false);
	});
});
