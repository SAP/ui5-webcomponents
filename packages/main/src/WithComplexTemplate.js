import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import WithComplexTemplateTemplate from "./generated/templates/WithComplexTemplateTemplate.lit.js";

class WithComplexTemplate extends UI5Element {

	static get metadata() {
		return {
			tag: "with-complex-template",
		};
	}

	static get template() {
		return WithComplexTemplateTemplate;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return `.root { boder: 2px solid red;} .tag > span { border: 1px solid blue}`;
	}

	get title() {
		return "Complext template"
	}

	get items() {
		return [
			{
				name: "name1",
				tags: [
					"tag1",
					"tag2"
				],
				modes: [
						"mode1",
						"mode2",
						"mode3",
						{
							submodes: [
								"mode4.3",
								"mode4.2",
								"mode4.1",
							]
						}
				],
			},
			{
				name: "name2",
				tags: [
					"tag3",
					"tag4"
				],
				modes: []
			}
		];
	}
}

WithComplexTemplate.define();

export default WithComplexTemplate;
