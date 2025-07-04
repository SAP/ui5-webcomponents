import Option from "../../src/Option.js";
import OptionCustom from "../../src/OptionCustom.js";
import Select from "../../src/Select.js";
import download from "@ui5/webcomponents-icons/dist/download.js";

describe("Select - value handling", () => {
	it("tests selection via Select's value", () => {
		cy.mount(
			<>
				<Select value="option2">
					<Option id="opt1" value="option1">Option 1</Option>
					<Option id="opt2" value="option2">Option 2</Option>
					<Option id="opt3" value="option3">Option 3</Option>
				</Select>

				<Select value="option6">
					<Option id="opt4" value="option4">Option 4</Option>
					<Option id="opt5" value="option5">Option 5</Option>
					<Option id="opt6" value="option6">Option 6</Option>
				</Select>
			</>
		);

		cy.get("#opt2").should("have.attr", "selected");
		cy.get("#opt6").should("have.attr", "selected");
	});

	it("tests Select's value has precedence over Option's selected", () => {
		cy.mount(
			<>
				<Select value="option1">
					<Option id="opt1" value="option1">Option 1</Option>
					<Option id="opt2" value="option2">Option 2</Option>
					<Option id="opt3" value="option3" selected={true}>Option 3</Option>
				</Select>

				<Select value="option6">
					<Option id="opt4" value="option4">Option 4</Option>
					<Option id="opt5" value="option5" selected={true}>Option 5</Option>
					<Option id="opt6" value="option6">Option 6</Option>
				</Select>
			</>
		);

		// assert that Select's value is preferred over Option's selected
		cy.get("#opt1").should("have.attr", "selected");
		cy.get("#opt3").should("not.have.attr", "selected");
		cy.get("#opt5").should("not.have.attr", "selected");
		cy.get("#opt6").should("have.attr", "selected");
	});

	it("tests Select's value of an option, added with delay", () => {
		const addOption = () => {
			const newOption = document.createElement("ui5-option") as Option;
			newOption.id = "opt3";
			newOption.value = "option3";
			newOption.textContent = "Option 3";
			document.getElementById("sel")?.appendChild(newOption);
		};

		cy.mount(
			<Select id="sel" value="option3">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
			</Select>
		);

		cy.get("#opt3").should("not.exist");

		cy.wrap(addOption).invoke("call");

		// assert "Option 3" is selected although added after the Select was mounted
		cy.get("#opt3").should("have.attr", "selected");
	});

	it("tests Select's value set with a delay", () => {
		const setValue = () => {
			const select = document.getElementById("sel") as Select;
			select.value = "option2";
		};

		cy.mount(
			<Select id="sel">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
				<Option id="opt3" value="option3">Option 3</Option>
			</Select>
		);

		cy.wrap(setValue).invoke("call");

		// assert "Option 2" is selected after dynamic value change
		cy.get("#opt2").should("have.attr", "selected");
	});

	it("tests Select's value of a missing option - auto-selects firsts", () => {
		cy.mount(
			<Select id="sel" value="option3">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
			</Select>
		);

		// assert: Value remains "option3"
		cy.get("#sel")
			.should("have.attr", "value", "option3")
			.invoke("prop", "value", "option3");

		// assert: no option is selected - the Select is displayed empty
		cy.get("#opt1").should("not.have.attr", "selected");
		cy.get("#opt2").should("not.have.attr", "selected");
	});

	it("tests Select's value updated after user interaction", () => {
		cy.mount(
			<Select id="sel" value="option3">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
				<Option id="opt3" value="option3">Option 3</Option>
			</Select>
		);

		cy.get("#sel")
			.realClick();

		cy.get("#sel")
			.should("have.attr", "opened");

		// act: select first option with click

		cy.get("#sel")
			.find("[ui5-option]")
			.eq(0)
			.realClick();

		// assert: value is updated after user interaction
		cy.get("#sel")
			.should("have.attr", "value", "option1")
			.invoke("prop", "value", "option1");

		// act: select second option with keyboard
		cy.get("#sel")
			.realClick();

		cy.get("#sel")
			.realPress("ArrowDown");

		cy.get("#sel")
			.realPress("Enter");

		// assert: value is updated after ArrowDown + Enter
		cy.get("#sel")
		.should("have.attr", "value", "option2")
		.invoke("prop", "value", "option2");
	});
});

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
			<Select id="warningSelect" valueState="Critical">
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

	it("ResponsivePopover should not have accessible name on desktop", () => {
		cy.mount(
			<Select id="desktopSelect">
				<Option value="option1">Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="option3">Option 3</Option>
			</Select>
		);

		// Open the popover
		cy.get("#desktopSelect").realClick();

		// Check that the ResponsivePopover does not have an accessible name on desktop
		cy.get("#desktopSelect")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("not.have.attr", "accessible-name");
	});

	it("should focus the selected option when popover opens", () => {
		cy.mount(
			<Select id="select" value="option2">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
				<Option id="opt3" value="option3">Option 3</Option>
			</Select>
		);

        cy.get("#select").realClick();

		cy.get("#opt2").should("have.attr", "focused");
		cy.get("#opt2").shadow()
            .find(".ui5-li-root")
            .should("be.focused");
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
	
	it("It returns empty string as a valid value, similar to native select behavior", () => {
		cy.mount(
			<Select>
				<Option selected value="">Phone</Option>
				<Option>Tablet</Option>
				<Option>Desktop</Option>
			</Select>		);

		cy.get("[ui5-select]").should("have.prop", "formFormattedValue", "");
	});
});
