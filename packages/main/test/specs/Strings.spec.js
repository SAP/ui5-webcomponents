const assert = require("chai").assert;
let util;

describe("Strings utility", () => {
  before(async () => {
		await browser.url("http://localhost:8080/test-resources/pages/AllTestElements.html");
    util = window['sap-ui-webcomponents-bundle'];
	});

  it("escapeRegex", () => {
    assert.ok(new RegExp(util.escapeRegex(".*+?^${}()").test(".*+?^${}()")));
  });

  it("replaceAll", () => {
    assert.equal(util.replaceAll("(.*.*)", ".", "_"), "(_*_*)");
    assert.equal(util.replaceAll("AaABbB", "a", "_", true), "___BbB");
    assert.equal(util.replaceAll("AaABbB", "a", "_", false), "A_ABbB");
  });

  it("escapeHTML", () => {
    assert.equal(util.escapeHTML(`<<>&'"XYZ`), "&lt;&lt;&gt;&amp;&#39;&quot;XYZ");
  });

  it("generateHighlightedMarkup", () => {
    assert.equal(util.generateHighlightedMarkup("Scott", "c"), "S<b>c</b>ott");
    assert.equal(util.generateHighlightedMarkup("<b></b>", "<"), "<b>&lt;&gt;<b>&lt;</b>/b&gt;");
    assert.equal(util.generateHighlightedMarkup("[b]test[/b]", "[b]"), "<b>[b]</b>test[/b]");
    assert.equal(util.generateHighlightedMarkup("[[[b]]]", "[b]", "<span class='test'>", "</span>"), "[[<span class='test'>[b]</span>]]");
  });
});