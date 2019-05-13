/* global $,QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function() {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("Rendering", function (hooks) {
		hooks.before(function() {
			this.getListRoot = function() {
				return this.list.shadowRoot.querySelector(".sapMList");
			};
			this.getListUl = function() {
				return this.list.shadowRoot.querySelector(".sapMList .sapMListUl");
			};
		});
		hooks.beforeEach(function () {
			var html = "<ui5-list id='myList'>"
				+ "<ui5-li id='key1' type='Active'>First</ui5-li>"
				+ "<ui5-li id='key2' type='Active'>Second</ui5-li>"
				+ "<ui5-li id='key3' type='Active'>Third</ui5-li>"
				+ "</ui5-list>";
			fixture.innerHTML = html;

			this.list = document.getElementById("myList");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.list = null;
		});

		QUnit.test("Root element has been rendered", function (assert) {
			var list = this.getListRoot();

			assert.ok(list, "root element is in the DOM");
		});
	});

	QUnit.module("API", function (hooks) {
		hooks.before(function() {
			this.getListRoot = function() {
				return this.list.shadowRoot.querySelector(".sapMList");
			};
			this.getListUl = function() {
				return this.list.shadowRoot.querySelector(".sapMList .sapMListUl");
			};
		});
		hooks.beforeEach(function () {
			var html = '<ui5-list id="myList"></ui5-list>';
			fixture.innerHTML = html;

			this.list = document.getElementById("myList");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.list = null;
		});

		QUnit.test("set boolean props", function (assert) {
			assert.expect(2);

			var done = assert.async(),
				list = this.list,
				listRoot = this.getListRoot(),
				listUL = this.getListUl(),
				expectedClass = "sapMListInsetBG",
				expectedClassOnUl = "sapMListInset";

			// act
			list["inset"] = true;

			RenderScheduler.whenFinished().then(function () {
				// assert
				assert.ok(listRoot.classList.contains(expectedClass), "root element contain " + expectedClass);
				assert.ok(listUL.classList.contains(expectedClassOnUl), "ul element contain " + expectedClassOnUl);

				done();
			});
		});

		QUnit.test("set string props", function (assert) {
			assert.expect(5);

			var done = assert.async(),
				list = this.list,
				listUL = this.getListUl(),
				listFooter,
				listHeader,
				listNoDataEl,
				backgroundDesign = "Transparent",
				headerText = "header",
				footerText = "footer",
				noDataText = "no data",
				separators = "Inner",	
				mode = "Delete";

			var props = [{
					prop: "headerText",
					value: headerText
				},{
					prop: "footerText",
					value: footerText
				},{
					prop: "noDataText",
					value: noDataText
				},{
					prop: "backgroundDesign",
					value: backgroundDesign
				},{
					prop: "separators",
					value: separators
				},{
					prop: "mode",
					value: mode
				}];

			props.forEach(function(propInfo) {
				// act
				list[propInfo.prop] = propInfo.value;
			});

			RenderScheduler.whenFinished().then(function () {
				listFooter = list.shadowRoot.querySelector(".sapMListFtr");
				listHeader = list.shadowRoot.querySelector(".sapMListHdr");
				listNoDataEl = list.shadowRoot.querySelector(".sapMListNoDataText");

				// assert
				assert.ok(listUL.classList.contains("sapMListShowSeparatorsInner"), "list separators styling has been correctly set");
				assert.ok(listUL.classList.contains("sapMListModeDelete"), "list mode styling has been correctly set");
				assert.ok(listFooter, "list footer has been rendered");
				assert.ok(listHeader, "list header has been rendered");
				assert.ok(listNoDataEl, "list noData has been rendered");

				done();
			});
		});
	});

	QUnit.module("API Children", function (hooks) {
		hooks.before(function() {
			this.getListRoot = function() {
				return this.list.shadowRoot.querySelector(".sapMList");
			};
			this.getListUl = function() {
				return this.list.shadowRoot.querySelector(".sapMList .sapMListUl");
			};
		});
		hooks.beforeEach(function () {
			var html = "<ui5-list id='myList'>"
				+ "<div id='header' active data-ui5-slot='header'><div>Header</div></div>"
				+ "<ui5-li id='key1' type='Active'>First</ui5-li>"
				+ "<ui5-li id='key2' type='Active'>Second</ui5-li>"
				+ "<ui5-li id='key3' type='Active'>Third</ui5-li>"
				+ "</ui5-list>";
			fixture.innerHTML = html;

			this.list = document.getElementById("myList");

			return RenderScheduler.whenFinished();
		});
		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.list = null;
		});

		QUnit.test("list items", function (assert) {
			assert.expect(2);

			var list = this.list,
				listUl = this.getListUl(),
				listItems = list.querySelectorAll("ui5-li"),
				listItemsInShadowDOM = listUl.querySelectorAll("slot"),
				expectedChildrenCount = 3,
				expectedSlotsCount = 1;

			// asssert
			assert.equal(listItems.length, expectedChildrenCount, "List has 3 childs in the Light DOM.");
			assert.equal(listItemsInShadowDOM.length, expectedSlotsCount, "List ul element has 1 slot for all children in the Shadow DOM.");
		});

		QUnit.test("header", function (assert) {
			assert.expect(2);

			var list = this.list,
				listRoot = this.getListRoot(),
				header = list.querySelector("#header"),
				headerInShadowDOM = listRoot.querySelector("[name=header]");

			// asssert
			assert.ok(header, "List has header in the Light DOM.");
			assert.ok(headerInShadowDOM, "header slotted in the Shadow DOM.");
		});
	});
});
