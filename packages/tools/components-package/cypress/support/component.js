import "@cypress/code-coverage/support";
import { setupHooks, getContainerEl } from "@cypress/mount-utils";
import { mount as preactMount } from "./cypress-ct-preact.js";
import "./commands.js";

function applyConfiguration(options) {
	const configurationScript = document.head.querySelector("script[data-ui5-config]");

	if (options.ui5Configuration) {
		configurationScript.innerHTML = JSON.stringify(options.ui5Configuration);
	}
}

function cleanup() {
	preactMount(null, getContainerEl());
}

function mount(component, options = {}) {
	const container = getContainerEl();

	// Apply custom configuration
	applyConfiguration(options);

	// Mount JSX Element
	return cy.wrap({ preactMount })
		.invoke("preactMount", component, container)
		.then(() => {
			cy.get(container)
				.find("*")
				.should($el => {
					const shadowrootsExist = [...$el].every(el => {
						if (el.hasAttribute("ui5-table-growing")) {
							return true;
						}

						if (el.tagName.includes("-") && el.shadowRoot) {
							return el.shadowRoot.hasChildNodes();
						}

						return true;
					})

					expect(shadowrootsExist, "Custom elements with shadow DOM have content in their shadow DOM").to.be.true;
				})
		});
}

setupHooks(cleanup);

Cypress.Commands.add('mount', mount)