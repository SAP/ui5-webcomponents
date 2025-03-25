import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";

describe("List Tests", () => {
	it("tests 'loadMore' event fired upon infinite scroll", () => {
		cy.mount(
			<List style="height: 300px;" growing="Scroll">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
				<ListItemStandard>Audio cabel</ListItemStandard>
				<ListItemStandard>DVD set</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
				<ListItemStandard>Audio cabel</ListItemStandard>
				<ListItemStandard id="lastItem">Last Item</ListItemStandard>
			</List>);

		cy.get("[ui5-list]")
			.as("list");

		cy.get<List>("@list")
			.then(list => {
				list.get(0).addEventListener("ui5-load-more", cy.stub().as("loadMore"));
			})
			.shadow()
			.find(".ui5-list-scroll-container")
			.as("scrollContainer")
			.scrollTo("bottom", { duration: 100 });

		cy.get("@loadMore")
			.should("have.been.calledOnce");
	});

	it("Arrow down and up navigation between last item and growing button", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.as("list");

		// Click the last item to set focus
		cy.get("@list")
			.find("ui5-li")
			.last()
			.click();

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");

		// Press arrow down once to move focus to the growing button
		cy.realPress("ArrowDown");

		// Verify the growing button is focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		// Arrow up once to move focus back to the last item
		cy.realPress("ArrowUp");

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");
	});

	it("Home key on growing button moves focus to first item", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.as("list");

		// Click the growing button to set focus
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.click();

		// Wait for the growing button to be focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		// Press Home key to move focus to the first item
		cy.realPress("Home");

		// Verify the first item is focused
		cy.get("@list")
			.find("ui5-li")
			.first()
			.should("be.focused");
	});

	it("End key navigation moves focus from first item to last item and then to growing button", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.as("list");

		// Click the first item to set focus
		cy.get("@list")
			.find("ui5-li")
			.first()
			.click();

		// Wait for the first item to be focused
		cy.get("@list")
			.find("ui5-li")
			.first()
			.should("be.focused");

		// Press End key to move focus to the last item
		cy.realPress("End");

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");

		// Press End key again to move focus to the growing button
		cy.realPress("End");

		// Verify the growing button is focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");
	});
});

describe("List - Accessibility", () => {
	it("tests active state announcement", () => {
		cy.mount(
			<List>
				<ListItemStandard type="Active" id="active">Laptop Lenovo</ListItemStandard>
				<ListItemStandard type="Inactive" id="inactive">Laptop Lenovo</ListItemStandard>
			</List>
		);

		// assert
		cy.get("#active").invoke("prop", "_id").then(_id => {
			cy.get("#active")
				.shadow()
				.find(`#${_id}-invisibleText`)
				.should("have.text", "Is Active");
		});

		cy.get("#inactive").invoke("prop", "_id").then(_id => {
			cy.get("#inactive")
				.shadow()
				.find(`#${_id}-invisibleText`)
				.should("not.have.text", "Is Active");
		});
	});
});
