import { assert } from "chai";

describe("Theming works", () => {
	before(async () => {
		await browser.url("test/pages/WithComplexTemplate.html");
	});

	it("Tests context maintained in the HBS template before, after and inside 'each' statements", async () => {
		// Expected order of the rendered texts, which depends on correct context within the template
		const EXPTECTED_LOOP_CONTENT = "Root text: root, Item text: positives";
		const EXPTECTED_NESTED_LOOP_CONTENT = "Root Text: root, Word text: word1_good";
		
		const ACTUAL_TEXT_CONTENT = await browser.executeAsync( async (done) => {
			const beforeLoopContent = document.querySelector("#testComplexTemplate").shadowRoot.querySelector('.before-each-content--start--0').textContent;
			const nestedLoopContent1 = document.querySelector("#testComplexTemplate").shadowRoot.querySelector('.nested-each-content--0--0').textContent;
			const nestedLoopContent2 = document.querySelector("#testComplexTemplate").shadowRoot.querySelector('.nested-each-content--0--1').textContent;
			const afterLoopContent = document.querySelector("#testComplexTemplate").shadowRoot.querySelector('.after-each-content--end--0').textContent;
			done({
				beforeLoopContent,
				nestedLoopContent1,
				nestedLoopContent2,
				afterLoopContent,
			});
		}, );

		assert.strictEqual(ACTUAL_TEXT_CONTENT.beforeLoopContent, EXPTECTED_LOOP_CONTENT, "The template has been built correctly.");
		assert.strictEqual(ACTUAL_TEXT_CONTENT.nestedLoopContent1, EXPTECTED_NESTED_LOOP_CONTENT, "The template has been built correctly.");
		assert.strictEqual(ACTUAL_TEXT_CONTENT.nestedLoopContent2, EXPTECTED_NESTED_LOOP_CONTENT, "The template has been built correctly.");
		assert.strictEqual(ACTUAL_TEXT_CONTENT.afterLoopContent, EXPTECTED_LOOP_CONTENT, "The template has been built correctly.");
	});
});
