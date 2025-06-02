import DynamicDateRange from '../../src/DynamicDateRange.js';
import SingleDate from '../../src/dynamic-date-range-options/SingleDate.js';
import DateRange from '../../src/dynamic-date-range-options/DateRange.js';
import Today from '../../src/dynamic-date-range-options/Today.js';
import CalendarDate from '@ui5/webcomponents-localization/dist/dates/CalendarDate.js';

describe('DynamicDateRange Component', () => {
	beforeEach(() => {
		cy.stub(CalendarDate, "fromLocalJSDate").returns(new CalendarDate(2025, 4, 15, "Gregorian"))

		cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE"> </DynamicDateRange>);
	});

	it('renders the DynamicDateRange component', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");

		cy.get("@input").should('exist');

		cy.get("@input").find('[ui5-icon]').as("icon");

		cy.get("@icon").should('have.attr', 'name', 'appointment-2');
	});

	it('displays all options correctly', () => {
		const mockOptions = [
			new Today(),
			new SingleDate(),
			new DateRange()
		];
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");

		cy.get("@input").should('exist');

		cy.get("@input").find('[ui5-icon]').as("icon");
		cy.get("@icon").realClick(); // Open the picker

		cy.get("@ddr").shadow().find("[ui5-responsive-popover]").as("popover");
		cy.get("@popover").should('exist');
		cy.get("@popover").find("[ui5-list]").as("list");
		cy.get('@list').find("[ui5-li]").as("listItems");
		cy.get("@listItems").should('have.length', mockOptions.length);

		mockOptions.forEach((option, index) => {
			cy.get('@listItems').eq(index).should('contain.text', option.text);
		});
	});

	it('selects an option and updates the current value', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");

		cy.get("@input").should('exist');

		cy.get("@input").find('[ui5-icon]').as("icon");
		cy.get("@icon").realClick(); // Open the picker

		cy.get("@ddr").shadow().find("[ui5-responsive-popover]").as("popover");
		cy.get("@popover").should('exist');
		cy.get("@popover").find("[ui5-list]").as("list");
		cy.get('@list').find("[ui5-li]").as("listItems");
		cy.get("@listItems").contains('Today').realClick();

		cy.get("@input").should('have.value', 'Today');
	});

	it('handles selection change correctly', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");

		cy.get("@input").should('exist');
		cy.get("@input").realClick();
		cy.get("@input").realType("Today");
		cy.get("@input").realPress("Enter");
		cy.get("@input").should('have.value', 'Today');
	});

	it('selects the Date option and updates the current value', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");

		cy.get("@input").should('exist');

		cy.get("@input").find('[ui5-icon]').as("icon");
		cy.get("@icon").realClick();

		cy.get("@ddr").shadow().find("[ui5-responsive-popover]").as("popover");
		cy.get("@popover").should('exist');

		cy.get("@popover").find("[ui5-list]").as("list");
		cy.get("@list").find("[ui5-li]").contains('Date').realClick();

		cy.get("@popover").find("[ui5-calendar]").as("calendar");
		cy.get("@calendar").should('exist');

		cy.get("@calendar").shadow().find("ui5-daypicker").as("dayPicker");
		cy.get("@dayPicker").shadow().find("div[data-sap-timestamp='1747785600']").realClick();

		cy.get("@popover").find("[ui5-button][design='Emphasized']").as("submitButton");
		cy.get("@submitButton").should('exist').realClick();

		cy.get("@input").shadow().find("input").should('have.value', 'May 21, 2025');
	});

	it('writes a date in the input and verifies it is selected in the calendar for the Date option', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");

		cy.get("@input").should('exist');

		cy.get("@input").shadow().find("input").clear().realType('May 15, 2025');
		cy.realPress("Enter");

		cy.get("@input").find('[ui5-icon]').as("icon");
		cy.get("@icon").realClick();

		cy.get("@ddr").shadow().find("[ui5-responsive-popover]").as("popover");
		cy.get("@popover").should('exist');

		cy.get("@popover").find("[ui5-list]").as("list");
		cy.get("@list").find("[ui5-li]").contains('Date').realClick();

		cy.get("@popover").find("[ui5-calendar]").as("calendar");
		cy.get("@calendar").should('exist');

		cy.get("@calendar").shadow().find("ui5-daypicker").as("dayPicker");
		cy.get("@dayPicker").shadow().find("div[data-sap-timestamp='1747267200']").should('have.class', 'ui5-dp-item--selected'); // Timestamp for May 15, 2025
	});
});