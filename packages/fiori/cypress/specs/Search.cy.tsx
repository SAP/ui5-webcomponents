import Title from "@ui5/webcomponents/dist/Title.js";
import Search from "../../src/Search.js";
import SearchItem from "../../src/SearchItem.js";
import SearchItemGroup from "../../src/SearchItemGroup.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import IllustratedMessage from "../../src/IllustratedMessage.js";
import SearchPopupMode from "@ui5/webcomponents/dist/types/SearchPopupMode.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import SearchMessageArea from "../../src/SearchMessageArea.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

describe("Properties", () => {
	it("items slot with groups", () => {
		cy.mount(
			<Search>
				<SearchItemGroup headerText="Group Header 1">
					<SearchItem text="List Item" icon={history}></SearchItem>
					<SearchItem text="List Item" icon={searchIcon}></SearchItem>
				</SearchItemGroup>
				<SearchItemGroup headerText="Group Header 2">
					<SearchItem text="List Item" icon={history}></SearchItem>
					<SearchItem text="List Item" icon={history}></SearchItem>
				</SearchItemGroup>
			</Search>
		);

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

	it("items slot navigation", () => {
		cy.mount(
			<Search>
				<SearchItem text="List Item"></SearchItem>
				<SearchItem text="List Item"></SearchItem>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("L");

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

	it("items should be shown instead of illustration of both present ", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
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

	it("tests loading property", () => {
		cy.mount(
			<Search loading={true}>
				<SearchItem text="Item 1" icon={history} />
				<IllustratedMessage slot="illustration">
					<Title slot="title" level="H1">Oh, there are no results</Title>
					<div slot="subtitle">Change your search query</div>
				</IllustratedMessage>
			</Search>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-busy-indicator]")
			.should("be.visible");
	});

	it("noTypeahead", () => {
		cy.mount(
			<Search noTypeahead={true}>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			<Search>
				<SearchMessageArea text="Message" description="Secondary Message" slot="messageArea" />
				<Button design={ButtonDesign.Transparent} slot="action">Show All</Button>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search-message-area]")
			.should("be.visible");

		cy.get("[ui5-search] [ui5-button]")
			.should("be.visible");
	});
});

describe("Events", () => {
	it("search event with noTypeahead", () => {
		const spy = cy.spy();
		cy.mount(
			<Search noTypeahead={true}>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			return event.detail.item.text === "Item 1";
		}));
	});

	it("search event on item selection", () => {
		const spy = cy.spy();
		cy.mount(
			<Search noTypeahead={true}>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("ui5-search-item").eq(0)
			.realClick();

		cy.get("@searched")
			.should("have.been.calledOnce");

		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.text === "Item 1";
		}));
	});

	it("search event with autocomplete by contains", () => {
		const spy = cy.spy();
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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
			return event.detail.item.text === "Item 2";
		}));
	});

	it("search event prevention", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<SearchItem scopeName="Items" text="Item 2" selected />
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

	it("open event", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
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

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("@opened")
			.should("have.been.calledOnce");
	});

	it("open event on empty list", () => {
		cy.mount(
			<Search>
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
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

		cy.get("[ui5-search]")
			.realPress("I");

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
			<Search>
				<SearchItem text="Item 1" icon={history} />
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

		cy.get("[ui5-search]")
			.realPress("I");

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
			<Search>
				<SearchItem text="Item 1" icon={history} />
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
			<Search>
				<SearchItem text="Item 1" icon={history} />
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

	it("should close popup on Escape and return focus to the field", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
			</Search>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realPress("ArrowDown");

		cy.get("[ui5-search]")
			.realPress("Escape");

		cy.get("[ui5-search]")
			.should("be.focused");
	});

	it("delete event on search item", () => {
		function onDelete(event: Event) {
			(event.target as HTMLElement).remove();
		}
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} onDelete={onDelete}/>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.realPress("I");

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

describe("Accessibility", () => {
	it("should navigate through items to action button with Arrow keys", () => {
		cy.mount(
			<Search>
				<SearchItem text="Item 1" icon={history} />
				<Button design={ButtonDesign.Transparent} slot="action">Show All</Button>
			</Search>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("input")
			.realPress("I");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");

		cy.get("[ui5-search] [ui5-button]")
			.should("be.focused");

		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");

		cy.get("[ui5-search]")
			.should("be.focused");
	});
});
