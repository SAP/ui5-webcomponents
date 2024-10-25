import { mount } from 'cypress-ct-lit'
import "./commands.js";

Cypress.Commands.add("mount", mount)

let dispose;

function cleanup() {
	dispose?.();
}

Cypress.Commands.overwrite("mount", (originalFn, template, options = {}) => {
	const configurationScript = document.head.querySelector("script[data-ui5-config]")
	cleanup();
	if (options?.ui5Configuration) {
		configurationScript.innerHTML = JSON.stringify(options.ui5Configuration);

	}

	dispose = () => {
		configurationScript.innerHTML = "{}";
	}

return originalFn(template, options)
})