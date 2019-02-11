/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Web Components", function(hooks) {
		hooks.beforeEach(function() {
			var html = "<ui5-calendar id='cal1'></ui5-calendar>";
			fixture.innerHTML = html;

			this.calendar = document.getElementById("cal1");

			return RenderScheduler.whenFinished();
		});

		hooks.afterEach(function() {
			fixture.innerHTML = "";
			this.calendar = null;
		});

		var getTimeStamp = function(year, month, day) {
			return Math.floor(Date.UTC(year || 1970, month || 0, day || 1) / 1000);
		};

		var getCalendarHeader = function() {
			return this.calendar.shadowRoot.querySelector("ui5-calendar-header");
		};

		var getMonth = function() {
			return this.calendar.shadowRoot.querySelector("ui5-daypicker");
		};

		var getYearPicker = function() {
			return this.calendar.shadowRoot.querySelector("ui5-yearpicker");
		}

		QUnit.test("control is rendered", function(assert) {
			assert.ok(this.calendar, 'control is rendered');
		});

		QUnit.test("yearText is set to the header", function(assert) {
			var done = assert.async();
			this.calendar.timestamp = getTimeStamp(2015);
			RenderScheduler.whenFinished().then(function () {
				assert.strictEqual(getCalendarHeader.call(this).yearText, "2015", "year is ok");
				done();
			}.bind(this));
		});

		QUnit.test("monthText is set to the header", function(assert) {
			var done = assert.async();
			this.calendar.timestamp = getTimeStamp(2015, 0);
			RenderScheduler.whenFinished().then(function () {
				assert.strictEqual(getCalendarHeader.call(this).monthText, "January", "month is ok");
				done();
			}.bind(this));
		});

		QUnit.test("timestamp is propagated to the content part", function(assert) {
			var done = assert.async();
			this.calendar.timestamp = getTimeStamp(2015, 0);

			RenderScheduler.whenFinished().then(function () {
				assert.strictEqual(getMonth.call(this).timestamp, this.calendar.timestamp, "month is has the correct timestamp");
				done();
			}.bind(this));
		});

		QUnit.test("year is set to current year by default", function(assert) {
			assert.strictEqual(new Date(getMonth.call(this)._timestamp * 1000).getFullYear(), new Date().getFullYear(), "year is ok");
			assert.strictEqual(new Date(getMonth.call(this)._timestamp * 1000).getFullYear(), new Date().getFullYear(), "year is ok");
		});

		QUnit.test("month is set to current month by default", function(assert) {
			assert.strictEqual(new Date(getMonth.call(this)._timestamp * 1000).getMonth(), new Date().getMonth(), "month is ok");
			assert.strictEqual(new Date(getMonth.call(this)._timestamp * 1000).getMonth(), new Date().getMonth(), "month is ok");
		});

		QUnit.test("calendar sets the selected year when yearpicker is opened", function(assert) {
			var done = assert.async();
			this.calendar.timestamp = getTimeStamp(2050, 0);
			this.calendar._showYearPicker();
			RenderScheduler.whenFinished().then(function () {
				assert.strictEqual(getYearPicker.call(this)._selectedYear, 2050, "year is ok");
				done();
			}.bind(this));
		});
	});
});