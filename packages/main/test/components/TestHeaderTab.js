import Tab from "../../dist/Tab.js";
import { html } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Custom tab template
const headerTabTemplate = tab => {
	return html`
		<style>
			.test-header-tab {
				color: green;
			}
		</style>
		<span class="test-header-tab">My custom tab: ${tab.text}</span>
	`;
};

const metadata = {
	tag: "ui5-test-header-tab",
};

class TestHeaderTab extends Tab {
	static get metadata() {
		return metadata;
	}

	static get customTabTemplate() {
		return headerTabTemplate;
	}
}

TestHeaderTab.define();

export default TestHeaderTab;
