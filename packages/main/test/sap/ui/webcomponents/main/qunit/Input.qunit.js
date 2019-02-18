/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function() {
			this.getInputRoot = function() {
				return this.input.shadowRoot.querySelector(".sapWCInputBase");
			};

			this.getInputInner = function() {
				return this.input.shadowRoot.querySelector(".sapWCInputBaseInner");
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

		QUnit.test("Default settings", function (assert) {
			assert.expect(9);

			var inputRoot = this.getInputRoot(),
				inputInner = this.getInputInner(),
				existingClasses = ["sapWCInputBase", "sapWCInputBaseWidthPadding", "sapWCInput"],
				nonExistingClasses = ["sapWCInputBaseDisabled", "sapWCInputBaseReadonly", "sapWCInputFocused", "sapWCFocus"];

			// assert
			existingClasses.forEach(function(className) {
				assert.ok(inputRoot.classList.contains(className), "root element contains " + className);
			});

			// assert
			nonExistingClasses.forEach(function(className) {
				assert.notOk(inputRoot.classList.contains(className), "root element does not contain " + className);
			});

			// assert
			assert.ok(inputInner.classList.contains("sapWCInputBaseInner"), "input element contains sapWCInputBaseInner");
			assert.equal(inputInner.getAttribute("type"), "text", "input has type 'text'");
		});
	});

	QUnit.module("API", function (hooks) {
		hooks.before(function() {
			this.getInput = function() {
				return this.input;
			};

			this.getInputRoot = function() {
				return this.input.shadowRoot.querySelector(".sapWCInputBase");
			};

			this.getInputInner = function() {
				return this.input.shadowRoot.querySelector(".sapWCInputBaseInner");
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

		QUnit.test("set boolean props", function (assert) {
			assert.expect(4);

			var done = assert.async(),
				input = this.getInput(),
				inputRoot = this.getInputRoot(),
				inputInner = this.getInputInner(),
				expectedClassеs = ["sapWCInputBaseDisabled", "sapWCInputBaseReadonly"],
				props = [ 'disabled', 'readonly'];

			// act
			props.forEach(function(prop) {
				input[prop] = true;
			});

			RenderScheduler.whenFinished().then(function () {
				expectedClassеs.forEach(function(className) {
					// assert
					assert.ok(inputRoot.classList.contains(className), "root element contains " + className);
				});

				assert.ok(inputInner.hasAttribute("disabled"), "input has 'disabled' attr set");

				// act (2)
				input.disabled = false;

				RenderScheduler.whenFinished().then(function () {
					// assert
					assert.ok(inputInner.hasAttribute("readonly"), "input has 'readonly' attr set");

					done();
				});
			});
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
				if (sapUiDevice.browser.msie) {
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
				+ '<ui5-icon id="icon" data-ui5-slot="icon" src="sap-icon://message-success"></ui5-icon>'
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
				return this.input.shadowRoot.querySelector(".sapWCInputBase");
			};

			this.getInputInner = function() {
				return this.input.shadowRoot.querySelector(".sapWCInputBaseInner");
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

		QUnit.test("type in input fires change onfocusout", function(assert) {
			assert.expect(1);

			var input = this.getInput();
			var done = assert.async();

			input.addEventListener("change", function(e){
				assert.ok(true, "change fired, when onfocusout");
				done();
			});

			input.value = "abc";
			input.onfocusout();
		});

		QUnit.test("type in input does not fire change when the initial value remains the same", function(assert) {
			assert.expect(1);

			var input = this.getInput();
			var done = assert.async();

			input.addEventListener("change", function(e){
				assert.ok(false, "change fired incorreclty, when onfocusout");
			});

			input.value = "abc";
			input.value = "";
			input.onfocusout();

			setTimeout(function() {
				assert.ok(true, "change event not fired on onfocusout, when the value did not changed");
				done();
			}, 200)
		});
	});
});