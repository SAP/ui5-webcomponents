/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	var getActualText = function(el) {
		return el.shadowRoot.querySelector('.ui5-label-root>.ui5-label-text-wrapper>bdi>slot').assignedNodes()[0].textContent;
	};

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function() {
			this.getLabelRoot = function() {
				return this.label.shadowRoot.querySelector(".ui5-label-root");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-label id="myLabel">label</ui5-label>';
			fixture.innerHTML = html;

			this.label = document.getElementById("myLabel");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.label = null;
		});

		QUnit.test("Root element has been rendered", function (assert) {
			var label = this.getLabelRoot();

			assert.ok(label, "root element is in the DOM");
		});

		QUnit.test("Default settings", function (assert) {
			assert.expect(1);

			var label = this.getLabelRoot();

			["ui5-label-root"].forEach(function(className) {
				assert.ok(label.classList.contains(className), "root element does contain " + className);
			});
		});
	});

	QUnit.module("API", function (hooks) {
		hooks.before(function() {
			this.getLabel = function() {
				return this.label;
			};

			this.getLabelRoot = function() {
				return this.label.shadowRoot.querySelector(".ui5-label-root");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-label id="myLabel"></ui5-label>';
			fixture.innerHTML = html;

			this.label = document.getElementById("myLabel");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.label = null;
		});

		QUnit.test("set text", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				label = this.getLabel(),
				newText = "Changed Label";

			// act
			label.innerHTML = newText;

			RenderScheduler.whenFinished().then(function () {
				// assert
				assert.equal(getActualText(label), newText, "component text has changed");
				done();
			});
		});

		QUnit.test("set string props", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				label = this.getLabel(),
				labelRoot = this.getLabelRoot(),
				expectedFor = "myInput";

			// act
			label["for"] = expectedFor;

			RenderScheduler.whenFinished().then(function () {
				// assert
				assert.equal(labelRoot.getAttribute("for"), expectedFor, "'for' has been set");
				done();
			});
		});
	});
});
