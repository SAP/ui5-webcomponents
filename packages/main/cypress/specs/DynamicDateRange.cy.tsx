import DynamicDateRange, { IDynamicDateRangeOption } from '../../src/DynamicDateRange.js';
import SingleDate from '../../src/dynamic-date-range-options/SingleDate.js';
import DateRange from '../../src/dynamic-date-range-options/DateRange.js';
import Today from '../../src/dynamic-date-range-options/Today.js';
import LastOptions from '../../src/dynamic-date-range-options/LastOptions.js';
import NextOptions from '../../src/dynamic-date-range-options/NextOptions.js';

describe('DynamicDateRange Component', () => {
    beforeEach(() => {
       cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE">
        </DynamicDateRange>
       );
    });

    it('renders the DynamicDateRange component', () => {
        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");
    
        cy.get("@input")
            .should('exist');
    
        cy.get("@input")
            .find('[ui5-icon]')
            .as("icon");
        
        cy.get("@icon")
            .should('have.attr', 'name', 'appointment-2');
    });

    it('displays all options correctly', () => {
        const mockOptions: Array<IDynamicDateRangeOption> = [
            new Today(),
            new SingleDate(),
            new DateRange()
        ];

        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");
    
        cy.get("@input")
            .should('exist');
    
        cy.get("@input")
            .find('[ui5-icon]')
            .as("icon");

        cy.get("@icon")
            .realClick(); // Open the picker

        cy.get("@ddr")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .should('exist');

        cy.get("@popover")
            .find("[ui5-list]")
            .as("list");

        cy.get('@list')
            .find("[ui5-li]")
            .as("listItems");

        cy.get("@listItems")
            .should('have.length', mockOptions.length);

        mockOptions.forEach((option, index) => {
            cy.get('@listItems')
                .eq(index)
                .should('contain.text', option.text);
        });
    });

    it('selects an option and updates the current value', () => {
        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");
    
        cy.get("@input")
            .should('exist');
    
        cy.get("@input")
            .find('[ui5-icon]')
            .as("icon");

        cy.get("@icon")
            .realClick(); // Open the picker

        cy.get("@ddr")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .should('exist');

        cy.get("@popover")
            .find("[ui5-list]")
            .as("list");

        cy.get('@list')
            .find("[ui5-li]")
            .as("listItems");

        cy.get("@listItems")
            .contains('Today')
            .realClick();

        cy.get("@input")
            .should('have.value', 'Today');
    });

    it('handles selection change correctly', () => {
        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");

        cy.get("@input")
            .shadow()
            .find("input")
            .as("innerInput");
    
        cy.get("@input")
            .should('exist');

        cy.get("@innerInput")
            .realClick();

        cy.get("@innerInput")
            .realType("Today");

        cy.get("@innerInput")
            .realPress("Enter");

        cy.get("@innerInput")
            .should('have.value', 'Today');
    });

    it.skip('selects the Date option and updates the current value', () => {
        cy.window().then((win) => {
            cy.stub(win.Date, 'now').returns(new Date(2025, 4, 15).getTime());
          });

        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");

        cy.get("@input")
            .shadow()
            .find("input")
            .as("innerInput");
    
        cy.get("@input")
            .should('exist');
    
        cy.get("@input")
            .find('[ui5-icon]')
            .as("icon");

        cy.get("@icon")
            .realClick();
    
        cy.get("@ddr")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .should('exist');

        cy.get("@popover")
            .find("[ui5-list]")
            .as("list");

        cy.get("@list")
            .find("[ui5-li]")
            .contains('Date')
            .realClick();
    
        cy.get("@popover")
            .find("[ui5-calendar]")
            .as("calendar");

        cy.get("@calendar")
            .should('exist');
    
        cy.get("@calendar")
            .shadow()
            .find("ui5-daypicker")
            .as("dayPicker");

        cy.get("@dayPicker")
            .shadow()
            .find("div[data-sap-timestamp='1747785600']")
            .realClick();

        cy.get("@popover")
            .find("[ui5-button][design='Emphasized']")
            .as("submitButton");

        cy.get("@submitButton")
            .should('exist')
            .realClick();

        cy.get("@innerInput")
            .should('have.value', 'May 21, 2025');
    });

    it.skip('writes a date in the input and verifies it is selected in the calendar for the Date option', () => {
        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");

        cy.get("@input")
            .shadow()
            .find("input")
            .as("innerInput");
    
        cy.get("@input")
            .should('exist');
    
        cy.get("@innerInput")
            .clear()
            .realType('May 15, 2025');

        cy.realPress("Enter");

        cy.get("@input")
            .find('[ui5-icon]')
            .as("icon");

        cy.get("@icon")
            .realClick();

        cy.get("@ddr")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .should('exist');

        cy.get("@popover")
            .find("[ui5-list]")
            .as("list");

        cy.get("@list")
            .find("[ui5-li]")
            .contains('Date')
            .realClick();
    
        cy.get("@popover")
            .find("[ui5-calendar]")
            .as("calendar");

        cy.get("@calendar")
            .should('exist');
    
        cy.get("@calendar")
            .shadow()
            .find("ui5-daypicker")
            .as("dayPicker");

        cy.get("@dayPicker")
            .shadow()
            .find("div[data-sap-timestamp='1747267200']")
            .should('have.class', 'ui5-dp-item--selected'); // Timestamp for May 15, 2025
    });
});

describe('DynamicDateRange Last/Next Options', () => {
    beforeEach(() => {
        cy.mount(<DynamicDateRange options="LASTDAYS, NEXTWEEKS, LASTMONTHS">
        </DynamicDateRange>
        );
    });

    it('selects Last X Days option with custom number input', () => {
        // Instantiate options to ensure they're registered with DynamicDateRange
        new LastOptions();
        new NextOptions();

        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");

        cy.get("@input")
            .shadow()
            .find("input")
            .as("innerInput");

        cy.get("@input")
            .find('[ui5-icon]')
            .as("icon");

        cy.get("@icon")
            .realClick();

        cy.get("@ddr")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .should('exist');

        cy.get("@popover")
            .find("[ui5-list]")
            .as("list");

        cy.get("@list")
            .find("[ui5-li]")
            .as("listItems");

        cy.get("@listItems")
            .should('have.length', 2); // Since we unified the options, we only have 2 options

        // Select the first option (Last X Days / Months)
        cy.get("@listItems")
            .first()
            .realClick();

        cy.get("@popover")
            .find("[slot='header']")
            .should('contain.text', 'Last X');

        cy.get("@popover")
            .find("[ui5-step-input]")
            .as("stepInput");

        cy.get("@stepInput")
            .should('exist');

        cy.get("@stepInput")
            .shadow()
            .find("[ui5-input]")
            .shadow()
            .find("input")
            .as("stepInputInner");

        cy.get("@stepInputInner")
            .clear()
            .realType('7');

        cy.get("@popover")
            .find("[ui5-button][design='Emphasized']")
            .as("submitButton");

        cy.get("@submitButton")
            .realClick();

        cy.get("@innerInput")
            .should('have.value', 'Last 7 Days');
    });

    it('handles Next X Weeks option and verifies date range calculation', () => {
        new LastOptions();
        new NextOptions();

        cy.window().then((win) => {
            cy.stub(win.Date, 'now').returns(new Date(2025, 5, 15).getTime()); // June 15, 2025
        });

        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");

        cy.get("@input")
            .shadow()
            .find("input")
            .as("innerInput");

        cy.get("@input")
            .find('[ui5-icon]')
            .as("icon");

        cy.get("@icon")
            .realClick();

        cy.get("@ddr")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .find("[ui5-list]")
            .as("list");

        cy.get("@list")
            .find("[ui5-li]")
            .as("listItems");

        cy.get("@listItems")
            .last()
            .realClick();

        cy.get("@popover")
            .find("[slot='header']")
            .should('contain.text', 'Next X');

        cy.get("@popover")
            .find("[ui5-step-input]")
            .as("stepInput");

        cy.get("@stepInput")
            .shadow()
            .find("[ui5-input]")
            .shadow()
            .find("input")
            .as("stepInputInner");

        cy.get("@stepInputInner")
            .clear()
            .realType('3');

        cy.get("@stepInputInner")
            .realPress("Enter");

        cy.get("@popover")
            .find(".ui5-ddr-current-value")
            .should('contain.text', 'Selected:');

        cy.get("@popover")
            .find("[ui5-button][design='Emphasized']")
            .as("submitButton");

        cy.get("@submitButton")
            .realClick();

        cy.get("@innerInput")
            .should('have.value', 'Next 3 Weeks');
    });

    it('validates text input for Last X Months and parses correctly', () => {
        cy.get('[ui5-dynamic-date-range]')
            .as("ddr");

        cy.get("@ddr")
            .shadow()
            .find('[ui5-input]')
            .as("input");

        cy.get("@input")
            .shadow()
            .find("input")
            .as("innerInput");

        cy.get("@innerInput")
            .clear()
            .realType('Last 6 Days');

        cy.get("@innerInput")
            .realPress("Enter");

        cy.get("@innerInput")
            .should('have.value', 'Last 6 Days');

        cy.get("@input")
            .find('[ui5-icon]')
            .as("icon");

        cy.get("@icon")
            .realClick();

        cy.get("@ddr")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .find("[ui5-list]")
            .as("list");

        cy.get("@list")
            .find("[ui5-li]")
            .contains("Last X Days / Months")
            .should('have.attr', 'selected');
    });
});