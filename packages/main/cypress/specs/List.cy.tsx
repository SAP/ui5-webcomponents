import type UI5Element from "@ui5/webcomponents-base";
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
				list.get(0)?.addEventListener("ui5-load-more", cy.stub().as("loadMore"));
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

describe("List - Wrapping Behavior", () => {
	it("renders list items with wrapping functionality", () => {
		const longText = "This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components; This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components; This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components; This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components; This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components";
		const longDescription = "This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well";
		
		cy.mount(
			<List>
				<ListItemStandard id="wrapping-item" wrappingType="Normal" text={longText} description={longDescription}></ListItemStandard>
			</List>
		);

		// Check wrapping attributes are set correctly
		cy.get("#wrapping-item")
			.should("have.attr", "wrapping-type", "Normal");
		
		// Check that ExpandableText components are present in the wrapping item
		cy.get("#wrapping-item")
			.shadow()
			.find("ui5-expandable-text")
			.should("exist")
			.and("have.length", 2);
	});

	it("uses maxCharacters of 300 on desktop viewport for wrapping list items", () => {
		const longText = "This is a very long text that exceeds 100 characters but is less than 300 characters. This sentence is just to add more text to ensure we pass the 100 character threshold. And now we're adding even more text to be extra certain that we have enough content to demonstrate the behavior properly. And now we're adding even more text to be extra certain that we have enough content to demonstrate the behavior properly. And now we're adding even more text to be extra certain that we have enough content to demonstrate the behavior properly.";
		
		cy.mount(
			<List>
				<ListItemStandard id="wrapping-item" wrappingType="Normal" text={longText}></ListItemStandard>
			</List>
		);

		// Check that ExpandableText is created with maxCharacters prop of 300
		cy.get("#wrapping-item")
			.shadow()
			.find("ui5-expandable-text")
			.first()
			.invoke('prop', 'maxCharacters')
			.should('eq', 300);
	});

	it("should render different nodes based on wrappingType prop", () => {
		const longText = "This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. And now we're adding even more text to be extra certain that we have enough content to demonstrate the behavior properly.";
		
		// First render with wrapping enabled
		cy.mount(
			<List>
				<ListItemStandard id="wrapping-item" wrappingType="Normal" text={longText}></ListItemStandard>
			</List>
		);

		// Check that wrapping-type attribute is set to Normal
		cy.get("#wrapping-item")
			.should("have.attr", "wrapping-type", "Normal");

		// Should have expandable text component when wrapping is enabled
		cy.get("#wrapping-item")
			.shadow()
			.find("ui5-expandable-text")
			.should("exist");

		// Set wrappingType to None
		cy.get("#wrapping-item")
			.then($el => {
				$el[0].setAttribute("wrapping-type", "None");
			});

		// Check that wrapping-type attribute is set to None
		cy.get("#wrapping-item")
			.should("have.attr", "wrapping-type", "None");

		// Should not have expandable text component when wrapping is disabled
		cy.get("#wrapping-item")
			.shadow()
			.find("ui5-expandable-text")
			.should("not.exist");
	});
});

describe("List - getFocusDomRef Method", () => {
	it("should return undefined when the list is empty", () => {
		cy.mount(<List></List>);

		cy.get<List>("[ui5-list]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<List>
				<ListItemStandard id="item1">Item 1</ListItemStandard>
				<ListItemStandard>Item 2</ListItemStandard>
				<ListItemStandard>Item 3</ListItemStandard>
			</List>
		);

		cy.get<UI5Element>("[ui5-list], #item1")
			.then(($el) => {
				const list = $el[0];
				const item = $el[1];

				expect(list.getFocusDomRef()).to.equal(item.getFocusDomRef());
			});
	});

	it("should return last focused item in the list", () => {
		cy.mount(
			<List>
				<ListItemStandard>Item 1</ListItemStandard>
				<ListItemStandard id="item2">Item 2</ListItemStandard>
				<ListItemStandard>Item 3</ListItemStandard>
			</List>
		);

		cy.get("#item2").click();
		cy.get("#item2").should("be.focused");

		cy.get<UI5Element>("[ui5-list], #item2")
			.then(($el) => {
				const list = $el[0];
				const item = $el[1];

				expect(list.getFocusDomRef()).to.equal(item.getFocusDomRef());
			});
	});
});
