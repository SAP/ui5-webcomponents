import { html } from "lit";
import "../../src/BusyIndicator.js";
import "../../src/Button.js";
import "../../src/List.js";
import "../../src/ListItem.js";
import "../../src/Dialog.js";

const busyIndicator = html`<ui5-busy-indicator size="M" active id="indicator1"></ui5-busy-indicator>`;

describe("BusyIndicator general interaction", () => {
	it("tests event propagation", () => {
		cy.mount(html`
            <ui5-busy-indicator id="bInticator" active delay="0" size="M">
                <ui5-button id="enblBtn"> Enabled< /ui5-button>
                <ui5-button> Enabled </ui5-button>
            </ui5-busy-indicator>
        `);

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
		cy.mount(html` <ui5-busy-indicator id="busy-container" delay="200" size="M" text="Loading">
            <ui5-list id="fetch-list" no-data-text="No Data" header-text="Available Items"></ui5-list>
        </ui5-busy-indicator>`);

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
		cy.mount(html` 
            <ui5-button id="beforeIndicatorWithBtn">focus stop before</ui5-button>   
            <ui5-busy-indicator id="indicatorWithBtn" delay="0" size="M" active>
                <ui5-button id="btnInside">Hello World</ui5-button>
            </ui5-busy-indicator>
            <ui5-button id="afterIndicatorWithBtn" >focus stop after</ui5-button>`);

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
		cy.mount(html`
			<ui5-dialog id="dialog-inactive-indicator">
                <div slot="header">Dialog with focus issue</div>
                <div>
                    <div>Buttons are wrapped in busy indicator, which is inactive.</div>
                    <ui5-busy-indicator>
                        <ui5-button id="dialog-inactive-indicator-focused-button">button 1</ui5-button>
                        <ui5-button>button 2</ui5-button>
                        <ui5-button>button 3</ui5-button>
                    </ui5-busy-indicator>
                </div>
            </ui5-dialog>
		`);

		cy.get("#dialog-inactive-indicator")
			.invoke("attr", "open", "");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100);
		cy.get("#dialog-inactive-indicator-focused-button")
			.should("be.focused");

		cy.realPress("Escape");
	});

	it("test inactive indicator in dialog - correct element from default slot is focused", () => {
		cy.mount(html`
			<ui5-dialog id="dialog-delayed-indicator">
                <ui5-busy-indicator id="dialog-delayed-indicator-indicator" delay="5000" >
                    <span>Will become busy after 5 seconds</span>
                    <span>Shouldn't attempt to focus the busy indicator</span>
                </ui5-busy-indicator>
                <ui5-button id="dialog-delayed-indicator-focus-stop">focus stop</ui5-button>
            </ui5-dialog>
		`);

		cy.get("#dialog-delayed-indicator")
			.invoke("attr", "open", "");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100);
		cy.get("#dialog-delayed-indicator-focus-stop")
			.should("be.focused");

		cy.realPress("Escape");
	});

	it("Height of the root element depends on the height of the Busy Indicator - issue 6668", () => {
		cy.mount(html`
        <div style="display:flex;">
            <div style="border: 1px solid black;">
                <ui5-busy-indicator active style="height: 100%;">
                    <div style="background-color: orange; width: 200px; height: 100%;">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                        quasi, minus ullam aut eaque dolorem eos rem itaque unde, veritatis
                        consequuntur numquam! Repellat sunt, dignissimos fugit voluptate
                        animi repudiandae placeat?
                    </div>
                </ui5-busy-indicator>
            </div>
            <div style="border: 1px solid black;">
                <ui5-busy-indicator id="busy-indicator-height"  active style="height: 100%;">
                    <div style="background-color: orange; width: 200px; height: 100%;">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                </ui5-busy-indicator>
            </div>
        </div>
		`);

		cy.get("#busy-indicator-height")
			.shadow()
			.find(".ui5-busy-indicator-root")
			.should("have.css", "height", "144px");
	});
});
