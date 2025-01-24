import { html } from "lit";
import "../../../src/Dialog.js";
import "../../../src/Select.js";
import "../../../src/Option.js";
import "../../../src/Input.js";
import "../../../src/SuggestionItem.js";
import "../../../src/MessageStrip.js";
import "../../../src/MultiComboBox.js";
import "../../../src/MultiComboBoxItem.js";
import "../../../src/Panel.js";
import "../../../src/Button.js";
import "../../../src/CheckBox.js";
import "../../../src/Label.js";
import "../../../src/MenuItem.js";
import "../../../src/Menu.js";

describe("Event bubbling", () => {
	it("test bubbling events", () => {
		cy.mount(html`
			<div id="app">
				<ui5-dialog id="myDialog" header-text="Dialog">
					<ui5-input id="myInput" show-suggestions>
						<ui5-suggestion-item text="Cozy"></ui5-suggestion-item>
						<ui5-suggestion-item text="Compact"></ui5-suggestion-item>
						<ui5-suggestion-item text="Condensed"></ui5-suggestion-item>
					</ui5-input>

					<ui5-message-strip id="myMsgStrip">(Information) with default icon and close button:</ui5-message-strip>

					<ui5-panel id="panel" header-text="Panel">
						<ui5-label>
							Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
							nostrum, vel ea sint dicant postea.
						</ui5-label>
					</ui5-panel>
				</ui5-dialog>
			</div>
		`);

		cy.get("#app")
			.as("app");
		cy.get("[ui5-dialog]")
			.as("dialog");
		cy.get("[ui5-panel]")
			.as("panel");
		cy.get("[ui5-message-strip]")
			.as("messageStrip");
		cy.get("[ui5-input]")
			.as("input");

		cy.get("@app")
			.then(app => {
				app.get(0).addEventListener("close", cy.stub().as("appClosed"));
				app.get(0).addEventListener("toggle", cy.stub().as("appToggled"));
			});

		cy.get("@dialog")
			.then(dialog => {
				dialog.get(0).addEventListener("close", cy.stub().as("dialogClosed"));
			});

		cy.get("@input")
			.then(input => {
				input.get(0).addEventListener("close", cy.stub().as("inpClosed"));
			});

		cy.get("@messageStrip")
			.then(messageStrip => {
				messageStrip.get(0).addEventListener("close", cy.stub().as("msgClosed"));
			});

		cy.get("@panel")
			.then(panel => {
				panel.get(0).addEventListener("toggle", cy.stub().as("panelToggled"));
			});

		cy.get("@dialog").invoke("attr", "open", true);

		// act - toggle Input suggestions
		cy.get("@input")
			.realClick()
			.realType("a");

		cy.get("@input")
			.find("[ui5-suggestion-item]")
			.eq(1)
			.realClick();

		cy.get("@inpClosed")
			.should("have.been.calledOnce");

		// act - close MessageStrip
		cy.get("@messageStrip")
			.shadow()
			.find(".ui5-message-strip-close-button")
			.realClick();

		// assert
		// - the close event of the MessageStrip bubbles:  MessageStrip -> Dialog -> App
		// - the close event of the Input bubbles: Input -> Dialog -> App
		cy.get("@inpClosed")
			.should("have.been.calledOnce");
		cy.get("@msgClosed")
			.should("have.been.calledOnce");
		cy.get("@dialogClosed")
			.should("have.been.calledTwice");
		cy.get("@appClosed")
			.should("have.been.calledTwice");

		// act - toggle Panel
		cy.get("@panel")
			.shadow()
			.find(".ui5-panel-header")
			.realClick();

		// assert - the toggle event of the Panel bubbles: Panel -> App
		cy.get("@panelToggled")
			.should("have.been.calledOnce");
		cy.get("@appToggled")
			.should("have.been.calledOnce");
	});

	it("test non-bubbling events", () => {
		cy.mount(html`
			<div id="app">
				<ui5-dialog id="myDialog" header-text="Dialog">
					<ui5-select id="mySelect">
						<ui5-option>Hello</ui5-option>
						<ui5-option>World</ui5-option>
						<ui5-option>Hello</ui5-option>
					</ui5-select>

					<ui5-button id="btnOpen">Open Menu</ui5-button>
					<ui5-menu id="myMenu" header-text="Menu" opener="btnOpen">
						<ui5-menu-item text="New File"></ui5-menu-item>
						<ui5-menu-item text="New Folder"></ui5-menu-item>
					</ui5-menu>

					<ui5-multi-combobox id="myMCB">
						<ui5-mcb-item text="Cosy"></ui5-mcb-item>
						<ui5-mcb-item selected text="Compact"></ui5-mcb-item>
					</ui5-multi-combobox>
				</ui5-dialog>
			</div>
		`);

		cy.get("#app")
			.as("app");

		cy.get("[ui5-dialog]")
			.as("dialog");

		cy.get("[ui5-select]")
			.as("select");

		cy.get("[ui5-menu]")
			.as("menu");

		cy.get("[ui5-multi-combobox]")
			.as("multiCombobox");

		cy.get("[ui5-multi-combobox]")
			.shadow()
			.find(".inputIcon")
			.as("multiComboboxIcon");

		cy.get("@app")
			.then(app => {
				app.get(0).addEventListener("ui5-close", cy.stub().as("appClosed"));
			});

		cy.get("@dialog")
			.then(dialog => {
				dialog.get(0).addEventListener("ui5-close", cy.stub().as("dialogClosed"));
			});

		cy.get("@dialog")
			.then(dialog => {
				dialog.get(0).addEventListener("ui5-open", cy.stub().as("dialogOpened"));
			});

		cy.get("@select")
			.then(select => {
				select.get(0).addEventListener("ui5-close", cy.stub().as("selClosed"));
			});

		cy.get("@menu")
			.then(menu => {
				menu.get(0).addEventListener("ui5-close", cy.stub().as("menuClosed"));
			});

		cy.get("@multiCombobox")
			.then(multiCombobox => {
				multiCombobox.get(0).addEventListener("ui5-close", cy.stub().as("mcbClosed"));
			});

		cy.get("@multiCombobox")
			.then(multiCombobox => {
				multiCombobox.get(0).addEventListener("open", cy.stub().as("mcbOpened"));
			});

		cy.get("@dialog").invoke("attr", "open", true);

		// act - open and close Select
		cy.get("@select")
			.realClick();

		cy.get("@select")
			.find("[ui5-option]")
			.eq(1)
			.realClick();

		// act - open/close the  MultiComboBox
		cy.get("@multiComboboxIcon")
			.realClick();

		cy.get("@multiCombobox")
			.find("[ui5-mcb-item]")
			.should("be.visible");

		// assert - the open event of the MultiComboBox do not bubble
		cy.get("@mcbOpened").should("have.been.calledOnce");
		cy.get("@dialogOpened").should("have.been.calledTwice");

		cy.get("@multiComboboxIcon")
			.realClick();

		// act - open/close Menu
		cy.get("@menu")
			.ui5MenuOpen();

		cy.get("[ui5-menu-item]")
			.first()
			.ui5MenuItemClick();

		// assert - the close events of the Select and MultiComboBox do not bubble
		cy.get("@selClosed")
			.should("have.been.calledOnce");
		cy.get("@mcbClosed")
			.should("have.been.calledOnce");
		cy.get("@menuClosed")
			.should("have.been.calledOnce");
		cy.get("@dialogClosed")
			.should("not.be.called");
		cy.get("@appClosed")
			.should("not.be.called");
	});

	it("test cancelable events", () => {
		cy.mount(html`
			<div id="app">
				<ui5-checkbox id="cb"></ui5-checkbox>
				<ui5-checkbox id="cb2"></ui5-checkbox>
			</div>
		`);

		cy.get("#cb")
			.as("checkbox");
		cy.get("#cb2")
			.as("checkbox2");

		cy.get("@checkbox")
			.then(checkbox => {
				checkbox.get(0).addEventListener("ui5-change", e => e.preventDefault());
			});

		// act
		cy.get("@checkbox")
			.realClick();

		cy.get("@checkbox2")
			.realClick();

		// assert
		cy.get("@checkbox")
			.invoke("prop", "checked")
			.should("be.equal", false);
		cy.get("@checkbox2")
			.invoke("prop", "checked")
			.should("be.equal", true);
	});
});
