// import { setupHooks, getContainerEl } from "@cypress/mount-utils";
// import { render } from 'preact';
// import type { JSX } from 'preact';

// type Options = Record<string, any>;

// function applyConfiguration(options: Options) {
// 	let configurationScript = document.head.querySelector("script[data-ui5-config]");

// 	if (options.ui5Configuration && configurationScript) {
// 		configurationScript.innerHTML = JSON.stringify(options.ui5Configuration);
// 	}
// }

// function cleanup() {
// 	render(null, getContainerEl());
// }

// export function mount(component: JSX.Element, options: Options = {}) {
// 	const container = getContainerEl();

// 	// Apply custom configuration
// 	applyConfiguration(options);

// 	// Mount JSX Element
// 	render(null, container);
// 	render(component, container);

// 	cy.wrap(container)
// 		.find("*")
// 		.should($el => {
// 			const shadowrootsExist = [...$el].every(el => {
// 				if (el.tagName.includes("-") && el.shadowRoot) {
// 					return el.shadowRoot.hasChildNodes();
// 				}

// 				return true;
// 			})

// 			expect(shadowrootsExist, "Custom elements with shadow DOM have content in their shadow DOM").to.be.true;
// 		})

// 	return cy.wrap(container);
// }

// setupHooks(cleanup);