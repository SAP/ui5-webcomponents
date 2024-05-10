import { assert } from "chai";

describe("Form support", () => {
	it("ui5-checkbox in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#cb_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});


		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const cb5 = await browser.$("#cb5");
		await cb5.click();

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?checkbox4=on&checkbox5=on"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-color-picker in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#color_picker_btn1");
		await submitBtn.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?color_picker3=rgba%28255%2C+255%2C+255%2C+1%29&color_picker4=blue"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-combobox in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#combobox_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const combobox5 = await browser.$("#combobox5");
		await combobox5.click();
		await browser.keys(["o", "k"])

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?combobox3=&combobox4=ok&combobox5=ok"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-date-picker in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#date_picker_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const date_picker5 = await browser.$("#date_picker5");
		await date_picker5.click();
		await browser.keys(["o", "k"])

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?date_picker3=&date_picker4=ok&date_picker5=ok"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-daterange-picker in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#daterange_picker_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const daterange_picker5 = await browser.$("#daterange_picker5");
		await daterange_picker5.click();
		await browser.keys(["o", "k"])

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?daterange_picker3=&daterange_picker4=ok&daterange_picker5=ok"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-datetime-picker in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#datetime_picker_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const datetime_picker5 = await browser.$("#datetime_picker5");
		await datetime_picker5.click();
		await browser.keys(["o", "k"])

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?datetime_picker3=&datetime_picker4=ok&datetime_picker5=ok"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-input in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#input_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const input5 = await browser.$("#input5");
		await input5.click();
		await browser.keys(["o", "k"])

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?input3=&input4=ok&input5=ok"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-multi-combobox in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#multi_combobox_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const multi_combobox9 = await browser.$("#multi_combobox9");
		await multi_combobox9.click();
		await browser.keys(["o", "k"])

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?multi_combobox5=&multi_combobox6=ok&multi_combobox7=ok&multi_combobox8=ok&multi_combobox8=ok&multi_combobox9=ok&multi_combobox10=ok&multi_combobox11=ok&multi_combobox12=ok&multi_combobox12=ok"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-multi-input in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#multi_input_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const multi_input9 = await browser.$("#multi_input9");
		await multi_input9.click();
		await browser.keys(["o", "k"])

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?multi_input5=&multi_input6=ok&multi_input7=ok&multi_input8=ok&multi_input8=ok&multi_input9=ok&multi_input10=ok&multi_input11=ok&multi_input12=ok&multi_input12=ok"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-radio-button in form 1", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#rb_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const rb_1 = await browser.$("#rb_1");
		await rb_1.click();

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?rb1=on"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-radio-button in form 2", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#rb_btn2");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?"));
		});

		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-radio-button in form 3", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#rb_btn3");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const rb_4 = await browser.$("#rb_4");
		await rb_4.click();

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?rb3=B"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-range-slider in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#range_slider_btn1");
		await submitBtn.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?range_slider3=0&range_slider3=100&range_slider4=25&range_slider4=75"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-select in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#select_btn1");
		await submitBtn.click();



		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const select9 = await browser.$("#select9");
		await select9.click();
		await browser.keys("ArrowUp");
		await browser.keys("Enter");

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?select4=Option+1&select5=option2&select6=&select7=Option+1&select8=option2&select9=option2"));
		});

		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-slider in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#slider_btn1");
		await submitBtn.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?slider3=0&slider4=100"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-step-input in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#step_input_btn1");
		await submitBtn.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?step_input3=0&step_input4=4"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-switch in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#switch_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const switch5 = await browser.$("#switch5");
		await switch5.click();

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?switch4=on&switch5=on"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-textarea in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#textarea_btn1");
		await submitBtn.click();

		let hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});

		assert.ok(hrefIsSame, "Form wasn't submitted due not filled required field");

		const textarea5 = await browser.$("#textarea5");
		await textarea5.click();
		await browser.keys(["o", "k"])

		await submitBtn.click();

		hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?textarea3=&textarea4=ok&textarea5=ok"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("ui5-time-picker in form", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const submitBtn = await browser.$("#time_picker_btn1");
		await submitBtn.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html?time_picker3=&time_picker4=1%3A10%3A10%E2%80%AFPM"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("Normal button does not submit forms", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const noSubmitButton = await browser.$("#b1");
		await noSubmitButton.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});
		assert.ok(hrefIsSame, "Form was submitted with correct parameters");
	});

	it("Submit button does submit forms", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		// Enter multiline text in TextArea
		const textarea = await browser.$("#ta");
		await textarea.click()
		await browser.keys("Enter");
		await browser.keys("o");
		await browser.keys("k");

		const submitButton = await browser.$("#b2");
		await submitButton.click();

		const formWasSubmitted = await browser.executeAsync(done => {
			const expectedFormData = "?input=ok&sel=condensed&ta=ok%0D%0Aok&dp=Apr+10%2C+2019&cb=on&radio=b&si=5";
			done(location.href.endsWith(expectedFormData));
		});
		assert.ok(formWasSubmitted, "For was submitted and URL changed");
	});

	it("Prevent default on submit event", async () => {
		await browser.url(`test/pages/FormSupport.html`);

		const noSubmitButton = await browser.$("#b3");
		await noSubmitButton.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});
		assert.ok(hrefIsSame, "Form is not submitted when prevent default is called");
	});
});
