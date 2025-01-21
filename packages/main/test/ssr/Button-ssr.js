// import { render } from "preact-render-to-string";
import { jsx } from "@ui5/webcomponents-base/dist/jsx-runtime.js";
import "./config.js";
import "../../dist/Assets.js";
// import "@ui5/webcomponents-icons/dist/AllIcons.js";
import Button from "../../dist/Button.js";
import { render } from "@ui5/webcomponents-base/dist/thirdparty/preact/preact.module.js";

const renderComponent = async (component, props) => {
    return jsx(component, props);
}

if (!Button.asyncFinished) {
    await Button.definePromise;
}

renderComponent(Button, { design: "Negative", icon: "account", children: "alabala" });
const button = new Button();

// button.setAttribute("design", "Positive");
// button.attributeChangedCallback("design", null, "Positive");

// button.setAttribute("icon", "account");
// button.attributeChangedCallback("icon", null, "account");

button.design = "Negative";
button.icon = "account";

// button._childNodesFromServer = [{nodeType: 3, value: "alabala"}]
await button._processChildren();
// internal set child (skip this.childNodes)

// child

// nextjs    -> string

// attr -> this.props
// childNodes -> this.text
// onBeforeRendering
// state
// render

// button.connectedCallback();
console.log()
const str = button._render()
console.log(str);
