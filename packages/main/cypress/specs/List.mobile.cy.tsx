import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";

describe("List Mobile Tests", () => {
    before(() => {
        cy.ui5SimulateDevice("phone");
    });

    it("adjusts maxCharacters based on viewport size for wrapping list items", () => {
        const longText = "This is a very long text that exceeds 100 characters but is less than 300 characters. This sentence is just to add more text to ensure we pass the 100 character threshold. And now we're adding even more text to be extra certain.";

        cy.mount(
            <List>
                <ListItemStandard id="wrapping-item" wrapping text={longText}></ListItemStandard>
            </List>
        );

        // Get the list item and check its media range
        cy.get("#wrapping-item")
            .invoke('prop', 'mediaRange')
            .should('eq', 'S');

        // Check that ExpandableText is created with maxCharacters prop of 100
        cy.get("#wrapping-item")
            .shadow()
            .find("ui5-expandable-text")
            .first()
            .invoke('prop', 'maxCharacters')
            .should('eq', 100);
    });
});