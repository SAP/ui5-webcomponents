import DynamicDateRange from '../../src/DynamicDateRange.js';
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
        cy.get('ui5-input').should('exist');
        cy.get('ui5-icon').should('have.attr', 'name', 'appointment-2');
    });

    it('displays all options correctly', () => {
        const mockOptions = [
            new DynamicDateOptionDate(),
            new DynamicDateOptionToday(),
            new DynamicDateOptionDateRange()
        ];
        cy.get('ui5-input').as("input");
        cy.get("@input").get("ui5-icon").as("icon");
        cy.get("@icon").realClick(); // Open the picker
        cy.get('ui5-list ui5-li').should('have.length', mockOptions.length);

        mockOptions.forEach((option, index) => {
            cy.get('ui5-list ui5-li').eq(index).should('contain.text', option.text);
        });
    });

    // it('selects an option and updates the current value', () => {
    //     cy.get('ui5-input').click(); // Open the picker
    //     cy.get('ui5-list ui5-li').contains('Today').click();

    //     cy.get('@component').then((component: any) => {
    //         expect(component._currentOption?.key()).to.equal('TODAY');
    //     });
    // });

    // it('toggles the picker open and close', () => {
    //     cy.get('ui5-input').click(); // Open the picker
    //     cy.get('ui5-list').should('be.visible');

    //     cy.get('ui5-input').click(); // Close the picker
    //     cy.get('ui5-list').should('not.exist');
    // });

    // it('handles selection change correctly', () => {
    //     cy.get('ui5-input').click(); // Open the picker
    //     cy.get('ui5-list ui5-li').contains('Yesterday').click();

    //     cy.get('@component').then((component: any) => {
    //         expect(component._currentOption?.key()).to.equal('YESTERDAY');
    //         expect(component.currentValue?.operator).to.equal('YESTERDAY');
    //     });
    // });
});