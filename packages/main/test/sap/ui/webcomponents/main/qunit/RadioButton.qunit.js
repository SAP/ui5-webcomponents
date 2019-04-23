/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function () {
			this.getRadioButtonRoot = function () {
				return this.radiobutton.shadowRoot.querySelector(".sapMRb");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-radiobutton id="myRadiobutton"></ui5-radiobutton>';
			fixture.innerHTML = html;

			this.radiobutton = document.getElementById("myRadiobutton");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.radiobutton = null;
		});

		QUnit.test("Root element exists", function (assert) {
			var radiobutton = this.getRadioButtonRoot();

			assert.ok(radiobutton, "root element is in the DOM");
		});

		QUnit.test("The 'disabled' is not set by default", function (assert) {
			var expectedClass = "sapMRbDis",
				radiobutton = this.getRadioButtonRoot();

			assert.notOk(radiobutton.classList.contains(expectedClass), "root element does not have ." + expectedClass);
		});

		QUnit.test("The 'read-only' is not set by default", function (assert) {
			var expectedClass = "sapMRbRo",
				radiobutton = this.getRadioButtonRoot();

			assert.notOk(radiobutton.classList.contains(expectedClass), "root element does not have ." + expectedClass);
		});

		QUnit.test("The 'selected' is not set by default", function (assert) {
			var expectedClass = "sapMRbSel",
				radiobutton = this.getRadioButtonRoot();

			assert.notOk(radiobutton.classList.contains(expectedClass), "root element does not have ." + expectedClass);
		});

		QUnit.test("The 'text' is empty by default", function (assert) {
			var radiobutton = this.getRadioButtonRoot();

			assert.notOk(radiobutton.querySelector("ui5-label"), "the default text is empty and ui5-label is not rendered.");
		});

		QUnit.test("The 'name' is not set by default", function (assert) {
			var radiobutton = this.getRadioButtonRoot();

			assert.notOk(radiobutton.querySelector("input").getAttribute("name"), "there is no name attribute");
		});
	});

	QUnit.module("API", function (hooks) {
		hooks.before(function () {
			this.getRadioButtonRoot = function () {
				return this.radiobutton.shadowRoot.querySelector(".sapMRb");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-radiobutton id="myRadiobutton"></ui5-radiobutton>';
			fixture.innerHTML = html;

			this.radiobutton = document.getElementById("myRadiobutton");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.radiobutton = null;
		});

		QUnit.test("changing the 'disabled' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedClass = "sapMRbDis",
				radiobutton = this.getRadioButtonRoot();

			this.radiobutton.setAttribute("disabled", "");

			RenderScheduler.whenFinished().then(function () {
				assert.ok(radiobutton.classList.contains(expectedClass), "root element has ." + expectedClass);
				done();
			});
		});

		QUnit.test("changing the 'read-only' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedClass = "sapMRbRo",
				radiobutton = this.getRadioButtonRoot();

			this.radiobutton.setAttribute("read-only", "");

			RenderScheduler.whenFinished().then(function () {
				assert.ok(radiobutton.classList.contains(expectedClass), "root element has ." + expectedClass);
				done();
			});
		});

		QUnit.test("changing the 'selected' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedClass = "sapMRbSel",
				radiobutton = this.getRadioButtonRoot();

			this.radiobutton.setAttribute("selected", "");

			RenderScheduler.whenFinished().then(function () {
				assert.ok(radiobutton.classList.contains(expectedClass), "root element has ." + expectedClass);
				done();
			});
		});

		QUnit.test("changing the 'text' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedText = "New Text",
				radiobutton = this.getRadioButtonRoot();

			this.radiobutton.text = expectedText;

			RenderScheduler.whenFinished().then(function () {
				assert.equal(radiobutton.querySelector("ui5-label").textContent, expectedText, "the text is updated to " + expectedText);
				done();
			});
		});

		QUnit.test("changing the 'value-state' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedClass = "sapMRbErr",
				radiobutton = this.getRadioButtonRoot();

			this.radiobutton.setAttribute("value-state", "Error");

			RenderScheduler.whenFinished().then(function () {
				assert.ok(radiobutton.classList.contains(expectedClass), "root element has ." + expectedClass);
				done();
			});
		});

		QUnit.test("changing the 'name' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedName = "test",
				radiobutton = this.getRadioButtonRoot();

			this.radiobutton.setAttribute("name", expectedName);

			RenderScheduler.whenFinished().then(function () {
				assert.equal(radiobutton.querySelector("input").getAttribute("name"), expectedName,  "the name is set to " + expectedName);
				done();
			});
		});
	});

	QUnit.module("Name", function (hooks) {
		hooks.beforeEach(function () {
			var html = '<ui5-radiobutton id="myRb11" name="a" text="first" selected></ui5-radiobutton>'
			+ '<ui5-radiobutton id="myRb12" name="a" text="second"></ui5-radiobutton>'
			+ '<ui5-radiobutton id="myRb13" name="a" text="third"></ui5-radiobutton>';

			fixture.innerHTML = html;

			this.mockEvent = {
				preventDefault: function(){}
			};

			this.radiobutton1 = document.getElementById("myRb11");
			this.radiobutton2 = document.getElementById("myRb12");
			this.radiobutton3 = document.getElementById("myRb13");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.radiobutton1 = null;
			this.radiobutton2 = null;
			this.radiobutton3 = null;
		});

		QUnit.test("right navigation", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				radiobutton1 = this.radiobutton1,
				radiobutton2 = this.radiobutton2,
				mockEvent = this.mockEvent;

				// act - simulate arrow-right
				radiobutton1._handleDown(mockEvent);

				// assert - the second item should be selected
				RenderScheduler.whenFinished().then(function () {
					assert.notOk(radiobutton1.selected, "The first item has been de-selected.");
					assert.ok(radiobutton2.selected, "The second item has been selected.");
					done();
				});
		});
	});
});