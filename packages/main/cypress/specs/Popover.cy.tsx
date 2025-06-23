import ToolbarButton from "../../src/ToolbarButton.js";
import Toolbar from "../../src/Toolbar.js";
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";
import Label from "../../src/Label.js";
import DatePicker from "../../src/DatePicker.js";

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
		// assert.ok(await browser.$("#popoverOpen").matches(":popover-open"), "popover is opened correctly");
	});

	it("test initial focus", () => {
		// assert.ok(await browser.$("#popoverBtn").matches(":focus"), "initial focus is correct");
	});

	it("test _open", () => {

		// const popoverOpen = await browser.$("#popoverOpen");
		// const popover1 = await browser.$("#popover1");
		// const popover2 = await browser.$("#popover2");
		// const popoverCont1 = await browser.$("#popoverCont1");

		// assert.ok(await popoverOpen.getProperty("_opened"), "_opened is set");
		// assert.ok(await popover1.getProperty("_opened"), "_opened is set");
		// assert.ok(await popover2.getProperty("_opened"), "_opened is set");
		// assert.ok(await popoverCont1.getProperty("_opened"), "_opened is set");
	});

	it("Header text attribute is propagated", () => {
		// const popover = await browser.$("#pop");
		// const selector = "h2=New text";

		// await popover.setAttribute("header-text", "New text");
		// assert.ok($(selector), "The new header text was set correctly");
	});

	it("Popover arrow", () => {
		// const popover = await browser.$("#pop");
		// const btnOpenPopover = await browser.$("#btn");

		// await btnOpenPopover.click();

		// assert.ok(await popover.shadow$(".ui5-popover-arrow").isDisplayedInViewport(), "Initially popover has arrow.");

		// await browser.executeAsync(done => {
		// 	document.getElementById("pop").toggleAttribute("hide-arrow");
		// 	done();
		// });

		// assert.notOk(await popover.shadow$(".ui5-popover-arrow").isDisplayedInViewport(), "The arrow was hidden.");
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
				<Popover accessible-name-ref="lblAccNameRef">
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
		// await browser.executeAsync((done) => {
		// 	const btn = document.getElementById("btn");
		// 	const popover = document.getElementById("pop");

		// 	popover.opener = btn;
		// 	popover.open = true;
		// 	popover.open = true;
		// 	popover.open = true;
		// 	popover.open = true;

		// 	done();
		// });

		// await browser.$("body").click();
		// const popover = await browser.$("#pop");

		// assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests popover does not close with opener", () => {
		// const popover = await browser.$("#quickViewCard");
		// const btnOpenPopover = await browser.$("#btnQuickViewCardOpener");
		// const btnMoveFocus = await browser.$("#btnMoveFocus");

		// await btnOpenPopover.scrollIntoView();

		// // assert - the opener is visible
		// assert.strictEqual(await btnOpenPopover.isDisplayedInViewport(), true,
		// 	"Opener is available.");

		// // act - open popover and hide opener
		// await btnOpenPopover.click();

		// await browser.pause(500);

		// // assert - the popover remains open, although opener is not visible
		// assert.strictEqual(await popover.getProperty("open"), true,
		// 	"Popover remains open.");
		// assert.strictEqual(await popover.isDisplayedInViewport(), true,
		// 	"Popover remains open.");
		// assert.strictEqual(await btnOpenPopover.isDisplayedInViewport(), false,
		// 	"Opener is not available.");

		// // close the popover
		// await btnMoveFocus.click();
	});

	it("tests clicking inside the popover does not close it", () => {
		// const btnOpenPopover = await browser.$("#btn");
		// const btnInPopover = await browser.$("#popbtn");

		// await btnOpenPopover.click();

		// const popover = await browser.$("ui5-popover");
		// assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");

		// await btnInPopover.click();
		// assert.ok(await popover.isDisplayedInViewport(), "Popover remains opened.");
	});

	it("tests if overflown content can be reached by scrolling 1", () => {
		// const manyItemsSelect = await browser.$("#many-items");
		// const items = await await browser.$$("#many-items ui5-option")

		// await manyItemsSelect.click();

		// const itemBeforeLastItem = items[items.length - 2];

		// assert.notOk(await itemBeforeLastItem.isDisplayedInViewport(), "Last item is not displayed after openining");
	});

	it("tests if overflown content can be reached by scrolling 2", () => {
		// const manyItemsSelect = await browser.$("#many-items");
		// const items = await await browser.$$("#many-items ui5-option")
		// const itemBeforeLastItem = items[items.length - 2];

		// await itemBeforeLastItem.scrollIntoView();

		// assert.ok(await itemBeforeLastItem.isDisplayedInViewport(), "Last item is displayed after scrolling");

		// await manyItemsSelect.click();
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow) 1", () => {
		// const bigPopover = await browser.$("#big-popover");
		// const items = await bigPopover.$$("ui5-li");
		// const openBigPopoverButton = await browser.$("#big-popover-button");

		// await openBigPopoverButton.click();

		// const itemBeforeLastItem = items[items.length - 2];

		// assert.notOk(await itemBeforeLastItem.isDisplayedInViewport(), "Last item is not displayed after openining");
	});

	it("tests if overflown content can be reached by scrolling (with header and arrow) 2", () => {
		// const bigPopover = await browser.$("#big-popover");
		// const items = await bigPopover.$$("ui5-li");

		// const itemBeforeLastItem = items[items.length - 2];

		// await itemBeforeLastItem.scrollIntoView();

		// assert.ok(await itemBeforeLastItem.isDisplayedInViewport(), "Last item is displayed after scrolling");

		// await browser.keys("Escape");
	});

	it("tests modal popover", () => {
		// const btnOpenPopover = await browser.$("#btnPopModal");
		// const popoverClose = await browser.$("#modalPopoverClose");
		// const popover = await browser.$("#modalPopover");

		// await btnOpenPopover.click();
		// assert.ok(await popover.getProperty("open"), "Popover is opened.");

		// try {
		// 	await browser.$("#btn").click();
		// } catch {
		// 	assert.ok(true, "The click was intercepted.");
		// }

		// assert.ok(await popover.getProperty("open"), "Popover is still opened.");

		// await popoverClose.click();
		// assert.notOk(await popover.isDisplayedInViewport(), "Popover is closed.");
	});

	it("tests modal popover with no block layer", () => {
		// const btnOpenPopover = await browser.$("#btnPopModalNoLayer");
		// const popover = await browser.$("#modalPopoverNoLayer");

		// await btnOpenPopover.click();
		// assert.ok(await popover.getProperty("open"), "Popover is opened.");

		// await browser.keys("Escape");
	});

	it("tests initial focus", () => {
		// const focusedButton = await browser.$("#focusMe");
		// const btnOpenPopover = await browser.$("#btnPopFocus");

		// await btnOpenPopover.click();

		// assert.ok(await focusedButton.matches(":focus"), "The button is focused.");

		// await browser.keys("Escape");
	});

	it("tests focus trapping using TAB", () => {
		// const btn = await browser.$("#btn");
		// const ff = await browser.$("#first-focusable");

		// await btn.click();

		// assert.ok(await ff.matches(":focus"), "The first focusable element is focused.");

		// // list
		// await browser.keys("Tab");

		// assert.notOk(await ff.matches(":focus"), "The first focusable element is focused.");

		// // button
		// await browser.keys("Tab");

		// assert.notOk(await ff.matches(":focus"), "The first focusable element is focused.");

		// // select
		// await browser.keys("Tab");

		// // footer button
		// await browser.keys("Tab");

		// // goes to first focusable again
		// await browser.keys("Tab");

		// assert.ok(await ff.matches(":focus"), "The first focusable element is focused.");

		// await browser.keys("Escape");
	});

	it("tests focus trapping using SHIFT TAB", () => {
		// const btn = await browser.$("#btn");
		// const ff = await browser.$("#first-focusable");

		// await btn.click();

		// assert.ok(await ff.matches(":focus"), "The first focusable element is focused.");

		// // footer button
		// await browser.keys(["Shift", "Tab"]);

		// // select
		// await browser.keys(["Shift", "Tab"]);

		// // button
		// await browser.keys(["Shift", "Tab"]);

		// // list
		// await browser.keys(["Shift", "Tab"]);

		// // header button
		// await browser.keys(["Shift", "Tab"]);

		// assert.ok(await ff.matches(":focus"), "The first focusable element is focused.");

		// await browser.keys("Escape");
	});

	it("tests focus when there is no focusable content", () => {
		// const firstBtn = await browser.$("#firstBtn");
		// const popoverId = "popNoFocusableContent";

		// await firstBtn.click();

		// let activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");

		// assert.strictEqual(activeElementId, popoverId, "Popover is focused");

		// await browser.keys(["Shift", "Tab"]);

		// activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");

		// assert.equal(activeElementId, popoverId, "Popover remains focused");

		// await browser.keys("Escape");
	});

	it("tests focus when content, which can't be focused is clicked", () => {
		// await browser.$("#btnOpenPopoverWithDiv").click();
		// await browser.$("#divContent").click();

		// const popoverId = "popWithDiv";
		// const activeElementId = await browser.$(await browser.getActiveElement()).getAttribute("id");

		// assert.strictEqual(activeElementId, popoverId, "Popover is focused");

		// await browser.keys("Escape");
	});

	it("tests that dynamically created popover is opened", () => {
		// const btnOpenDynamic = await browser.$("#btnOpenDynamic");
		// await btnOpenDynamic.click();
		// const popover = await browser.$('#dynamic-popover');

		// await browser.waitUntil(
		// 	async () => (await popover.getCSSProperty("top")).parsed.value > 0 && (await popover.getCSSProperty("left")).parsed.value > 0,
		// 	{
		// 		timeout: 500,
		// 		timeoutMsg: "popover was not opened after a timeout"
		// 	}
		// );

		// assert.ok(true, "popover is opened");

		// await browser.keys("Escape");
	});

	it("tests that dynamically created popover opened by dynamically created opener is opened", () => {
		// const btnDynamicOpenerAndPopover = await browser.$("#btnDynamicOpenerAndPopover");
		// await btnDynamicOpenerAndPopover.click();
		// const popover = await browser.$("#dynamic-popover-dynamic-opener0");

		// await browser.waitUntil(
		// 	async () => (await popover.getCSSProperty("top")).parsed.value > 0 && (await popover.getCSSProperty("left")).parsed.value > 0,
		// 	{
		// 		timeout: 500,
		// 		timeoutMsg: "popover was not opened after a timeout"
		// 	}
		// );

		// assert.ok(true, "popover is opened");

		// await browser.keys("Escape");
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
	// let oldScreenHeight, oldScreenWidth;

	// before(async () => {
	// 	const browserSize = await browser.getWindowSize();
	// 	oldScreenHeight = browserSize.height;
	// 	oldScreenWidth = browserSize.width;
	// 	await browser.url(`test/pages/Popover.html`);
	// 	await browser.setWindowSize(1000, 400);
	// });

	// after(async () => {
	// 	await browser.setWindowSize(oldScreenWidth, oldScreenHeight);
	// });

	it("tests media-range", () => {
		// const popover = await browser.$("#popXRightWide");
		// const btnOpenPopover = await browser.$("#btnOpenXRightWide");

		// await btnOpenPopover.click();

		// assert.strictEqual(await popover.getAttribute("media-range"), "M", "Popover has correct media range");
	});
});