/* global QUnit,window,TestHelper,RenderScheduler,$ */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Web Components", {
		beforeEach: function() {
			var html = '<ui5-datepicker id="dp1"></ui5-datepicker>';
			fixture.innerHTML = html;

			this.datePicker = document.getElementById("dp1");
			this.datePicker.formatPattern = "MMM d, y";

			return RenderScheduler.whenFinished();
		},
		afterEach: function() {
			fixture.innerHTML = "";
			this.datePicker = null;
		},
		getInput: function() {
			return this.datePicker.shadowRoot.querySelector("ui5-input");
		},
		getInputIcon: function() {
			return this.getInput().querySelector("ui5-icon");
		},
		isValueValid: function(datePicker, sValue) {
			return datePicker.isValid(sValue);
		},
		getPopover: function() {
			return this.datePicker.shadowRoot.querySelector("ui5-popover");
		},
		getCalendar: function() {
			return this.getPopover().querySelector("ui5-calendar");
		},
		selectDateFromPicker: function(timestamp) {
			var daypicker = this.getCalendar().shadowRoot.querySelector("ui5-daypicker");
			daypicker._modifySelectionAndNotifySubscribers(timestamp);
		},
		stubTimezone: function(timezone) {
			return sinon.stub(Date.prototype, "getDate", function() {
				var stubedDate = new Date(this.getTime() + timezone * 60 * 60 * 1000);
				return stubedDate.getUTCDate();
			});
		}
	});

	QUnit.test("input renders", function(assert) {
		assert.ok(this.getInput(), "input is rendered");
	});

	QUnit.test("calendar renders inside a popover", function(assert) {
		var done = assert.async();

		RenderScheduler.whenFinished().then(function() {
			assert.ok(this.getPopover(), "popover is rendered");
			assert.ok(this.getCalendar(), "calendar is rendered");

			done();
		}.bind(this));
	});

	QUnit.test("input receives value", function(assert) {
		var done = assert.async();

		this.datePicker.setAttribute("value", "11/11/11");

		RenderScheduler.whenFinished().then(function () {
			var oDate = new Date(this.getInput().value);

			assert.equal(oDate.getDate(), 11);
			assert.equal(oDate.getMonth(), 10);
			assert.equal(oDate.getFullYear(), 2011);
			done();
		}.bind(this));
	});

	QUnit.test("custom formatting", function(assert) {
		this.datePicker.setAttribute("format-pattern", "yyyy, dd/MM");

		assert.ok(this.isValueValid(this.datePicker, "2018, 05/05"), "custom format works");
	});

	QUnit.test("value state", function(assert) {
		var done = assert.async();

		this.datePicker.setAttribute("value-state", "Error");

		RenderScheduler.whenFinished().then(function () {
			var errorStateContentWrapper = this.getInput().shadowRoot.querySelector(".ui5-input-content");

			assert.equal(this.getInput().valueState, "Error");
			assert.ok(!!errorStateContentWrapper, "content wrapper has error styles");
			done();
		}.bind(this));
	});

	QUnit.test("disabled", function(assert) {
		var done = assert.async();

		this.datePicker.setAttribute("disabled", "");

		RenderScheduler.whenFinished().then(function () {
			assert.equal(this.getInput().disabled, true, "input has disabled set");
			assert.equal(this.getInput().getAttribute("disabled"), "", "has disabled attribute");
			done();
		}.bind(this));
	});

	QUnit.test("readonly", function(assert) {
		var done = assert.async();

		this.datePicker.setAttribute("readonly", "");

		RenderScheduler.whenFinished().then(function () {
			assert.equal(this.getInput().readonly, true, "input has readonly set");
			assert.equal(this.getInput().getAttribute("readonly"), "", "has readonly attribute");
			done();
		}.bind(this));
	});

	QUnit.test("placeholder", function(assert) {
		var done = assert.async();

		this.datePicker.setAttribute("placeholder", "test placeholder");

		RenderScheduler.whenFinished().then(function () {
			assert.equal(this.getInput().placeholder, "test placeholder", "input has correct placeholder");
			assert.equal(this.getInput().getAttribute("placeholder"), "test placeholder", "has correct placeholder attribute");
			done();
		}.bind(this));
	});

	QUnit.test("primary calendar type", function(assert) {
		var done = assert.async();

		this.datePicker.setAttribute("primary-calendar-type", "Islamic");

		RenderScheduler.whenFinished().then(function () {
			assert.equal(this.getCalendar().primaryCalendarType, "Islamic", "calendar has correct calendar type");
			done();
		}.bind(this));
	});

	QUnit.test("Islamic calendar type input value", function(assert) {
		var done = assert.async();

		this.datePicker.setAttribute("primary-calendar-type", "Islamic");
		this.datePicker.setAttribute("format-pattern", "MMM d, y G");

		assert.ok(this.isValueValid(this.datePicker, "Rab. I 6, 1440 AH"), "Islamic value is valid");

		this.datePicker.setAttribute("value", "Rab. I 6, 1440 AH");
		RenderScheduler.whenFinished().then(function () {
			assert.equal(this.getInput().value, "Rab. I 6, 1440 AH", "input has correct Islamic value");
			done();
		}.bind(this));
	});

	QUnit.test("Can focus the input after open", function(assert) {
		var done = assert.async();
		this.datePicker.openPicker({ focusInput: true });

		RenderScheduler.whenFinished().then(function () {
			assert.equal(this.datePicker.shadowRoot.activeElement, this.getInput(), "input is focused after open");
			assert.equal(this.getInput().shadowRoot.activeElement, this.getInput().shadowRoot.querySelector(".ui5-input-inner"), "inner input is focused");

			done();
		}.bind(this));
	});

	QUnit.test("Selected date from daypicker is the same as datepicker date", function(assert) {
		var done = assert.async();
		this.datePicker.openPicker();
		this.selectDateFromPicker(1546560000);

		RenderScheduler.whenFinished().then(function () {
			assert.equal(this.datePicker._calendarDate.valueOf(), 1546560000000, "selected date from daypicker is the same as datepicker date");
			done();
		}.bind(this));
	});

	QUnit.test("focusout fires change", function(assert) {
		var changeCounter = 0;
		this.datePicker.addEventListener("change", function(e) {
			changeCounter++;
		});
		this.getInput().shadowRoot.querySelector("input").value = "Jan 6, 2015";
		this.getInput().fireEventByAction("focusOut");

		assert.equal(changeCounter, 1, 'change has fired once');
	});

	QUnit.test("delete input value then open picker keeps the empty value", function(assert) {
		var timestamp_6_Jan_2015 = 1420502400;
		var timestamp_8_Jan_2015 = timestamp_6_Jan_2015 + 2 * 24 * 60 * 60;

		var done = assert.async();
		this.getInput().shadowRoot.querySelector("input").value = "Jan 6, 2015";
		this.getInput().fireEventByAction("focusOut");

		RenderScheduler.whenFinished().then(function() {
			//check if the datepicker has the correct value and open the picker
			assert.equal(this.datePicker.value, "Jan 6, 2015", "datepicker value is Jan 6, 2015");
			this.datePicker.openPicker();
		}.bind(this)).then(function() {
			//check if the picker is open and the selected date in the claendar is correct
			assert.ok(this.datePicker.isOpen(), "picker is open");
			assert.equal(this.getCalendar().selectedDates[0], timestamp_6_Jan_2015, "calendar selected date is ok");
			//then select another date - Jan 8, 2015
			this.selectDateFromPicker(timestamp_8_Jan_2015);
		}.bind(this)).then(function() {
			//check if the picker is closed and the datepicker value is correct
			assert.notOk(this.datePicker.isOpen(), "picker is closed");
			assert.equal(this.datePicker.value, "Jan 8, 2015", "datepicker value is Jan 8, 2015");
			//then delete the value
			this.getInput().shadowRoot.querySelector("input").value = "";
			this.getInput().fireEventByAction("focusOut");
		}.bind(this)).then(function() {
			assert.equal(this.datePicker.value, "", "datepicker value is empty");
			//then open the picker
			this.datePicker.openPicker();
		}.bind(this)).then(function() {
			//check if the datepicker value is still empty
			assert.equal(this.datePicker.value, "", "datepicker value is empty");
			//check if the picker is open and the selected date in the claendar is correct
			assert.ok(this.datePicker.isOpen(), "picker is open");
			assert.equal(this.getCalendar().selectedDates[0], timestamp_8_Jan_2015, "calendar selected dates is ok");
  			done();
		}.bind(this));
	});

	QUnit.test("Calendar selection works on different timezones", function(assert) {
		var dateStub = this.stubTimezone(-6); //CST
		var done = assert.async();

		this.datePicker.openPicker();
		this.selectDateFromPicker(1546560000);

		RenderScheduler.whenFinished().then(function () {
			assert.equal(this.datePicker.value, "Jan 4, 2019", "dp value is correct");
			dateStub.restore();
			done();
		}.bind(this));
	});

	QUnit.module("DatePicker with initial value", {
		initialValue: "Jan 6, 2015",
		Jan_8_2015: "Jan 8, 2015",
		beforeEach: function() {
			var html = '<ui5-datepicker value="' + this.initialValue + '" id="dp1"></ui5-datepicker>';
			fixture.innerHTML = html;

			this.datePicker = document.getElementById("dp1");

			return RenderScheduler.whenFinished();
		},
		afterEach: function() {
			fixture.innerHTML = "";
			this.datePicker = null;
		},
		getInput: function() {
			return this.datePicker.shadowRoot.querySelector("ui5-input");
		},
		getPopover: function() {
			return this.datePicker.shadowRoot.querySelector("ui5-popover");
		},
		getCalendar: function() {
			return this.getPopover().querySelector("ui5-calendar");
		},
		changeInput(value) {
			this.getInput().shadowRoot.querySelector("input").value = value;
			this.getInput().fireEventByAction("enter");
		}
	});

	QUnit.test("change fires when we change the input back to its original value", function(assert) {
		var done = assert.async();
		var changeCounter = 0;

		this.datePicker.addEventListener('change', function(e) {
			changeCounter++;
		});

		this.changeInput(this.Jan_8_2015);

		RenderScheduler.whenFinished().then(function() {
			assert.equal(changeCounter, 1, "change fired once");
			this.changeInput(this.initialValue);
		}.bind(this)).then(function() {
			assert.equal(changeCounter, 2, "change fired twice");
			done();
		}.bind(this));
	});

	QUnit.test("today value is normalized and correctly rounded to 00:00:00", function(assert) {
		var done = assert.async();
		var timestampToday = new Date().getTime();
		timestampToday = (timestampToday - timestampToday % (24 * 60 * 60 * 1000)) / 1000;

		var html = '<ui5-datepicker value="today" id="dp1"></ui5-datepicker>';
		fixture.innerHTML = html;

		this.datePicker = document.getElementById("dp1");

		RenderScheduler.whenFinished().then(function() {
			assert.equal(this.getInput().shadowRoot.querySelector('input').value, "today", "input value is ok");

			this.datePicker.openPicker();
		}.bind(this)).then(function() {
			assert.equal(this.getCalendar().selectedDates[0], timestampToday, "calendar selected dates is ok");
			done();
		}.bind(this));
	});

	QUnit.module("DatePicker openning", {
		beforeEach: function() {
			var html = '<ui5-datepicker readonly id="dp1"></ui5-datepicker>';
			fixture.innerHTML = html;

			this.datePicker = document.getElementById("dp1");

			return RenderScheduler.whenFinished();
		},
		afterEach: function() {
			fixture.innerHTML = "";
			this.datePicker = null;
		},
		getInput: function() {
			return this.datePicker.shadowRoot.querySelector("ui5-input");
		},
		getInputIcon: function() {
			return this.getInput().querySelector("ui5-icon");
		}
	});

	QUnit.test("ui5-datepicker does not open, if readonly or disabled", function(assert) {
		assert.expect(5);

		var done = assert.async();

		// assert default
		assert.notOk(this.datePicker.isOpen(), "The ui5-datepicker is closed initially.");

		// act - test readonly datepicker
		this.datePicker.togglePicker();

		// assert
		assert.notOk(this.datePicker.isOpen(), "The ui5-datepicker can`t be opened, when readonly.");
		assert.notOk(this.getInputIcon(), "The ui5-icon is hidden, when readonly.");

		// act - test disabled datepicker
		this.datePicker.readonly = false;
		this.datePicker.disabled = true;

		RenderScheduler.whenFinished().then(function () {
			// act
			this.datePicker.togglePicker();

			// assert
			assert.notOk(this.datePicker.isOpen(), "The ui5-datepicker can`t be opened, when disabled.");
			assert.ok(this.getInputIcon(), "The ui5-icon is displayed, when disabled.");

			done();
		}.bind(this));
	});

	// TODO: Cover the following intereactions with webdriverio
	QUnit.skip("open picker upon icon click", function() {});
	QUnit.skip("[F4] toggles the calendar", function() {});
	QUnit.skip("[Alt] + [UP] toggles the calendar", function() {});
	QUnit.skip("[Alt] + [DOWN] toggles the calendar", function() {});

	QUnit.module("Scrolling", {
		beforeEach: function() {
			var html = '<div id="container" style="height:100px;overflow:auto;"><div id="content" style="height:1000px;"><ui5-datepicker id="dp1"></ui5-datepicker></div></div>';
			fixture.innerHTML = html;

			this.datePicker = document.getElementById("dp1");

			return RenderScheduler.whenFinished();
		},
		afterEach: function() {
			fixture.innerHTML = "";
			this.datePicker = null;
		}
	});

	QUnit.test("Scrolling does not close the picker", function(assert) {
		var done = assert.async();
		this.datePicker.openPicker();

		RenderScheduler.whenFinished().then(function() {
			var intervalid = setInterval(function() {
				document.querySelector('#container').scrollTop += 20;
			}, 50);
			setTimeout(function() {
				assert.ok(this.datePicker.isOpen(), "picker is open");
				clearInterval(intervalid);
				done();
			}.bind(this), 500);
		}.bind(this));
	});
});
