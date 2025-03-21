import Title from "@ui5/webcomponents/dist/Title.js";
import Search from "../../src/Search.js";
import SearchItem from "../../src/SearchItem.js";
import SearchItemGroup from "../../src/SearchItemGroup.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import IllustratedMessage from "../../src/IllustratedMessage.js";
import SearchPopupMode from "@ui5/webcomponents/dist/types/SearchPopupMode.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";

describe("Properties", () => {
	it("popupMode=List - items slot", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.find("[ui5-search-item]")
			.should("have.length", 2);
		cy.get("ui5-search-item").eq(0)
			.shadow()
			.find("[part='title']")
			.should("contain.text", "Item 1");
		cy.get("ui5-search-item").eq(0)
			.shadow()
			.find("[ui5-icon]")
			.should("have.attr", "name", "history");
		cy.get("ui5-search-item").eq(1)
			.shadow()
			.find("[part='title']")
			.should("contain.text", "Item 2");
		cy.get("ui5-search-item").eq(1)
			.shadow()
			.find("[ui5-tag]")
			.should("contain.text", "Items");
	});

	it("popupMode=List - items slot with groups", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItemGroup headerText="Group Header 1">
					<SearchItem headingText="List Item" icon={history}></SearchItem>
					<SearchItem headingText="List Item" icon={searchIcon}></SearchItem>
				</SearchItemGroup>
				<SearchItemGroup headerText="Group Header 2">
					<SearchItem headingText="List Item" icon={history}></SearchItem>
					<SearchItem headingText="List Item" icon={history}></SearchItem>
				</SearchItemGroup>
			</Search>
		);

		cy.get("ui5-search-item-group").eq(0)
			.shadow()
			.find("[ui5-li-group-header]")
			.should("contain.text", "Group Header 1");
		cy.get("ui5-search-item-group").eq(0)
			.find("[ui5-search-item]")
			.should("have.length", 2);
		cy.get("ui5-search-item-group").eq(1)
			.shadow()
			.find("[ui5-li-group-header]")
			.should("contain.text", "Group Header 2");
		cy.get("ui5-search-item-group").eq(1)
			.find("[ui5-search-item]")
			.should("have.length", 2);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("G");

		cy.get("[ui5-search]")
			.realPress("ArrowRight");

		cy.get("[ui5-search]")
			.should("have.not.value", "Group Header 1");

		cy.get("[ui5-search]")
			.realPress("Backspace");

		cy.get("[ui5-search]")
			.realPress("L");

		cy.get("[ui5-search]")
			.realPress("ArrowRight");

		cy.get("[ui5-search]")
			.should("have.value", "List Item");
	});

	it("popupMode=List - items slot navigation", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem heading-text="List Item"></SearchItem>
				<SearchItem heading-text="List Item"></SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("ui5-search-item").eq(0)
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowUp");

		cy.get("[ui5-search]")
			.should("be.focused");
	});

	it("popupMode='Illustration' - illustration slot with no popupMode set", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<IllustratedMessage slot="illustration">
					<Title slot="title" level="H1">Oh, there are no results</Title>
					<div slot="subtitle">Change your search query</div>
				</IllustratedMessage>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-list]")
			.should("exist");
		cy.get("[ui5-search]")
			.shadow()
			.find("slot[name='illustration']")
			.should("not.exist");
	});

	it("popupMode='Illustration' - illustration slot with popupMode set", () => {
		cy.mount(
			<Search popupMode={SearchPopupMode.Illustration} expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<IllustratedMessage slot="illustration">
					<Title slot="title" level="H1">Oh, there are no results</Title>
					<div slot="subtitle">Change your search query</div>
				</IllustratedMessage>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-list]")
			.should("not.exist");
		cy.get("[ui5-search]")
			.shadow()
			.find("slot[name='illustration']")
			.should("exist");
	});

	it("popupMode='Loading'", () => {
		cy.mount(
			<Search popupMode={SearchPopupMode.Loading} expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<IllustratedMessage slot="illustration">
					<Title slot="title" level="H1">Oh, there are no results</Title>
					<div slot="subtitle">Change your search query</div>
				</IllustratedMessage>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-list]")
			.should("not.exist");
		cy.get("[ui5-search]")
			.shadow()
			.find("slot[name='illustration']")
			.should("not.exist");
		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("exist");
	});

	it("noTypeahead", () => {
		cy.mount(
			<Search expanded={true} noTypeahead={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("[ui5-search]")
			.should("have.value", "I");
	});

	it("typeahead and value confirmation - autocomplete by starts with", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("[ui5-search]")
			.should("have.value", "Item 1");
	});

	it("typeahead and Arrow Right - autocomplete by starts with", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("ArrowRight");

		cy.get("[ui5-search]")
			.should("have.value", "Item 1");
	});

	it("typeahead and Escape - autocomplete by starts with", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("[ui5-search]")
			.should("have.value", "I");
	});

	it("typeahead and value confirmation - autocomplete by contains", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("2");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("[ui5-search]")
			.should("have.value", "Item 2");
	});

	it("typeahead and Arrow Right - autocomplete by contains", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("2");

		cy.get("[ui5-search]")
			.realPress("ArrowRight");

		cy.get("[ui5-search]")
			.should("have.value", "2");
	});

	it("typeahead and Escape - autocomplete by contains", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("2");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("[ui5-search]")
			.should("have.value", "2");
	});

	it("Popup properties", () => {
		cy.mount(
			<Search expanded={true} headerText="Message" subheaderText="Secondary Message" showPopupAction={true} popupActionText="Show All">
				<SearchItem headingText="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.find("header")
			.as("header");

		cy.get("@header")
			.find("ui5-title")
			.should("have.text", "Message");

		cy.get("@header")
			.find("ui5-text")
			.should("have.text", "Secondary Message");

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.find(".ui5-search-footer-button")
			.as("button");

		cy.get("@button")
			.should("exist")
			.and("have.text", "Show All");
	});
});

describe("Events", () => {
	it("search event with noTypeahead", () => {
		const spy = cy.spy();
		cy.mount(
			<Search expanded={true} noTypeahead={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@searched")
			.should("have.been.calledOnce");

		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item === undefined;
		}));
	});

	it("search event with autocomplete by starts with", () => {
		const spy = cy.spy();
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@searched")
			.should("have.been.calledOnce");

		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.headingText === "Item 1";
		}));
	});

	it("search event on item selection", () => {
		const spy = cy.spy();
		cy.mount(
			<Search expanded={true} noTypeahead={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				search.get(0).addEventListener("ui5-search", spy);
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("ui5-search-item").eq(0)
			.realClick();

		cy.get("@searched")
			.should("have.been.calledOnce");

		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.headingText === "Item 1";
		}));
	});

	it("search event with autocomplete by contains", () => {
		const spy = cy.spy();
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("2");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@searched")
			.should("have.been.calledOnce");

		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.headingText === "Item 2";
		}));
	});

	it("search event prevention", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
				<SearchItem scopeName="Items" headingText="Item 2" selected />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", e => {
					e.preventDefault();
				});
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.should("be.focused");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("[ui5-search]")
			.should("have.value", "");
	});

	it("popup-action-press event", () => {
		cy.mount(
			<Search expanded={true} showPopupAction={true} popupActionText="Show All">
				<SearchItem headingText="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-popup-action-press", cy.stub().as("actionPressed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popup");

		cy.get("@popup")
			.find(".ui5-search-footer-button")
			.realClick();

		cy.get("@actionPressed")
			.should("have.been.calledOnce");
	});

	it("open event", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@opened")
			.should("have.been.calledOnce");
	});

	it("open event on empty list", () => {
		cy.mount(
			<Search expanded={true}>
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@opened")
			.should("not.have.been.called");
	});

	it("open event - typing, pressing Escape, then typing again should reopen suggestions", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
				search.get(0).addEventListener("ui5-close", cy.stub().as("closed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@opened")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("@closed")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.realPress("t");

		cy.get("@opened")
			.should("have.been.calledTwice");
	});

	it("open event - typing, selecting an item, then typing again should reopen picker", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
				search.get(0).addEventListener("ui5-close", cy.stub().as("closed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@opened")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@closed")
			.should("have.been.calledOnce");

		cy.get("[ui5-search]")
			.and("be.focused");

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("@opened")
			.should("have.been.calledTwice");
	});

	it("close event", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-close", cy.stub().as("closed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Enter");

		cy.get("@closed")
			.should("have.been.calledOnce");
	});

	it("close event on Escape", () => {
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-close", cy.stub().as("closed"));
			});

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("@closed")
			.should("have.been.calledOnce");
	});

	it("delete event on search item", () => {
		function onDelete(event: Event) {
			(event.target as HTMLElement).remove();
		}
		cy.mount(
			<Search expanded={true}>
				<SearchItem headingText="Item 1" icon={history} onDelete={onDelete}/>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("ArrowDown");

		cy.get("ui5-search-item").eq(0)
			.shadow()
			.find("[ui5-button]")
			.realClick();

		cy.get("ui5-search-item")
			.should("not.exist")
	});
});
