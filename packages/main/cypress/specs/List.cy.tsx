import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";
import ExpandableText from "../../src/ExpandableText.js";

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

describe("List with expandable content", () => {
	const MAX_CHARACTERS_LENGTH = 100; // Default value; could be changed later to fulfill the specificaiton

	it("renders expandable title correctly", () => {
		const longText = "This is a very long title that should be truncated initially and expandable when clicked. This is a very long title that should be truncated initially and expandable when clicked. This is a very long title that should be truncated initially and expandable when clicked.";

		cy.mount(
			<List>
				<ListItemStandard>
					<ExpandableText text={longText} />
				</ListItemStandard>
			</List>
		);

		// Check if title is initially truncated
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-text")
			.should("be.visible")
			.invoke("text")
			.should("have.length.at.most", MAX_CHARACTERS_LENGTH);

		// Expand the text
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-toggle")
			.click();

		// Verify full text is visible
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-text")
			.should("be.visible")
			.invoke("text")
			.should("equal", longText);
	});

	it("renders expandable description correctly", () => {
		const longText = "This is a very long description that should be truncated initially and expandable when clicked. This is a very long description that should be truncated initially and expandable when clicked. This is a very long description that should be truncated initially and expandable when clicked.";

		cy.mount(
			<List>
				<ListItemStandard>
					Item with expandable description
					<ExpandableText slot="expandableDescription" text={longText} />
				</ListItemStandard>
			</List>
		);

		// Check if description is initially truncated
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-text")
			.should("be.visible")
			.invoke("text")
			.should("have.length.at.most", MAX_CHARACTERS_LENGTH);

		// Expand the text
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-toggle")
			.click();

		// Verify full text is visible
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-text")
			.should("be.visible")
			.invoke("text")
			.should("equal", longText);
	});

	it("renders expandable additional text correctly", () => {
		const longText = "This is a very long additional text that should be truncated initially and expandable when clicked. This is a very long additional text that should be truncated initially and expandable when clicked. This is a very long additional text that should be truncated initially and expandable when clicked.";

		cy.mount(
			<List>
				<ListItemStandard>
					Item with expandable additional text
					<ExpandableText slot="expandableAdditionalText" text={longText} />
				</ListItemStandard>
			</List>
		);

		// Check initial truncated state
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-text")
			.should("be.visible")
			.invoke("text")
			.should("have.length.at.most", MAX_CHARACTERS_LENGTH);

		// Expand the text
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-toggle")
			.click();

		// Verify full text is visible
		cy.get("ui5-expandable-text")
			.shadow()
			.find(".ui5-exp-text-text")
			.should("be.visible")
			.invoke("text")
			.should("equal", longText);
	});
});
