import { setupHooks, getContainerEl } from "@cypress/mount-utils";
import { render } from 'preact';
import type { JSX } from 'preact';

type Options = Record<string, any>;

function cleanup() {
	render(null, getContainerEl());
}

export function mount(component: JSX.Element, options: Options = {}) {
	const container = getContainerEl();

	// Mount JSX Element
	render(null, container);
	render(component, container);

	cy.wrap(container)
		.find("*")
		.should($el => {
			const shadowrootsExist = [...$el].every(el => {
				if (el.tagName.includes("-") && el.shadowRoot) {
					return el.shadowRoot.hasChildNodes();
				}

				return true;
			})

			expect(shadowrootsExist, "Custom elements with shadow DOM have content in their shadow DOM").to.be.true;
		})

	return cy.wrap(container);
}

setupHooks(cleanup);