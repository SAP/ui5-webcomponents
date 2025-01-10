/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable newline-per-chained-call */
import "../../src/Table.js";
import "../../src/TableHeaderRow.js";
import "../../src/TableHeaderCell.js";
import "../../src/TableRow.js";
import "../../src/TableCell.js";
import "../../src/TableRowAction.js";
import "../../src/TableRowActionNavigation.js";
import "../../src/Menu.js";
import "../../src/MenuItem.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/share.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

describe("TableRowActions", () => {
	function mountTable(rowActionCount = 0, rows = "") {
		cy.mount(`
			<ui5-table row-action-count="${rowActionCount}">
				<ui5-table-header-row slot="headerRow"></ui5-table-header-row>
				${rows}
			</ui5-table>
		`);

		cy.get("[ui5-table]").as("table").children("ui5-table-row").as("rows");
		cy.get("@table").children("ui5-table-header-row").first().as("headerRow");
		cy.get("@table").shadow().find("#table").as("innerTable");
		cy.get("@rows").then($rows => {
			$rows.each(index => {
				cy.get("@rows").eq(index).as(`row${index + 1}`);
			});
		});
		cy.get("@table").then($table => {
			$table[0].addEventListener("row-action-click", cy.stub().as("rowActionClick"));
		});
	}

	describe("Rendering", () => {
		it("tests single row action", () => {
			mountTable(1, `
				<ui5-table-row id="addRow">
					<ui5-table-row-action slot="actions" id="addAction" icon="add" text="Add"></ui5-table-row-action>
				</ui5-table-row>
				<ui5-table-row>
					<ui5-table-row-action slot="actions" icon="add" text="Add" invisible></ui5-table-row-action>
				</ui5-table-row>
				<ui5-table-row>
					<ui5-table-row-action-navigation slot="actions"></ui5-table-row-action-navigation>
				</ui5-table-row>
				<ui5-table-row id="navigationRow">
					<ui5-table-row-action-navigation slot="actions" id="navigationAction" interactive></ui5-table-row-action-navigation>
				</ui5-table-row>
			`);

			cy.get("@headerRow").shadow().find("#actions-cell").should("exist");
			cy.get("@innerTable").should("have.css", "gridTemplateColumns", `${8 + 36 + 8}px`);
			cy.get("@row1").find("[icon=add]").shadow().find("ui5-button").should("exist");
			cy.get("@row2").find("[icon=add]").should("have.css", "display", "block");
			cy.get("@row3").find("ui5-table-row-action-navigation").shadow().find("ui5-icon").should("have.attr", "name", "navigation-right-arrow");
			cy.get("@row4").find("ui5-table-row-action-navigation").shadow().find("ui5-button").should("have.attr", "icon", "navigation-right-arrow");

			cy.get("#addAction").realClick();
			cy.get("@rowActionClick").invoke("getCall", 0).its("args.0.detail.row.id").should("equal", "addRow");
			cy.get("@rowActionClick").invoke("getCall", 0).its("args.0.detail.action.id").should("equal", "addAction");
			cy.get("#navigationAction").realClick();
			cy.get("@rowActionClick").invoke("getCall", 1).its("args.0.detail.row.id").should("equal", "navigationRow");
			cy.get("@rowActionClick").invoke("getCall", 1).its("args.0.detail.action.id").should("equal", "navigationAction");

			cy.get("@table").invoke("attr", "row-action-count", "0");
			cy.get("@headerRow").shadow().find("#actions-cell").should("not.exist");
			cy.get("@row1").shadow().find("#actions-cell").should("not.exist");
		});

		it("tests multiple row actions - all visible", () => {
			mountTable(2, `
				<ui5-table-row>
					<ui5-table-row-action-navigation slot="actions" interactive></ui5-table-row-action-navigation>
					<ui5-table-row-action slot="actions" id="addAction" icon="add" text="Add"></ui5-table-row-action>
					<ui5-table-row-action slot="actions" id="editAction" icon="edit" text="Edit"></ui5-table-row-action>
					<ui5-table-row-action slot="actions" icon="delete" text="Delete"></ui5-table-row-action>
				</ui5-table-row>
			`);

			cy.get("@headerRow").shadow().find("#actions-cell").should("exist");
			cy.get("@innerTable").should("have.css", "gridTemplateColumns", `${8 + 36 + 4 + 36 + 8}px`);
			cy.get("@row1").shadow().find("#actions-cell").children().as("actions");
			cy.get("@actions").should("have.length", 2);
			cy.get("@actions").eq(0).as("overflowButton");
			cy.get("@overflowButton").should("have.attr", "ui5-button");
			cy.get("@overflowButton").and("have.attr", "icon", "overflow");
			cy.get("@actions").eq(1).should("have.attr", "name", "actions-1");

			cy.get("@overflowButton").realClick();
			cy.wait(200);
			cy.get("ui5-menu").should("exist");
			cy.get("[ui5-menu-item]").as("menuItems").should("have.length", 3);
			cy.get("@menuItems").eq(0).should("have.attr", "text", "Add").and("have.attr", "icon", "add");
			cy.get("@menuItems").eq(1).should("have.attr", "text", "Edit").and("have.attr", "icon", "edit");
			cy.get("@menuItems").eq(2).should("have.attr", "text", "Delete").and("have.attr", "icon", "delete");

			cy.get("@menuItems").eq(0).ui5MenuItemClick();
			cy.get("@rowActionClick").invoke("getCall", 0).its("args.0.detail.action.id").should("equal", "addAction");
			cy.get("ui5-menu").invoke("get", 0).its("open").should("be.false");

			cy.get("@overflowButton").realClick();
			cy.wait(200);
			cy.get("ui5-menu").should("have.length", 1);
			cy.get("[ui5-menu-item]").as("menuItems").should("have.length", 3);
			cy.get("@menuItems").eq(1).ui5MenuItemClick();
			cy.get("@rowActionClick").invoke("getCall", 1).its("args.0.detail.action.id").should("equal", "editAction");

			cy.get("@table").invoke("attr", "row-action-count", "3");
			cy.get("@innerTable").should("have.css", "gridTemplateColumns", `${8 + 36 + 4 + 36 + 4 + 36 + 8}px`);
			cy.get("@actions").should("have.length", 3);
			cy.get("@actions").eq(0).should("have.attr", "name", "actions-2");
			cy.get("@actions").eq(1).as("overflowButton").should("have.attr", "icon", "overflow");
			cy.get("@actions").eq(2).should("have.attr", "name", "actions-1");
			cy.get("@overflowButton").realClick();
			cy.wait(200);
			cy.get("[ui5-menu-item]").as("menuItems").should("have.length", 2);
			cy.get("@menuItems").eq(0).should("have.attr", "text", "Edit").and("have.attr", "icon", "edit");
			cy.get("@menuItems").eq(1).should("have.attr", "text", "Delete").and("have.attr", "icon", "delete");
			cy.get("@menuItems").eq(0).ui5MenuItemClick();
			cy.get("@rowActionClick").invoke("getCall", 2).its("args.0.detail.action.id").should("equal", "editAction");

			cy.get("@table").invoke("attr", "row-action-count", "4");
			cy.get("@innerTable").should("have.css", "gridTemplateColumns", `${8 + 36 + 4 + 36 + 4 + 36 + 4 + 36 + 8}px`);
			cy.get("@actions").should("have.length", 4);
			cy.get("@actions").eq(0).should("have.attr", "name", "actions-2");
			cy.get("@actions").eq(1).should("have.attr", "name", "actions-3");
			cy.get("@actions").eq(2).should("have.attr", "name", "actions-4");
			cy.get("@actions").eq(3).should("have.attr", "name", "actions-1");

			cy.get("@table").invoke("attr", "row-action-count", "5");
			cy.get("@innerTable").should("have.css", "gridTemplateColumns", `${8 + 36 + 4 + 36 + 4 + 36 + 4 + 36 + 4 + 36 + 8}px`);
			cy.get("@actions").should("have.length", 4);
			cy.get("@row1").find("[slot=actions-4],[slot=actions-1]").then($lastActions => {
				const lastAction = $lastActions[0];
				const penultimateAction = $lastActions[1];
				const distanceBetweenLastActions = lastAction.getBoundingClientRect().left - penultimateAction.getBoundingClientRect().right;
				return distanceBetweenLastActions > lastAction.clientWidth;
			}).should("be.true");

			cy.get("@table").invoke("attr", "row-action-count", "1");
			cy.get("@innerTable").should("have.css", "gridTemplateColumns", `${8 + 36 + 8}px`);
			cy.get("@actions").should("have.length", 1);
			cy.get("@actions").eq(0).should("have.attr", "icon", "overflow");
		});

		it("tests that invisible actions occupy space for alignment", () => {
			mountTable(3, `
				<ui5-table-row>
					<ui5-table-row-action slot="actions" icon="add" text="Add"></ui5-table-row-action>
					<ui5-table-row-action slot="actions" icon="edit" text="Edit" invisible></ui5-table-row-action>
					<ui5-table-row-action slot="actions" icon="delete" text="Delete"></ui5-table-row-action>
				</ui5-table-row>
			`);

			cy.get("@row1").find("ui5-table-row-action").then($actions => {
				const firstAction = $actions[0];
				const lastAction = $actions[2];
				const distanceBetweenActions = lastAction.getBoundingClientRect().left - firstAction.getBoundingClientRect().right;
				return distanceBetweenActions > lastAction.clientWidth;
			}).should("be.true");
		});

		it("tests that avoiding overflow is more important than aligment", () => {
			mountTable(3, `
				<ui5-table-row>
					<ui5-table-row-action slot="actions" icon="add" text="Add" invisible></ui5-table-row-action>
					<ui5-table-row-action slot="actions" icon="edit" text="Edit"></ui5-table-row-action>
					<ui5-table-row-action slot="actions" icon="delete" text="Delete"></ui5-table-row-action>
					<ui5-table-row-action slot="actions" icon="share" text="Share" invisible></ui5-table-row-action>
				</ui5-table-row>
			`);

			cy.get("@row1").shadow().find("#actions-cell").children().as("actions");
			cy.get("@actions").should("have.length", 2);
			cy.get("@actions").eq(0).should("have.attr", "name", "actions-2");
			cy.get("@actions").eq(1).should("have.attr", "name", "actions-3");
		});

		it("tests that the aligment of navigation is more important than avoiding overflow", () => {
			mountTable(3, `
				<ui5-table-row>
					<ui5-table-row-action-navigation slot="actions" invisible></ui5-table-row-action-navigation>
					<ui5-table-row-action slot="actions" icon="add" text="Add"></ui5-table-row-action>
					<ui5-table-row-action slot="actions" icon="edit" text="Edit"></ui5-table-row-action>
					<ui5-table-row-action slot="actions" icon="delete" text="Delete"></ui5-table-row-action>
				</ui5-table-row>
			`);

			cy.get("@row1").shadow().find("#actions-cell").children().as("actions");
			cy.get("@actions").should("have.length", 3);
			cy.get("@actions").eq(0).should("have.attr", "name", "actions-2");
			cy.get("@actions").eq(1).as("overflowButton").should("have.attr", "icon", "overflow");
			cy.get("@actions").eq(2).should("have.attr", "name", "actions-1");

			cy.get("@overflowButton").realClick();
			cy.wait(200);
			cy.get("ui5-menu").should("have.length", 1);
			cy.get("[ui5-menu-item]").as("menuItems").should("have.length", 2);
			cy.get("@menuItems").eq(0).should("have.attr", "text", "Edit").and("have.attr", "icon", "edit");
			cy.get("@menuItems").eq(1).should("have.attr", "text", "Delete").and("have.attr", "icon", "delete");
			cy.get("@menuItems").eq(0).ui5MenuItemPress("Enter");
			cy.get("@rowActionClick").invoke("getCall", 0).its("args.0.detail.action.icon").should("equal", "edit");
		});
	});
});
