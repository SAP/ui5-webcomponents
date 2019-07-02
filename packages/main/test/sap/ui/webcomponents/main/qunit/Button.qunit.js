/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	var getActualText = function(el) {
		return el.shadowRoot.querySelector('.sapMBtnText>bdi>slot').assignedNodes()[0].textContent;
	};

	QUnit.module("Web Components", {
		beforeEach: function () {
			var html = '<ui5-button id="myButton">Button</ui5-button>';
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
		assert.strictEqual(getActualText(this.button), 'Button', "Button text is correct");
	});

	QUnit.test("icon", function (assert) {
		var done = assert.async();

		this.button.setAttribute("icon", "sap-icon://employee");

		RenderScheduler.whenFinished().then(function () {
			var sIcon = this.button.shadowRoot.querySelector("ui5-icon").src;

			assert.strictEqual(sIcon, "sap-icon://employee", 'icon is correct');
			done();
		}.bind(this));
	});

	QUnit.test("change text", function (assert) {
		var done = assert.async();

		this.button.textContent = 'New Text';

		RenderScheduler.whenFinished().then(function () {
			assert.strictEqual(getActualText(this.button), 'New Text', "New text is correct");
			done();
		}.bind(this));
	});
});
