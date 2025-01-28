import '@cypress/code-coverage/support'
import { render, createContext } from "@ui5/webcomponents-base/dist/thirdparty/preact/preact.module.js";
import { jsx } from "@ui5/webcomponents-base/dist/thirdparty/preact/jsxRuntime.module.js";
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

	// REFACTOR THIS PART
	const ctx = createContext(this);
	const vnode = jsx(ctx.Provider, { value: component, children: component });
	return render(vnode, root);
}

setupHooks(cleanup);

Cypress.Commands.add('mount', mount)