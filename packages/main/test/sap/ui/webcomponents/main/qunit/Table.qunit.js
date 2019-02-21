/* global QUnit,window,TestHelper,RenderScheduler */
TestHelper.ready(function () {

	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("API: Integration", function (hooks) {
		hooks.beforeEach(function () {
				var domString = '<ui5-table id="table" style="display: inline-block; width: 100%; height: 500px;">' +
						'<ui5-table-column data-ui5-slot="columns" id="col1">' +
						'	<span data-ui5-slot="header" >Column 1</span>' +
						'</ui5-table-column>' +
						'<ui5-table-column data-ui5-slot="columns" id="col2">' +
						'	<span data-ui5-slot="header" >Column 1</span>' +
						'</ui5-table-column>' +
						'<ui5-table-row data-ui5-slot="rows" id="roll1">' +
						'	<ui5-table-cell id="cell1">' +
						'		<span>World</span>' +
						'	</ui5-table-cell>' +
						'	<ui5-table-cell id="cell2">' +
						'		<span>World</span>' +
						'	</ui5-table-cell>' +
						'</ui5-table-row>' +
					'</ui5-table>';

				fixture.innerHTML = domString;
				this.table = window.document.querySelector("#table");
				this.tableShadowRoot = this.table.shadowRoot;

				return RenderScheduler.whenFinished();
		});

		hooks.afterEach(function () {
			fixture.innerHTML = "";
			this.table = null;
		});
		
		QUnit.test("Two column grid should be created with 2 columns", function (assert) {
			var tableDOM = this.tableShadowRoot.children[1].children[0];
			var tableColumn = tableDOM.children[0];
			var columnGridStyles = tableColumn.style["grid-template-columns"];

			assert.strictEqual(columnGridStyles, "minmax(0px, 1fr) minmax(0px, 1fr)", "Two column grid is rendered");
		});

		QUnit.test("column width should be applied to rows' cells", function (assert) {
			var done = assert.async();
			var col1 = this.table.querySelector("#col1");
			var roll1 = this.table.querySelector("#roll1");

			col1.setAttribute("width", "100px");

			RenderScheduler.whenFinished().then(function() {
				var tableDOM = this.tableShadowRoot.children[1].children[0];
				var rollDom = roll1.shadowRoot.children[1].children[0];
				var tableColumn = tableDOM.children[0];
				var columnGridStyles = tableColumn.style["grid-template-columns"];

				assert.strictEqual(rollDom.style["grid-template-columns"], "minmax(0px, 100px) minmax(0px, 1fr)", "Row Grid settings are correct 100 - auto");
				assert.strictEqual(columnGridStyles, "minmax(0px, 100px) minmax(0px, 1fr)", "Column Grid is sized 100 - auto");
				done();
			}.bind(this));
		});

		QUnit.test("reaching column min width should hide the whole column", function (assert) {
			var done = assert.async();
			var roll1 = this.table.querySelector("#roll1");
			var col1 = this.table.querySelector("#col1");

			this.table.style["display"] = "inline-block";
			this.table.style["width"] = "400px";
			
			col1.setAttribute("min-width", "500px");

			setTimeout(function() {
				var tableDOM = this.tableShadowRoot.children[1].children[0];
				var rollDom = roll1.shadowRoot.children[1].children[0];
				var tableColumn = tableDOM.children[0];
				var columnGridStyles = tableColumn.style["grid-template-columns"];

				assert.strictEqual(rollDom.style["grid-template-columns"], "minmax(0px, 1fr)", "Only 1 cell should be rendered in a row");
				assert.strictEqual(columnGridStyles, "minmax(0px, 1fr)", "Only one column should be rendered");
				assert.strictEqual(rollDom.children.length, 1, "Only one children should be rendered - first cell is hidden");
				done();
			}.bind(this), 200); // Needed for ResizeHandler.js
		});

		QUnit.test("reaching column min width should show column in popin area", function (assert) {
			var done = assert.async();
			var roll1 = this.table.querySelector("#roll1");
			var col1 = this.table.querySelector("#col1");

			this.table.style["display"] = "inline-block";
			this.table.style["width"] = "400px";
			
			col1.setAttribute("min-width", "500px");
			col1.setAttribute("demand-popin", true);

			setTimeout(function() {
				var tableDOM = this.tableShadowRoot.children[1].children[0];
				var rollDom = roll1.shadowRoot.children[1].children[0];
				var tableColumn = tableDOM.children[0];
				var columnGridStyles = tableColumn.style["grid-template-columns"];

				assert.strictEqual(rollDom.style["grid-template-columns"], "minmax(0px, 1fr)", "Only 1 cell should be rendered in a row");
				assert.strictEqual(columnGridStyles, "minmax(0px, 1fr)", "Only one column should be rendered");
				assert.strictEqual(rollDom.children.length, 2, "two children should be rendered in the row");
				assert.ok(rollDom.children[1].classList.contains("sapWCTablePopinRow"), "Second child should be popin container");
				done();
			}.bind(this), 200); // Needed for ResizeHandler.js
		});
	});
});
