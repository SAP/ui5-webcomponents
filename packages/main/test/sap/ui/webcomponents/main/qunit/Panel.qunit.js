/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	let fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function () {
			this.getPanelRoot = function () {
				return this.panel.shadowRoot.querySelector(".sapMPanel");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-panel id="myPanel"></ui5-panel>';
			fixture.innerHTML = html;

			this.panel = document.getElementById("myPanel");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.panel = null;
		});

		QUnit.test("Root element exists", function (assert) {
			var panel = this.getPanelRoot();

			assert.ok(panel, "root element is in the DOM");
		});

		QUnit.test("The default 'headerText' is empty string", function (assert) {
			var panel = this.getPanelRoot(),
				sExpected = "";

			assert.equal(panel.querySelector(".sapMPanelHdr").innerText.trim(), sExpected, "headerText is empty string");
		});

		QUnit.test("The 'fixed' is not set by default", function (assert) {
			var panel = this.getPanelRoot();

			assert.ok(panel.querySelector(".sapMPanelWrappingDiv"), "header wrapping div exists");
			assert.ok(panel.querySelector("ui5-icon"), "expandable icon exists");
		});

		QUnit.test("The 'collapsed' is not set by default", function (assert) {
			var panel = this.getPanelRoot();

			assert.equal(panel.querySelector(".sapMPanelContent").style.display, "block", "the content div is shown");
		});

		QUnit.test("The default 'accessibleRole' is 'Form'", function (assert) {
			var panel = this.getPanelRoot(),
				expectedRole = "form";

			assert.equal(panel.getAttribute("role"), expectedRole, "the role of the main container is " + expectedRole);
		});

		QUnit.test("changing the 'headerText' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				expectedText = "New header text",
				panel = this.getPanelRoot();

			this.panel.setAttribute("header-text", expectedText);

			RenderScheduler.whenFinished().then(function () {
				assert.equal(panel.querySelector(".sapMPanelHdr").innerText.trim(), expectedText, "header text is updated");
				done();
			});
		});

		QUnit.test("changing the 'fixed' is reflected in the DOM", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				panel = this.getPanelRoot();

			this.panel.setAttribute("fixed", "");

			RenderScheduler.whenFinished().then(function () {
				assert.notOk(panel.querySelector(".sapMPanelWrappingDiv"), "header wrapping div does not exists");
				assert.notOk(panel.querySelector(".sapMPanelExpandableIcon"), "expandable icon does not exists");

				done();
			});
		});

		QUnit.test("changing the 'collapsed' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				panel = this.getPanelRoot();

			this.panel.setAttribute("collapsed", "");

			RenderScheduler.whenFinished().then(function () {
				assert.equal(panel.querySelector(".sapMPanelContent").style.display, "none", "the content div is hidden");

				done();
			});
		});

		QUnit.test("changing the 'accessibleRole' is reflected in the DOM", function (assert) {
			assert.expect(1);

			var done = assert.async(),
				panel = this.getPanelRoot(),
				expectedRole = "region";

			this.panel.setAttribute("accessible-role", "Region");

			RenderScheduler.whenFinished().then(function () {
				assert.equal(panel.getAttribute("role"), expectedRole, "the role of the main container is " + expectedRole);

				done();
			});
		});

		QUnit.test("adding the 'header' is reflected in the DOM and disables the 'headerText'", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				panel = this.getPanelRoot();

			this.panel.setAttribute("header-text", "New Header Text");
			this.panel.innerHTML = "<div data-ui5-slot='header'></div>";

			RenderScheduler.whenFinished().then(function () {
				assert.ok(panel.querySelector(".sapMPanelWrappingDivTb"), "header is added in the DOM");
				assert.notOk(panel.querySelector(".sapMPanelHdr"), "header text is ignored");

				done();
			});
		});

		QUnit.test("adding the 'infoToolbar' is reflected in the DOM and disables the 'headerText'", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				panel = this.getPanelRoot();

			this.panel.setAttribute("header-text", "New Header Text");
			this.panel.innerHTML = "<div data-ui5-slot='header'></div>";

			RenderScheduler.whenFinished().then(function () {
				assert.ok(panel.querySelector(".sapMPanelWrappingDivTb"), "header is added in the DOM");
				assert.notOk(panel.querySelector(".sapMPanelHdr"), "header text is ignored");

				done();
			});
		});
	});
});