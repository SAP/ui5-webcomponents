/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Web Components", {
		beforeEach: function () {
			var html = '<ui5-togglebutton id="myButton">Button</ui5-togglebutton>';
			fixture.innerHTML = html;

			this.button = document.getElementById("myButton");

			return RenderScheduler.whenFinished();
		},
		afterEach: function () {
			fixture.innerHTML = "";
			this.button = null;
		}
	});

	QUnit.test("rendering", function (assert) {
		assert.strictEqual(this.button.shadowRoot.querySelector('.sapMBtnText>bdi').textContent, 'Button', "Button text is correct");
		assert.notOk(this.button.hasAttribute('pressed'), 'Button is in not pressed state');
	});

	QUnit.test("state", function (assert) {
		var done = assert.async();

		this.button.click();
		RenderScheduler.whenFinished().then(function () {
			assert.ok(this.button._state.pressed, 'Button is in pressed state');
			done();
		}.bind(this));
	});
});