import MultiComboBox from "../../src/MultiComboBox.js";
import Button from "../../src/Button.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";
import MultiComboBoxItemGroup from "../../src/MultiComboBoxItemGroup.js";
import Link from "../../src/Link.js";
import Input from "../../src/Input.js";

describe("Security", () => {
	it("Tests setting malicious text to items", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="<script>alert('XSS')</script>"></MultiComboBoxItem>
				<MultiComboBoxItem text="<b onmouseover=alert('XSS')></b>"></MultiComboBoxItem>
				<MultiComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-mcb-item]")
			.eq(0)
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");

		cy.get("[ui5-mcb-item]")
			.eq(1)
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");

		cy.get("[ui5-mcb-item]")
			.eq(2)
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});

describe("General interaction", () => {
	it("Focus State", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realPress("ArrowLeft");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-token]")
			.should("be.focused");

		cy.get("[ui5-multi-combobox]")
			.should("not.have.attr", "focused");

		cy.get("@mcb")
			.realPress("ArrowRight");

		cy.get("[ui5-multi-combobox]")
			.should("have.attr", "focused");
	});
	
	it("Open all items popover on nmore click", () => {
		cy.mount(
			<MultiComboBox style="width: 100px">
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("moreButton");

		cy.get("@moreButton")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened();
	});

	it("Tokenizer collapse/expand behavior", () => {
		cy.mount(
			<><MultiComboBox noValidation={true} style="width: 100px">
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox><Button id="dummyButton"></Button></>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.should("be.focused");

		cy.get("@mcb")
			.realPress("Space");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.should("have.attr", "expanded");

		cy.get("#dummyButton")
			.as("button")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@tokenizer")
			.should("not.have.attr", "expanded");
	});

	it("Tokenizer expanded/collapsed state should not be triggered when the suggestions are opened from a selected token", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected={true} text="Ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("input")
			.realClick();
		
		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.eq(2)
			.as("firstToken")
			.realClick();

		cy.get("@firstToken")
			.should("be.focused");

		cy.get("@firstToken")
			.realPress("F4");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@tokenizer")
			.should("have.attr", "expanded");
	});

	it("Tests if tokenizer is collapsed after focusout of the Popover", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected={true} text="Ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.should("be.focused");

		cy.get("@mcb")
			.realPress("Tab");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.should("not.have.attr", "expanded");
	});

	it("Should be able to delete long tokens", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="This is a token with ridicilously long long long text which should be deletable when the 'x' icon is clicked"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			.should("be.focused");

		cy.realType("t{enter}");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.invoke('on', 'ui5-token-delete', cy.spy().as('tokenDelete'));

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.should("exist")
			.and("have.length", 1);

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");
	});

	it("Autocomplete (typeahead)", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Cosy");

		cy.get<HTMLInputElement>("@input")
			.then(input => {
				return input.get(0).selectionEnd - input.get(0).selectionStart;
			})
			.should("be.equal", 3);
	});

	it("No autocomplete (no-typeahead)", () => {
		cy.mount(
			<MultiComboBox noTypeahead={true}>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "C");

		cy.get<HTMLInputElement>("@input")
			.then(input => {
				return input.get(0).selectionEnd - input.get(0).selectionStart;
			})
			.should("be.equal", 0);
	});

	it("Should reset typeahead on item navigation and restore it on focus input", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("input")
			.realClick();
		
		cy.get("@mcb")
			.should("be.focused");
		
		cy.get("@mcb")
			.realType("I");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Item 1");

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@input")
			.should("have.value", "I");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.should("be.focused");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.as("firstItem")
			.realPress("ArrowUp");

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@input")
			.should("have.value", "Item 1");
	});

	it("Delete a token and update selection", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.then($tokenizer => {
				$tokenizer[0].addEventListener("ui5-token-delete", cy.stub().as("tokenDelete"))
			});

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.should("not.exist")
	});

	it("Delete a token and update selection - group case", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItemGroup headerText="Group 1">
					<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.then($tokenizer => {
				$tokenizer[0].addEventListener("ui5-token-delete", cy.stub().as("tokenDelete"))
			});

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.should("not.exist")
	});

	it("Select All items", () => {
		cy.mount(
			<MultiComboBox noValidation={true} showSelectAll={true} onSelectionChange={cy.stub().as("selectionChangeEvent")}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find(".ui5-mcb-select-all-checkbox")
			.realClick();
			
		cy.get("@selectionChangeEvent")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.items.length === 2;
			}));
	});

	it("Select All functionality + N-more integration", () => {
		cy.mount(
			<><MultiComboBox style="width: 100px" noValidation={true} showSelectAll={true}>
				<MultiComboBoxItem selected={true} text="Very Very Very Very long Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 2"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 3"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 5"></MultiComboBoxItem>
			</MultiComboBox><Button id="dummyButton"></Button></>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find(".ui5-mcb-select-all-checkbox")
			.should("not.have.attr", "checked");

		cy.get("#dummyButton")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("moreButton");

		cy.get("@moreButton")
			.realClick();
			
		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find(".ui5-mcb-select-all-checkbox")
			.should("have.attr", "checked");
	});

	it("Tokenizer expansion on dynamically added tokens", () => {
		const addTokens = () => {
			const mcb = document.getElementById("mcb");

			["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"].forEach(text => {
				const item = document.createElement("ui5-mcb-item") as MultiComboBoxItem;
				item.text = text;
				item.selected = true;

				mcb.appendChild(item);
			});
		};
		cy.mount(
			<><MultiComboBox id="mcb" style="width:50%"></MultiComboBox><Button id="addButton" onClick={addTokens}></Button></>
		);

		cy.get("#addButton")
			.realClick();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverClosed();

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("ui5-token:not([overflows])")
			.should("have.length.greaterThan", 0);
	});
});

describe("Selection and filtering", () => {
	it("Select and deselect first item", () => {
		cy.mount(
			<MultiComboBox onSelectionChange={cy.stub().as("selectionChangeEvent")}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.as("firstItem")
			.should("not.have.attr", "selected");

		cy.get("@firstItem")
			.shadow()
			.find("[ui5-checkbox]")
			.as("checkbox")
			.realClick();

		cy.get("@firstItem")
			.should("have.attr", "selected");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledOnce");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.items[0].text === "Item 1";
			}));

		cy.get("@checkbox")
			.realClick();

		cy.get("@firstItem")
			.should("not.have.attr", "selected");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledTwice");

		cy.get("@selectionChangeEvent")
			.should("have.been.calledWithMatch", Cypress.sinon.match(event => {
				return event.detail.items.length === 0;
			}));
	});

	it("Focus restore after item click", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.should("have.attr", "focused");
	});

	it("Opens all items popover when start typing and filters items", () => {
		cy.mount(
			<MultiComboBox noTypeahead={true}>
				<MultiComboBoxItem text="1"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("12");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 1);

		cy.get("@mcb")
			.realPress("Backspace");

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 2);
	});

	it("When item is clicked, the popover should be closed and the value in the input should be removed", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.should("have.value", "Cosy");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.as("firstItem")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.should("have.value", "");

		cy.get("@mcb")
			.should("have.attr", "focused");
	});

	it("When item's checkbox is clicked, the popover should not be closed and the value in the input should be kept", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Cosy");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.shadow()
			.find("[ui5-checkbox]")
			.as("checkbox")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@input")
			.should("have.value", "C");
	});

	it("Clicking n more prefilters items before opening the popover", () => {
		cy.mount(
			<MultiComboBox noValidation={true} showSelectAll={true} style="width: 100px">
				<MultiComboBoxItem selected={true} text="This is a token with ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("moreButton");

		cy.get("@moreButton")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 2);

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 3);
	});

	it("Filtering of items when nmore popover is open and user types in the input field", () => {
		cy.mount(
			<MultiComboBox style="width: 100px">
				<MultiComboBoxItem selected={true} text="Ridicilously long long long text"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="1"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("moreButton");

		cy.get("@moreButton")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 3);

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@input")
			.realType("I");

		cy.get("@popover")
			.find("[ui5-list] slot")
			.should("have.length", 2);

		cy.get("@popover")
			.find("[ui5-list] slot")
			.eq(1)
			.should("not.have.attr", "selected");
	});

	it("Should make a selection on ENTER", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
				<MultiComboBoxItem text="Compact"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("C");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "Cosy");

		cy.get("@mcb")
			.realPress("Enter")

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@input")
			.should("have.value", "");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("exist")
			.and("have.length", 1);
	});
});

describe("Validation & Value State", () => {
	it("Should be able to change value states upon typing", () => {
		cy.mount(
			<MultiComboBox noValidation={true}>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
		);

		// add event listener
		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.then(mcb => {
				mcb.get(0).addEventListener("input", e => {
					(mcb.get(0) as MultiComboBox).valueState = (e.target as MultiComboBox).value.length ? "Negative" : "Information";
				});
			});

		cy.get("@mcb")
			.realClick()
			.should("be.focused");

		// type "f"
		cy.realType("f");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--error")

		cy.realPress("Backspace");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--information")

		cy.realPress("f");

		cy.get("@mcb")
			.shadow()
			.find(".ui5-valuestatemessage--information")
			.should("not.exist");
	});

	it("Built in validation by typing a non existing option", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="112"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("1");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.should("have.value", "112");

		cy.get("@mcb")
			.realType("4");

		cy.get("@input")
			.should("have.value", "1");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Negative");
	});

	it("Reset value state validation after 2500ms", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="112"></MultiComboBoxItem>
				<MultiComboBoxItem text="12"></MultiComboBoxItem>
				<MultiComboBoxItem text="3"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("4");

		cy.get("@mcb")
			.should("have.attr", "value-state", "Negative");

		cy.wait(2500);

		cy.get("@mcb")
			.should("have.attr", "value-state", "None");
	});

	it("Built in validation by typing a non existing option", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("CCo");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.should("have.value", "Cosy");
	});

	it("Tests if item is created when enter is pressed while validation is ongoing", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Cosy"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.realType("CC{enter}");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("not.exist")
	});
});

describe("Keyboard interaction when pressing Ctrl + Alt + F8 for navigation", () => {
	beforeEach(() => {
		cy.mount(<>
			<MultiComboBox valueState="Negative">
				<div slot="valueStateMessage">
					Custom error value state message with a <Link href="#">Link</Link>  <Link href="#">Second Link</Link>.
				</div>
				<MultiComboBoxItem text="Item 1"></MultiComboBoxItem>
				<MultiComboBoxItem text="Item 2"></MultiComboBoxItem>
			</MultiComboBox>
			<Input id="nextInput" class="input2auto" placeholder="Next input"></Input>
		</>);
	});

	it("Should move the focus from the MultiComboBox to the first link in the value state message", () => {
		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-multi-combobox")
			.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("popover")
			.should("have.class", "ui5-valuestatemessage-popover");

		cy.get("@popover")
			.should("have.attr", "open")

		cy.get("ui5-link")
			.eq(0)
			.should("have.focus");
	});

	it("When pressing [Tab], the focus moves to the next value state message link. Pressing [Tab] again closes the popup and moves the focus to the next input", () => {
		cy.get("ui5-multi-combobox")
			.as("multi-combobox");

		cy.get("@multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("ui5-link")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("ui5-link")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress("Tab");

		cy.get("ui5-input")
			.as("input");

		cy.get("@input")
			.should("have.focus");
	});

	it("Pressing [Shift + Tab] moves the focus from the second link in the value state message to the first one. Pressing it again shifts the focus to the MultiComboBox", () => {
		cy.get("ui5-multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("ui5-multi-combobox")
			.as("multi-combobox");

		cy.get("@innerInput")
			.realClick()
			.should("be.focused");

		cy.realPress(["Control", "Alt", "F8"]);

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-popover")
			.as("ui5-popover")
			.should("have.attr", "open");

		cy.get("ui5-link")
			.eq(0)
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("Tab");

		cy.get("@firstLink")
			.should("not.have.focus");

		cy.get("ui5-link")
			.eq(1)
			.as("secondLink")
			.should("have.focus");

		cy.get("@secondLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress(["Shift", "Tab"]);

		cy.get("@innerInput")
			.should("have.focus");

	});

	it("When list item is selected and pressing [Ctrl + Alt + F8], first link is focused. [Arrow Down] moves focus to the first list item", () => {
		cy.get("ui5-multi-combobox")
			.as("multi-combobox");

		cy.get("@multi-combobox")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@multi-combobox")
			.shadow()
			.find("ui5-responsive-popover")
			.as("popover");

		// open the popover
		cy.get("@multi-combobox")
			.realClick()
			.should("be.focused");

		// focus the fisrt item
		cy.realPress("F4");

		cy.get("@popover")
			.should("have.attr", "open");

		cy.get("ui5-mcb-item")
			.eq(0)
			.realPress(["Control", "Alt", "F8"]);

		cy.get("ui5-link")
			.as("firstLink")
			.should("have.focus");

		cy.get("@firstLink")
			.realPress("ArrowDown");

		cy.get("ui5-mcb-item").eq(0).should("be.focused");
	});
});

describe("Event firing", () => {
	it("tests if open and close events are fired correctly", () => {
		cy.mount(
			<MultiComboBox onOpen={cy.stub().as("mcbOpened")} onClose={cy.stub().as("mcbClosed")}>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.then($mcb => {
				$mcb[0].addEventListener("focusin", () => {
					$mcb[0].setAttribute("open", "true");
				});
			});

		cy.get("@mcb")
			.realClick()
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened()

		cy.get("@mcbOpened")
			.should("have.been.calledOnce");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-icon]")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.ui5ResponsivePopoverOpened()

		cy.get("@mcbClosed")
			.should("have.been.calledOnce");

		cy.get("@mcbOpened")
			.should("have.been.calledTwice");
	});

	it("Should prevent selection-change when clicking an item", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.then($mcb => {
				$mcb.get(0).addEventListener("ui5-selection-change", e => {
					e.preventDefault();
				});
			});

		cy.get("@mcb")
			.realClick();
 
		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.realClick();

		cy.get<ResponsivePopover>("@popover")
			.ui5ResponsivePopoverClosed();

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);
	});

	it("Should prevent selection-change when deleting a token", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.then($mcb => {
				$mcb.get(0).addEventListener("ui5-selection-change", e => {
					e.preventDefault();
				});
			});

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.as("tokenizer")
			.invoke('on', 'ui5-token-delete', cy.spy().as('tokenDelete'));

		cy.get("@mcb")
			.realClick();
 
		cy.get("@mcb")
			.should("be.focused");

		cy.get("@tokenizer")
			.find("[ui5-token]")
			.as("tokens")
			.should("have.length", 1);

		cy.get("@tokens")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		cy.get("@tokenDelete")
			.should("have.been.called");

		cy.get("@tokens")
			.should("have.length", 1);
	});

	it("Should prevent selection-change on CTRL+A", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem selected={true} text="Bulgaria"></MultiComboBoxItem>
				<MultiComboBoxItem text="England"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.then($mcb => {
				$mcb.get(0).addEventListener("ui5-selection-change", e => {
					e.preventDefault();
				});
			});

		cy.get("@mcb")
			.realClick();
 
		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find<ResponsivePopover>("ui5-responsive-popover")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.get("@mcb")
			.realPress("ArrowDown");

		cy.get("@mcb")
			.find("[ui5-mcb-item]")
			.eq(0)
			.as("firstItem")
			.should("be.focused");

		cy.get("@firstItem")
			.realPress(["Meta", "a"]);

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);
	});
});

describe("MultiComboBox RTL/LTR Arrow Navigation", () => {
	it("should focus last token on arrow right in RTL mode when input is at start", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 5"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();
		cy.get("@mcb")
			.should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(0, 0);
			})
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowRight");
		cy.focused().should("have.class", "ui5-token--wrapper");
	});

	it("should focus last token on arrow left in LTR mode when input is at start", () => {
		cy.mount(
			<div dir="ltr">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 5"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb")
			.should("be.focused");
			
		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("have.focus")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(0, 0);
			})
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowLeft");		
		cy.focused().should("have.class", "ui5-token--wrapper");
	});

	it.skip("should not focus token when cursor is not at start of input in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true} value="test text">
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb").should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("be.focused")
			.then(($input) => {
				($input[0] as HTMLInputElement).setSelectionRange(2, 2);
			});

		cy.get("@mcb").realPress("ArrowRight");
		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it.skip("should navigate from last token back to input with arrow left in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick()
			
		cy.get("@mcb")
			.should("be.focused")
			.realPress("ArrowRight");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.as("lastToken");

		cy.focused().should("have.class", "ui5-token--wrapper");

		cy.get("@lastToken").realPress("ArrowLeft");

		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should navigate from last token back to input with arrow right in LTR mode", () => {
		cy.mount(
			<div dir="ltr">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 3"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 4"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();
			
		cy.get("@mcb")
			.should("be.focused")
			.realPress("ArrowLeft");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-tokenizer]")
			.find("[ui5-token]")
			.last()
			.realPress("ArrowRight");
		
		cy.focused().should("not.have.class", "ui5-token--wrapper");
	});

	it("should handle empty input case in RTL mode", () => {
		cy.mount(
			<div dir="rtl">
				<MultiComboBox noValidation={true}>
					<MultiComboBoxItem selected text="Token 1"></MultiComboBoxItem>
					<MultiComboBoxItem selected text="Token 2"></MultiComboBoxItem>
					<MultiComboBoxItem text="Item 3"></MultiComboBoxItem>
				</MultiComboBox>
			</div>
		);

		cy.get("[ui5-multi-combobox]")
			.as("mcb")
			.realClick();

		cy.get("@mcb").should("be.focused");

		cy.get("@mcb")
			.shadow()
			.find("input")
			.as("input")
			.realClick()
			.should("have.focus")
		
			cy.get("@input")
			.should("have.value", "")
			.should(($input) => {
				expect(($input[0] as HTMLInputElement).selectionStart).to.equal(0);
			});

		cy.get("@mcb").realPress("ArrowRight");		;
		cy.focused().should("have.class", "ui5-token--wrapper");
	});
});

describe("Accessibility", () => {
	it("should announce the associated label when MultiComboBox is focused", () => {
		const label = "MultiComboBox aria-label";

		cy.mount(
			<>
				<label for="mcb">{label}</label>
				<MultiComboBox id="mcb"></MultiComboBox>
			</>
		);

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-label", label);
	});
});
