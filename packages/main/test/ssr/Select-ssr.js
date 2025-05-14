import { render } from "preact-render-to-string";
import { jsx as jsx_ } from "@ui5/webcomponents-base/dist/jsx-runtime.js";
import { prettify } from 'htmlfy'
import "./config.js";
import "../../dist/Assets-json-import.js";
import "@ui5/webcomponents-icons/dist/AllIcons-json-import.js";
import Select from "../../dist/Select.js";
import Option from "../../dist/Option.js";
import withSsr from "@ui5/webcomponents-base/dist/h-ssr.js";

const jsx = withSsr(jsx_);

if (!Select.asyncFinished) {
    await Select.definePromise;
}

const vdom = jsx(Select, {
    design: "Negative",
    icon: "account",
    value: "2",
    children: [
        jsx(Option, { value: "1", children: "Option 1" }),
        jsx(Option, { value: "2", children: "Option 2" }),
        // jsx(Option, { value: "3", children: "Option 3" }),
    ]
});

console.log(vdom.__instance.attributes);
console.log("!", prettify(render(vdom)));
