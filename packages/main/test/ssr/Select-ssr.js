import { render } from "preact-render-to-string";
import { jsx } from "@ui5/webcomponents-base/dist/jsx-runtime.js";
import "./config.js";
import "../../dist/Assets.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import Select from "../../dist/Select.js";
import Option from "../../dist/Option.js";
import { isUI5ElementClass } from "@ui5/webcomponents-base/dist/jsx-utils.js";

async function jsx__(component, props) {
    let instance;
    let shadowDom;
    if (isUI5ElementClass(component)) {
        instance = Reflect.construct(component, []);
        Object.keys(props).forEach(prop => {
            instance[prop.name] = prop.value;
        });

        // attach children
        if (props.children) {
            if (Array.isArray(props.children)) {
                instance._childrenFromServer = props.children.map(child => child.__instance);
            }
            if (typeof props.children === "string") {
                instance.textContent = props.children;
                console.log(instance.constructor.getMetadata().getTag(), instance.textContent)
            }
            await instance._processChildren();
        }
        instance.onBeforeRendering();
        console.log("text", instance.selectedOption?.textContent)
        shadowDom = instance.render();
    }

    if (shadowDom) {
        props.children = props.children || [];
        if (!Array.isArray(props.children)) {
            props.children = [props.children];
        }
        props.children.unshift(jsx("template", {shadowrootmode: "open", children: shadowDom}));
    }
    const vdom = jsx(component, props);
    vdom.__instance = instance;
    return vdom;
}

if (!Select.asyncFinished) {
    await Select.definePromise;
}

// const vdom = jsx__(Option, { value: "1", children: "Option 1" })

const vdom = await jsx__(Select, {
    design: "Negative",
    icon: "account",
    children: [
        await jsx__(Option, { value: "1", children: "Option 1" }),
        // jsx__(Option, { value: "2", children: "Option 2" }),
        // jsx__(Option, { value: "3", children: "Option 3" }),
    ]
});

// console.log(vdom);
console.log("!", render(vdom));
