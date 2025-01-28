import '@cypress/code-coverage/support'
import { setupHooks, getContainerEl} from '@cypress/mount-utils';
import "./commands.js";
import render from "./cypress-ct-preact.js";


function cleanup() {
	render(null, getContainerEl())
}

function mount(component, options = {}) {
	const root = getContainerEl();
	const configurationScript = document.head.querySelector("script[data-ui5-config]");

	cleanup();

	if (options.ui5Configuration) {
		configurationScript.innerHTML = JSON.stringify(options.ui5Configuration);
	}

	return render(component, root);
}

setupHooks(cleanup);

Cypress.Commands.add('mount', mount)