/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture-visible");

	QUnit.module("Web Components", {
		beforeEach: function () {
			var html = '<ui5-tabcontainer id="myTabContainer" fixed show-overflow="true">'
					+ '<ui5-tab text="Products" count="123">'
						+ '<ui5-button>Button 11</ui5-button>'
					+ '</ui5-tab>'
					+ '<ui5-tab-separator></ui5-tab-separator>'
					+ '<ui5-tab icon="employee" text="Tab 2" icon-color="Positive" additional-content="12343455" selected>'
						+ '<ui5-button>Button 3</ui5-button>'
					+ '</ui5-tab>'
					+ '<ui5-tab icon="menu" text="Tab 3" icon-color="Critical" additional-content="12343455">'
					+ '</ui5-tab>'
					+ '<ui5-tab icon="menu2" text="Tab 4"  icon-color="Negative" additional-content="12343455">'
					+ '</ui5-tab>'
					+ '<ui5-tab icon="menu2" disabled="true" text="Disabled"  icon-color="Negative" additional-content="12343455">'
					+ '</ui5-tab>'
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

	QUnit.skip("rendering", function (assert) {
		var tabs = this.tabContainer.shadowRoot.querySelectorAll('.ui5-tc__headerItem');
		var icon = tabs[2].querySelector('.ui5-tc-headerItemIcon');
		var iconCode = icon.shadowRoot.querySelector('.sapWCIcon').getAttribute('data-sap-ui-icon-content').charCodeAt(0);

		assert.strictEqual(iconCode, 57398, 'icon is correct');

		assert.ok(tabs[2].classList.contains('ui5-tc__headerItem--selected'), 'selected tab is correct');
	});
});
