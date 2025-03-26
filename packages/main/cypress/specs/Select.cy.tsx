import Option from "../../src/Option.js";
import OptionCustom from "../../src/OptionCustom.js";
import Select from "../../src/Select.js";
import download from "@ui5/webcomponents-icons/dist/download.js";

describe("Select - Accessibility", () => {
	it("tests options tooltip is set displayed", () => {
		const EXPECTED_TOOLTIP = "Tooltip";
		const EXPECTED_ROLE = "option";
		cy.mount(
			<Select>
				<Option value="1" tooltip={EXPECTED_TOOLTIP}>Option 1</Option>
				<OptionCustom value="2" tooltip={EXPECTED_TOOLTIP}>Option 2</OptionCustom>
			</Select>
		);

		// Check if the role is set to option
		cy
			.get("[ui5-option]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "role", EXPECTED_ROLE)
			.get("[ui5-option-custom]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "role", EXPECTED_ROLE);

		// Check if the tooltip is set
		cy
			.get("[ui5-option][tooltip]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "title", EXPECTED_TOOLTIP)
			.get("[ui5-option-custom][tooltip]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "title", EXPECTED_TOOLTIP);
	});

	it("setting tooltip on the host is reflected on the select's shadow dom root", () => {
		cy.mount(<Select tooltip="Go home">
			<Option value="1">Option 1</Option>
			<OptionCustom value="2">Option 2</OptionCustom>
		</Select>);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.as("select");

		cy.get("@select")
			.should("have.attr", "title", "Go home");
	});
});

describe("Select - Popover", () => {
	it("Popover should render custom value state", () => {
		cy.mount(
			<Select id="warningSelect" value-state="Critical">
				<Option>This option has text bigger than ui5-select's width</Option>
				<div slot="valueStateMessage">Custom message</div>
			</Select>
		);

		cy.get("#warningSelect").realClick().realPress("Escape");

		cy.get("#warningSelect")
			.find("[slot=\"valueStateMessage\"]")
			.should("be.visible")
			.should("have.text", "Custom message");
	});
});

describe("Select - Properties", () => {
	it("Icon only is setting properly the required icon", () => {
		cy.mount(
			<Select icon={download}>
				<Option selected>Phone</Option>
				<Option>Tablet</Option>
				<Option>Desktop</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find("[ui5-icon]")
			.should("have.attr", "name", "download");
	});
});
