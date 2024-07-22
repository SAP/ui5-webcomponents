import { html } from 'lit';
import "../../src/bundle.common.js";

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
					"gregDate": "20140925"
				},
				{
					"dateFormat": "A",
					"islamicMonthStart": "14360101",
					"gregDate": "20141024"
				},
				{
					"dateFormat": "A",
					"islamicMonthStart": "14360201",
					"gregDate": "20141123"
				}
			]
		},
		"noConflict": {
			"events": ["selection-change", "header-click"]
		}
	}

	before(() => {
		cy.mount(html`<ui5-test-generic></ui5-test-generic>`, {
			ui5Configuration: configurationObject
		});

		cy.get("script[data-ui5-config]")
			.should("exist")
			.then($el => {
				return $el.get(0).innerHTML;
			})
			.should("equal", JSON.stringify(configurationObject));
	})

	it("getLanguage", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getLanguage")
			.should("equal", configurationObject.language);
	});

	it("getCalendarType", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getCalendarType")
			.should("equal", configurationObject.calendarType);
	});

	it("getFirstDayOfWeek", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getFirstDayOfWeek")
			.should("equal", configurationObject.formatSettings.firstDayOfWeek);
	});

	it("getLegacyDateCalendarCustomizing", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getLegacyDateCalendarCustomizing")
			.should("deep.equal", configurationObject.formatSettings.legacyDateCalendarCustomizing);
	});

	it("getAnimationMode", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getAnimationMode")
			.should("equal", configurationObject.animationMode);
	});

	it("getTheme", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getTheme")
			.should("equal", configurationObject.theme);
	});

	it("getNoConflict", () => {
		cy.window()
			.its("sap-ui-webcomponents-bundle")
			.its("configuration")
			.invoke("getNoConflict")
			.should("deep.equal", configurationObject.noConflict)
			.its("events")
			.should("deep.equal", configurationObject.noConflict.events)
	});
})