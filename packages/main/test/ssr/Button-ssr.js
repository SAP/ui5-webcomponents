import { prettify } from 'htmlfy';
import "./config.js";
import "../../dist/Assets.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import Button from "../../dist/Button.js";
import jsx from "./vdom-ssr.js";
import { render } from "preact-render-to-string";

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
const str = button._render()
console.log(str);

const vdom = jsx(Button, { design: "Negative", icon: "account", children: "alabala" });
console.log("vdom", prettify(render(vdom)));
console.log("!!", vdom.__instance.text);