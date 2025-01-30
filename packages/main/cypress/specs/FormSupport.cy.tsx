import Button from "../../src/Button.js";
import CheckBox from "../../src/CheckBox.js";
import ColorPicker from "../../src/ColorPicker.js";
import ComboBox from "../../src/ComboBox.js";
import DatePicker from "../../src/DatePicker.js";
import DateRangePicker from "../../src/DateRangePicker.js";
import DateTimePicker from "../../src/DateTimePicker.js";
import Input from "../../src/Input.js";
import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import MultiInput from "../../src/MultiInput.js";
import Token from "../../src/Token.js";
import RadioButton from "../../src/RadioButton.js";
import RangeSlider from "../../src/RangeSlider.js";
import Select from "../../src/Select.js";
import Option from "../../src/Option.js";
import Slider from "../../src/Slider.js";
import StepInput from "../../src/StepInput.js";
import Switch from "../../src/Switch.js";
import TextArea from "../../src/TextArea.js";
import TimePicker from "../../src/TimePicker.js";

const getFormData = ($form: HTMLFormElement) => {
	const formData = new FormData($form);
	const entries = [...formData.entries()];
	return entries.map(entry => {
		return `${entry[0]}=${entry[1] as string}`;
	}).join("&");
};

describe("Form support", () => {
	it("ui5-checkbox in form", () => {
		cy.mount(<form method="get">
			<CheckBox id="cb1" text="ui5-checkbox without name" > </CheckBox>
			<CheckBox id="cb2" text="ui5-checkbox without name and value" checked > </CheckBox>
			<CheckBox id="cb3" name="checkbox3" text="ui5-checkbox with name and without value" > </CheckBox>
			<CheckBox id="cb4" name="checkbox4" checked text="ui5-checkbox with name and value" > </CheckBox>
			<CheckBox id="cb5" name="checkbox5" required text="ui5-checkbox with name, value and required" > </CheckBox>
			<button type="submit" > Submits forms </button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<ColorPicker id="color_picker1"></ColorPicker>
			<ColorPicker id="color_picker2" value="blue"></ColorPicker>
			<ColorPicker id="color_picker3" name="color_picker3"></ColorPicker>
			<ColorPicker id="color_picker4" name="color_picker4" value="blue"></ColorPicker>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<ComboBox id="combobox1"></ComboBox>
			<ComboBox id="combobox2" value="ok"></ComboBox>
			<ComboBox id="combobox3" name="combobox3"></ComboBox>
			<ComboBox id="combobox4" name="combobox4" value="ok"></ComboBox>
			<ComboBox id="combobox5" name="combobox5" required></ComboBox>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<DatePicker id="date_picker1"></DatePicker>
			<DatePicker id="date_picker2" value="ok"></DatePicker>
			<DatePicker id="date_picker3" name="date_picker3"></DatePicker>
			<DatePicker id="date_picker4" name="date_picker4" value="ok"></DatePicker>
			<DatePicker id="date_picker5" name="date_picker5" required></DatePicker>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<DateRangePicker id="daterange_picker1"></DateRangePicker>
			<DateRangePicker id="daterange_picker2" value="ok"></DateRangePicker>
			<DateRangePicker id="daterange_picker3" name="daterange_picker3"></DateRangePicker>
			<DateRangePicker id="daterange_picker4" name="daterange_picker4" value="ok"></DateRangePicker>
			<DateRangePicker id="daterange_picker5" name="daterange_picker5" required></DateRangePicker>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<DateTimePicker id="datetime_picker1"></DateTimePicker>
			<DateTimePicker id="datetime_picker2" value="ok"></DateTimePicker>
			<DateTimePicker id="datetime_picker3" name="datetime_picker3"></DateTimePicker>
			<DateTimePicker id="datetime_picker4" name="datetime_picker4" value="ok"></DateTimePicker>
			<DateTimePicker id="datetime_picker5" name="datetime_picker5" required></DateTimePicker>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<Input id="input1"></Input>
			<Input id="input2" value="ok"></Input>
			<Input id="input3" name="input3"></Input>
			<Input id="input4" name="input4" value="ok"></Input>
			<Input id="input5" name="input5" required></Input>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<MultiComboBox id="multi_combobox1"></MultiComboBox>
			<MultiComboBox id="multi_combobox2" value="ok"></MultiComboBox>
			<MultiComboBox id="multi_combobox3">
				<MultiComboBoxItem selected text="ok"></MultiComboBoxItem>
			</MultiComboBox>
			<MultiComboBox id="multi_combobox4" value="ok">
				<MultiComboBoxItem selected text="ok"></MultiComboBoxItem>
			</MultiComboBox>
			<MultiComboBox id="multi_combobox5" name="multi_combobox5"></MultiComboBox>
			<MultiComboBox id="multi_combobox6" name="multi_combobox6" value="ok"></MultiComboBox>
			<MultiComboBox id="multi_combobox7" name="multi_combobox7">
				<MultiComboBoxItem selected text="ok"></MultiComboBoxItem>
			</MultiComboBox>
			<MultiComboBox id="multi_combobox8" name="multi_combobox8" value="ok">
				<MultiComboBoxItem selected text="ok"></MultiComboBoxItem>
			</MultiComboBox>
			<MultiComboBox id="multi_combobox9" no-validation required
				name="multi_combobox9"></MultiComboBox>
			<MultiComboBox id="multi_combobox10" required name="multi_combobox10" value="ok"></MultiComboBox>
			<MultiComboBox id="multi_combobox11" required name="multi_combobox11">
				<MultiComboBoxItem selected text="ok"></MultiComboBoxItem>
			</MultiComboBox>
			<MultiComboBox id="multi_combobox12" required name="multi_combobox12" value="ok">
				<MultiComboBoxItem selected text="ok"></MultiComboBoxItem>
			</MultiComboBox>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<MultiInput id="multi_input1"></MultiInput>
			<MultiInput id="multi_input2" value="ok"></MultiInput>
			<MultiInput id="multi_input3">
				<Token slot="tokens" text="ok"></Token>
			</MultiInput>
			<MultiInput id="multi_input4" value="ok">
				<Token slot="tokens" text="ok"></Token>
			</MultiInput>
			<MultiInput id="multi_input5" name="multi_input5"></MultiInput>
			<MultiInput id="multi_input6" name="multi_input6" value="ok"></MultiInput>
			<MultiInput id="multi_input7" name="multi_input7">
				<Token slot="tokens" text="ok"></Token>
			</MultiInput>
			<MultiInput id="multi_input8" name="multi_input8" value="ok">
				<Token slot="tokens" text="ok"></Token>
			</MultiInput>

			<MultiInput id="multi_input9" allow-custom-values required name="multi_input9"></MultiInput>
			<MultiInput id="multi_input10" required name="multi_input10" value="ok"></MultiInput>
			<MultiInput id="multi_input11" required name="multi_input11">
				<Token slot="tokens" text="ok"></Token>
			</MultiInput>
			<MultiInput id="multi_input12" required name="multi_input12" value="ok">
				<Token slot="tokens" text="ok"></Token>
			</MultiInput>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<RadioButton id="rb_1" required name="rb1"></RadioButton>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<RadioButton required id="rb_2" checked></RadioButton>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<RadioButton required name="rb3" id="rb_3" value="A" text="A"></RadioButton>
			<RadioButton required name="rb3" id="rb_4" value="B" text="B"></RadioButton>
			<RadioButton required value="C" text="C" checked></RadioButton>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<RangeSlider id="range_slider1"></RangeSlider>
			<RangeSlider id="range_slider2" start-value="25" end-value="75"></RangeSlider>
			<RangeSlider id="range_slider3" name="range_slider3"></RangeSlider>
			<RangeSlider id="range_slider4" name="range_slider4" start-value="25" end-value="75"></RangeSlider>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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

	it.skip("ui5-select in form", () => {
		cy.mount(<form method="get">
			<Select id="select1">
				<Option selected>Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="">Option 3</Option>
			</Select>
			<Select id="select2">
				<Option>Option 1</Option>
				<Option value="option2" selected>Option 2</Option>
				<Option value="">Option 3</Option>
			</Select>
			<Select id="select3">
				<Option>Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="" selected>Option 3</Option>
			</Select>

			<Select id="select4" name="select4">
				<Option selected>Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="">Option 3</Option>
			</Select>
			<Select id="select5" name="select5">
				<Option>Option 1</Option>
				<Option value="option2" selected>Option 2</Option>
				<Option value="">Option 3</Option>
			</Select>
			<Select id="select6" name="select6">
				<Option>Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="" selected>Option 3</Option>
			</Select>

			<Select id="select7" name="select7" required>
				<Option selected>Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="">Option 3</Option>
			</Select>
			<Select id="select8" name="select8" required>
				<Option>Option 1</Option>
				<Option value="option2" selected>Option 2</Option>
				<Option value="">Option 3</Option>
			</Select>
			<Select id="select9" name="select9" required>
				<Option>Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="" selected>Option 3</Option>
			</Select>

			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(1000);

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
		cy.mount(<form method="get">
			<Slider id="slider1"></Slider>
			<Slider id="slider2" value={100}></Slider>
			<Slider id="slider3" name="slider3"></Slider>
			<Slider id="slider4" name="slider4" value={100}></Slider>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<StepInput id="step_input1"></StepInput>
			<StepInput id="step_input2" value={4}></StepInput>
			<StepInput id="step_input3" name="step_input3"></StepInput>
			<StepInput id="step_input4" name="step_input4" value={4}></StepInput>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<Switch id="switch1" textOn="ui5-switch without name"></Switch>
			<Switch id="switch2" textOn="ui5-switch without name and value" checked></Switch>
			<Switch id="switch3" name="switch3" textOn="ui5-switch with name and without value"></Switch>
			<Switch id="switch4" name="switch4" checked textOn="ui5-switch with name and value"></Switch>
			<Switch id="switch5" name="switch5" required textOn="ui5-switch with name, value and required"></Switch>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<TextArea id="textarea1"></TextArea>
			<TextArea id="textarea2" value="ok"></TextArea>
			<TextArea id="textarea3" name="textarea3"></TextArea>
			<TextArea id="textarea4" name="textarea4" value="ok"></TextArea>
			<TextArea id="textarea5" name="textarea5" required></TextArea>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<TimePicker id="time_picker1"></TimePicker>
			<TimePicker id="time_picker2" value="1:10:10 PM"></TimePicker>
			<TimePicker id="time_picker3" name="time_picker3" required></TimePicker>
			<TimePicker id="time_picker4" name="time_picker4" value="1:10:10 PM" required></TimePicker>
			<button type="submit">Submits forms</button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
		cy.mount(<form method="get">
			<Button id="b1">Does not submit forms</Button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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

	it.skip("Submit button does submit forms", () => {
		cy.mount(<form method="get">
			<Input name="input" value="ok"></Input>
			<Input name="input_disabled" disabled value="ok"></Input>
			<Select name="sel">
				<Option value="cozy">Cozy</Option>
				<Option value="compact">Compact</Option>
				<Option value="condensed" selected>Condensed</Option>
			</Select>
			<TextArea id="ta" name="ta" value="asd"></TextArea>
			<TextArea name="ta_disabled" disabled value="ok"></TextArea>
			<DatePicker name="dp" value="Apr 10, 2019"></DatePicker>
			<DatePicker name="dp_disabled" disabled value="Apr 10, 2019"></DatePicker>
			<CheckBox name="cb" checked></CheckBox>
			<CheckBox name="cb_disabled" disabled checked></CheckBox>
			<RadioButton name="radio" text="A" value="a"></RadioButton>
			<RadioButton name="radio" text="B" value="b" checked></RadioButton>
			<RadioButton name="radio" text="C" value="c"></RadioButton>
			<StepInput name="si" value={5} min={0} max={10} step={1}></StepInput>
			<StepInput name="si_diabled" value={7} min={0} max={10} step={1}
				disabled></StepInput>
			<Button id="b1">Does not submit forms</Button>
			<Button id="b2" submits>Submits forms</Button>
		</form>);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

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
