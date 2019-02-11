/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function () {
			this.getToolbarRoot = function () {
				return this.toolbar.shadowRoot.querySelector(".sapMTB");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-toolbar id="myToolbar"></ui5-toolbar>';
			fixture.innerHTML = html;

			this.toolbar = document.getElementById("myToolbar");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.toolbar = null;
		});

		QUnit.test("Root element exists", function (assert) {
			var toolbar = this.getToolbarRoot();

			assert.ok(toolbar, "root element is in the DOM");
		});

		QUnit.test("The default 'design' is 'Solid'", function (assert) {
			var expectedClass = "sapMTB-Solid-CTX",
				toolbar = this.getToolbarRoot();

			assert.ok(toolbar.classList.contains(expectedClass), "root element has ." + expectedClass);
		});

		QUnit.test("The default 'toolbarStyle' is 'Standard'", function (assert) {
			var expectedClass = "sapMTBStandard",
				toolbar = this.getToolbarRoot();

			assert.ok(toolbar.classList.contains(expectedClass), "root element has ." + expectedClass);
		});

		QUnit.test("The 'active' is not set by default", function (assert) {
			var expectedClass = "sapMTBInactive",
				toolbar = this.getToolbarRoot();

			assert.notOk(toolbar.getAttribute("tabindex"), "root element has no tabindex attribute");
		});

		QUnit.test("content items of the toolbar has .sapMBarChild class", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedChildClass = "sapMBarChild",
				toolbar = this.getToolbarRoot();

			this.toolbar.innerHTML = "<button>Test</button>";

			RenderScheduler.whenFinished().then(function () {
				assert.ok(toolbar.children[0].classList.contains(expectedChildClass), "child elements has class " + expectedChildClass);
				done();
			});
		});

		QUnit.test("changing the 'design' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedClass = "sapMTB-Info-CTX",
				toolbar = this.getToolbarRoot();

			this.toolbar.setAttribute("design", "Info");

			RenderScheduler.whenFinished().then(function () {
				assert.ok(toolbar.classList.contains(expectedClass), "root element has ." + expectedClass);
				done();
			});
		});

		QUnit.test("changing the 'toolbarStyle' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedClass = "sapMTBClear",
				toolbar = this.getToolbarRoot();

			this.toolbar.setAttribute("toolbar-style", "Clear");

			RenderScheduler.whenFinished().then(function () {
				assert.ok(toolbar.classList.contains(expectedClass), "root element has ." + expectedClass);
				done();
			});
		});
	});
});
