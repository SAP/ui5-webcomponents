/// <reference types="react" />
interface DocsPageArgs {
    component: string;
    package: string;
    since?: string;
}
export declare const DocsPage: (args: DocsPageArgs) => () => JSX.Element;
export {};
