/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Web Components", function(hooks) {
		hooks.beforeEach(function() {
			var html = "<ui5-daypicker id='mon1'></ui5-daypicker>";
			fixture.innerHTML = html;

			this.month = document.getElementById("mon1");

			return RenderScheduler.whenFinished();
		});

		hooks.afterEach(function() {
			fixture.innerHTML = "";
			this.month = null;
		});

		var getDays = function() {
			return this.month._days;
		};

		var getDaysDomRefs = function() {
			return this.month.shadowRoot.querySelectorAll('.sapUiCalItem');
		}

		QUnit.test("control is rendered", function(assert) {
			assert.ok(this.month, 'control is rendered');
		});

		QUnit.test("days are set in an array with the right values", function(assert) {
			var done = assert.async();
			this.month.timestamp = Date.UTC(2018, 8, 1) / 1000;
			RenderScheduler.whenFinished().then(function () {
				assert.equal(new Date(getDays.call(this)[0].timestamp * 1000).getDate(), 26, "first day is ok");
				assert.strictEqual(getDays.call(this).length, 42, "there are 42 days displayed");
				assert.equal(new Date(getDays.call(this)[41].timestamp * 1000).getDate(), 6, "last day is ok");
				done();
			}.bind(this));
		});

		QUnit.test("sundays are different", function(assert) {
			var done = assert.async();
			this.month.timestamp = Date.UTC(2018, 8, 1) / 1000;
			RenderScheduler.whenFinished().then(function () {
				assert.ok(getDays.call(this)[0].classes.indexOf('sapUiCalItemWeekEnd') > -1, "sunday is a weekend");
				done();
			}.bind(this));
		});

		QUnit.test('selectedDate', function(assert) {
			var done = assert.async();
			this.month.selectedDates = [
				Date.UTC(2018, 8, 15) / 1000
			];
			this.month.timestamp = Date.UTC(2018, 8, 1) / 1000;

			RenderScheduler.whenFinished().then(function () {
				assert.ok(getDays.call(this)[20].selected, "15/8/2018 is selected");
				done();
			}.bind(this));
		});

		QUnit.test('date selction with ENTER', function(assert) {
			var done = assert.async();
			this.month.timestamp = Date.UTC(2018, 8, 1) / 1000;

			RenderScheduler.whenFinished().then(function () {
				var e = {
					preventDefault: function() { },
					ui5target: getDaysDomRefs.call(this)[20]
				};

				this.month._handleEnter(e);

				RenderScheduler.whenFinished().then(function () {
					assert.ok(getDays.call(this)[20].selected, "15/8/2018 is selected");
					assert.equal(this.month.selectedDates.length, 1, 'there is a selected date');
					assert.equal(this.month.selectedDates[0], Date.UTC(2018, 8, 15) / 1000, 'the right date is selected');
					done();
				}.bind(this));
			}.bind(this));
		});

		QUnit.test('date selction with SPACE', function(assert) {
			var done = assert.async();
			this.month.timestamp = Date.UTC(2018, 8, 1) / 1000;

			RenderScheduler.whenFinished().then(function () {
				var e = {
					preventDefault: function() {},
					ui5target: getDaysDomRefs.call(this)[20]
				};

				this.month._handleSpace(e);

				RenderScheduler.whenFinished().then(function () {
					assert.ok(getDays.call(this)[20].selected, "15/8/2018 is selected");
					assert.equal(this.month.selectedDates.length, 1, 'there is a selected date');
					assert.equal(this.month.selectedDates[0], Date.UTC(2018, 8, 15) / 1000, 'the right date is selected');
					done();
				}.bind(this));
			}.bind(this));
		});
	});
});