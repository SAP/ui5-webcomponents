import Tree from "../../src/Tree.js";
import "../../src/TreeItem.js";
import TreeItem from "../../src/TreeItem.js";
import Icon from "../../src/Icon.js";
import bell from "@ui5/webcomponents-icons/dist/bell.js";

describe("Tree Tests", () => {
	it("tests accessibility properties forwarded to the list", () => {
		cy.mount(
			<>
				<Tree
					accessibleName="Tree"
					accessibleNameRef="lblDesc1"
					accessibleDescription="Description"
					accessibleDescriptionRef="lblDesc2"
				></Tree>
				<div id="lblDesc1">Tree</div>
				<div id="lblDesc2">Description</div>
			</>
		);

		cy.get("[ui5-tree]")
			.as("tree");

		cy.get("@tree")
			.shadow()
			.find(".ui5-tree-root")
			.should("have.attr", "accessible-name", "Tree")
			.and("have.attr", "accessible-name-ref", "lblDesc1")
			.and("have.attr", "accessible-description", "Description")
			.and("have.attr", "accessible-description-ref", "lblDesc2");
	});

	it("Tests image slot", () => {
		cy.mount(
			<Tree>
				<TreeItem id="image-slot-tree-item">
					<Icon name={bell} slot="image" id="slotted-icon"></Icon>
				</TreeItem>
			</Tree>
		);

		cy.get("#image-slot-tree-item")
			.shadow()
			.find("slot[name='image']")
			.should("exist")
			.then($slot => {
				const slotElement = $slot[0] as HTMLSlotElement;
				const assignedNodes = slotElement.assignedNodes();
				expect(assignedNodes.length).to.be.greaterThan(0);
				cy.wrap(assignedNodes[0]).should("have.attr", "id", "slotted-icon");
			});
	});
});

describe("Tree Props", () => {
	it("noDataText is properly rendered", () => {
		cy.mount(
			<>
				<Tree noDataText="No data"></Tree>
			</>
		);

		cy.get("[ui5-tree]")
			.shadow()
			.find("[ui5-tree-list]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.find(".ui5-list-nodata")
			.should("exist")
	});
});
