import BusyIndicator from "../../src/BusyIndicator.js";
import Button from "../../src/Button.js";
import List from "../../src/List.js";
import Dialog from "../../src/Dialog.js";

const busyIndicator = <BusyIndicator size="M" active id="indicator1"></BusyIndicator>;

describe("BusyIndicator general interaction", () => {
	it("tests event propagation", () => {
		cy.mount(
			<BusyIndicator id="bInticator" active={true} delay={0} size="M">
				<Button id="enblBtn">Enabled</Button>
				<Button>Enabled</Button>
			</BusyIndicator>
		);

		cy.get("#enblBtn")
			.shadow()
			.find("button")
			.as("button");

		cy.get("#enblBtn").then($button => {
			$button.get(0).addEventListener("click", cy.stub().as("clicked"));
		});

		cy.get("#enblBtn").realClick();
		cy.get("@clicked")
			.should("have.callCount", 0);
	});

	it("test activation", () => {
		cy.mount(
			<BusyIndicator
				id="busy-container"
				delay={200}
				size="M"
				text="Loading"
			>
				<List id="fetch-list" no-data-text="No Data" header-text="Available Items"></List>
			</BusyIndicator>
		);

		cy.get("#busy-container")
			.should("not.have.attr", "_is-busy");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.get("#busy-container")
			.invoke("attr", "active", "")
			.wait(300)
			.should("have.attr", "_is-busy");
	});

	it("tests focus handling", () => {
		cy.mount(busyIndicator);

		cy.get("#indicator1")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.realClick();

		cy.get("#indicator1")
			.should("be.focused");
	});

	it("tests internal focused element attributes", () => {
		cy.mount(busyIndicator);

		cy.get("#indicator1")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.attr", "role", "progressbar")
			.should("have.attr", "tabindex", "0")
			.should("have.attr", "aria-valuemin", "0")
			.should("have.attr", "aria-valuemax", "100")
			.should("have.attr", "aria-valuetext", "Busy");
	});

	it("tests internal focused element attributes", () => {
		cy.mount(
			<>
				<Button id="beforeIndicatorWithBtn">focus stop before</Button>
				<BusyIndicator id="indicatorWithBtn" delay={0} size="M" active={true}>
					<Button id="btnInside">Hello World</Button>
				</BusyIndicator>
				<Button id="afterIndicatorWithBtn" >focus stop after</Button>
			</>
		);

		cy.get("#beforeIndicatorWithBtn")
			.realClick()
			.realPress("Tab");

		cy.get("#indicatorWithBtn")
			.should("be.focused");

		cy.get("#btnInside")
			.should("not.be.focused");

		cy.realPress("Tab");

		cy.get("#afterIndicatorWithBtn")
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#indicatorWithBtn")
			.should("be.focused");

		cy.get("#btnInside")
			.should("not.be.focused");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#beforeIndicatorWithBtn")
			.should("be.focused");
	});

	it("test inactive indicator in dialog - correct element from default slot is focused", () => {
		cy.mount(
			<Dialog id="dialog-inactive-indicator">
				<div slot="header">Dialog with focus issue</div>
				<div>
					<div>Buttons are wrapped in busy indicator, which is inactive.</div>
					<BusyIndicator>
						<Button id="dialog-inactive-indicator-focused-button">button 1</Button>
						<Button>button 2</Button>
						<Button>button 3</Button>
					</BusyIndicator>
				</div>
			</Dialog>
		);

		cy.get("#dialog-inactive-indicator")
			.invoke("attr", "open", "");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100);
		cy.get("#dialog-inactive-indicator-focused-button")
			.should("be.focused");

		cy.realPress("Escape");
	});

	it("test inactive indicator in dialog - correct element from default slot is focused", () => {
		cy.mount(
			<Dialog id="dialog-delayed-indicator">
				<BusyIndicator id="dialog-delayed-indicator-indicator" delay={5000}>
					<span>Will become busy after 5 seconds</span>
					<span>Shouldn't attempt to focus the busy indicator</span>
				</BusyIndicator>
				<Button id="dialog-delayed-indicator-focus-stop">focus stop</Button>
			</Dialog>
		);

		cy.get("#dialog-delayed-indicator")
			.invoke("attr", "open", "");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100);
		cy.get("#dialog-delayed-indicator-focus-stop")
			.should("be.focused");

		cy.realPress("Escape");
	});

	it("Height of the root element depends on the height of the Busy Indicator - issue 6668", () => {
		cy.mount(
			<div style={{ display: "flex" }}>
				<div style={{ border: "1px solid black" }}>
					<BusyIndicator active={true} style={{ height: "100%" }}>
						<div style={{ "background-color": "orange", width: "200px", height: "100%" }}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
							quasi, minus ullam aut eaque dolorem eos rem itaque unde, veritatis
							consequuntur numquam! Repellat sunt, dignissimos fugit voluptate
							animi repudiandae placeat?
						</div>
					</BusyIndicator>
				</div>
				<div style={{ border: "1px solid black" }}>
					<BusyIndicator id="busy-indicator-height" active={true} style={{ height: "100%" }}>
						<div style={{ "background-color": "orange", width: "200px", height: "100%" }}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						</div>
					</BusyIndicator>
				</div>
			</div>
		);

		cy.get("#busy-indicator-height")
			.shadow()
			.find(".ui5-busy-indicator-root")
			.should("have.css", "height", "144px");
	});
});
