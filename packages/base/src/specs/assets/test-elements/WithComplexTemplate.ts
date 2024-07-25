import UI5Element from "../../../UI5Element.js";
import customElement from "../../../decorators/customElement.js";
import litRender from "../../../renderer/LitRenderer.js";
import WithComplexTemplateTemplate from "../../../generated/templates/elements/WithComplexTemplateTemplate.lit.js";

@customElement({
	tag: "ui5-test-complex-template",
	renderer: litRender,
	template: WithComplexTemplateTemplate,
})
class WithComplexTemplate extends UI5Element {
	get text() {
		return "root";
	}

	get items() {
		return [
			{
				text: "positives",
				words: [
					{ text: "word1_good" },
					{ text: "word2_nice" },
					{ text: "word3_kind" },
				],
			},
			{
				text: "negatives",
				words: [
					{ text: "word4_bad" },
					{ text: "word5_rude" },
					{ text: "word6_unpolite" },
				],
			},
		];
	}
}

WithComplexTemplate.define();
