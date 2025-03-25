import Search from "../../src/Search.js";
import SearchItem from "../../src/SearchItem.js";

describe("Search Field on mobile device", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("tests opening the dialog when search is clicked / focused", () => {
		cy.mount(
			<>
				<Search expanded={true} showClearIcon={true}>
					<SearchItem headingText="Item 1" />
					<SearchItem headingText="Item 2" />
					<SearchItem headingText="Item 3" />
					<SearchItem headingText="Item 4" />
					<SearchItem headingText="Item 5" />
					<SearchItem headingText="Item 6" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.should("have.prop", "open", true);
	});

	it("tests closing the dialog when cancel button is pressed", () => {
		cy.mount(
			<>
				<Search expanded={true} showClearIcon={true}>
					<SearchItem headingText="Item 1" />
					<SearchItem headingText="Item 2" />
					<SearchItem headingText="Item 3" />
					<SearchItem headingText="Item 4" />
					<SearchItem headingText="Item 5" />
					<SearchItem headingText="Item 6" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find(".ui5-search-popover-searching-header [ui5-button]")
			.realClick();

		cy.get("[ui5-search]")
			.should("have.prop", "open", false);
	});

	it("should fire search event without item with when user types value and hits enter / search on Virtual Keyboard", () => {
		const spy = cy.spy();
		cy.mount(
			<>
				<Search expanded={true} showClearIcon={true}>
					<SearchItem headingText="Item 1" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("search"));
			});

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.type("test{enter}");

		cy.get("[ui5-search]")
			.should("have.prop", "open", false);

		cy.get("@search").should("have.been.calledOnce");
		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item === undefined;
		}));
		cy.get("[ui5-search]").should("have.prop", "value", "test");
	});

	it("should fire search event with item when user types and hits enter / search on Virtual Keyboard", () => {
		const spy = cy.spy();
		cy.mount(
			<>
				<Search expanded={true} showClearIcon={true}>
					<SearchItem headingText="Item 1" />
					<SearchItem headingText="Item 2" />
					<SearchItem headingText="Item 3" />
					<SearchItem headingText="Item 4" />
					<SearchItem headingText="Item 5" />
					<SearchItem headingText="Item 6" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("search"));
			});

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.type("Item 1{enter}");

		cy.get("[ui5-search]")
			.should("have.prop", "open", false);

		cy.get("@search").should("have.been.calledOnce");
		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.headingText === "Item 1";
		}));
	});
});
