import DynamicDateRange from '../../src/DynamicDateRange.js';
// import "../../dist/Assets.js";
import DynamicDateOptionDate from '../../src/dynamic-date-range-options/DynamicDateRangeOptionDate.js';
import DynamicDateOptionDateRange from '../../src/dynamic-date-range-options/DynamicDateRangeOptionDateRange.js';
import DynamicDateOptionToday from '../../src/dynamic-date-range-options/DynamicDateRangeOptionToday.js';

describe('DynamicDateRange Component', () => {
    beforeEach(() => {
       cy.mount(<DynamicDateRange>
            <DynamicDateOptionDate/>
            <DynamicDateOptionToday/>
            <DynamicDateOptionDateRange/>
        </DynamicDateRange>
       );
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
            new DynamicDateOptionDate(),
            new DynamicDateOptionToday(),
            new DynamicDateOptionDateRange()
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
});