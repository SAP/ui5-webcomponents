import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import DatePicker from "../../src/DatePicker.js";
import { resetConfiguration } from "@ui5/webcomponents-base/dist/config/ConfigurationReset.js";

describe("Date Picker Tests", () => {
	after(() => {
		resetConfiguration();
	});

	it("DatePicker dates and week number", () => {
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "en");

		cy.mount(<DatePicker primaryCalendarType="Gregorian" />);

		cy.get("[ui5-date-picker]")
			.realClick();

		cy.get("[ui5-date-picker]")
			.should("be.focused");

		cy.realType("May 3, 2100");

		cy.realPress("Enter");

		cy.get("[ui5-date-picker]")
			.should("have.value", "May 3, 2100");

		cy.get("[ui5-date-picker]")
			.invoke("prop", "open", true);

		cy.get("[ui5-date-picker]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should($rp => {
				expect($rp.is(":popover-open")).to.be.true;
				expect($rp.width()).to.not.equal(0);
				expect($rp.height()).to.not.equal(0);
			});

		cy.get("[ui5-date-picker]")
			.shadow()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-root .ui5-dp-content > div")
			.eq(2)
			.find("div")
			.as("rowItems");

		cy.get("@rowItems")
			.eq(0)
			.should("have.attr", "aria-label", "Calendar Week 19");

		cy.get("@rowItems")
			.eq(1)
			.should("have.attr", "aria-label", "Non-Working Day May 2, 2100");

		cy.get("@rowItems")
			.eq(2)
			.should("have.attr", "aria-label", "May 3, 2100");

		cy.get("@rowItems")
			.eq(3)
			.should("have.attr", "aria-label", "May 4, 2100");
	});
});
