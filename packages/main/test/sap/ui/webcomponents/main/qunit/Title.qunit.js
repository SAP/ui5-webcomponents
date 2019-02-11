/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function() {
			this.getTitleRoot = function() {
				return this.title.shadowRoot.querySelector(".sapMTitle");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-title id="myTitle">label</ui5-title>';
			fixture.innerHTML = html;

			this.title = document.getElementById("myTitle");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.title = null;
		});

		QUnit.test("Root element has been rendered", function (assert) {
			var titleRoot = this.getTitleRoot();

			assert.ok(titleRoot, "root element is in the DOM");
		});

		QUnit.test("Default settings", function (assert) {
			assert.expect(3);

			var titleRoot = this.getTitleRoot(),
				existingClasses = ["sapMTitle", "sapUiSelectable", "sapMTitleStyleH2"];

			existingClasses.forEach(function(className) {
				assert.ok(titleRoot.classList.contains(className), "root element does contain " + className);
			});
		});
	});

	QUnit.module("API", function (hooks) {
		hooks.before(function() {
			this.getTitleRoot = function() {
				return this.title.shadowRoot.querySelector(".sapMTitle");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-title id="myTitle">label</ui5-title>';
			fixture.innerHTML = html;

			this.title = document.getElementById("myTitle");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.title = null;
		});

		QUnit.test("set string props", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				title = this.title,
				titleRoot = this.getTitleRoot(),
				expectedLevel = 'H2',
				expectedClass1 = "sapMTitleStyleH2",
				expectedClass2 = "sapMTitleWrap",
				expectedWrap = true;

			var props = [{
					prop: "level",
					value: expectedLevel
				}, {
					prop: "wrap",
					value: expectedWrap
				}];

			props.forEach(function(propInfo) {
				// act
				title[propInfo.prop] = propInfo.value;
			});

			RenderScheduler.whenFinished().then(function () {
				// assert
				// assert
				assert.ok(titleRoot.classList.contains(expectedClass1), "root element does contain " + expectedClass1);
				assert.ok(titleRoot.classList.contains(expectedClass2), "root element does contain " + expectedClass2);

				done();
			});
		});
	});
});