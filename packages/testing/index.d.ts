import { mount, MountLitTemplateOptions as OriginalMountLitTemplateOptions } from "cypress-ct-lit";
import "cypress";
import "cypress-real-events";

module "cypress-ct-lit" {
	interface MountLitTemplateOptions extends OriginalMountLitTemplateOptions {
		ui5Configuration: object;
	}
}

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Mount your template/component into Cypress sandbox
             * @param template
             * @param options render options for custom rendering
             */
            mount: typeof mount;
        }
    }
}
