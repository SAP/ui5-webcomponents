import Button from "../../src/Button.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";

describe("ResponsivePopover general interaction", () => {
	it("header and footer are displayed by default", () => {
		cy.mount(
			<>
				<Button id="btnOpen" />
				<ResponsivePopover id="respPopover" opener={"btnOpen"}>
					<div slot="header" />
					<div slot="footer" />
				</ResponsivePopover>
			</>
		);

		cy.get("#respPopover").invoke("attr", "open", true);
		cy.get("#respPopover").should("be.visible");

		cy.get("#respPopover")
			.shadow()
			.find(".ui5-popup-header-root")
			.should("exist");

		cy.get("#respPopover")
			.shadow()
			.find(".ui5-popup-footer-root")
			.should("exist");
	});

	it("header and footer are hidden on desktop", () => {
		cy.mount(
			<>
				<Button id="btnOpen3" />
				<ResponsivePopover id="respPopover3" content-only-on-desktop opener={"btnOpen3"}>
					<div slot="header" />
				</ResponsivePopover>
			</>
		);

		cy.get("#btnOpen3").realClick();

		cy.get("#respPopover3").invoke("attr", "open", true);

		cy.get("#respPopover3").should("be.visible");
		cy.get("#respPopover3").shadow().find(".ui5-popup-header-root").should("not.exist");
	});

	it("Initial focus NOT prevented", () => {
		cy.mount(
			<>
				<Button id="btnInitialFocus" />
				<ResponsivePopover id="simpleRPInitialFocus" opener={"btnInitialFocus"} />
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
	it("tests accessible-role", () => {
		cy.mount(
			<>
				<ResponsivePopover id="respPopover" />
				<ResponsivePopover id="rPAlertRole" accessible-role="AlertDialog" />
				<Button id="btnRoleNone" />
				<ResponsivePopover id="rPNoneRole" accessible-role="None" opener={"btnRoleNone"} />
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

		cy.get("#rPNoneRole")
			.shadow()
			.find(".ui5-popup-root")
			.should("not.have.attr", "aria-modal");
	});
});