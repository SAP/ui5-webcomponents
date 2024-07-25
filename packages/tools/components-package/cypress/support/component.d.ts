/// <reference types="cypress" />
import { RenderOptions, HTMLTemplateResult } from 'lit';
export type Renderable = HTMLTemplateResult;
export interface MountUI5Options extends MountLitTemplateOptions {
    ui5Configuration: object;
}
export type MountOptions = Partial<MountUI5Options>;
export declare function mount<T extends keyof HTMLElementTagNameMap = any>(component: string | Renderable, options?: MountOptions): Cypress.Chainable<JQuery<HTMLElementTagNameMap[T]>>;
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Mount your component into Cypress sandbox
             * @param component content to render by lit-html render function
             * @param options render options for custom rendering
             */
            mount: typeof mount;
        }
    }
}
