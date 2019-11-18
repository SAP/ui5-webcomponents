/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function() {
			this.getTitleRoot = function() {
				return this.title.shadowRoot.querySelector(".ui5-title-root");
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
	});
});