import { setupHooks } from '@cypress/mount-utils';
import { html } from "lit";
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

		window?.["sap-ui-webcomponents-bundle"]?.forceInitConfiguration(true);
	}

	dispose = () => {
		configurationScript.innerHTML = "{}";
		window?.["sap-ui-webcomponents-bundle"]?.forceInitConfiguration(true);
	}
	if (typeof component === "string") {
		const test = [component];
		test.raw = [component];

		return mount(html(test), options)
	}

	return mount(component, options)
}

setupHooks(cleanup);

Cypress.Commands.add('mount', ui5Mount)