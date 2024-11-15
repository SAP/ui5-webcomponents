import { html } from 'lit';

describe("Table - RowActions", () => {
	const tableHTML = html`
		<ui5-table id="table" overflow-mode="Scroll" sticky-top="50px" row-action-count="1" accessible-name-ref="title">
			<ui5-table-selection id="selection" selected="0 2" slot="features"></ui5-table-selection>
			<ui5-table-header-row slot="headerRow">
				<ui5-table-header-cell id="rowNum" min-width="100px">Row Nr</ui5-table-header-cell>
				<ui5-table-header-cell id="priceCol" min-width="100px">Navigation</ui5-table-header-cell>
				<ui5-table-header-cell id="TestCol1" min-width="100px">Actions</ui5-table-header-cell>
				<ui5-table-row-action slot="actions" type="Navigation"></ui5-table-row-action>
			</ui5-table-header-row>
			<ui5-table-row row-key="0" navigated>
				<ui5-table-cell><ui5-label>Row 0</ui5-label></ui5-table-cell>	
				<ui5-table-cell><ui5-label>0 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>0 Actions</ui5-label></ui5-table-cell>
			</ui5-table-row>
			<ui5-table-row row-key="1" navigated>
				<ui5-table-cell><ui5-label>Row 1</ui5-label></ui5-table-cell>	
				<ui5-table-cell><ui5-label>1 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>0 Actions</ui5-label></ui5-table-cell>
				<ui5-table-row-action slot="actions" type="Navigation"></ui5-table-row-action>
			</ui5-table-row>
			<ui5-table-row row-key="2" navigated>
				<ui5-table-cell><ui5-label>Row 2</ui5-label></ui5-table-cell>	
				<ui5-table-cell><ui5-label>0 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>1 Actions</ui5-label></ui5-table-cell>
				<ui5-table-row-action action-id="action0" slot="actions" icon="database" tooltip="Delete"></ui5-table-row-action>
			</ui5-table-row>
			<ui5-table-row row-key="3" navigated>
				<ui5-table-cell><ui5-label>Row 3</ui5-label></ui5-table-cell>	
				<ui5-table-cell><ui5-label>0 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>2 Actions</ui5-label></ui5-table-cell>
				<ui5-table-row-action action-id="action0" slot="actions" icon="database" tooltip="Delete"></ui5-table-row-action>
				<ui5-table-row-action action-id="action0" slot="actions" icon="add" tooltip="add"></ui5-table-row-action>
			</ui5-table-row>
			<ui5-table-row row-key="4" navigated>
				<ui5-table-cell><ui5-label>Row 4</ui5-label></ui5-table-cell>	
				<ui5-table-cell><ui5-label>0 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>3 Actions</ui5-label></ui5-table-cell>
				<ui5-table-row-action action-id="action0" slot="actions" icon="database" tooltip="Delete"></ui5-table-row-action>
				<ui5-table-row-action action-id="action0" slot="actions" icon="add" tooltip="add"></ui5-table-row-action>
				<ui5-table-row-action action-id="action22" slot="actions" icon="heart" tooltip="Add"></ui5-table-row-action>
			</ui5-table-row>
			<ui5-table-row row-key="5" navigated>
				<ui5-table-cell><ui5-label>Row 5</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>1 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>1 Action</ui5-label></ui5-table-cell>
				<ui5-table-row-action action-id="action0" slot="actions" icon="database" tooltip="Delete"></ui5-table-row-action>
				<ui5-table-row-action slot="actions" type="Navigation"></ui5-table-row-action>
			</ui5-table-row>
			<ui5-table-row row-key="6" navigated>
				<ui5-table-cell><ui5-label>Row 6</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>1 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>2 Actions</ui5-label></ui5-table-cell>
				<ui5-table-row-action action-id="action1" slot="actions" icon="da" tooltip="TestAction1"></ui5-table-row-action>
				<ui5-table-row-action action-id="action2" slot="actions" icon="add" tooltip="Add"></ui5-table-row-action>
				<ui5-table-row-action slot="actions" type="Navigation"></ui5-table-row-action>
			</ui5-table-row>
			<ui5-table-row row-key="7" navigated>
				<ui5-table-cell><ui5-label>Row 7</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>1 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>3 Actions</ui5-label></ui5-table-cell>
				<ui5-table-row-action action-id="action21" slot="actions" icon="da" tooltip="TestAction1"></ui5-table-row-action>
				<ui5-table-row-action action-id="action22" slot="actions" icon="add" tooltip="Add"></ui5-table-row-action>
				<ui5-table-row-action action-id="action22" slot="actions" icon="heart" tooltip="Add"></ui5-table-row-action>
				<ui5-table-row-action slot="actions" type="Navigation"></ui5-table-row-action>
			</ui5-table-row>
			<ui5-table-row row-key="8" navigated>
				<ui5-table-cell><ui5-label>Row 8</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>1 Navigation</ui5-label></ui5-table-cell>
				<ui5-table-cell><ui5-label>6 Actions</ui5-label></ui5-table-cell>
				<ui5-table-row-action action-id="action3" slot="actions" icon="pixelate" tooltip="Delete"></ui5-table-row-action>
				<ui5-table-row-action action-id="action4" slot="actions" icon="add" tooltip="Add"></ui5-table-row-action>
				<ui5-table-row-action action-id="action5" slot="actions" icon="disconnected" tooltip="Navigation"></ui5-table-row-action>
				<ui5-table-row-action action-id="action6" slot="actions" icon="detail-more" tooltip="TestAction1"></ui5-table-row-action>
				<ui5-table-row-action action-id="action7" slot="actions" icon="goal" tooltip="Delete"></ui5-table-row-action>
				<ui5-table-row-action action-id="action8" slot="actions" icon="heart" tooltip="TestAction1"></ui5-table-row-action>
				<ui5-table-row-action slot="actions" type="Navigation"></ui5-table-row-action>
			</ui5-table-row>
		</ui5-table>`;

	function checkRowActionClickAttribute(attributeName, attributeValue) {
		cy.get("@rowActionClick").then((stub) => {
			const event = stub.getCall(0).args[0];
			const targetElement = event.detail.action;
			expect(targetElement).to.have.attr(attributeName, attributeValue);
		});
	}

	it("tests RowActions are displayed", () => {
		cy.mount(tableHTML);

		// TODO: chainge the logic to fit new menu
		// limit count of visible row actions to 1
		cy.get('ui5-table[row-action-count="1"]').should("exist");
		
		// Row 0: 0 Navigation	0 Actions
		cy.get("[ui5-table]").get('[row-key="0"]').find('ui5-table-row-action[type="Navigation"]').should("not.exist");
		cy.get("[ui5-table]").get('[row-key="0"]').find("[ui5-table-row-action]").should("not.exist");
		
		// Row 1: 1 Navigation	0 Actions
		cy.get("[ui5-table]").get('[row-key="1"]').find('ui5-table-row-action[type="Navigation"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="1"]').find('ui5-table-row-action').should("have.length", 1);

		// Row 2: 0 Navigation	1 Actions
		cy.get("[ui5-table]").get('[row-key="2"]').find('ui5-table-row-action[type="Navigation"]').should("not.exist");
		cy.get("[ui5-table]").get('[row-key="2"]').find('ui5-table-row-action[icon="database"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="2"]').find('ui5-table-row-action').should("have.length", 1);

		// Row 3: 0 Navigation	2 Actions
		cy.get("[ui5-table]").get('[row-key="3"]').find('ui5-table-row-action[type="Navigation"]').should("not.exist");
		cy.get("[ui5-table]").get('[row-key="3"]').find('ui5-table-row-action[icon="database"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="3"]').find('>ui5-table-row-action').should("have.length", 2);

		// Row 4: 0 Navigation	3 Actions
		cy.get("[ui5-table]").get('[row-key="4"]').find('ui5-table-row-action[type="Navigation"]').should("not.exist");
		cy.get("[ui5-table]").get('[row-key="4"]').find('ui5-table-row-action[icon="database"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="4"]').find('ui5-table-row-action[icon="add"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="4"]').find('ui5-table-row-action[icon="heart"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="4"]').find('>ui5-table-row-action').should("have.length", 3);

		// Row 5: 1 Navigation	1 Action
		cy.get("[ui5-table]").get('[row-key="5"]').find('ui5-table-row-action[type="Navigation"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="5"]').find('ui5-table-row-action[icon="database"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="5"]').find('>ui5-table-row-action').should("have.length", 2);

		// Row 6: 1 Navigation	2 Actions
		cy.get("[ui5-table]").get('[row-key="6"]').find('ui5-table-row-action[type="Navigation"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="6"]').find('ui5-table-row-action[icon="da"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="6"]').find('ui5-table-row-action[icon="add"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="6"]').find('ui5-table-row-action').should("have.length", 3);

		// Row 7: 1 Navigation	3 Actions
		cy.get("[ui5-table]").get('[row-key="7"]').find('ui5-table-row-action[type="Navigation"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="7"]').find('ui5-table-row-action[icon="da"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="7"]').find('ui5-table-row-action[icon="add"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="7"]').find('ui5-table-row-action[icon="heart"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="7"]').find('ui5-table-row-action').should("have.length", 4);

		// Row 8: 1 Navigation	6 Actions
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action[type="Navigation"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action[icon="pixelate"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action[icon="add"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action[icon="add"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action[icon="disconnected"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action[icon="detail-more"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action[icon="goal"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action[icon="heart"]').should("exist");
		cy.get("[ui5-table]").get('[row-key="8"]').find('ui5-table-row-action').should("have.length", 7);

		// TODO: check the action popover if exists
	});

	// TODO: check click events of rowActions, Navigation, Popover	trigger, and rowActions in popover
	it("tests RowActions fire row-action-click ", () => {
		cy.mount(tableHTML);
		cy.get("[ui5-table]").then((table) => {	
			table.get(0).addEventListener("row-action-click", cy.stub().as("rowActionClick"));
		});
		cy.get("[ui5-table]").get('[row-key="1"]').find('ui5-table-row-action[type="Navigation"]').shadow().find("ui5-button").shadow().find("button").click({force: true});
		cy.get("@rowActionClick").should("have.callCount", 1);
		checkRowActionClickAttribute('type', 'Navigation');

		cy.get("[ui5-table]").get('[row-key="2"]').find('ui5-table-row-action[icon="database"]').shadow().find("ui5-button").shadow().find("button").click({force: true});;
		cy.get("@rowActionClick").should("have.callCount", 2);
		checkRowActionClickAttribute('icon', 'database');


	});

	// TODO: check positioning
	// TOOD: 

});