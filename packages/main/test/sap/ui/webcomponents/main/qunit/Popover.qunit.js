/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {
	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Web Components", {
		beforeEach: function() {
			var html = '<ui5-button id="myButton"></ui5-button>'
				+ '<ui5-popover id="myPopover">'
					+ '<div slot="header">'
						+ '<div  class="customHeaderText">Custom Header</div>'
						+ '<ui5-button icon="sap-icon://decline"></ui5-button>'
					+ '</div>'
					+ '<div slot="footer">'
						+ '<div class="customFooterText" >Custom Footer</div>'
						+ '<ui5-button>Accept</ui5-button>'
					+ '</div>'
					+ '<div class="customContentText">Custom Content</div>'
					+ '<ui5-button id="wcBtnOpenNewDialog">Open New Dialog</ui5-button>'
					+ '<ui5-button id="wcBtnCloseDialog">Close Dialog</ui5-button>'
					+ '<ui5-popover placement-type="Right" id="wcNewDialogPopover" header-text="Second Popover">'
						+ '<ui5-button id="wcBtnOpenNewPopoverDialog1">Open New Popover </ui5-button>'
						+ '<ui5-button id="wcBtnClosePopoverDialog1">Popover Button</ui5-button>'
					+ '</ui5-popover>'
					+ '<ui5-button id="wcBtnOpenNewDialogPopover">Open New Popover</ui5-button>'
					+ '<ui5-dialog id="wcNewDialog" header-text="Second Dialog">'
						+ '<ui5-button id="wcNewDialog1">Open New Dialog</ui5-button>'
						+ '<ui5-button id="wcBtnCloseDialog1">Dialog Button</ui5-button>'
					+ '</ui5-dialog>'
				+ '</ui5-popover>';
			fixture.innerHTML = html;

			this.popover = document.getElementById("myPopover");
			this.button = document.getElementById("myButton");

			return RenderScheduler.whenFinished();
		},
		afterEach: function () {
			fixture.innerHTML = "";
			this.popover = null;
			this.button = null;
		}
	});

	QUnit.test("Open/Close", function (assert) {

		var done = assert.async();
		assert.expect(6);

		assert.notOk(this.popover.shadowRoot.innnerHTML, "Shadow Root is initially empty");

		this.popover.addEventListener('afterOpen', function (event) {
			var shadowRoot = this.shadowRoot;

			assert.ok(shadowRoot.querySelector('.ui5-popup-wrapper-frame--open'), "Popover is opened");

			// header
			var header = shadowRoot.host.children[0];
			assert.strictEqual(header.querySelector('.customHeaderText').textContent, 'Custom Header', "Header is correct");

			// footer
			var footer = shadowRoot.host.children[1];
			assert.strictEqual(footer.querySelector('.customFooterText').textContent, 'Custom Footer', "Footer is correct");

			// content
			var content = shadowRoot.host.children[2]
			assert.strictEqual(content.textContent, 'Custom Content', "Content is correct");

			this.close();
		}.bind(this.popover));

		this.popover.addEventListener('afterClose', function (event) {
			RenderScheduler.whenFinished().then(function () {
				assert.notOk(this.popover.shadowRoot.querySelector('.ui5-popup-wrapper-frame--open'), "Popover is closed");
				done();
			}.bind(this));
		}.bind(this));

		this.popover.openBy(this.button);
	});
});
