import { html } from "lit";
import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import "../../src/Button.js";

describe("F6 navigation", () => {
	describe("F6 Forward navigation", () => {
		it("tests navigation", () => {
			cy.mount(html`<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="first">First focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">Second focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="third">Third focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>After Element</ui5-button>
				</div>
			</div`);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with hidden elements", () => {
			cy.mount(html`<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="first">First focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button style="visibility: hidden;">Hidden</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true"  style="visibility: hidden;">
					<ui5-button>Hidden</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">Second focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="third">Third focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>After Element</ui5-button>
				</div>
			</div`);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with empty group", () => {
			cy.mount(html`<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="first">First focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					Group without focusable element
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">Second focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>After Element</ui5-button>
				</div>
			</div`);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with nested groups", () => {
			cy.mount(html`<div class="section">
				<button id="before">Before element</button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="first">First focusable</ui5-button>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">Second focusable</ui5-button>
				</div>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="third">Third focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with nesting inside empty fastnav-group parent", () => {
			cy.mount(html`<div class="section">
				<button id="before">Before element</button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="first">First focusable</ui5-button>
				</div>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">First focusable</ui5-button>
				</div>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="third">Second focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.get("#second").realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with group as a focusable element", () => {
			cy.mount(html`<div class="section">
				<button id="before">Before element</button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="first">First focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" tabindex="0" id="second" data-sap-ui-fastnavgroup="true">
				Second focusable
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="third">Third focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.get("#first").realPress("F6");

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert 1st group is focused agian
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation without a focusable element", () => {
			cy.mount(html`<div class="section">
				<ui5-button id="first">Before element</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				Group without focusable element
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				Group without focusable element
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#first")
				.realClick();

			// assert clicked btn is also the focused element
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress("F6");

			// assert same button remains focused as there is no fasnav group with focusable elements
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with a single group", () => {
			cy.mount(html`<div class="section">
				<button id="before">Before element</button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="first">Before element</ui5-button>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#before").focus();
			cy.realPress("F6");

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");
		});
	});

	describe("F6 Backward navigation", () => {
		it("tests navigation", () => {
			cy.mount(html`<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="first">First focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">Second focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="third">Third focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>After Element</ui5-button>
				</div>
			</div`);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation with hidden elements", () => {
			cy.mount(html`<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="first">First focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button style="visibility: hidden;">Hidden</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true"  style="visibility: hidden;">
					<ui5-button>Hidden</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">Second focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="third">Third focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>After Element</ui5-button>
				</div>
			</div`);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation with empty group", () => {
			cy.mount(html`<div>
				<div class="section">
					<button id="before">Before element</button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="first">First focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					Group without focusable element
				</div>
				<div class="section">
					<ui5-button>Something focusable</ui5-button>
				</div>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">Second focusable</ui5-button>
				</div>
				<div class="section">
					<ui5-button>After Element</ui5-button>
				</div>
			</div`);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused (an empty group is skipped)
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused agian
			cy.get("#second")
				.should("be.focused");
		});

		it("tests navigation with nested groups", () => {
			cy.mount(html`<div class="section">
				<button id="before">Before element</button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="first">First focusable</ui5-button>
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">Second focusable</ui5-button>
				</div>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="third">Third focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation with nesting inside empty fastnav-group parent", () => {
			cy.mount(html`<div class="section">
				<button id="before">Before element</button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="first">First focusable</ui5-button>
				</div>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<div class="section" data-sap-ui-fastnavgroup="true">
					<ui5-button id="second">First focusable</ui5-button>
				</div>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="third">Second focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation with group as a focusable element", () => {
			cy.mount(html`<div class="section">
				<button id="before">Before element</button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="first">First focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" tabindex="0" id="second" data-sap-ui-fastnavgroup="true">
				Second focusable
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="third">Third focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused
			cy.get("#third")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 2nd group is focused (an empty group is skipped)
			cy.get("#second")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert 3rd group is focused agian
			cy.get("#third")
				.should("be.focused");
		});

		it("tests navigation without a focusable element", () => {
			cy.mount(html`<div class="section">
				<ui5-button id="first">Before element</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				Group without focusable element
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				Group without focusable element
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#first")
				.realClick();

			// assert clicked btn is also the focused element
			cy.get("#first")
				.should("be.focused");

			// act
			cy.realPress(["Shift", "F6"]);

			// assert same button remains focused as there is no fasnav group with focusable elements
			cy.get("#first")
				.should("be.focused");
		});

		it("tests navigation with a single group", () => {
			cy.mount(html`<div class="section">
				<button id="before">Before element</button>
			</div>
			<div class="section" data-sap-ui-fastnavgroup="true">
				<ui5-button id="first">Before element</ui5-button>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>Something focusable</ui5-button>
			</div>
			<div class="section">
				<ui5-button>After Element</ui5-button>
			</div>`);

			// act
			cy.get("#before").focus();
			cy.realPress(["Shift", "F6"]);

			// assert 1st group is focused
			cy.get("#first")
				.should("be.focused");
		});
	});
});
