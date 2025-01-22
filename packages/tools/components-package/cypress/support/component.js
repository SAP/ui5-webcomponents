import '@cypress/code-coverage/support'
import { setupHooks } from '@cypress/mount-utils';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { mount } from 'cypress-ct-lit'
import "./commands.js";

let dispose;

function cleanup() {
	dispose?.();
}

function ui5Mount(component, options = {}) {
	const configurationScript = document.head.querySelector("script[data-ui5-config]")
	cleanup();

	if (options.ui5Configuration) {
		configurationScript.innerHTML = JSON.stringify(options.ui5Configuration);

	}

	dispose = () => {
		configurationScript.innerHTML = "{}";
	}

	if (typeof component === "string") {
		return mount(unsafeHTML(component), options)
	}

	return mount(component, options)
}

setupHooks(cleanup);

Cypress.Commands.add('mount', ui5Mount)