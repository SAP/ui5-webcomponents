import { html } from 'lit';

describe("Table - loading", () => {
	it("tests busy indicator is displayed", () => {
		cy.mount(html`
		<input id="before">
		<ui5-table loading loading-delay="0">
		<ui5-table-header-row slot="headerRow">
			<ui5-table-header-cell ><span>ColumnA</span></ui5-table-header-cell>
		</ui5-table-header-row>
		<ui5-table-row>
			<ui5-table-cell><ui5-label>Cell A</ui5-label></ui5-table-cell>
		</ui5-table-row>
	</ui5-table>
	<input id="after">`)

		cy.get("#before")
			.realClick();

		cy.get("#before")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-table]")
			.shadow()
			.find("#loading")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("#after")
			.should("be.focused");
	});
});