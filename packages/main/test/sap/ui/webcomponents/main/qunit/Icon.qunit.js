/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {
	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Web Components", {
		beforeEach: function () {
			var html = '<ui5-icon src="sap-icon://employee" id="myIcon"></ui5-icon>';
			fixture.innerHTML = html;

			this.icon = document.getElementById("myIcon");

			return RenderScheduler.whenFinished();
		},
		afterEach: function () {
			fixture.innerHTML = "";
			this.icon = null;
		}
	});

	QUnit.test("rendering", function (assert) {
		var domRef = this.icon.shadowRoot.querySelector('.sapWCIcon');
		var iconCode = domRef.getAttribute('data-sap-ui-icon-content').charCodeAt(0);
		assert.strictEqual(iconCode, 57398, 'icon is correct');
	});
});
