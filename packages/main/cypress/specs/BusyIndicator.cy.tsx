import BusyIndicator from "../../src/BusyIndicator.js";
import Button from "../../src/Button.js";
import Dialog from "../../src/Dialog.js";

describe("Rendering", () => {
	it("Rendering without content", () => {
		cy.mount(<BusyIndicator id="busyInd" active></BusyIndicator>);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area:not(.ui5-busy-indicator-busy-area-over-content)")
			.should("exist");

	});

	it("Rendering with content", () => {
		cy.mount(
			<BusyIndicator id="busyInd" active>
				<span>content</span>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area.ui5-busy-indicator-busy-area-over-content")
			.should("exist");
	});
});

describe("BusyIndicator general interaction", () => {
	it("tests event propagation", () => {
		const onClickStub = cy.stub().as("clickStub");
		cy.mount(
			<BusyIndicator>
				<Button onClick={onClickStub} />
			</BusyIndicator>
		);

		cy.get("[ui5-button]").realClick();
		cy.get("[ui5-button]").should("have.focus");

		cy.realPress("Space");

		cy.get("@clickStub").should("have.been.called");
	});

	it("tests event propagation when busy indicator is active", () => {
		cy.mount(
			<BusyIndicator active={true} delay={0}>
				<Button onClick={cy.stub().as("clickStub")} />
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.get("[ui5-button]").realClick();
		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.focus");

		cy.realPress("Space");

		cy.get("@clickStub").should("not.have.been.called");
	});

	it("test activation", () => {
		cy.mount(
			<BusyIndicator>
				<span id="fetch-list"></span>
			</BusyIndicator>
		);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");

		cy.get("[ui5-busy-indicator]")
			.invoke("attr", "active", "");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.get("[ui5-busy-indicator]")
			.invoke("removeAttr", "active");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("not.exist");
	});

	it("tests focus handling", () => {
		cy.mount(<BusyIndicator active id="indicator1" />);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.get("[ui5-busy-indicator]").realClick();

		cy.get("[ui5-busy-indicator]").should("have.focus");
	});

	it("tests internal focused element attributes", () => {
		cy.mount(<BusyIndicator active id="indicator1" />);

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("have.attr", "role", "progressbar")
			.and("have.attr", "tabindex", "0")
			.and("have.attr", "aria-valuemin", "0")
			.and("have.attr", "aria-valuemax", "100")
			.and("have.attr", "aria-valuetext", "Busy");
	});

	it("tests content is not reachable with keyboard when active in both directions", () => {
		cy.mount(
			<div>
				<Button id="beforeIndicatorWithBtn">focus stop before</Button>
				<BusyIndicator id="indicatorWithBtn" active>
					<Button id="helloBtn">Hello World</Button>
				</BusyIndicator>
				<Button id="afterIndicatorWithBtn" >focus stop after</Button>
			</div>
		);

		cy.get("#beforeIndicatorWithBtn").realClick();
		cy.get("#beforeIndicatorWithBtn").should("have.focus");

		cy.get("[ui5-busy-indicator]")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.realPress("Tab");

		cy.get("[ui5-busy-indicator]").should("have.focus");

		cy.realPress("Tab");

		cy.get("#helloBtn").should("not.have.focus");
		cy.get("#afterIndicatorWithBtn").should("have.focus");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-busy-indicator]").should("have.focus");
		cy.get("#helloBtn").should("not.have.focus");

		cy.realPress(["Shift", "Tab"]);

		cy.get("#beforeIndicatorWithBtn").should("have.focus");
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
					</BusyIndicator>
				</div>
			</Dialog>
		);

		cy.get("#dialog-inactive-indicator").invoke("attr", "open", true);
		cy.get<Dialog>("[ui5-dialog]").ui5DialogOpened();

		cy.get("#dialog-inactive-indicator-focused-button").should("have.focus");
	});

	it("delayed indicator in dialog - shouldn't attempt to focus before the indicator is visible", () => {
		cy.mount(
			<Dialog id="dialog-delayed-indicator">
				<BusyIndicator id="dialog-delayed-indicator-indicator" delay={5000} >
					<span>Will become busy after 5 seconds</span>
				</BusyIndicator>
				<Button id="dialog-delayed-indicator-focus-stop">focus stop</Button>
			</Dialog>
		);

		cy.get("[ui5-busy-indicator]").invoke("attr", "active", true);

		cy.get("[ui5-dialog]").invoke("attr", "open", true);

		cy.get("[ui5-button]").should("have.focus");
	});

	it("Height of the root element depends on the height of the Busy Indicator - issue 6668", () => {
		cy.mount(
			<div style="display: flex;">
				<div>
					<BusyIndicator active style="height: 100%;">
						<div style="background-color: orange; width: 200px; height: 100%;">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
							quasi, minus ullam aut eaque dolorem eos rem itaque unde, veritatis
							consequuntur numquam! Repellat sunt, dignissimos fugit voluptate
							animi repudiandae placeat?
						</div>
					</BusyIndicator>
				</div>
				<div>
					<BusyIndicator id="busy-indicator-height" active style="height: 100%;">
						<div style="background-color: orange; width: 200px; height: 100%;">
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