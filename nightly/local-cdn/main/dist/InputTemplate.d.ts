import type Input from "./Input.js";
type TemplateHook = () => void;
export default function InputTemplate(this: Input, hooks?: {
    preContent: TemplateHook;
    postContent: TemplateHook;
}): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element;
export {};
