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

	it("Tests accessibility", () => {
		cy.mount(
			<>
				<span id="infoText">info text</span>
				<Select id="textAreaAriaLabel" accessibleName="Hello World">
					<Option value="First">First</Option>
					<Option value="Second">Second</Option>
					<Option value="Third" selected>Third</Option>
				</Select>
				<Select id="textAreaAriaLabelledBy" accessibleNameRef="infoText">
					<Option value="One">One</Option>
					<Option value="Two">Two</Option>
					<Option value="Three" selected>Three</Option>
				</Select>
			</>
		);

		const EXPECTED_ARIA_LABEL1 = "Hello World";
		const EXPECTED_ARIA_LABEL2 = "info text";
		const EXPECTED_ARIA_ROLEDESCRIPTION = "Listbox";

		// Test first select with accessibleName
		cy.get("#textAreaAriaLabel")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-label", EXPECTED_ARIA_LABEL1)
			.should("have.attr", "aria-expanded", "false");

		// Test second select with accessibleNameRef
		cy.get("#textAreaAriaLabelledBy")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-label", EXPECTED_ARIA_LABEL2)
			.should("have.attr", "aria-expanded", "false")
			.should("have.attr", "aria-roledescription", EXPECTED_ARIA_ROLEDESCRIPTION);
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
			</Select>);

		cy.get("[ui5-select]").should("have.prop", "formFormattedValue", "");
	});
});

describe("Select - Validation", () => {
	it("has correct validity", () => {
		cy.mount(
			<form method="get">
				<Select id="sel1" name="select1" required>
					<Option value="">Select an option</Option>
					<Option value="option1">Option 1</Option>
					<Option value="option2">Option 2</Option>
				</Select>
				<button type="submit">Submit</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#sel1")
			.then($el => {
				const select = $el[0] as Select;
				expect(select.formValidity.valueMissing, "Required Select with empty value should have formValidity with valueMissing=true").to.be.true;
				expect(select.validity.valueMissing, "Required Select with empty value should have validity with valueMissing=true").to.be.true;
				expect(select.validity.valid, "Required Select with empty value should have validity with valid=false").to.be.false;
				expect(select.checkValidity(), "Required Select with empty value should fail validity check").to.be.false;
				expect(select.reportValidity(), "Required Select with empty value should fail report validity").to.be.false;
			});

		cy.get("#sel1:invalid").should("exist", "Required Select with empty value should have :invalid CSS class");

		// select an option with a non-empty value
		// this should make the Select valid
		cy.get("#sel1")
			.realClick()
			.get("[ui5-option]")
			.eq(1)
			.realClick();

		cy.get("#sel1")
			.then($el => {
				const select = $el[0] as Select;
				expect(select.formValidity.valueMissing, "Required Select with non-empty value should have formValidity with valueMissing=false").to.be.false;
				expect(select.validity.valueMissing, "Required Select with non-empty value should have validity with valueMissing=false").to.be.false;
				expect(select.validity.valid, "Required Select with non-empty value should have validity with valid=true").to.be.true;
				expect(select.checkValidity(), "Required Select with non-empty value should pass validity check").to.be.true;
				expect(select.reportValidity(), "Required Select with non-empty value should pass report validity").to.be.true;
			});

		cy.get("#sel1:invalid").should("not.exist", "Required Select with non-empty value should not have :invalid CSS class");
	});
});

describe("Select general interaction", () => {
	it("fires change on selection", () => {
		const changeEvents = [];

		const handleChange = (e) => {
			changeEvents.push(e);
		};

		cy.mount(
			<Select id="mySelect" onChange={handleChange}>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Cozy";

		cy.get("#mySelect").realClick();

		cy.get("#mySelect").should("have.attr", "opened");

		cy.get("#mySelect")
			.find("[ui5-option]")
			.eq(0)
			.realClick();

		cy.wrap(changeEvents).should("have.length", 1);

		cy.get("#mySelect").should("have.prop", "value", EXPECTED_SELECTION_TEXT);

		cy.get("#mySelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("prevents change on selection", () => {
		let changeEvents = [];

		const handleChange = (e) => {
			e.preventDefault();
			changeEvents.push(e);
		};

		cy.mount(
			<Select id="selectPrevent" onChange={handleChange}>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Condensed";

		cy.get("#selectPrevent").realClick();

		cy.get("#selectPrevent")
			.find("[ui5-option]")
			.eq(1)
			.realClick();

		cy.get("#selectPrevent").should("have.prop", "value", EXPECTED_SELECTION_TEXT);

		cy.get("#selectPrevent")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("does not fire change, when clicking on selected item", () => {
		const changeEvents = [];

		const handleChange = (e) => {
			changeEvents.push(e);
		};

		cy.mount(
			<Select id="mySelect" onChange={handleChange}>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#mySelect").realClick();

		cy.get("#mySelect")
			.find("[ui5-option]")
			.eq(2)
			.realClick();

		cy.wrap(changeEvents).should("have.length", 0);
	});

	it("fire open, when clicking on selected item", () => {
		const openEvents = [];

		const handleOpen = (e) => {
			openEvents.push(e);
		};

		cy.mount(
			<Select id="mySelect" onOpen={handleOpen}>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#mySelect").realClick();

		cy.wrap(openEvents).should("have.length", 1);
	});

	it("fire close, when clicking on selected item", () => {
		const closeEvents = [];

		const handleClose = (e) => {
			closeEvents.push(e);
		};

		cy.mount(
			<Select id="mySelect" onClose={handleClose}>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#mySelect").realClick();

		cy.get("#mySelect").realClick();

		cy.wrap(closeEvents).should("have.length", 1);
	});

	it("fires change on selection with keyboard handling", () => {
		const changeEvents = [];

		const handleChange = (e) => {
			changeEvents.push(e);
		};

		cy.mount(
			<Select id="errorSelect" valueState="Negative" onChange={handleChange}>
				<Option value="Cozy" selected>Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed">Condensed</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		cy.get("#errorSelect").realClick();
		cy.get("#errorSelect").realPress("ArrowDown");
		cy.get("#errorSelect").realPress("Enter");

		cy.wrap(changeEvents).should("have.length", 1);

		cy.get("#errorSelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("#errorSelect").should("have.prop", "value", EXPECTED_SELECTION_TEXT1);

		cy.get("#errorSelect").realClick();
		cy.get("#errorSelect").realPress("ArrowDown");
		cy.get("#errorSelect").realPress("Space");

		cy.wrap(changeEvents).should("have.length", 2);

		cy.get("#errorSelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT2);

		cy.get("#errorSelect").should("have.prop", "value", EXPECTED_SELECTION_TEXT2);
	});

	it("doesn't changes selection while closed with Arrow Up/Down while at last item", () => {
		const changeEvents = [];

		const handleChange = (e) => {
			changeEvents.push(e);
		};

		cy.mount(
			<Select id="errorSelect" valueState="Negative" onChange={handleChange}>
				<Option value="Cozy" selected>Cozy</Option>
				<Option value="Compact" selected>Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);


		cy.get("#errorSelect").then(($select) => {
			const selectElement = $select[0];
			selectElement.addEventListener("ui5-change", (e) => {
				changeEvents.push(e);
			});
		});

		const EXPECTED_SELECTION_TEXT1 = "Condensed";

		cy.get("#errorSelect").realClick();
		cy.get("#errorSelect").realPress("Escape");

		cy.get("#errorSelect").realPress("ArrowDown");

		cy.get("#errorSelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("#errorSelect").should("have.prop", "value", EXPECTED_SELECTION_TEXT1);

		cy.wrap(changeEvents).should("have.length", 0);
	});

	it("changes selection while closed with Arrow Up/Down", () => {
		const changeEvents = [];

		cy.mount(
			<Select id="errorSelect" valueState="Negative">
				<Option value="Cozy" selected>Cozy</Option>
				<Option value="Compact" selected>Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#errorSelect").then(($select) => {
			const selectElement = $select[0];
			selectElement.addEventListener("ui5-change", (e) => {
				changeEvents.push(e);
			});
		});

		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		cy.get("#errorSelect").realClick();
		cy.get("#errorSelect").realPress("Escape");

		cy.get("#errorSelect").realPress("ArrowUp");

		cy.get("#errorSelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("#errorSelect").should("have.prop", "value", EXPECTED_SELECTION_TEXT1);

		cy.get("#errorSelect").realPress("ArrowDown");

		cy.get("#errorSelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT2);

		cy.get("#errorSelect").should("have.prop", "value", EXPECTED_SELECTION_TEXT2);

		cy.wrap(changeEvents).should("have.length", 2);
	});

	it("changes selection sync with selection announcement", () => {
		const changeEvents = [];

		cy.mount(
			<>
				<Select id="errorSelect" valueState="Negative">
					<Option value="Cozy" selected>Cozy</Option>
					<Option value="Compact" selected>Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<button id="myBtn2">click</button>
			</>
		);

		cy.get("#errorSelect").then(($select) => {
			const selectElement = $select[0];
			selectElement.addEventListener("ui5-change", (e) => {
				changeEvents.push(e);
			});
		});

		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		cy.get("#errorSelect").realClick();
		cy.get("#errorSelect").realPress("Escape");

		cy.get("#errorSelect").realPress("ArrowUp");

		cy.get(".ui5-invisiblemessage-polite").should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("#errorSelect").realPress("ArrowDown");

		cy.get(".ui5-invisiblemessage-polite").should("contain.text", EXPECTED_SELECTION_TEXT2);

		cy.get("#errorSelect").realClick();
		cy.get("#errorSelect").realPress("ArrowUp");
		cy.get("#errorSelect").realPress("Escape");

		cy.get("#errorSelect").realClick();
		cy.get("#errorSelect").realPress("ArrowUp");
		cy.get("#errorSelect").realPress("Enter");

		cy.get("#errorSelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("#myBtn2").realClick();

		cy.wrap(changeEvents).should("have.length", 3);
	});

	it("remains closed and unchanged when read-only", () => {
		cy.mount(
			<Select id="mySelectReadOnly" readonly>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact" selected>Compact</Option>
				<Option value="Condensed">Condensed</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Compact";

		cy.get("#mySelectReadOnly").realClick();

		cy.get("#mySelectReadOnly")
			.shadow()
			.find("ui5-responsive-popover")
			.should("not.have.prop", "open", true);

		cy.get("#mySelectReadOnly").realPress("ArrowUp");

		cy.get("#mySelectReadOnly")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#mySelectReadOnly").realPress("ArrowDown");

		cy.get("#mySelectReadOnly")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("announces the selected value once Select Popover is opened", () => {
		cy.mount(
			<Select id="mySelect">
				<Option id="firstOption" value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#mySelect").realClick();

		cy.get("#mySelect [ui5-option][selected]")
			.invoke("text")
			.then((selectedText) => {
				cy.get(".ui5-invisiblemessage-polite").should("contain.text", selectedText);
			});
	});

	it("changes selection on Tab", () => {
		cy.mount(
			<>
				<Select id="keyboardHandling">
					<Option value="Banana">Banana</Option>
					<Option value="Orange" selected>Orange</Option>
					<Option value="Watermelon">Watermelon</Option>
				</Select>
				<input id="inputResult" />
			</>
		);

		const EXPECTED_SELECTION_TEXT = "Banana";

		cy.get("#keyboardHandling").realClick();
		cy.get("#keyboardHandling").realClick();

		cy.get("#keyboardHandling").realPress("Space");

		cy.get("#keyboardHandling").realPress("ArrowUp");
		cy.get("#keyboardHandling").realPress("Tab");

		cy.get("#keyboardHandling")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#inputResult").should("be.focused");
	});

	it("changes selection on Shift + Tab", () => {
		cy.mount(
			<>
				<Select id="mySelectEsc">
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact" selected>Compact</Option>
					<Option value="Condensed">Condensed</Option>
				</Select>
				<Select id="keyboardHandling">
					<Option value="Banana">Banana</Option>
					<Option value="Orange" selected>Orange</Option>
					<Option value="Watermelon">Watermelon</Option>
				</Select>
			</>
		);

		const EXPECTED_SELECTION_TEXT = "Watermelon";

		cy.get("#keyboardHandling").realClick();
		cy.get("#keyboardHandling").realClick();

		cy.get("#keyboardHandling").realPress("Space");

		cy.get("#keyboardHandling").realPress("ArrowDown");
		cy.get("#keyboardHandling").realPress(["Shift", "Tab"]);

		cy.get("#keyboardHandling")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#mySelectEsc").should("be.focused");
	});

	it("tests selection does not cycle with ArrowDown", () => {
		cy.mount(
			<Select id="selectionNotCycling">
				<Option value="Opt1">Opt1</Option>
				<Option value="Opt2">Opt2</Option>
				<Option value="Opt3" selected>Opt3</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Opt3";

		cy.get("#selectionNotCycling").realClick();

		cy.get("#selectionNotCycling")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#selectionNotCycling").realPress("ArrowDown");

		cy.get("#selectionNotCycling")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#selectionNotCycling").realPress("Escape");
	});

	it("tests selection does not cycle with ArrowUp", () => {
		cy.mount(
			<Select id="selectionNotCycling2">
				<Option value="Opt1" selected>Opt1</Option>
				<Option value="Opt2">Opt2</Option>
				<Option value="Opt3">Opt3</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Opt1";

		cy.get("#selectionNotCycling2").realClick();

		cy.get("#selectionNotCycling2")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#selectionNotCycling2").realPress("ArrowUp");

		cy.get("#selectionNotCycling2")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#selectionNotCycling2").realPress("Escape");
	});

	it("changes selection with typing single letter", () => {
		cy.mount(
			<Select id="keyboardHandling">
				<Option value="Banana">Banana</Option>
				<Option value="Orange" selected>Orange</Option>
				<Option value="Watermelon">Watermelon</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Banana";

		cy.get("#keyboardHandling").realClick();

		cy.get("#keyboardHandling").realPress("b");

		cy.get("#keyboardHandling")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("changes selection with typing more letters", () => {
		cy.mount(
			<Select id="warningSelect" valueState="Critical">
				<Option value="Australia">Australia</Option>
				<Option value="Aruba">Aruba</Option>
				<Option value="Antigua and Barbuda">Antigua and Barbuda</Option>
				<Option value="Belgium">Belgium</Option>
				<Option value="Bulgaria">Bulgaria</Option>
				<Option value="Brazil" selected>Brazil</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Brazil";

		cy.get("#warningSelect").realClick();

		cy.get("#warningSelect").realPress("b");
		cy.get("#warningSelect").realPress("r");

		cy.get("#warningSelect")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("changes selection using 'value'", () => {
		cy.mount(
			<>
				<Select id="mySelect7">
					<Option value="Item1">Item1</Option>
					<Option value="Item2">Item2</Option>
					<Option value="Item3" selected>Item3</Option>
				</Select>
				<button id="btnSetValue">select.value = "Item2"</button>
				<button id="btnSetInvalidValue">select.value = "NAN"</button>
			</>
		);

		// Set up button click handlers
		cy.get("#btnSetValue").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const select = document.getElementById("mySelect7") as Select;
				select.value = "Item2";
			});
		});

		cy.get("#btnSetInvalidValue").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const select = document.getElementById("mySelect7") as Select;
				select.value = "NAN";
			});
		});

		const INVALID_VALUE = "NAN";
		const EMPTY_VALUE = "";
		const EXPECTED_SELECTION_TEXT = "Item2";

		cy.get("#btnSetValue").realClick();

		cy.get("#mySelect7").should("have.prop", "value", EXPECTED_SELECTION_TEXT);
		cy.get("#mySelect7")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#btnSetInvalidValue").realClick();

		cy.get("#mySelect7").should("have.prop", "value", INVALID_VALUE);
		cy.get("#mySelect7")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EMPTY_VALUE);
	});

	it("opens upon space", () => {
		cy.mount(
			<>
				<button id="myBtn2">click</button>
				<Select id="mySelect">
					<Option id="firstOption" value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
			</>
		);

		cy.get("#myBtn2").realClick();
		cy.get("#myBtn2").realPress("Tab");

		cy.realPress("Space");

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);
	});

	it("toggles upon F4", () => {
		cy.mount(
			<>
				<button id="myBtn2">click</button>
				<Select id="mySelect">
					<Option id="firstOption" value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
			</>
		);

		cy.get("#myBtn2").realClick();
		cy.get("#myBtn2").realPress("Tab");

		cy.realPress("F4");

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.realPress("F4");

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);
	});

	it("toggles upon ALT + UP", () => {
		cy.mount(
			<>
				<button id="myBtn2">click</button>
				<Select id="mySelect">
					<Option id="firstOption" value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
			</>
		);

		cy.get("#myBtn2").realClick();
		cy.get("#myBtn2").realPress("Tab");

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);
	});

	it("toggles upon ALT + DOWN", () => {
		cy.mount(
			<>
				<button id="myBtn2">click</button>
				<Select id="mySelect">
					<Option id="firstOption" value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
			</>
		);

		cy.get("#myBtn2").realClick();
		cy.get("#myBtn2").realPress("Tab");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);
	});

	it("adds unselected only items to select", () => {
		let initialItemsHTML = "";

		cy.mount(
			<>
				<Select id="mySelect">
					<Option id="firstOption" value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<button id="add-items-btn">Add new Items</button>
				<button id="restore-items-btn">Restore Items</button>
			</>
		);

		cy.get("#add-items-btn").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const select = document.getElementById("mySelect") as Select;
				initialItemsHTML = select.innerHTML;

				const newOption = document.createElement("ui5-option") as Option;
				newOption.textContent = "New";

				select.innerHTML = "";
				select.appendChild(newOption);
			});
		});

		cy.get("#restore-items-btn").then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const select = document.getElementById("mySelect") as Select;
				select.innerHTML = initialItemsHTML;
			});
		});

		cy.get("#add-items-btn").realClick();

		cy.get("#mySelect")
			.find("[ui5-option]:first-child")
			.should("have.prop", "selected", true);

		cy.get("#restore-items-btn").realClick();
	});

	it("reverts value before open after clicking on escape", () => {
		const changeEvents = [];

		cy.mount(
			<Select id="mySelect">
				<Option id="firstOption" value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#mySelect").then(($select) => {
			const selectElement = $select[0];
			selectElement.addEventListener("ui5-change", (e) => {
				changeEvents.push(e);
			});
		});

		let initialSelectText = "";
		cy.get("#mySelect")
			.shadow()
			.find(".ui5-select-label-root")
			.then(($el) => {
				initialSelectText = $el[0].innerHTML;
			});

		cy.get("#mySelect").realClick();
		cy.get("#mySelect").realPress("ArrowDown");
		cy.get("#mySelect").realPress("Escape");

		cy.get("#mySelect")
			.find("[ui5-option][selected]")
			.should("have.prop", "selected", true);

		cy.wrap(changeEvents).should("have.length", 0);

		cy.get("#mySelect")
			.shadow()
			.find(".ui5-select-label-root")
			.then(($el) => {
				expect($el[0].innerHTML).to.equal(initialSelectText);
			});
	});

	it("fires change event after selection is change and picker if focussed out", () => {
		const changeEvents = [];

		cy.mount(
			<>
				<Select id="mySelect">
					<Option id="firstOption" value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<button id="myBtn2">click</button>
			</>
		);

		cy.get("#mySelect").then(($select) => {
			const selectElement = $select[0];
			selectElement.addEventListener("ui5-change", (e) => {
				changeEvents.push(e);
			});
		});

		cy.get("#mySelect").realClick();
		cy.get("#mySelect").realPress("ArrowUp");

		cy.get("#myBtn2").realClick();

		cy.wrap(changeEvents).should("have.length", 1);
	});

	it("fires change event after selecting a previewed item", () => {
		const changeEvents = [];

		cy.mount(
			<Select id="mySelect">
				<Option id="firstOption" value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#mySelect").then(($select) => {
			const selectElement = $select[0];
			selectElement.addEventListener("ui5-change", (e) => {
				changeEvents.push(e);
			});
		});

		cy.get("#mySelect").realClick();
		cy.get("#mySelect").realPress("ArrowDown");

		cy.get("#mySelect").realPress("Escape");

		cy.get("#mySelect").realClick();
		cy.get("#mySelect")
			.find("[ui5-option]:first-child")
			.realClick();

		cy.wrap(changeEvents).should("have.length", 1);
	});

	it("tests ESC on closed picker", () => {
		cy.mount(
			<Select id="mySelectEsc">
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact" selected>Compact</Option>
				<Option value="Condensed">Condensed</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Cozy";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		cy.get("#mySelectEsc").realClick();
		cy.get("#mySelectEsc")
			.find("[ui5-option]:first-child")
			.realClick();

		cy.get("#mySelectEsc")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("#mySelectEsc").realPress("Escape");

		cy.get("#mySelectEsc").realClick();
		cy.get("#mySelectEsc")
			.find("[ui5-option]")
			.eq(2)
			.realClick();

		cy.get("#mySelectEsc")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT2);
	});

	it("Tests value state type", () => {
		cy.mount(
			<>
				<Select id="successSelect" valueState="Positive">
					<Option value="Cozy" selected>Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed">Condensed</Option>
				</Select>
				<Select id="infoSelect" valueState="Information">
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<Select id="errorSelect" valueState="Negative">
					<Option value="Cozy" selected>Cozy</Option>
					<Option value="Compact" selected>Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<Select id="warningSelect" valueState="Critical">
					<Option value="Australia" selected>Australia</Option>
					<Option value="Aruba">Aruba</Option>
					<Option value="Belgium">Belgium</Option>
				</Select>
			</>
		);

		cy.get("#successSelect")
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Success");

		cy.get("#infoSelect")
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Information");

		cy.get("#errorSelect")
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Error");

		cy.get("#warningSelect")
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Warning");
	});

	it("Tests that the picker is closed when the selected value is clicked", () => {
		cy.mount(
			<Select id="mySelect">
				<Option id="firstOption" value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("#mySelect").realClick();
		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.get("#mySelect")
			.find("[ui5-option]:first-child")
			.realClick();

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);

		cy.get("#mySelect").realClick();
		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.get("#mySelect")
			.find("[ui5-option]:first-child")
			.realClick();

		cy.get("#mySelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);
	});

	it("Tests if currently selected option is visible in the viewport when keyboard navigation is used", () => {
		cy.viewport(600, 400);

		cy.mount(
			<Select id="warningSelect" valueState="Critical">
				<Option value="Australia" selected>Australia</Option>
				<Option value="Aruba">Aruba</Option>
				<Option value="Belgium">Belgium</Option>
				<Option value="Bulgaria">Bulgaria</Option>
				<Option value="Brazil">Brazil</Option>
			</Select>
		);

		cy.get("#warningSelect").realClick();

		cy.get("#warningSelect")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.get("#warningSelect").realPress("ArrowDown");
		cy.get("#warningSelect").realPress("ArrowDown");
		cy.get("#warningSelect").realPress("ArrowDown");

		cy.get("#warningSelect")
			.find("[ui5-option][selected]")
			.should("be.visible");
	});

	it("clears typed characters after selection is changed", () => {
		cy.mount(
			<Select id="textAreaAriaLabel" accessibleName="Hello World">
				<Option value="First">First</Option>
				<Option value="Second">Second</Option>
				<Option value="Third" selected>Third</Option>
			</Select>
		);

		cy.get("#textAreaAriaLabel").realClick();
		cy.get("#textAreaAriaLabel").realPress("s");

		cy.get("#textAreaAriaLabel")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Second");

		cy.get("#textAreaAriaLabel").realPress("Enter");

		cy.get("#textAreaAriaLabel").realPress("t");

		cy.get("#textAreaAriaLabel")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Third");

		cy.get("#textAreaAriaLabel").should("have.prop", "value", "Third");
	});
});