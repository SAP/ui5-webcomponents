/* global QUnit,window,TestHelper,RenderScheduler */

TestHelper.ready(function () {
	var fixture = window.document.querySelector("#qunit-fixture");

	QUnit.module("API: Integration", {
		beforeEach: function () {
			fixture.innerHTML = '<ui5-textarea id="myTextArea" style="width: 120px; height: 300px; display: inline-block"></ui5-textarea>';

			this.textArea = document.getElementById("myTextArea");

			return RenderScheduler.whenFinished();
		},
		afterEach: function () {
			fixture.innerHTML = "";
			this.textArea = null;
		}
	});

	QUnit.test("Setting value to the textarea should be propagated", function (assert) {
		var done = assert.async();

		this.textArea.value = "TeSt";

		RenderScheduler.whenFinished().then(function () {
			var controlId = this.textArea._id;
			assert.strictEqual(this.textArea.getDomRef().querySelector("#" + controlId + "-inner").value, "TeSt", "Value should be TeSt");
			done();
		}.bind(this));
	});

	QUnit.test("Setting disabled to the textarea should be propagated", function (assert) {
		var done = assert.async();

		this.textArea.disabled = true;

		RenderScheduler.whenFinished().then(function () {
			var controlId = this.textArea._id;
			assert.ok(this.textArea.getDomRef().querySelector("#" + controlId + "-inner").disabled, "Value should be TeSt");
			done();
		}.bind(this));
	});

	QUnit.test("TextArea should grow when placing new lines inside it", function (assert) {
		var done = assert.async();

		this.textArea.style.width = "auto";
		this.textArea.style.height = "auto";
		this.textArea.value = "aaa";
		this.textArea.growing = true;

		RenderScheduler.whenFinished().then(function () {
			var height = this.textArea.getBoundingClientRect().height;
			assert.ok(height < 40);

			var value = "aaaa\naaaa\naaaa";
			this.textArea.value = value;

			return RenderScheduler.whenFinished();
		}.bind(this)).then(function () {

			var controlId = this.textArea._id;
			var value = this.textArea.value;

			var controlDomRef = this.textArea.getDomRef();
			var internalTextAreaDomValue = controlDomRef.querySelector("#" + controlId + "-inner").value;
			var mirrorDomRef = controlDomRef.querySelector("#" + controlId + "-mirror");

			assert.strictEqual(internalTextAreaDomValue, value, "Value should be spread on 3 lines");
			assert.strictEqual(internalTextAreaDomValue.split("\n").length, 3, "TextArea should has 3 lines");
			assert.strictEqual(mirrorDomRef.children.length, 2, "Mirror should have 2 line breaks");
			var height = this.textArea.getBoundingClientRect().height;
			assert.ok(height > 70);
			done();
		}.bind(this));
	});

	QUnit.test("TextArea should be minimum 5 rows", function (assert) {
		var done = assert.async();

		this.textArea.style.width = "auto";
		this.textArea.style.height = "auto";
		this.textArea.value = "aaa";
		this.textArea.growing = true;
		this.textArea.rows = 5;

		var value = "aaaa\naaaa\naaaa";
		this.textArea.value = value;

		RenderScheduler.whenFinished().then(function () {
			var controlId = this.textArea._id;
			var controlDomRef = this.textArea.getDomRef();
			var internalTextAreaDomValue = controlDomRef.querySelector("#" + controlId + "-inner").value;
			var mirrorDomRef = controlDomRef.querySelector("#" + controlId + "-mirror");

			assert.strictEqual(internalTextAreaDomValue.split("\n").length, 3, "TextArea should has 3 lines");
			assert.strictEqual(mirrorDomRef.children.length, 4, "Mirror should has 4 lines");
			done();
		}.bind(this));
	});

	QUnit.test("Should grow when minimum rows are set", function (assert) {
		var done = assert.async();

		this.textArea.style.width = "auto";
		this.textArea.style.height = "auto";
		this.textArea.value = "aaa";
		this.textArea.growing = true;
		this.textArea.rows = 5;

		var value = "aaaa\naaaa\naaaa\naaaa\naaaa\naaaa\naaaa\naaaa\naaaa\naaaa\naaaa\naaaa\naaaa";
		this.textArea.value = value;

		RenderScheduler.whenFinished().then(function () {

			var controlId = this.textArea._id;
			var controlDomRef = this.textArea.getDomRef();
			var internalTextAreaDomValue = controlDomRef.querySelector("#" + controlId + "-inner").value;
			var mirrorDomRef = controlDomRef.querySelector("#" + controlId + "-mirror");

			assert.strictEqual(internalTextAreaDomValue.split("\n").length, 13, "TextArea should has 12 lines");
			assert.strictEqual(mirrorDomRef.children.length, 12, "Mirror should has 12 lines");
			done();
		}.bind(this));
	});

	QUnit.test("Should show exceeded text and be in warning state", function (assert) {
		var done = assert.async();

		this.textArea.value = "123456789";
		this.textArea.showExceededText = true;
		this.textArea.maxLength = 5;

		RenderScheduler.whenFinished().then(function () {
			var controlDomRef = this.textArea.getDomRef();

			assert.strictEqual(controlDomRef.childElementCount, 3, "Three children should be available - textarea div, exceeded text and formSupport slot");
			assert.strictEqual(controlDomRef.children[0].children[0].classList.contains("sapWCTextAreaWarningInner"), true, "TextArea should contain sapWCTextAreaWarningInner");
			assert.strictEqual(controlDomRef.children[1].textContent.split(" ")[0], "4", "span should contain information for exceeded text");
			done();
		}.bind(this));
	});

	QUnit.test("TextArea should not grow more than growing-max-lines", function (assert) {
		var done = assert.async();

		this.textArea.growingMaxLines = 2;
		this.textArea.rows = 2;
		this.textArea.style = "";
		this.growing = true;

		// act
		this.textArea.value = "aaaa"

		//assert
		RenderScheduler.whenFinished().then(function () {
			var that = this;
			var size1 = that.textArea._maxHeight;
			var size2 = 0;
			var size3 = 0;

			that.textArea.value = "aaaa\naaaa";

			RenderScheduler.whenFinished().then(function () {
				size2 = that.textArea._maxHeight;
				that.textArea.value = "aaaa\naaaa\naaaa\naaaa\naaaa\naaaa\naaaa";

			}).then(function () {
				size3 = that.textArea._maxHeight;

				assert.strictEqual(parseInt(size1), parseInt(2 * 1.4 * 14 + 9), "max height should be propertly calculated");
				assert.strictEqual(size1, size2);
				assert.strictEqual(size2, size3);
				done();
			});

		}.bind(this));
	});
});
