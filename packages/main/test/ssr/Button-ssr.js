import { prettify } from 'htmlfy';
import { jsx as jsx_ } from "@ui5/webcomponents-base/dist/jsx-runtime.js";
import "./config.js";
import "../../dist/Assets.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import Button from "../../dist/Button.js";
import withSsr from "@ui5/webcomponents-base/dist/h-ssr.js";
import { render } from "preact-render-to-string";

const jsx = withSsr(jsx_);

if (!Button.asyncFinished) {
    await Button.definePromise;
}

const button = new Button();

button.design = "Negative";
button.icon = "account";

button.childNodes = [{nodeType: 3, value: "alabala"}]
await button._processChildren();
const str = button._render()
console.log(str);

// -----------------
const vdom = jsx(Button, { design: "Negative", icon: "account", children: "alabala" });
console.log("vdom", prettify(render(vdom)));
