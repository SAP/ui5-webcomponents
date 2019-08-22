/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("ui-li Rendering", function (hooks) {
		hooks.before(function() {
			this.getListItemRoot = function() {
				return this.listItem.shadowRoot.querySelector(".ui5-li-root");
			};
		});
		hooks.beforeEach(function () {
			var html =  "<ui5-li id='myListItem'>Item</ui5-li>"
			
			fixture.innerHTML = html;

			this.listItem = document.getElementById("myListItem");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.listItem = null;
		});

		QUnit.test("Root element has been rendered", function (assert) {
			var listItem = this.getListItemRoot();

			assert.ok(listItem, "root element is in the DOM");
		});

		QUnit.test("Default settings", function (assert) {
			assert.expect(1);

			var listItemRoot = this.getListItemRoot(),
				existingClasses = ["ui5-li-root"];

			// assert
			existingClasses.forEach(function(className) {
				assert.ok(listItemRoot.classList.contains(className), "root element does contains " + className);
			});
		});
	});

	QUnit.module("ui-li API", function (hooks) {
		hooks.before(function() {
			this.getListItemRoot = function() {
				return this.listItem.shadowRoot.querySelector(".ui5-li-root");
			};
		});
		hooks.beforeEach(function () {
			var html =  "<ui5-li id='myListItem'>Item</ui5-li>"
			
			fixture.innerHTML = html;

			this.listItem = document.getElementById("myListItem");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.listItem = null;
		});

		QUnit.test("set string props", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				listItem = this.listItem,
				listItemRoot = this.getListItemRoot(),
				mode = "MultiSelect",
				tabIndex = "0";

			var props = [{
					prop: "_mode",
					value: mode
				},{
					prop: "_tabIndex",
					value: tabIndex
				}];

			props.forEach(function(propInfo) {
				// act
				listItem[propInfo.prop] = propInfo.value;
			});

			RenderScheduler.whenFinished().then(function () {
				// assert
				var selectionControl = listItemRoot.querySelector("ui5-checkbox");

				assert.equal(listItemRoot.getAttribute("tabindex"), tabIndex, "listItem has correct tabIndex");
				assert.ok(selectionControl, "listItem renders a selection control");

				done();
			});
		});
	});

	QUnit.module("ui5-li-groupheader Rendering", function (hooks) {
		hooks.before(function() {
			this.getListItemRoot = function() {
				return this.listItem.shadowRoot.querySelector(".ui5-ghli-root");
			};
		});
		hooks.beforeEach(function () {
			var html =  "<ui5-li-groupheader id='myListItem'>Item</ui5-li-groupheader>"
			
			fixture.innerHTML = html;

			this.listItem = document.getElementById("myListItem");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.listItem = null;
		});

		QUnit.test("Root element has been rendered", function (assert) {
			var listItem = this.getListItemRoot();

			assert.ok(listItem, "root element is in the DOM");
		});

		QUnit.test("Default settings", function (assert) {
			assert.expect(1);

			var listItemRoot = this.getListItemRoot(),
				existingClasses = ["ui5-ghli-root"];

			// assert
			existingClasses.forEach(function(className) {
				assert.ok(listItemRoot.classList.contains(className), "root element contains " + className);
			});
		});
	});
});