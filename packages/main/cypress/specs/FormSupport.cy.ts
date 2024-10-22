import { html } from "lit-html";
import "../../src/Button.js";
import "../../src/CheckBox.js";
import "../../src/ColorPicker.js";
import "../../src/ComboBox.js";
import "../../src/ComboBoxItem.js";
import "../../src/DatePicker.js";
import "../../src/DateRangePicker.js";
import "../../src/DateTimePicker.js";
import "../../src/Input.js";
import "../../src/MultiComboBox.js";
import "../../src/MultiComboBoxItem.js";
import "../../src/MultiInput.js";
import "../../src/Token.js";
import "../../src/RadioButton.js";
import "../../src/RangeSlider.js";
import "../../src/Select.js";
import "../../src/Option.js";
import "../../src/Slider.js";
import "../../src/StepInput.js";
import "../../src/Switch.js";
import "../../src/TextArea.js";
import "../../src/TimePicker.js";

const getFormData = ($form: HTMLFormElement) => {
	const formData = new FormData($form);
	const entries = [...formData.entries()];
	return entries.map(entry => {
		return `${entry[0]}=${entry[1] as string}`;
	}).join("&");
};

describe("Form support", () => {
	it("ui5-checkbox in form", () => {
		cy.mount(html`<form method="get">
	<ui5-checkbox id="cb1" text="ui5-checkbox without name"></ui5-checkbox>
	<ui5-checkbox id="cb2" text="ui5-checkbox without name and value" checked></ui5-checkbox>
	<ui5-checkbox id="cb3" name="checkbox3" text="ui5-checkbox with name and without value"></ui5-checkbox>
	<ui5-checkbox id="cb4" name="checkbox4" checked text="ui5-checkbox with name and value"></ui5-checkbox>
	<ui5-checkbox id="cb5" name="checkbox5" required text="ui5-checkbox with name, value and required"></ui5-checkbox>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#cb5")
			.realClick();

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "checkbox4=on&checkbox5=on");
	});

	it("ui5-color-picker in form", () => {
		cy.mount(html`<form method="get">
	<ui5-color-picker id="color_picker1"></ui5-color-picker>
	<ui5-color-picker id="color_picker2" value="blue"></ui5-color-picker>
	<ui5-color-picker id="color_picker3" name="color_picker3"></ui5-color-picker>
	<ui5-color-picker id="color_picker4" name="color_picker4" value="blue"></ui5-color-picker>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "color_picker3=rgba(255,255,255,1)&color_picker4=blue");
	});

	it("ui5-combobox in form", () => {
		cy.mount(html`<form method="get">
	<ui5-combobox id="combobox1"></ui5-combobox>
	<ui5-combobox id="combobox2" value="ok"></ui5-combobox>
	<ui5-combobox id="combobox3" name="combobox3"></ui5-combobox>
	<ui5-combobox id="combobox4" name="combobox4" value="ok"></ui5-combobox>
	<ui5-combobox id="combobox5" name="combobox5" required></ui5-combobox>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#combobox5")
			.realClick();

		cy.get("#combobox5")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "combobox3=&combobox4=ok&combobox5=ok");
	});

	it("ui5-date-picker in form", () => {
		cy.mount(html`<form method="get">
	<ui5-date-picker id="date_picker1"></ui5-date-picker>
	<ui5-date-picker id="date_picker2" value="ok"></ui5-date-picker>
	<ui5-date-picker id="date_picker3" name="date_picker3"></ui5-date-picker>
	<ui5-date-picker id="date_picker4" name="date_picker4" value="ok"></ui5-date-picker>
	<ui5-date-picker id="date_picker5" name="date_picker5" required></ui5-date-picker>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#date_picker5")
			.realClick();

		cy.get("#date_picker5")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "date_picker3=&date_picker4=ok&date_picker5=ok");
	});

	it("ui5-daterange-picker in form", () => {
		cy.mount(html`<form method="get">
	<ui5-daterange-picker id="daterange_picker1"></ui5-daterange-picker>
	<ui5-daterange-picker id="daterange_picker2" value="ok"></ui5-daterange-picker>
	<ui5-daterange-picker id="daterange_picker3" name="daterange_picker3"></ui5-daterange-picker>
	<ui5-daterange-picker id="daterange_picker4" name="daterange_picker4" value="ok"></ui5-daterange-picker>
	<ui5-daterange-picker id="daterange_picker5" name="daterange_picker5" required></ui5-daterange-picker>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#daterange_picker5")
			.realClick();

		cy.get("#daterange_picker5")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "daterange_picker3=&daterange_picker4=ok&daterange_picker5=ok");
	});

	it("ui5-datetime-picker in form", () => {
		cy.mount(html`<form method="get">
	<ui5-datetime-picker id="datetime_picker1"></ui5-datetime-picker>
	<ui5-datetime-picker id="datetime_picker2" value="ok"></ui5-datetime-picker>
	<ui5-datetime-picker id="datetime_picker3" name="datetime_picker3"></ui5-datetime-picker>
	<ui5-datetime-picker id="datetime_picker4" name="datetime_picker4" value="ok"></ui5-datetime-picker>
	<ui5-datetime-picker id="datetime_picker5" name="datetime_picker5" required></ui5-datetime-picker>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#datetime_picker5")
			.realClick();

		cy.get("#datetime_picker5")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "datetime_picker3=&datetime_picker4=ok&datetime_picker5=ok");
	});

	it("ui5-input in form", () => {
		cy.mount(html`<form method="get">
	<ui5-input id="input1"></ui5-input>
	<ui5-input id="input2" value="ok"></ui5-input>
	<ui5-input id="input3" name="input3"></ui5-input>
	<ui5-input id="input4" name="input4" value="ok"></ui5-input>
	<ui5-input id="input5" name="input5" required></ui5-input>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#input5")
			.realClick();

		cy.get("#input5")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "input3=&input4=ok&input5=ok");
	});

	it("ui5-multi-combobox in form", () => {
		cy.mount(html`<form method="get">
	<ui5-multi-combobox id="multi_combobox1"></ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox2" value="ok"></ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox3">
		<ui5-mcb-item selected text="ok"></ui5-mcb-item>
	</ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox4" value="ok">
		<ui5-mcb-item selected text="ok"></ui5-mcb-item>
	</ui5-multi-combobox>


	<ui5-multi-combobox id="multi_combobox5" name="multi_combobox5"></ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox6" name="multi_combobox6" value="ok"></ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox7" name="multi_combobox7">
		<ui5-mcb-item selected text="ok"></ui5-mcb-item>
	</ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox8" name="multi_combobox8" value="ok">
		<ui5-mcb-item selected text="ok"></ui5-mcb-item>
	</ui5-multi-combobox>

	<ui5-multi-combobox id="multi_combobox9" no-validation required
		name="multi_combobox9"></ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox10" required name="multi_combobox10" value="ok"></ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox11" required name="multi_combobox11">
		<ui5-mcb-item selected text="ok"></ui5-mcb-item>
	</ui5-multi-combobox>
	<ui5-multi-combobox id="multi_combobox12" required name="multi_combobox12" value="ok">
		<ui5-mcb-item selected text="ok"></ui5-mcb-item>
	</ui5-multi-combobox>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#multi_combobox9")
			.realClick();

		cy.get("#multi_combobox9")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "multi_combobox5=&multi_combobox6=ok&multi_combobox7=&multi_combobox7=ok&multi_combobox8=ok&multi_combobox8=ok&multi_combobox9=ok&multi_combobox10=ok&multi_combobox11=&multi_combobox11=ok&multi_combobox12=ok&multi_combobox12=ok");
	});

	it("ui5-multi-input in form", () => {
		cy.mount(html`<form method="get">
	<ui5-multi-input id="multi_input1"></ui5-multi-input>
	<ui5-multi-input id="multi_input2" value="ok"></ui5-multi-input>
	<ui5-multi-input id="multi_input3">
		<ui5-token slot="tokens" text="ok"></ui5-token>
	</ui5-multi-input>
	<ui5-multi-input id="multi_input4" value="ok">
		<ui5-token slot="tokens" text="ok"></ui5-token>
	</ui5-multi-input>
	<ui5-multi-input id="multi_input5" name="multi_input5"></ui5-multi-input>
	<ui5-multi-input id="multi_input6" name="multi_input6" value="ok"></ui5-multi-input>
	<ui5-multi-input id="multi_input7" name="multi_input7">
		<ui5-token slot="tokens" text="ok"></ui5-token>
	</ui5-multi-input>
	<ui5-multi-input id="multi_input8" name="multi_input8" value="ok">
		<ui5-token slot="tokens" text="ok"></ui5-token>
	</ui5-multi-input>

	<ui5-multi-input id="multi_input9" allow-custom-values required name="multi_input9"></ui5-multi-input>
	<ui5-multi-input id="multi_input10" required name="multi_input10" value="ok"></ui5-multi-input>
	<ui5-multi-input id="multi_input11" required name="multi_input11">
		<ui5-token slot="tokens" text="ok"></ui5-token>
	</ui5-multi-input>
	<ui5-multi-input id="multi_input12" required name="multi_input12" value="ok">
		<ui5-token slot="tokens" text="ok"></ui5-token>
	</ui5-multi-input>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#multi_input9")
			.realClick();

		cy.get("#multi_input9")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "multi_input5=&multi_input6=ok&multi_input7=&multi_input7=ok&multi_input8=ok&multi_input8=ok&multi_input9=ok&multi_input10=ok&multi_input11=&multi_input11=ok&multi_input12=ok&multi_input12=ok");
	});

	it("ui5-radio-button in form 1", () => {
		cy.mount(html`<form  method="get">
	<ui5-radio-button id="rb_1" required name="rb1"></ui5-radio-button>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#rb_1")
			.realClick();

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "rb1=on");
	});

	it("ui5-radio-button in form 2", () => {
		cy.mount(html`<form  method="get">
	<ui5-title>ui5-radio-button</ui5-title>
	<ui5-radio-button required id="rb_2" required checked></ui5-radio-button>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "");
	});

	it("ui5-radio-button in form 3", () => {
		cy.mount(html`<form  method="get">
	<ui5-radio-button required name="rb3" id="rb_3" value="A" text="A"></ui5-radio-button>
	<ui5-radio-button required name="rb3" id="rb_4" value="B" text="B"></ui5-radio-button>
	<ui5-radio-button required value="C" text="C" checked></ui5-radio-button>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#rb_4")
			.realClick();

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "rb3=B");
	});

	it("ui5-range-slider in form", () => {
		cy.mount(html`<form method="get">
	<ui5-range-slider id="range_slider1"></ui5-range-slider>
	<ui5-range-slider id="range_slider2" start-value="25" end-value="75"></ui5-range-slider>
	<ui5-range-slider id="range_slider3" name="range_slider3"></ui5-range-slider>
	<ui5-range-slider id="range_slider4" name="range_slider4" start-value="25" end-value="75"></ui5-range-slider>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "range_slider3=0&range_slider3=100&range_slider4=25&range_slider4=75");
	});

	it("ui5-select in form", () => {
		cy.mount(html`<form method="get">
	<ui5-select id="select1">
		<ui5-option selected>Option 1</ui5-option>
		<ui5-option value="option2">Option 2</ui5-option>
		<ui5-option value="">Option 3</ui5-option>
	</ui5-select>
	<ui5-select id="select2">
		<ui5-option>Option 1</ui5-option>
		<ui5-option value="option2" selected>Option 2</ui5-option>
		<ui5-option value="">Option 3</ui5-option>
	</ui5-select>
	<ui5-select id="select3">
		<ui5-option>Option 1</ui5-option>
		<ui5-option value="option2">Option 2</ui5-option>
		<ui5-option value="" selected>Option 3</ui5-option>
	</ui5-select>

	<ui5-select id="select4" name="select4">
		<ui5-option selected>Option 1</ui5-option>
		<ui5-option value="option2">Option 2</ui5-option>
		<ui5-option value="">Option 3</ui5-option>
	</ui5-select>
	<ui5-select id="select5" name="select5">
		<ui5-option>Option 1</ui5-option>
		<ui5-option value="option2" selected>Option 2</ui5-option>
		<ui5-option value="">Option 3</ui5-option>
	</ui5-select>
	<ui5-select id="select6" name="select6">
		<ui5-option>Option 1</ui5-option>
		<ui5-option value="option2">Option 2</ui5-option>
		<ui5-option value="" selected>Option 3</ui5-option>
	</ui5-select>

	<ui5-select id="select7" name="select7" required>
		<ui5-option selected>Option 1</ui5-option>
		<ui5-option value="option2">Option 2</ui5-option>
		<ui5-option value="">Option 3</ui5-option>
	</ui5-select>
	<ui5-select id="select8" name="select8" required>
		<ui5-option>Option 1</ui5-option>
		<ui5-option value="option2" selected>Option 2</ui5-option>
		<ui5-option value="">Option 3</ui5-option>
	</ui5-select>
	<ui5-select id="select9" name="select9" required>
		<ui5-option>Option 1</ui5-option>
		<ui5-option value="option2">Option 2</ui5-option>
		<ui5-option value="" selected>Option 3</ui5-option>
	</ui5-select>

	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#select9")
			.realClick();

		cy.get("#select9")
			.should("have.attr", "opened");

		cy.get("#select9")
			.find("[ui5-option]")
			.eq(1)
			.realClick();

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "select4=Option 1&select5=option2&select6=&select7=Option 1&select8=option2&select9=option2");
	});

	it("ui5-slider in form", () => {
		cy.mount(html`<form method="get">
	<ui5-slider id="slider1"></ui5-slider>
	<ui5-slider id="slider2" value="100"></ui5-slider>
	<ui5-slider id="slider3" name="slider3"></ui5-slider>
	<ui5-slider id="slider4" name="slider4" value="100"></ui5-slider>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "slider3=0&slider4=100");
	});

	it("ui5-step-input in form", () => {
		cy.mount(html`<form method="get">
	<ui5-step-input id="step_input1"></ui5-step-input>
	<ui5-step-input id="step_input2" value="4"></ui5-step-input>
	<ui5-step-input id="step_input3" name="step_input3"></ui5-step-input>
	<ui5-step-input id="step_input4" name="step_input4" value="4"></ui5-step-input>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "step_input3=0&step_input4=4");
	});

	it("ui5-switch in form", () => {
		cy.mount(html`<form method="get">
	<ui5-switch id="switch1" text="ui5-switch without name"></ui5-switch>
	<ui5-switch id="switch2" text="ui5-switch without name and value" checked></ui5-switch>
	<ui5-switch id="switch3" name="switch3" text="ui5-switch with name and without value"></ui5-switch>
	<ui5-switch id="switch4" name="switch4" checked text="ui5-switch with name and value"></ui5-switch>
	<ui5-switch id="switch5" name="switch5" required text="ui5-switch with name, value and required"></ui5-switch>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#switch5")
			.realClick();

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "switch4=on&switch5=on");
	});

	it("ui5-textarea in form", () => {
		cy.mount(html`<form method="get">
	<ui5-textarea id="textarea1"></ui5-textarea>
	<ui5-textarea id="textarea2" value="ok"></ui5-textarea>
	<ui5-textarea id="textarea3" name="textarea3"></ui5-textarea>
	<ui5-textarea id="textarea4" name="textarea4" value="ok"></ui5-textarea>
	<ui5-textarea id="textarea5" name="textarea5" required></ui5-textarea>
	<button type="submit">Submits forms</button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#textarea5")
			.realClick();

		cy.get("#textarea5")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "textarea3=&textarea4=ok&textarea5=ok");
	});

	it("ui5-time-picker in form", () => {
		/* eslint-disable no-irregular-whitespace */
		cy.mount(html`<form method="get">
	<ui5-time-picker id="time_picker1"></ui5-time-picker>
	<ui5-time-picker id="time_picker2" value="1:10:10 PM"></ui5-time-picker>
	<ui5-time-picker id="time_picker3" name="time_picker3" required></ui5-time-picker>
	<ui5-time-picker id="time_picker4" name="time_picker4" value="1:10:10 PM" required></ui5-time-picker>
	<button type="submit">Submits forms</button>
</form>`);
		/* eslint-enable no-irregular-whitespace */

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#time_picker3")
			.realClick();

		cy.get("#time_picker3")
			.realType("ok", { delay: 100 });

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "time_picker3=ok&time_picker4=1:10:10 PM");
	});

	it("Normal button does not submit forms", () => {
		cy.mount(html`<form method="get">
	<ui5-button id="b1">Does not submit forms</ui5-button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("#b1")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");
	});

	it("Submit button does submit forms", () => {
		cy.mount(html`<form method="get">
	<ui5-input name="input" value="ok"></ui5-input>
	<ui5-input name="input_disabled" disabled value="ok"></ui5-input>
	<ui5-select name="sel">
		<ui5-option value="cozy">Cozy</ui5-option>
		<ui5-option value="compact">Compact</ui5-option>
		<ui5-option value="condensed" selected>Condensed</ui5-option>
	</ui5-select>
	<br><br>
	<ui5-textarea id="ta" name="ta" value="ok"></ui5-textarea>
	<ui5-textarea name="ta_disabled" disabled value="ok"></ui5-textarea>
	<br><br>
	<ui5-date-picker name="dp" value="Apr 10, 2019"></ui5-date-picker>
	<ui5-date-picker name="dp_disabled" disabled value="Apr 10, 2019"></ui5-date-picker>
	<br><br>
	<ui5-checkbox name="cb" checked></ui5-checkbox>
	<ui5-checkbox name="cb_disabled" disabled checked></ui5-checkbox>
	<br><br>
	<ui5-radio-button name="radio" text="A" value="a"></ui5-radio-button>
	<ui5-radio-button name="radio" text="B" value="b" checked></ui5-radio-button>
	<ui5-radio-button name="radio" text="C" value="c"></ui5-radio-button>
	<br><br>
	<ui5-step-input class="formsupport2auto" name="si" value="5" min="0" max="10" step="1"></ui5-step-input>
	<ui5-step-input class="formsupport2auto" name="si_diabled" value="7" min="0" max="10" step="1"
		disabled></ui5-step-input>
	<br><br>
	<ui5-button id="b1">Does not submit forms</ui5-button>
	<ui5-button id="b2" submits>Submits forms</ui5-button>
</form>`);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", e => e.preventDefault());
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("#ta")
			.realClick();

		cy.get("#b2")
			.realClick();

		cy.get("@submit")
			.should("have.been.called");

		cy.get("form")
			.then($el => {
				return getFormData($el.get(0));
			})
			.should("be.equal", "input=ok&sel=condensed&ta=ok&dp=Apr 10, 2019&cb=on&radio=b&si=5");
	});
});
