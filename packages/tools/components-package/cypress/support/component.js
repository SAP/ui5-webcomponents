import { setupHooks } from '@cypress/mount-utils';
import { mount } from 'cypress-ct-lit'
import "./commands.js";

let dispose;

function cleanup() {
    dispose?.();
}

function ui5Mount(component, options = {}) {
    const configurationScript = document.head.querySelector("script[data-ui5-config]")
    cleanup();

    if (options.ui5Configratuion) {
        configurationScript.innerHTML = JSON.stringify(options.ui5Configratuion);

        window?.["sap-ui-webcomponents-bundle"]?.forceInitConfiguration();
    }

    dispose = () => {
        configurationScript.innerHTML = "{}";
        window?.["sap-ui-webcomponents-bundle"]?.forceInitConfiguration();
    }

    return mount(component, options)
}

setupHooks(cleanup);

Cypress.Commands.add('mount', ui5Mount)