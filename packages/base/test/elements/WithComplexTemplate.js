import UI5Element from "../../src/UI5Element.ts";
import litRender from "../../src/renderer/LitRenderer.ts";
import WithComplexTemplateTemplate from "../../src/generated/templates/elements/WithComplexTemplateTemplate.lit.ts";

class WithComplexTemplate extends UI5Element {
	static get metadata() {
		return {
			tag: "ui5-test-complex-template",
		};
	}

	static get renderer() {
		return litRender;
	}

	static get template() {
		return WithComplexTemplateTemplate;
	}

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
				words:[
						{ text: "word4_bad"},
						{ text: "word5_rude"},
						{ text: "word6_unpolite"},
					],
			},
		];
	}
}

WithComplexTemplate.define();
