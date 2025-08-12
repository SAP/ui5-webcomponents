import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";
import ListItemGroup from "../../src/ListItemGroup.js";

describe("Focus", () => {
	it("getFocusDomRef should return header element if available", () => {
		cy.mount(
			<List>
				<ListItemGroup headerText="Group Header">
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
					<ListItemStandard>Item 3</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get<ListItemGroup>("[ui5-li-group]")
			.then(($el) => {
				const group = $el[0];
				expect(group.getFocusDomRef()).to.have.attr("ui5-li-group-header");
			});

	});

	it("getFocusDomRef should return list item when header is not available", () => {
		cy.mount(
			<List>
				<ListItemGroup>
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
					<ListItemStandard>Item 3</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get<ListItemGroup>("[ui5-li-group]")
			.then(($el) => {
				const group = $el[0];
				expect(group.getFocusDomRef()).to.have.attr("ui5-li");
			});
	});
});
