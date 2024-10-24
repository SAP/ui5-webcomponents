import "cypress-real-events";

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