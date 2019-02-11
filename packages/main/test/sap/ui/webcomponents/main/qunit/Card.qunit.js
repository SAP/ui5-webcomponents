/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Web Components", {
		beforeEach: function () {
			var html = '<ui5-card id="myCard"></ui5-card>';
			fixture.innerHTML = html;

			this.card = document.getElementById("myCard");

			return RenderScheduler.whenFinished();
		},
		afterEach: function () {
			fixture.innerHTML = "";
			this.card = null;
		}
	});

	QUnit.test("rendering", function (assert) {
		var shadowRoot = this.card.shadowRoot;
		assert.ok(shadowRoot, 'Has shadow root');
	});
});