import ToolbarButton from "../../src/ToolbarButton.js";
import Toolbar from "../../src/Toolbar.js";
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import DatePicker from "../../src/DatePicker.js";
import List from "../../src/List.js";
import ListItem from "../../src/ListItemStandard.js";
import { FORM_ACCESSIBLE_NAME } from "../../src/generated/i18n/i18n-defaults.js";

describe("Rendering", () => {
	it("tests arrow positioning", () => {
		cy.mount(
			<>
				<div id="icon1" tabindex="0" style="width: 10px; height: 10px; background:red;"></div>
				<Popover id="popup"
					opener="icon1"
					headerText="Newsletter subscription"
					placement="End"
					verticalAlign="Top">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		// act
		cy.get("#popup")
			.invoke("prop", "open", "true");

		cy.get("#popup")
			.ui5PopoverOpened();

		cy.get("#popup")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("be.visible");

		cy.get("#popup")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("have.css", "transform", "matrix(1, 0, 0, 1, 0, -42)");
	});

	it("test :popover-open selector", () => {
		cy.mount(
			<>
				<Button id="popoverOpen">Open</Button>
				<Popover id="popover" opener="popoverOpen" open={true}>
					<Button>Close</Button>
				</Popover>
			</>
		);

		// assert
		cy.get("#popover").should("have.attr", "open");
	});

	it("test initial focus", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popover" opener="btnOpen" open={true}>
					<Button id="popoverBtn">Button</Button>
				</Popover>
			</>
		);

		// assert
		cy.get("#popoverBtn").should("be.focused");
	});

	it("test _open", () => {
		cy.mount(
			<>
				<Button id="popoverOpen">Open</Button>
				<Popover id="popover1" opener="popoverOpen" open={true}>
					<div id="popoverCont1">Content</div>
				</Popover>
				<Popover id="popover2" opener="popoverOpen" open={true}>
					<div>Another Content</div>
				</Popover>
			</>
		);

		// assert
		cy.get("#popoverOpen").should("exist");
		cy.get("#popover1").should("have.attr", "open");
		cy.get("#popover1").should("have.prop", "_opened");

		cy.get("#popover2").should("have.attr", "open");
		cy.get("#popover2").should("have.prop", "_opened");

		cy.get("#popoverCont1").should("exist");
	});

	it("Header text attribute is propagated", () => {
		cy.mount(
			<>
				<Popover id="pop" headerText="Initial text">
					<div>Content</div>
				</Popover>
			</>
		);

		// act
		cy.get("#pop").invoke("attr", "header-text", "New text");

		// assert
		cy.get("#pop")
			.shadow()
			.find(".ui5-popup-header-text")
			.should("have.text", "New text");
	});

	it("Popover arrow", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="pop" opener="btn" headerText="Popover Header" open>
					<div>Content</div>
				</Popover>
			</>
		);

		// Act: Open the popover
		cy.get("#btn").realClick();

		// Assert: Initially, the popover has an arrow
		cy.get("#pop")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("be.visible");

		// Act: Toggle the "hide-arrow" attribute
		cy.get("#pop").then($popover => {
			$popover.get(0).toggleAttribute("hide-arrow");
		});

		// Assert: The arrow is hidden
		cy.get("#pop")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("not.be.visible");
	});
});

describe("Accessibility", () => {
	it("Popover accessibleDescriptionRef Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Label id="lblDesc3">ThirdDesc</Label>
				<Popover id="popover" accessibleDescriptionRef="lblDesc1 lblDesc3"></Popover>
			</>
		);

		// assert
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc ThirdDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc ThirdDesc");

		// act - update accessible-description-ref
		cy.get("#popover")
			.invoke("attr", "accessible-description-ref", "lblDesc2");

		// assert
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "SecondDesc");

		// act - update accessible-description-ref
		cy.get("#popover")
			.invoke("attr", "accessible-description-ref", "lblDesc3");

		// assert
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "ThirdDesc");

		// act - remove accessible-description-ref
		cy.get("#popover")
			.invoke("removeAttr", "accessible-description-ref");

		// assert
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("Popover accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Popover id="popover" accessibleDescription="Some description added by accessibleDescription"></Popover>
			</>
		);
		// assert
		cy.get("#popover")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-describedby", "accessibleDescription");

		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - update accessible-description
		cy.get("#popover")
			.invoke("attr", "accessible-description", "Some description added by accessibleDescription");

		// assert
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#popover")
			.invoke("removeAttr", "accessible-description");

		// assert
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	// both
	it("Popover accessibleDescriptionRef and accessibleDescription Tests", () => {
		cy.mount(
			<>
				<Label id="lblDesc1">FirstDesc</Label>
				<Label id="lblDesc2">SecondDesc</Label>
				<Popover id="popover" accessibleDescriptionRef="lblDesc1" accessibleDescription="Some description added by accessibleDescription"></Popover>
			</>
		);

		// assert - accessibleDescription is used
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "FirstDesc");

		// act - update text of referenced label
		cy.get("#lblDesc1")
			.then($el => {
				$el.get(0).innerHTML = "First Label Desc";
			});

		// assert - accessibleDescriptionRef is used
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First Label Desc");

		// act - remove accessible-description-ref
		cy.get("#popover")
			.invoke("removeAttr", "accessible-description-ref");

		// assert - accessibleDescription is used
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Some description added by accessibleDescription");

		// act - remove accessible-description
		cy.get("#popover")
			.invoke("removeAttr", "accessible-description");

		// assert - accessibleDescriptionRef is used
		cy.get("#popover")
			.shadow()
			.find("#accessibleDescription")
			.should("not.have.text", "");
	});

	it("tests aria-labelledby and aria-label", () => {
		cy.mount(
			<Popover accessibleName="This popover is important">
				<div slot="header" />
			</Popover>
		);

		cy.get("[ui5-popover]").invoke("removeAttr", "accessible-name");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-labelledby");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-label");

		cy.get("[ui5-popover]").invoke("attr", "accessible-name", "text");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-labelledby");

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-label");
	});

	it("tests accessible-name-ref", () => {
		cy.mount(
			<>
				<Label id="lblAccNameRef">Some label</Label>
				<Popover accessibleNameRef="lblAccNameRef">
					<span>Hello world</span>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "aria-label", "Some label");
	});

	it("tests that aria-labelledby is not set when there is no header and no accessible-name-ref", () => {
		cy.mount(
			<>
				<Button id="btnOpenWithAttr">Open with Attribute</Button>
				<Popover id="popoverAttr" opener="btnOpenWithAttr">
					<Button id="btnCloseWithMethod">Close with Method</Button>
					<Button id="btnCloseWithAttr">Close with Attribute</Button>
				</Popover>
			</>
		);

		cy.get("[ui5-popover]")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-labelledby");
	});
});

describe("Popover opener", () => {
	it.skip("tests 'opener' set as string of abstract element's ID ", () => {
		cy.mount(
			<>
				<Toolbar id="tb">
					<ToolbarButton text="Add"></ToolbarButton>
					<ToolbarButton text="Delete" id="clearCounter"></ToolbarButton>
					<ToolbarButton id="btnOpenMenu" text="Open Menu" preventOverflowClosing={true}></ToolbarButton>
				</Toolbar>
				<Popover id="popup" opener="btnOpenMenu">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		// ac
		cy.get("#popup").invoke("prop", "open", "true");

		// assert - The button inside the popover is accessible => popover is opened properly.
		cy.get("#btnClosePopover").then($btnClosePopover => {
			$btnClosePopover.get(0).addEventListener("click", () => {
				cy.get("#popup").invoke("prop", "open", false);
			});
		});
		cy.get("#btnClosePopover").realClick();
	});

	it("tests 'opener' set as DOM ref of abstract element's DOM reference", () => {
		cy.mount(
			<>
				<Toolbar id="tb">
					<ToolbarButton text="Add"></ToolbarButton>
					<ToolbarButton text="Delete"></ToolbarButton>
					<ToolbarButton id="btnOpenPopover" text="Open Menu" preventOverflowClosing={true}></ToolbarButton>
				</Toolbar>
				<Popover id="popup">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		cy.get("#btnOpenPopover").then($toolbarBtn => {
			cy.wrap($toolbarBtn.get(0)).as("toolbarBtn");
		});

		// act
		cy.get("@toolbarBtn").then($toolbarBtn => {
			cy.get("#popup").invoke("prop", "opener", $toolbarBtn.get(0));
		});
		cy.get("#popup").invoke("prop", "open", true);

		// assert - The button inside the popover is accessible => popover is opened properly.
		cy.get("#btnClosePopover").then($btnClosePopover => {
			$btnClosePopover.get(0).addEventListener("click", () => {
				cy.get("#popup").invoke("prop", "open", false);
			});
		});
		cy.get("#btnClosePopover").realClick();
	});

	it("tests calling _showOutsideViewport method", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popover" opener="btnOpen">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		cy.get("#popover").then(el => {
			cy.spy<Popover>((el.get(0) as Popover), "_showOutsideViewport").as("showOutsideViewport");
		});

		// act
		cy.get("#popover").invoke("prop", "open", "true");

		cy.get("@showOutsideViewport")
			.should("have.been.calledOnce");
	});

	it("tests calling _showOutsideViewport method, when popover is created dynamically", () => {
		cy.mount(
			<>
				<div id="container"></div>
				<Button id="btnOpen">Open</Button>
			</>
		);

		cy.get("#container").then(container => {
			const popover = document.createElement("ui5-popover");

			cy.spy<Popover>((popover as Popover), "_showOutsideViewport").as("showOutsideViewport");

			popover.id = "popover";
			popover.headerText = "Popover Header";
			popover.opener = "btnOpen";
			popover.open = true;

			const content = document.createElement("div");
			content.innerHTML = "<button id='popoverBtn'>button</button>";
			popover.appendChild(content);

			container.get(0).appendChild(popover);
		});

		cy.get("#popover")
			.ui5PopoverOpened();

		cy.get("@showOutsideViewport")
			.should("have.been.calledOnce");
	});

	it("tests popover toggling", () => {
		cy.mount(
			<>
				<Button id="btn" />
				<Popover opener="btn" />
				<br />
				<DatePicker />
			</>);

		cy.get("[ui5-popover]").invoke("prop", "open", "true");

		cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

		cy.get("[ui5-date-picker]").realClick();
		cy.get("[ui5-popover]").should("not.have.attr", "open");
	});

	it("tests popover toggling with 'open' attribute", () => {
		cy.mount(
			<>
				<Button id="btnOpenWithAttr" />
				<Popover opener="btnOpenWithAttr" />
			</>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", "true");

		cy.get<Popover>("[ui5-popover]").ui5PopoverOpened();

		cy.get("[ui5-popover]").invoke("removeAttr", "open");
		cy.get("[ui5-popover]").should("not.have.attr", "open");
	});

	it("tests popover is closed after click outside of it after multiple 'open = true'", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="pop" opener="btn" open={true}>
					<div>Content</div>
				</Popover>
			</>
		);

		// Act: Set 'open' multiple times
		cy.get("#pop").invoke("prop", "open", true);
		cy.get("#pop").invoke("prop", "open", true);
		cy.get("#pop").invoke("prop", "open", true);
		cy.get("#pop").invoke("prop", "open", true);

		// Act: Click outside the popover
		cy.get("body").realClick();

		// Assert: Popover is closed
		cy.get("#pop").should("not.be.visible");
	});

	it("tests popover does not close with opener", () => {
		cy.mount(
			<>
				<Button id="btnQuickViewCardOpener">Open</Button>
				<Button id="btnMoveFocus">Move Focus</Button>
				<Popover id="quickViewCard" opener="btnQuickViewCardOpener" open>
					<div>Content</div>
				</Popover>
			</>
		);

		// assert - the opener is visible
		cy.get("#btnQuickViewCardOpener").should("be.visible");

		// act - open popover and hide opener
		cy.get("#btnQuickViewCardOpener").click();
		cy.get("#btnQuickViewCardOpener").invoke("hide");

		// assert - the popover remains open, although opener is not visible
		cy.get("#quickViewCard").should("have.attr", "open");
		cy.get("#quickViewCard").should("be.visible");
		cy.get("#btnQuickViewCardOpener").should("not.be.visible");

		// close the popover
		cy.get("#btnMoveFocus").click();
	});

	it("tests clicking inside the popover does not close it", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="pop" opener="btn" open={true}>
					<Button id="popbtn">Inside Popover</Button>
				</Popover>
			</>
		);

		// Assert: Popover is opened
		cy.get<Popover>("#pop").ui5PopoverOpened();

		// Act: Click inside the popover
		cy.get("#popbtn").realClick();

		// Assert: Popover remains opened
		cy.get("#pop").then(($el) => {
			cy.wrap($el.get(0) as Popover).ui5PopoverOpened();
		});
	});

	it("tests if overflown content can be reached by scrolling 1", () => {
		cy.mount(
			<>
				<div id="many-items" style={{ height: "100px", overflowY: "auto" }}>
					{Array.from({ length: 50 }, (_, index) => (
						<div key={index} id={`item-${index}`} style={{ padding: "5px" }}>
							Item {index + 1}
						</div>
					))}
				</div>
			</>
		);

		// Act: Scroll to the second-to-last item
		cy.get("#many-items").scrollTo("bottom");

		// Assert: The second-to-last item is visible
		cy.get("#item-48").should("be.visible");
	});

	it("tests if overflown content can be reached by scrolling 2", () => {
		cy.mount(
			<>
				<div id="many-items" style={{ height: "100px", overflowY: "auto" }}>
					{Array.from({ length: 50 }, (_, index) => (
						<div key={index} id={`item-${index}`} style={{ padding: "5px" }}>
							Item {index + 1}
						</div>
					))}
				</div>
			</>
		);

		// Act: Scroll to the second-to-last item
		cy.get("#many-items").scrollTo("bottom");

		// Assert: The second-to-last item is visible
		cy.get("#item-48").should("be.visible");

		// Act: Click on the second-to-last item
		cy.get("#item-48").click();
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow) 1", () => {
		cy.mount(
			<>
				<Button id="big-popover-button">Open</Button>
				<Popover id="big-popover" headerText="Big Popover" opener="big-popover-button" open={true}>
					<ul style={{ height: "100px", overflowY: "auto" }}>
						{Array.from({ length: 50 }, (_, index) => (
							<li key={index} id={`item-${index}`} style={{ padding: "5px" }}>
								Item {index + 1}
							</li>
						))}
					</ul>
				</Popover>
			</>
		);

		// Act: Open the popover
		cy.get("#big-popover-button").click();

		// Assert: The second-to-last item is not visible initially
		cy.get("#item-48").should("not.be.visible");
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow) 2", () => {
		cy.mount(
			<>
				<Button id="big-popover-button">Open</Button>
				<Popover id="big-popover" headerText="Big Popover" opener="big-popover-button" open={true}>
					<ul style={{ height: "100px", overflowY: "auto" }}>
						{Array.from({ length: 50 }, (_, index) => (
							<li key={index} id={`item-${index}`} style={{ padding: "5px" }}>
								Item {index + 1}
							</li>
						))}
					</ul>
				</Popover>
			</>
		);

		// Act: Scroll to the second-to-last item
		cy.get("#big-popover ul").scrollTo("bottom");

		// Assert: The second-to-last item is visible
		cy.get("#item-48").should("be.visible");
	});

	it("tests modal popover", () => {
		cy.mount(
			<>
				<Button id="btnPopModal">Open Modal Popover</Button>
				<Popover id="modalPopover" opener="btnPopModal" modal open={false}>
					<Button id="modalPopoverClose" onClick={() => {
						const popover = document.getElementById("modalPopover");
						(popover as Popover).open = false;
					}}>Close</Button>
				</Popover>
				<Button id="btn">Another Button</Button>
			</>
		);

		// Act: Open the modal popover
		cy.get("#btnPopModal").click();
		cy.get("#modalPopover").invoke("prop", "open", true);

		// Assert: Popover is opened
		cy.get("#modalPopover").should("have.attr", "open", "open");

		// Act: Try clicking another button
		cy.get("#btn").click({ force: true });

		// Assert: Popover is still opened
		cy.get("#modalPopover").should("have.prop", "open", true);

		// Act: Close the popover
		cy.get("#modalPopoverClose").click();

		// Assert: Popover is closed
		cy.get("#modalPopover").should("not.be.visible");
	});

	it("tests modal popover with no block layer", () => {
		cy.mount(
			<>
				<Button id="btnPopModalNoLayer">Open Modal Popover</Button>
				<Popover id="modalPopoverNoLayer" opener="btnPopModalNoLayer" modal={false} open={false}>
					<Button id="modalPopoverClose">Close</Button>
				</Popover>
			</>
		);

		// Act: Open the modal popover
		cy.get("#btnPopModalNoLayer").click();
		cy.get("#modalPopoverNoLayer").invoke("prop", "open", true);

		// Assert: Popover is opened
		cy.get("#modalPopoverNoLayer").should("have.attr", "open", "open");

		// Act: Close the popover using Escape key
		cy.get("body").realPress("Escape");

		// Assert: Popover is closed
		cy.get("#modalPopoverNoLayer").should("not.be.visible");
	});

	it("tests initial focus", () => {
		cy.mount(
			<>
				<Button id="btnPopFocus">Open</Button>
				<Popover id="popoverFocus" opener="btnPopFocus" open={true}>
					<Button id="focusMe">Focus Me</Button>
				</Popover>
			</>
		);

		// Assert: The button inside the popover is focused
		cy.get("#focusMe").should("be.focused");

		// Act: Close the popover using Escape key
		cy.get("body").realPress("Escape");

		// Assert: Popover is closed
		cy.get("#popoverFocus").should("not.be.visible");
	});

	it("tests focus trapping using TAB", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="popoverId" opener="btn" open={true}>
					<div slot="header">
						<Button id="first-focusable"> Button</Button>
					</div>
					<List>
						<ListItem >First</ListItem>
						<ListItem>Second</ListItem>
						<ListItem>Third</ListItem>
					</List>
				</Popover>
			</>
		);

		// Assert: The first focusable element is focused
		cy.get("#first-focusable").should("be.focused");

		// Act: Press TAB to move focus
		cy.realPress("Tab");

		// Assert: The first focusable element is no longer focused
		cy.get("#first-focusable").should("not.be.focused");

		// Act: Press TAB to move focus further
		cy.realPress("Tab");

		// Assert: The first focusable element is focused
		cy.get("#first-focusable").should("be.focused");

		// Act: Press TAB to cycle back to the first focusable element
		cy.realPress("Tab");
		cy.realPress("Tab");

		// Assert: The first focusable element is focused again
		cy.get("#first-focusable").should("be.focused");

		// Act: Close the popover using Escape key
		cy.realPress("Escape");

		// Assert: Popover is closed
		cy.get("#popoverId").should("not.be.visible");
	});

	it("tests focus trapping using SHIFT TAB", () => {
		cy.mount(
			<>
				<Button id="btn">Open</Button>
				<Popover id="popoverId" opener="btn" open={true}>
					<div slot="header">
						<Button id="first-focusable">Header Button</Button>
					</div>
					<List>
						<ListItem>First</ListItem>
						<ListItem>Second</ListItem>
						<ListItem>Third</ListItem>
					</List>
					<Button id="footer-button">Footer Button</Button>
				</Popover>
			</>
		);

		// Assert: The first focusable element is focused
		cy.get("#first-focusable").should("be.focused");

		// Act: Press SHIFT+TAB to move focus backward
		cy.realPress(["Shift", "Tab"]);
		cy.realPress(["Shift", "Tab"]);
		cy.realPress(["Shift", "Tab"]);

		// Assert: The first focusable element is focused again
		cy.get("#first-focusable").should("be.focused");

		// Act: Close the popover using Escape key
		cy.realPress("Escape");

		// Assert: Popover is closed
		cy.get("#popoverId").should("not.be.visible");
	});

	it("tests focus when there is no focusable content", () => {
		cy.mount(
			<>
				<Button id="firstBtn">Open</Button>
				<Popover id="popNoFocusableContent" opener="firstBtn" open={true}>
					<div>Non-focusable content</div>
				</Popover>
			</>
		);

		// Assert: Popover is focused
		cy.get("#popNoFocusableContent").should("be.focused");

		// Act: Press SHIFT+TAB
		cy.realPress(["Shift", "Tab"]);

		// Assert: Popover remains focused
		cy.get("#popNoFocusableContent").should("be.focused");

		// Act: Close the popover using Escape key
		cy.realPress("Escape");

		// Assert: Popover is closed
		cy.get("#popNoFocusableContent").should("not.be.visible");
	});

	it("tests focus when content, which can't be focused is clicked", () => {
		cy.mount(
			<>
				<Button id="btnOpenPopoverWithDiv">Open</Button>
				<Popover id="popWithDiv" opener="btnOpenPopoverWithDiv" open={true}>
					<div id="divContent">Non-focusable content</div>
				</Popover>
			</>
		);

		// Act: Click on the non-focusable content
		cy.get("#divContent").click();

		// Assert: Popover remains focused
		cy.get("#popWithDiv").should("be.focused");

		// Act: Close the popover using Escape key
		cy.realPress("Escape");

		// Assert: Popover is closed
		cy.get("#popWithDiv").should("not.be.visible");
	});

	it("tests that dynamically created popover is opened", () => {
		cy.mount(
			<>
				<Button id="btnOpenDynamic">Open Dynamic Popover</Button>
				<div id="container"></div>
			</>
		);

		cy.get("#container").then(container => {
			const popover = document.createElement("ui5-popover");
			popover.id = "dynamic-popover";
			popover.headerText = "Dynamic Popover";
			popover.opener = "btnOpenDynamic";
			popover.open = false;

			const content = document.createElement("div");
			content.innerHTML = "<button id='popoverBtn'>button</button>";
			popover.appendChild(content);

			container.get(0).appendChild(popover);
		});

		// Act: Open the dynamic popover
		cy.get("#btnOpenDynamic").click();
		cy.get("#dynamic-popover").invoke("prop", "open", true);

		// Assert: Popover is opened
		cy.get("#dynamic-popover").should("be.visible");

		// Act: Close the popover using Escape key
		cy.get("body").realPress("Escape");

		// Assert: Popover is closed
		cy.get("#dynamic-popover").should("not.be.visible");
	});

	it("tests that dynamically created popover opened by dynamically created opener is opened", () => {
		cy.get("body").then(body => {
			let container = document.createElement("div");
			container.id = "container";
			body.get(0).appendChild(container);

			const button = document.createElement("button");
			button.id = "btnDynamicOpenerAndPopover";
			button.textContent = "Open Dynamic Popover";
			container.appendChild(button);
		});

		cy.get("#container").then(container => {
			const popover = document.createElement("ui5-popover");
			popover.id = "dynamic-popover-dynamic-opener0";
			popover.headerText = "Dynamic Popover";
			popover.open = false;
			popover.opener = "btnDynamicOpenerAndPopover";

			const content = document.createElement("div");
			content.innerHTML = "<button id='popoverBtn'>button</button>";
			popover.appendChild(content);

			container.get(0).appendChild(popover);
		});

		// Act: Open the dynamic popover
		cy.get("#btnDynamicOpenerAndPopover").click();
		cy.get("#dynamic-popover-dynamic-opener0").invoke("prop", "open", true);

		// Assert: Popover is opened
		cy.get("#dynamic-popover-dynamic-opener0").should("be.visible");

		// Act: Close the popover using Escape key
		cy.get("body").realPress("Escape");

		// Assert: Popover is closed
		cy.get("#dynamic-popover-dynamic-opener0").should("not.be.visible");
	});

	it("tests that ENTER on list item that opens another popover doesn't trigger click event inside the focused element of that popover", () => {
		// const openChainedPopover1 = await browser.$("#openChainedPopover1");
		// await openChainedPopover1.scrollIntoView();
		// await openChainedPopover1.click();
		// await browser.keys("Enter");

		// assert.ok(await browser.$("#chainedPopover2").isDisplayedInViewport(), "'Chained popover 2' opened with ENTER key should remain open")
		// assert.notOk(await browser.$("#chainedPopover1").isDisplayedInViewport(), "'Chained popover 1' should be successfully closed")

		// await browser.keys("Escape");
		// const activeElement = await browser.$(await browser.getActiveElement());

		// assert.strictEqual(await activeElement.getAttribute("id"), await openChainedPopover1.getAttribute("id"), "The focus should be correctly restored");
	});

	it("tests clicking on an iframe closes the popover", () => {
		// const btnOpenPopover = await browser.$("#btn");
		// await btnOpenPopover.click();

		// const popover = await browser.$("#pop");
		// const iframe = await browser.$("#clickThisIframe");

		// assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		// await iframe.click();

		// await browser.pause(500);

		// assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests clicking on an iframe inside a shadow root closes the popover", () => {
		// const btnOpenPopover = await browser.$("#btn");
		// await btnOpenPopover.click();

		// const popover = await browser.$("#pop");
		// const iframe = await browser.$("#host").shadow$("#clickThisIframeInsideShadowRoot");

		// assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		// await iframe.click();

		// await browser.pause(500);

		// assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("Test initial focus when content is provided after the header and footer", () => {
		// const listContainerItem = await browser.$("#popoverFocusButton");
		// await listContainerItem.scrollIntoView();
		// await listContainerItem.click();

		// await browser.waitUntil(async () => {
		// 	const activeElement = await browser.$(await browser.getActiveElement());
		// 	return await activeElement.getProperty("id") === "fistButtonInPopover";
		// }, {
		// 	timeout: 500,
		// 	timeoutMsg: "the active element must be the button in the content of the popover"
		// });

		// await browser.keys("Escape");

	});

	it("tests initial focus when the popover is removed from the DOM in the meantime", () => {
		// const createAndRemovePopover = await browser.$("#createAndRemove");
		// const result = await browser.$("#createAndRemoveResult");

		// await createAndRemovePopover.scrollIntoView();

		// await createAndRemovePopover.click();
		// await result.waitForDisplayed({ timeout: 3000 })

		// assert.strictEqual(await result.getText(), "No uncaught errors", "There is no error.");
	});

	it("tests if the popover is a part of the tab chain", () => {
		// await browser.$("#input1").scrollIntoView();
		// await browser.$("#input1").click();
		// await browser.keys("Tab");

		// assert.ok(await browser.$("#input2").isFocused(), "next input is focused");
	});

	it("tests opener set as ID in the same shadow root", () => {
		// const opener = await browser.$("opener-test-shadow-root-id").shadow$("#lnk");
		// const popover = await browser.$("opener-test-shadow-root-id").shadow$("#pop");

		// await opener.click();

		// assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");
	});

	it("tests opener set as ID in window.document, while popover is in a shadow root", () => {
		// const opener = await browser.$("#lnkInDocument");
		// const popover = await browser.$("opener-test-shadow-root-id-document").shadow$("#pop");

		// await opener.click();

		// assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");
	});
});

describe("Popover interaction", () => {
	describe("Automatic Closing", () => {
		it("tests clicking outside the popover", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener">
						<Button id="btnClosePopover">Close</Button>
					</Popover>
				</>
			);

			cy.get("#pop").ui5PopoverOpened();

			// act
			cy.get("body").realClick();

			// assert
			cy.get("#pop").should("not.be.visible");
		});

		it("tests clicking on the opener", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener">
						<Button id="btnClosePopover">Close</Button>
					</Popover>
				</>
			);

			cy.get("#pop").ui5PopoverOpened();

			// act
			cy.get("#opener").realClick();

			// assert
			cy.get("#pop").ui5PopoverOpened();
		});

		it("tests clicking on the opener if both the popover and the opener are located in a shadow root", () => {
			class OpenerShadowRootTest extends HTMLElement {
				_shadow: ShadowRoot | null = null;

				constructor() {
					super();
				}

				connectedCallback() {
					if (this._shadow) {
						return;
					}

					this._shadow = this.attachShadow({ mode: "open" });

					const btn = document.createElement("button");
					btn.textContent = "Opener in Shadow Root";
					btn.setAttribute("id", "opener");

					const pop = document.createElement("ui5-popover") as Popover;
					pop.opener = "opener";
					pop.open = true;

					this._shadow.appendChild(btn);
					this._shadow.appendChild(pop);
				}
			}

			cy.window().then(win => {
				win.customElements.define("opener-shadow-root-test", OpenerShadowRootTest);
			});

			cy.mount(
				<>
					{/* @ts-expect-error */}
					<opener-shadow-root-test id="openerShadowRooTest"></opener-shadow-root-test>
				</>
			);

			// assert
			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").ui5PopoverOpened();

			// act
			cy.get("#openerShadowRooTest").shadow().find("button").realClick();

			// assert
			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").ui5PopoverOpened();
		});

		it("tests clicking outside the popover when 'mousedown' event propagation is stopped", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener" placement="Bottom">
						<span>popover content</span>
					</Popover>
					<button id="btn">Stops mousedown propagation</button>
				</>
			);

			cy.get("#pop").ui5PopoverOpened();
			cy.get("#btn").then(btn => {
				btn.get(0).addEventListener("mousedown", event => {
					event.stopPropagation();
				});
			});

			// act
			cy.get("#btn").realMouseDown();

			// assert
			cy.get("#pop").should("not.be.visible");
		});

		it("click on opener, which is iframe inside a custom element", () => {
			cy.mount(
				<>
					<div id="myDiv" style="width: 200px;" tabindex="0">
						<div id="helloId">Hello</div>
						<div id="customElId" style="height: 200px;">
						</div>
					</div>
					<Popover id="popoverId"
						opener="myDiv"
						headerText="Newsletter subscription"
						preventInitialFocus>
						<div>
							Content
						</div>
					</Popover>
				</>
			);

			cy.get("#popoverId")
				.invoke("prop", "open", "true");

			cy.get("#popoverId")
				.should("be.visible");

			cy.get("#customElId").then($customEl => {
				$customEl.get(0).attachShadow({ mode: 'open' }).innerHTML =
					`<iframe
	sandbox
	width="200"
	height="200"
	srcdoc="<div tabindex='0' id='contentId'>IFrame content</div>"
></iframe>`;
			});

			cy.get("#myDiv")
				.realClick({ x: 100, y: 50 });

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(200);

			cy.get("#popoverId")
				.should("be.visible");
		});
	});
});

describe("Focusing", () => {
	it("tests no focusable elements, but content is scrolling", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popoverId"
					style="width: 10rem; height: 10rem;"
					opener="btnOpen">
					<div>
						Note: The content of the prop will be rendered into a by assigning the
						respective slot attribute (slot="footer"). Since you can't change the
						DOM order of slots when declaring them within a prop, it might prove
						beneficial to manually mount them as part of the component's children,
						especially when facing problems with the reading order of screen
						readers. Note: When passing a custom React component to this prop, you
						have to make sure your component reads the slot prop and appends it to
						the most outer element of your component. Learn more about it here.
					</div>
				</Popover>
			</>
		);

		// act
		cy.get("#popoverId").invoke("prop", "open", "true");

		cy.get("#popoverId")
			.shadow()
			.find(".ui5-popup-content")
			.should("be.focused");
	});

	it("tests first element is keyboard focusable scroll container", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popoverId"
					opener="btnOpen">
					<div id="innerContent" style="width: 10rem; height: 10rem; overflow-y: auto;">
						Note: The content of the prop will be rendered into a by assigning the
						respective slot attribute (slot="footer"). Since you can't change the
						DOM order of slots when declaring them within a prop, it might prove
						beneficial to manually mount them as part of the component's children,
						especially when facing problems with the reading order of screen
						readers. Note: When passing a custom React component to this prop, you
						have to make sure your component reads the slot prop and appends it to
						the most outer element of your component. Learn more about it here.
					</div>
					<Button>Button</Button>
				</Popover>
			</>
		);

		// act
		cy.get("#popoverId").invoke("prop", "open", "true");

		cy.get("#innerContent")
			.should("be.focused");
	});
});

describe("Events", () => {
	it("before-open", () => {
		cy.mount(
			<>
				<Button id="btnOpenPopover">Open</Button>
				<Popover id="popoverId" opener="btnOpenPopover">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Popover>
			</>
		);

		cy.get("#popoverId")
			.should("not.be.visible");

		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		cy.get("#popoverId").then($dialog => {
			$dialog.get(0).addEventListener("before-open", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get("#popoverId")
			.should("not.be.visible");

		cy.get("#popoverId").then($popover => {
			$popover.get(0).removeEventListener("before-open", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get("#popoverId")
			.ui5PopoverOpened();
	});

	it("before-close", () => {
		cy.mount(
			<>
				<Button id="btnOpenPopover">Open</Button>
				<Popover id="popoverId" opener="btnOpenPopover">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Popover>
			</>
		);

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get("#popoverId")
			.ui5PopoverOpened();

		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		cy.get("#popoverId").then($popover => {
			$popover.get(0).addEventListener("before-close", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", false);

		cy.get("#popoverId")
			.ui5PopoverOpened();

		cy.get("#popoverId").then($popover => {
			$popover.get(0).removeEventListener("before-close", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", false);

		cy.get("#popoverId")
			.should("not.be.visible");
	});
});

describe("Placement", () => {
	it("placement=Bottom, but not enough bottom space", () => {
		cy.viewport(600, 600);
		cy.mount(
			<>
				<Button id="btnOpenPopover"
					style="position: absolute; top: 300px;">Open</Button>
				<Popover id="popoverId"
					headerText="Popover"
					opener="btnOpenPopover"
					placement="Bottom">
					<div style="height: 200px;">
						<button id="first">First group focusable</button>
					</div>
				</Popover>
			</>
		);

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get("#popoverId")
			.should("be.visible");

		// wait for the popover to be positioned
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("#popoverId")
			.then($el => $el.position().top)
			.then(top => {
				expect(top).to.be.lt(100)
			});
	});
});

describe("Alignment", () => {
	// const EPS = 2; // 2px

	// const isHorizontallyCentered = (element, opener) => {
	// 	const elemRect = {
	// 		...await element.getLocation(),
	// 		...await element.getSize()
	// 	};
	// 	const openerRect = {
	// 		...await opener.getLocation(),
	// 		...await opener.getSize()
	// 	};
	// 	const openerCenter = openerRect.x + openerRect.width / 2;
	// 	const expectedElemX = openerCenter - elemRect.width / 2;

	// 	return Math.abs(elemRect.x - expectedElemX) < EPS;
	// }

	// const isHorizontallyLeftAligned = (popover, opener) => {
	// 	const popoverRect = {
	// 		...await popover.getLocation(),
	// 		...await popover.getSize()
	// 	};
	// 	const openerRect = {
	// 		...await opener.getLocation(),
	// 		...await opener.getSize()
	// 	};

	// 	return Math.abs(openerRect.x - popoverRect.x) < EPS;
	// }

	// const isHorizontallyRightAligned = (popover, opener) => {
	// 	const popoverRect = {
	// 		...await popover.getLocation(),
	// 		...await popover.getSize()
	// 	};
	// 	const openerRect = {
	// 		...await opener.getLocation(),
	// 		...await opener.getSize()
	// 	};
	// 	const openerRight = openerRect.x + openerRect.width;
	// 	const popoverRight = popoverRect.x + popoverRect.width;

	// 	return Math.abs(openerRight - popoverRight) < EPS;
	// }

	describe("Horizontal Alignment", () => {
		// before(async () => {
		// 	await browser.url(`test/pages/Popover.html`);
		// });

		it("Center", () => {
			// await browser.$("[ui5-radio-button][name='horizontalAlign'][text='Center']").click();
			// await browser.$("#horizontalAlignBtn").click();
			// const popover = await browser.$("#popoverHorizontalAlign");
			// const opener = await browser.$("#targetOpener");

			// assert.ok(await isHorizontallyCentered(popover, opener), `Popover should be centered`);
		});

		it("Start", () => {
			// await browser.$("[ui5-radio-button][name='horizontalAlign'][text='Start']").click();
			// await browser.$("#horizontalAlignBtn").click();
			// const popover = await browser.$("#popoverHorizontalAlign");
			// const opener = await browser.$("#targetOpener");

			// assert.ok(await isHorizontallyLeftAligned(popover, opener), `Popover should be left aligned`);
		});

		it("End", () => {
			// await browser.$("[ui5-radio-button][name='horizontalAlign'][text='End']").click();
			// await browser.$("#horizontalAlignBtn").click();
			// const popover = await browser.$("#popoverHorizontalAlign");
			// const opener = await browser.$("#targetOpener");

			// assert.ok(await isHorizontallyRightAligned(popover, opener), `Popover should be right aligned`);
		});

		it("Center, in RTL", () => {
			// await browser.$("[ui5-radio-button][name='horizontalAlign'][text='Center']").click();
			// await browser.$("#rtlCb").click();
			// await browser.$("#horizontalAlignBtn").click();
			// const popover = await browser.$("#popoverHorizontalAlign");
			// const opener = await browser.$("#targetOpener");

			// assert.ok(await isHorizontallyCentered(popover, opener), `Popover should be centered`);
		});

		it("Start, in RTL", () => {
			// await browser.$("[ui5-radio-button][name='horizontalAlign'][text='Start']").click();
			// await browser.$("#horizontalAlignBtn").click();
			// const popover = await browser.$("#popoverHorizontalAlign");
			// const opener = await browser.$("#targetOpener");

			// assert.ok(isHorizontallyRightAligned(popover, opener), `Popover should be right aligned, flipped by RTL direction`);
		});

		it("End, in RTL", () => {
			// await browser.$("[ui5-radio-button][name='horizontalAlign'][text='End']").click();
			// await browser.$("#horizontalAlignBtn").click();
			// const popover = await browser.$("#popoverHorizontalAlign");
			// const opener = await browser.$("#targetOpener");

			// assert.ok(await isHorizontallyLeftAligned(popover, opener), `Popover should be left aligned, flipped by RTL direction`);
		});
	});

	describe("Arrow Horizontal Alignment", () => {
		// before(async () => {
		// 	await browser.url(`test/pages/Popover.html`);
		// });

		it("Arrow centering when opener has big width", () => {
			// const opener = await browser.$("#btnFullWidthTop");
			// await opener.click();
			// const popover = await browser.$("#popFullWidthTop");
			// const arrow = await popover.shadow$(".ui5-popover-arrow");

			// assert.ok(await isHorizontallyCentered(arrow, opener), `Arrow should be centered`);

			// await browser.keys("Escape");
		});

		it("Arrow centering when opener is to the left edge", () => {
			// const opener = await browser.$("#btnLeftEdgeTop");
			// await opener.click();
			// const popover = await browser.$("#popFullWidthTop");
			// const arrow = await popover.shadow$(".ui5-popover-arrow");

			// assert.ok(await isHorizontallyCentered(arrow, opener), `Arrow should be centered`);

			// await browser.keys("Escape");
		});

		it("Arrow centering when opener is to the right edge", () => {
			cy.mount(
				<>
					<Button id="btnRightEdgeTop">...</Button>
					<Popover headerText="My Heading" id="popFullWidthTop" class="popover6auto" placement="Top" opener="btnRightEdgeTop">
						<div slot="header">
							<Button id="first-focusable">I am in the header</Button>
						</div>

						<List>
							<ListItem>Hello</ListItem>
							<ListItem>World</ListItem>
							<ListItem>Again</ListItem>
						</List>
					</Popover>
				</>
			);

			cy.get("[ui5-popover]").invoke("prop", "open", "true");
			cy.get('#popFullWidthTop').then(($popover) => {
			// 	// Use Cypress to enter the shadow DOM
			// 	const arrowSelector = '.ui5-popover-arrow';

			// 	// Check if the arrow is centered with respect to the opener
			// 	cy.get('#popFullWidthTop').shadow().find(arrowSelector).then(($arrow) => {
			// 		cy.get('#btnRightEdgeTop').then(($opener) => {
			// 			const arrowLeft = $arrow.offset().left + $arrow.width() / 2;
			// 			const openerLeft = $opener.offset().left + $opener.width() / 2;

			// 			// Assert that arrow is horizontally centered with the opener
			// 			expect(arrowLeft).to.equal(openerLeft);
			// 			//expect(Math.abs(arrowLeft - openerLeft)).to.be.lessThan(1);
			// 		});
			// 	});
			// });
			// cy.get("[ui5-popover]")
			// 	.shadow()
			// 	.find(".ui5-popover-arrow")
			// 	.then($el => {
			// 		// Get the element's viewport offsets
			// 		const offset = $el.offset();
			// 		const elWidth = $el.outerWidth();
			// 		const parentWidth = $el.parent().innerWidth();

			// 		const leftOffset = offset.left;
			// 		const rightOffset = parentWidth - (leftOffset + elWidth);

			// 		// Check if it's centered
			// 		expect(Math.abs(leftOffset - rightOffset)).to.be.lessThan(1);
			//   });;

			// const opener = await browser.$("#btnRightEdgeTop");
			// await opener.click();
			// const popover = await browser.$("#popFullWidthTop");
			// const arrow = await popover.shadow$(".ui5-popover-arrow");

			// assert.ok(await isHorizontallyCentered(arrow, opener), `Arrow should be centered`);

			// await browser.keys("Escape");
		});
	});
});

describe("Responsive paddings", () => {
	it("tests media-range", () => {
		cy.viewport(1000, 400);

		cy.mount(
			<>
				<Button id="btnOpenXRightWide">Open</Button>
				<Popover id="popXRightWide" placement="Bottom" horizontalAlign="End" opener="btnOpenXRightWide">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni architecto tenetur quia nam reprehenderit quas eveniet possimus similique quisquam culpa distinctio ex doloremque molestiae maxime sed harum, in exercitationem! Incidunt?
				</Popover>
			</>
		);

		cy.get("[ui5-popover]").invoke("prop", "open", "true");
		cy.get("[ui5-popover]").should("have.attr", "media-range", "M");
	});
});