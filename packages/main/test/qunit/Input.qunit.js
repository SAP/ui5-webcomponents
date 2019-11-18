/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function() {
			this.getInputRoot = function() {
				return this.input.shadowRoot.querySelector(".ui5-input-root");
			};

			this.getInputInner = function() {
				return this.input.shadowRoot.querySelector(".ui5-input-inner");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-input id="myInput" text="OptionA"></ui5-input>';
			fixture.innerHTML = html;

			this.input = document.getElementById("myInput");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.input = null;
		});

		QUnit.test("Root element has been rendered", function (assert) {
			var inputRoot = this.getInputRoot();

			assert.ok(inputRoot, "root element is in the DOM");
		});
	});

	QUnit.module("API", function (hooks) {
		hooks.before(function() {
			this.getInput = function() {
				return this.input;
			};

			this.getInputRoot = function() {
				return this.input.shadowRoot.querySelector(".ui5-input-root");
			};

			this.getInputInner = function() {
				return this.input.shadowRoot.querySelector(".ui5-input-inner");
			};
		});

		hooks.beforeEach(function () {
			var html = '<ui5-input id="myInput"></ui5-input>';
			fixture.innerHTML = html;

			this.input = document.getElementById("myInput");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.input = null;
		});

		QUnit.test("set string props", function(assert) {
			assert.expect(3);

			var done = assert.async(),
				input = this.getInput(),
				inputInner = this.getInputInner(),
				expectedPlaceholder= "placeholder",
				expectedType = "Email";

			var props = [{
					prop: 'placeholder',
					value: expectedPlaceholder
				}, {
					prop: "type",
					value: expectedType
				}];

			// act
			props.forEach(function(propInfo) {
				input[propInfo.prop] = propInfo.value;
			});

			RenderScheduler.whenFinished().then(function () {
				// assert
				if (isIE()) {
					assert.ok(!inputInner.hasAttribute("placeholder"), "input has 'placeholder' attr set");
					assert.equal(inputInner.getAttribute("placeholder"), null, "input has 'placeholder' attr set to empty string");
				} else {
					assert.ok(inputInner.hasAttribute("placeholder"), "input has 'placeholder' attr set");
					assert.equal(inputInner.getAttribute("placeholder"), expectedPlaceholder, "input has 'placeholder' attr set to expected string");
				}
				assert.equal(inputInner.getAttribute("type"), "email", "input has 'type' attr set to 'email'");
				done();
			});
		});

		QUnit.test("set value", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				input = this.getInput(),
				inputInner = this.getInputInner(),
				newValue = "value";

			// act
			input.value = newValue;

			RenderScheduler.whenFinished().then(function () {
				// assert
				assert.equal(inputInner.value, newValue, "input has correct 'value' set");

				done();
			});
		});
	});

	QUnit.module("Icon", function (hooks) {
		hooks.before(function() {
			this.getInput = function() {
				return this.input;
			};
			this.getInputIcon = function() {
				return this.icon;
			}
		});
		hooks.beforeEach(function () {
			var html = '<ui5-input id="myInput">'
				+ '<ui5-icon id="icon" slot="icon" name="message-success"></ui5-icon>'
				+ '</ui5-input>';

			fixture.innerHTML = html;

			this.input = document.getElementById("myInput");
			this.icon = document.getElementById("icon");
			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.input = null;
		});

		QUnit.test("set icon", function (assert) {
			assert.expect(1);

			var input = this.getInput();

			assert.equal(input.children.length, 1, "icon has been set in the light DOM");
		});
	});

	QUnit.module("Suggestions", function (hooks) {
		hooks.before(function() {
			this.getInput = function() {
				return this.input;
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-input id="myInput">'
				+ '<ui5-li key="CU" type="Active">Cuba</ui5-li>'
				+ '<ui5-li key="CH" type="Active">China</ui5-li>'
				+ '</ui5-input>';

			fixture.innerHTML = html;

			this.input = document.getElementById("myInput");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.input = null;
		});

		QUnit.test("set suggestionItems", function (assert) {
			assert.expect(1);

			var input = this.getInput();

			assert.equal(input.children.length, 2, "suggestion items have been set in the light DOM");
		});
	});

	QUnit.module("UI Interaction", function (hooks) {
		hooks.before(function() {
			this.getInput = function() {
				return this.input;
			};

			this.getInputRoot = function() {
				return this.input.shadowRoot.querySelector(".ui5-input-root");
			};

			this.getInputInner = function() {
				return this.input.shadowRoot.querySelector(".ui5-input-inner");
			};
		});

		hooks.beforeEach(function () {
			var html = '<ui5-input id="myInput"></ui5-input>';
			fixture.innerHTML = html;

			this.input = document.getElementById("myInput");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.input = null;
		});
	});
});
