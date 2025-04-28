import { render } from "preact-render-to-string";
import { prettify } from 'htmlfy'
import "./config.js";
import "../../dist/Assets.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import Select from "../../dist/Select.js";
import Option from "../../dist/Option.js";
import jsx from "./vdom-ssr.js";

if (!Select.asyncFinished) {
    await Select.definePromise;
}

// const vdom = jsx(Option, { value: "1", children: "Option 1" })

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
