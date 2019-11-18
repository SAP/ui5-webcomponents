/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function() {
			this.getLinkRoot = function() {
				return this.link.shadowRoot.querySelector(".ui5-link-root");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-link id="myLink"></ui5-link>';
			fixture.innerHTML = html;

			this.link = document.getElementById("myLink");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.link = null;
		});

		QUnit.test("Root element has been rendered", function (assert) {
			var link = this.getLinkRoot();

			assert.ok(link, "root element is in the DOM");
		});

		QUnit.test("Default settings", function (assert) {
			assert.expect(2);

			var link = this.getLinkRoot();

			assert.notOk(link.getAttribute('href'), "Rendered without 'href' by default");
			assert.notOk(link.getAttribute('target'), "Rendered without 'target' by default");
		});
	});

	QUnit.module("API", function (hooks) {
		hooks.before(function() {
			this.getLink = function() {
				return this.link;
			};

			this.getLinkRoot = function() {
				return this.link.shadowRoot.querySelector(".ui5-link-root");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-link id="myLink"></ui5-link>';
			fixture.innerHTML = html;

			this.link = document.getElementById("myLink");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.link = null;
		});

		QUnit.test("set string props", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				link = this.getLink(),
				linkRoot = this.getLinkRoot(),
				expectedHref = "https://sap.com",
				expectedTarget = '_blank';

			var props = [{
					prop: 'href',
					value: expectedHref
				}, {
					prop: 'target',
					value: expectedTarget
				}];

			props.forEach(function(propInfo) {
				// act
				link[propInfo.prop] = propInfo.value;
			});

			RenderScheduler.whenFinished().then(function () {
				// assert
				assert.equal(linkRoot.getAttribute("href"), expectedHref, "'href' has been set");
				assert.equal(linkRoot.getAttribute("target"), expectedTarget, "'target' has been set");
				done();
			});
		});
	});
});
