const assert = require("chai").assert;

describe("Strings utility", () => {
  it("escapeRegex", () => {
    assert.ok(new RegExp(escapeRegex(".*+?^${}()").test(".*+?^${}()")));
  });

  it("replaceAll", () => {
    assert.equal(replaceAll("(.*.*)", ".", "_"), "(_*_*)");
    assert.equal(replaceAll("AaABbB", "a", "_", true), "___BbB");
    assert.equal(replaceAll("AaABbB", "a", "_", false), "A_ABbB");
  });

  it("escapeHTML", () => {
    assert.equal(escapeHTML(`<<>&'"XYZ`), "&lt;&lt;&gt;&amp;&#39;&quot;XYZ");
  });

  it("generateHighlightedMarkup", () => {
    assert.equal(generateHighlightedMarkup("Scott", "c"), "S<b>c</b>ott");
    assert.equal(generateHighlightedMarkup("<b></b>", "<"), "<b>&lt;&gt;<b>&lt;</b>/b&gt;");
    assert.equal(generateHighlightedMarkup("[b]test[/b]", "[b]"), "<b>[b]</b>test[/b]");
    assert.equal(generateHighlightedMarkup("[[[b]]]", "[b]", "<span class='test'>", "</span>"), "[[<span class='test'>[b]</span>]]");
  });
});