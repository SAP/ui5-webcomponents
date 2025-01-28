import { render, createContext } from "@ui5/webcomponents-base/dist/thirdparty/preact/preact.module.js";
import { jsx } from "@ui5/webcomponents-base/dist/thirdparty/preact/jsxRuntime.module.js";
// extract preact in @ui5/webcomponents-render package to cut off the base package dependency

const ctx = createContext(null);

function mount(component, container) {
	return render(jsx(ctx.Provider, { children: component }), container);
}

export {
	mount,
};
