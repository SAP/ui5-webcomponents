/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture-visible");

	QUnit.module("Web Components", {
		beforeEach: function () {
			var html = '<ui5-tabcontainer id="myTabContainer" fixed show-overflow="true" selected-key="4">'
					+ '<ui5-tab key="item1" text="Products" count="123">'
						+ '<ui5-button>Button 11</ui5-button>'
					+ '</ui5-tab>'
					+ '<ui5-tab-separator></ui5-tab-separator>'
					+ '<ui5-tab icon="sap-icon://employee" text="Tab 2" icon-color="Positive" count="12343455">'
						+ '<ui5-button>Button 3</ui5-button>'
					+ '</ui5-tab>'
					+ '<ui5-tab icon="sap-icon://menu" text="Tab 3" key="item2"  icon-color="Critical" count="12343455">'
					+ '</ui5-tab>'
					+ '<ui5-tab key="4" icon="sap-icon://menu2" text="Tab 4"  icon-color="Negative" count="12343455">'
					+ '</ui5-tab>'
					+ '<ui5-tab icon="sap-icon://menu2" disabled="true" text="Disabled"  icon-color="Negative" count="12343455">'
					+ '</ui5-tab>'
					+ '<ui5-button data-ui5-slot="content">Default Content</ui5-button>'
				+ ' </ui5-tabcontainer>';
			fixture.innerHTML = html;

			this.tabContainer = document.getElementById("myTabContainer");

			return RenderScheduler.whenFinished();
		},
		afterEach: function () {
			fixture.innerHTML = "";
			this.tabContainer = null;
		}
	});

	QUnit.test("rendering", function (assert) {
		var content = this.tabContainer.shadowRoot.querySelector('.sapMITBContent').children[0]["assignedElements"]()[0];
		assert.strictEqual(content.textContent, 'Default Content' , 'Default Content is rendered');

		var tabs = this.tabContainer.shadowRoot.querySelectorAll('.sapMITBItem');
		var icon = tabs[2].querySelector('.sapMITBFilterIcon');
		var iconCode = icon.shadowRoot.querySelector('.sapWCIcon').getAttribute('data-sap-ui-icon-content').charCodeAt(0);

		assert.strictEqual(iconCode, 57398, 'icon is correct');

		assert.ok(tabs[4].classList.contains('sapMITBSelected'), 'selected tab is correct');
	});

	QUnit.test("Tab Selection", function (assert) {

		var done = assert.async();

		this.tabContainer.setAttribute('selected-key', 'item1');

		RenderScheduler.whenFinished().then(function () {

			var content = this.tabContainer.shadowRoot.querySelector('.sapMITBContent').children[0]["assignedElements"]()[0];
			assert.strictEqual(content.textContent.trim(), 'Button 11' , 'Correct content is rendered');

			var tabs = this.tabContainer.shadowRoot.querySelectorAll('.sapMITBItem');

			assert.ok(tabs[0].classList.contains('sapMITBSelected'), 'selected tab is correct');
			done();
		}.bind(this));
	});

	QUnit.test("Overflow", function (assert) {

		var done = assert.async();

		this.tabContainer.style.width = '200px';
		this.tabContainer._openOverflowList();

		setTimeout(function () {
			var list = this.tabContainer.shadowRoot.querySelectorAll('ui5-li-custom');
			assert.strictEqual(list.length, 5, 'number of overflow list items are correct');

			list[2].click();

			RenderScheduler.whenFinished().then(function () {

				assert.strictEqual(this.tabContainer.getAttribute('selected-key'), 'item2', 'selected tab is correct');

				var overflowBtn = this.tabContainer.shadowRoot.querySelector('.sapMITHBtn');
				var header = this.tabContainer.shadowRoot.querySelector('.sapMITH');

				assert.ok(header.classList.contains('sapMITBScrollable'), 'header is scrollable');
				assert.strictEqual(overflowBtn.style.visibility, '', 'overflow button is visible');

				done();
			}.bind(this));

		}.bind(this), 200);
	});
});