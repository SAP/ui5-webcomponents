/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function() {
			this.getCheckBoxRoot = function() {
				return this.checkBox.shadowRoot.querySelector(".sapMCb");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-checkbox id="myCB" text="OptionA"></ui5-checkbox>';
			fixture.innerHTML = html;

			this.checkBox = document.getElementById("myCB");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.checkBox = null;
		});

		QUnit.test("Root element has been rendered", function (assert) {
			var checkBoxRoot = this.getCheckBoxRoot();

			assert.ok(checkBoxRoot, "root element is in the DOM");
		});

		QUnit.test("Default settings", function (assert) {
			assert.expect(7);

			var checkBoxRoot = this.getCheckBoxRoot(),
				existingClasses = ["sapMCb", "sapMCbHasLabel"],
				nonExistingClasses = ["sapMCbBgDis", "sapMCbRo", "sapMCbErr", "sapMCbWarn", "sapMCbWrapped"];

			// assert
			existingClasses.forEach(function(className) {
				assert.ok(checkBoxRoot.classList.contains(className), "root element does contains " + className);
			});

			// assert
			nonExistingClasses.forEach(function(className) {
				assert.notOk(checkBoxRoot.classList.contains(className), "root element does not contains " + className);
			});
		});
	});

	QUnit.module("API", function (hooks) {
		hooks.before(function() {
			this.getCheckBox = function() {
				return this.checkBox;
			};

			this.getCheckBoxRoot = function() {
				return this.checkBox.shadowRoot.querySelector(".sapMCb");
			};

			this.getCheckBoxInner = function() {
				return this.checkBox.shadowRoot.querySelector(".sapMCbBg");
			};

			this.getInput = function() {
				return this.checkBox.shadowRoot.querySelector("#" + this.getCheckBoxRoot().id + "-CB");
			};

			this.getLabelRoot = function() {
				return this.checkBox.shadowRoot.querySelector("ui5-label").shadowRoot.querySelector(".sapMLabel");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-checkbox id="myCB" text="OptionA"></ui5-checkbox>';
			fixture.innerHTML = html;

			this.checkBox = document.getElementById("myCB");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.checkBox = null;
		});

		QUnit.test("set boolean props", function (assert) {
			assert.expect(3);

			var done = assert.async(),
				checkBox = this.getCheckBox(),
				checkBoxRoot = this.getCheckBoxRoot(),
				expectedClassеs = ["sapMCbBgDis", "sapMCbRo", "sapMCbWrapped"],
				props = [ 'disabled', 'readOnly', 'wrap'];

			// act (1)
			props.forEach(function(prop) {
				checkBox[prop] = true;
			});

			RenderScheduler.whenFinished().then(function () {
				expectedClassеs.forEach(function(className) {
					// assert
					assert.ok(checkBoxRoot.classList.contains(className), "root element contains " + className);
				});

				done();
			});
		});

		QUnit.test("set string props", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				checkBox = this.getCheckBox(),
				checkBoxRoot = this.getCheckBoxRoot(),
				labelRoot = this.getLabelRoot(),
				expectedState = "Error",
				expectedText = "text";

			var props = [{
					prop: 'valueState',
					value: expectedState
				},{
					prop: "text",
					value: expectedText
				}];

			// act
			props.forEach(function(propInfo) {
				checkBox[propInfo.prop] = propInfo.value;
			});

			RenderScheduler.whenFinished().then(function () {
				// assert
				assert.equal(labelRoot.textContent.trim(), expectedText, "component text has changed");
				assert.ok(checkBoxRoot.classList.contains("sapMCbErr"), "root element contains sapMCbErr");

				done();
			});
		});

		QUnit.test("set checked", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				checkBox = this.getCheckBox(),
				checkBoxRoot = this.getCheckBoxRoot(),
				checkBoxInner = this.getCheckBoxInner(),
				existingClass = "sapMCbMarkChecked";

			// act
			checkBox.checked = true;

			RenderScheduler.whenFinished().then(function () {
				// assert
				assert.ok(checkBoxRoot.getAttribute("aria-checked"), true, "root element does contains " + existingClass);
				assert.ok(checkBoxInner.classList.contains(existingClass), "root element does contains " + existingClass);

				done();
			});
		});


		QUnit.test("select event fired on click", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				checkBox = this.getCheckBox();

			this.handler = function() {
				// assert
				assert.ok("press handler has been called");
				done();
			};

			checkBox.addEventListener('change', this.handler.bind(this));

			// act
			$(checkBox).trigger("click");
		});
	});
});
