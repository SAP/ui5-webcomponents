import "../../src/Assets.js";
import DayPicker from "../../src/DayPicker.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

function DefaultDayPicker() {
	return <DayPicker id="daypicker"/>;
}

describe("Day Picker Tests", () => {
	it("Select day with Space", () => {
		cy.mount(<DefaultDayPicker />);
		cy.get("#daypicker")
			.shadow()
			.find(".ui5-dp-item--now")
			.as("today");
		cy.get("@today")
			.realClick()
			.should("be.focused")
			.realPress("ArrowRight")
			.realPress("Space");
		cy.focused()
			.invoke("attr", "data-sap-timestamp")
			.then(timestampAttr => {
				const timestamp = parseInt(timestampAttr!);
				const selectedDate = new Date(timestamp * 1000).getDate();
				const expectedDate = new Date(Date.now() + 24 * 3600 * 1000).getDate();
				expect(selectedDate).to.eq(expectedDate);
			});
	});

	it("Select day with Enter", () => {
		cy.mount(<DefaultDayPicker />);
		cy.get("#daypicker")
			.shadow()
			.find(".ui5-dp-item--now")
			.realClick()
			.should("be.focused")
			.as("today");

		cy.get("@today")
			.should("be.focused")
			.realPress("ArrowRight")
			.realPress("Enter");

		cy.focused()
			.invoke("attr", "data-sap-timestamp")
			.then(timestampAttr => {
				const timestamp = parseInt(timestampAttr!);
				const selectedDate = new Date(timestamp * 1000).getDate();
				const expectedDate = new Date(Date.now() + 24 * 3600 * 1000).getDate();
				expect(selectedDate).to.eq(expectedDate);
			});
	});

	it("Day names are correctly displayed when length is less than 3", () => {
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "en");

		cy.mount(<DefaultDayPicker />);
		cy.get("#daypicker")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Sun");
	});

	it("Day names are correctly displayed when length is more than 3", () => {
		// Set configuration first
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "pt_PT");

		cy.mount(<DefaultDayPicker />);

		cy.get("#daypicker")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "D");
	});
});
