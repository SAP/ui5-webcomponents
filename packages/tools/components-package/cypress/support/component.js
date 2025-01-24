import '@cypress/code-coverage/support'
import { render } from "@ui5/webcomponents-base/dist/thirdparty/preact/preact.module.js";
import { setupHooks, getContainerEl} from '@cypress/mount-utils';
import "./commands.js";

function cleanup() {
	render(null, getContainerEl())
}

function mount(component, options = {}) {
	const root = getContainerEl();
	const configurationScript = document.head.querySelector("script[data-ui5-config]")
	cleanup();

	if (options.ui5Configuration) {
		configurationScript.innerHTML = JSON.stringify(options.ui5Configuration);
	}

	return render(component, root);
}

setupHooks(cleanup);

Cypress.Commands.add('mount', mount)