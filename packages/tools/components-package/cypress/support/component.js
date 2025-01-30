import "@cypress/code-coverage/support";
import { setupHooks, getContainerEl} from "@cypress/mount-utils";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { mount as preactMount } from "./cypress-ct-preact.js";
import { mount as litMount } from "cypress-ct-lit";
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

	// Mount string - remove after migrating all
	if (typeof component === "string") {
		return litMount(unsafeHTML(component), options)
	}
	
	// Mount lit template -  - remove after migrating all
	const legacyMount = component?.strings?.length > 0;
	if (legacyMount) {
		return litMount(component, options);
	}

	// Mount JSX template
	return preactMount(component, container);
}

setupHooks(cleanup);

Cypress.Commands.add('mount', mount)