/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("ui-li Rendering", function (hooks) {
		hooks.before(function() {
			this.getListItemRoot = function() {
				return this.listItem.shadowRoot.querySelector(".sapMLIB");
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
			assert.expect(8);

			var listItemRoot = this.getListItemRoot(),
				existingClasses = ["sapMLIB", "sapMSLI", "sapMLIB-CTX", "sapMLIBBorder"],
				nonExistingClasses = ["sapMLIBSelected", "sapMLIBActive", "sapMLIBHoverable", "sapMLIBActionable"];

			// assert
			existingClasses.forEach(function(className) {
				assert.ok(listItemRoot.classList.contains(className), "root element does contains " + className);
			});

			// assert
			nonExistingClasses.forEach(function(className) {
				assert.notOk(listItemRoot.classList.contains(className), "root element does not contains " + className);
			});
		});
	});

	QUnit.module("ui-li API", function (hooks) {
		hooks.before(function() {
			this.getListItemRoot = function() {
				return this.listItem.shadowRoot.querySelector(".sapMLIB");
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

		QUnit.test("set boolean props", function (assert) {
			assert.expect(3);

			var done = assert.async(),
				listItem = this.listItem,
				listRoot = this.getListItemRoot(),
				expectedClass1 = "sapMLIBSelected",
				expectedClass2 = "sapMLIBActive",
				notExpectedClass = "sapMLIBBorder",
				props = ["_hideBorder", "selected", "_active"];

			// act
			props.forEach(function(prop){
				listItem[prop] = true;
			});

			RenderScheduler.whenFinished().then(function () {
				// assert
				assert.ok(listRoot.classList.contains(expectedClass1), "root element contains " + expectedClass1);
				assert.ok(listRoot.classList.contains(expectedClass2), "root element contains " + expectedClass2);
				assert.notOk(listRoot.classList.contains(notExpectedClass), "root element does not contain " + notExpectedClass);

				done();
			});
		});

		QUnit.test("set string props", function (assert) {
			assert.expect(4);

			var done = assert.async(),
				listItem = this.listItem,
				listItemRoot = this.getListItemRoot(),
				mode = "MultiSelect",
				tabIndex = "0",
				type = "Active";

			var props = [{
					prop: "_mode",
					value: mode
				},{
					prop: "_tabIndex",
					value: tabIndex
				},{
					prop: "type",
					value: type
				}];

			props.forEach(function(propInfo) {
				// act
				listItem[propInfo.prop] = propInfo.value;
			});

			RenderScheduler.whenFinished().then(function () {
				// assert
				var selectionControl = listItemRoot.querySelector("ui5-checkbox");

				assert.ok(listItemRoot.classList.contains("sapMLIBHoverable"), "listItem contains the 'sapMLIBHoverable' class");
				assert.ok(listItemRoot.classList.contains("sapMLIBActionable"), "listItem contains the 'sapMLIBActionable' class");
				assert.equal(listItemRoot.getAttribute("tabindex"), tabIndex, "listItem has correct tabIndex");
				assert.ok(selectionControl, "listItem renders a selection control");

				done();
			});
		});
	});

	QUnit.module("ui5-li-groupheader Rendering", function (hooks) {
		hooks.before(function() {
			this.getListItemRoot = function() {
				return this.listItem.shadowRoot.querySelector(".sapMGHLI");
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
			assert.expect(2);

			var listItemRoot = this.getListItemRoot(),
				existingClasses = ["sapMGHLI", "sapMLIBTypeInactive"];

			// assert
			existingClasses.forEach(function(className) {
				assert.ok(listItemRoot.classList.contains(className), "root element does contains " + className);
			});
		});
	});
});