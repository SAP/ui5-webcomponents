/* eslint-disable max-classes-per-file */
import { HTMLElement, Element, customElements } from "@lit-labs/ssr-dom-shim";
globalThis.HTMLElement ??= HTMLElement;
globalThis.Element ??= Element;
globalThis.customElements ??= customElements;
class NodeShim {
}
globalThis.Node ??= NodeShim;
class FileListShim {
}
globalThis.FileList ??= FileListShim;
//# sourceMappingURL=ssr-dom-shim.js.map