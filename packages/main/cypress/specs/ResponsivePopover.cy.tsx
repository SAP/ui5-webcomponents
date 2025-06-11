import Button from "../../src/Button.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import Title from "../../src/Title.js";

describe("ResponsivePopover general interaction", () => {
	// before(async () => {
	// 	await browser.url(`test/pages/ResponsivePopover.html`);
	// });

	it("header and footer are displayed by default", () => {
		// const btnOpenPopover = await browser.$("#btnOpen");
		// const btnClosePopover = await browser.$("#btnClose");

		// await btnOpenPopover.click();

		// const popover = await browser.$("#respPopover");
		// const header = await popover.shadow$(".ui5-popup-header-root");

		// assert.ok(await popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		// assert.ok(await header.isExisting(), "Header is displayed.");

		// await btnClosePopover.click();
		// assert.notOk(await popover.isDisplayedInViewport(), "ResponsivePopover is closed.");
	});

	it.only("header and footer are hidden on desktop", () => {
		cy.mount(
			<>
				<Button id="btnOpen3" design="Negative">Header/Footer hidden on Desktop</Button>
				<ResponsivePopover id="respPopover3" content-only-on-desktop opener={"btnOpen3"}>
					<div id="respPopoverHeader3" slot="header">
						<Title>Hello World</Title>
					</div>

					<div class="popover-content">
						{/* <ui5-label for="emailInput3" required>Email: </ui5-label>
						<ui5-input id="emailInput3" class="samples-margin-top responsivepopover3auto"  placeholder="Enter Email"></ui5-input> */}
					</div>

					<div slot="footer" class="popover-footer">
						<Button id="btnClose3" design="Emphasized">Subscribe</Button>
					</div>
				</ResponsivePopover>
			</>
		);

		cy.get("#btnOpen3").realClick();

		cy.get("#respPopover3").invoke("attr", "open", true);

		cy.get("#respPopover3").should("be.visible");
		cy.get("#respPopover3").shadow().find(".ui5-popup-header-root").should("not.be.visible");

		// const btnOpenPopover = await browser.$("#btnOpen3");

		// await btnOpenPopover.click();

		// const popover = await browser.$("#respPopover3");
		// const header = await popover.shadow$(".ui5-popup-header-root");

		// assert.ok(await popover.isDisplayedInViewport(), "ResponsivePopover is opened.");
		// assert.notOk(await header.isExisting(), "Header is not displayed.");
	});

	it("Initial focus NOT prevented", () => {
		cy.mount(
			<>
				<Button id="btnInitialFocus" />
				<ResponsivePopover id="simpleRPInitialFocus" opener={"btnInitialFocus"}/>
			</>
		);
		cy.get("#btnInitialFocus").realClick();

		cy.get("#simpleRPInitialFocus").invoke("attr", "open", true);

		cy.get("#simpleRPInitialFocus").should("have.focus");
		cy.get("#btnInitialFocus").should("not.have.focus");
	});

	it("Initial focus prevented", () => {
		cy.mount(
			<>
				<Button id="btnInitialFocusPrevented" />
				<ResponsivePopover id="simpleRPInitialFocusPrevented" prevent-initial-focus opener={"btnInitialFocusPrevented"} />
			</>
		);

		cy.get("#btnInitialFocusPrevented").realClick();

		cy.get("#simpleRPInitialFocusPrevented").invoke("attr", "open", true);

		cy.get("#btnInitialFocusPrevented").should("have.focus");
	});

	it("tests popover toggling with 'open' attribute", () => {
		cy.mount(<ResponsivePopover id="popoverAttr" />);

		cy.get("#popoverAttr").invoke("attr", "open", true);
		cy.get("#popoverAttr").should("be.visible");

		cy.get("#popoverAttr").invoke("attr", "open", false);
		cy.get("#popoverAttr").should("not.be.visible");
	});
});

describe("Acc", () => {
	// before(async () => {
	// 	await browser.url(`test/pages/ResponsivePopover.html`);
	// });

	it("tests accessible-role", () => {
		cy.mount(
			<>
				<ResponsivePopover initial-focus="emailInput" id="respPopover">
					<div id="respPopoverHeader" slot="header">
						{/* <ui5-title>Hello World</ui5-title> */}
					</div>

					<div class="popover-content">
						{/* <ui5-label for="emailInput" required>Email: </ui5-label>
					<ui5-input id="emailInput" class="samples-margin-top responsivepopover3auto"  placeholder="Enter Email"></ui5-input> */}
					</div>

					<div slot="footer" class="popover-footer">
						{/* <ui5-button id="btnClose" design="Emphasized">Subscribe</ui5-button> */}
					</div>
				</ResponsivePopover>
				<ResponsivePopover id="rPAlertRole" accessible-role="AlertDialog">
					<div slot="header">
						{/* <Title level="H1">Role 'AlertDialog'</Title> */}
					</div>
					<span>Hello World!</span>
				</ResponsivePopover>
				<ResponsivePopover id="rPNoneRole" accessible-role="None">
					<div slot="header">
						{/* <ui5-title level="H1">Role 'None'</ui5-title> */}
					</div>
					<span>Hello World!</span>
				</ResponsivePopover>
			</>
		);
		cy.get("#respPopover")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "dialog")
			.and("have.attr", "aria-modal", "true");

		cy.get("#rPAlertRole")
			.shadow()
			.find(".ui5-popup-root")
			.should("have.attr", "role", "alertdialog")
			.and("have.attr", "aria-modal", "true");

		cy.get("#rPNoneRole")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "role",)
		// .and("not.have.attr", "aria-modal");



		// const respPopover = await browser.$("#respPopover");

		// assert.strictEqual(await respPopover.shadow$(".ui5-popup-root").getAttribute("role"), "dialog","The default role is applied.");
		// assert.strictEqual(await respPopover.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal=true is applied.");

		// const respPopoverAlertRole = await browser.$("#rPAlertRole");

		// assert.strictEqual(await respPopoverAlertRole.shadow$(".ui5-popup-root").getAttribute("role"), "alertdialog", "role='alertdialog' is applied.");
		// assert.strictEqual(await respPopoverAlertRole.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal=true is applied.");

		// const respPopoverNoneRole = await browser.$("#rPNoneRole");

		// assert.notOk(await respPopoverNoneRole.shadow$(".ui5-popup-root").getAttribute("role"), "role is not set.");
		// assert.notOk(await respPopoverNoneRole.shadow$(".ui5-popup-root").getAttribute("aria-modal"), "aria-modal not set.");
	});
});