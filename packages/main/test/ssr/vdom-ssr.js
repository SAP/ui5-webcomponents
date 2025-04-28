import { isUI5ElementClass } from "@ui5/webcomponents-base/dist/jsx-utils.js";
import { jsx } from "@ui5/webcomponents-base/dist/jsx-runtime.js";

export function withSsr(h) {
    return function (component, props) {
        let instance;
        let shadowDom;
        const attributes = {}

        if (isUI5ElementClass(component)) {
            instance = Reflect.construct(component, []);

            // attach children
            if (props.children) {
                if (Array.isArray(props.children)) {
                    instance.children = props.children.map(child => child.__instance);
                }
                if (typeof props.children === "string") {
                    instance.textContent = props.children;
                }
                instance._processChildren();
            }

            // set properties
            Object.keys(props).forEach(prop => {
                instance[prop] = props[prop];
            });

            // lifecycle
            instance.onBeforeRendering();
            instance.updateAttributes();
            shadowDom = instance.render();

            // setting tag as attribute is in UI5Element.connectedCallback
            instance.setAttribute(instance.constructor.getMetadata().getPureTag(), "");
            instance.attributes.forEach(({name, value}) => {
                attributes[name] = value;
            });
        }

        if (shadowDom) {
            props.children = props.children || [];
            if (!Array.isArray(props.children)) {
                props.children = [props.children];
            }
            props.children.unshift(jsx("template", {shadowrootmode: "open", children: shadowDom}));
        }

        const vdom = h(component, {...props, ...attributes});
        vdom.__instance = instance;
        return vdom;
    }
}

export default function h(component, props) {
    let instance;
    let shadowDom;
    const attributes = {}

    if (isUI5ElementClass(component)) {
        instance = Reflect.construct(component, []);

        // attach children
        if (props.children) {
            if (Array.isArray(props.children)) {
                instance.children = props.children.map(child => child.__instance);
            }
            if (typeof props.children === "string") {
                instance.textContent = props.children;
                instance.children = [{nodeType: 3, value: props.children}]
            }
            instance._processChildren();
        }

        // set properties
        Object.keys(props).forEach(prop => {
            instance[prop] = props[prop];
        });

        // lifecycle
        instance.onBeforeRendering();
        instance.updateAttributes();
        shadowDom = instance.render();

        // setting tag as attribute is in UI5Element.connectedCallback
        instance.setAttribute(instance.constructor.getMetadata().getPureTag(), "");
        instance.attributes.forEach(({name, value}) => {
            attributes[name] = value;
        });
    }

    if (shadowDom) {
        props.children = props.children || [];
        if (!Array.isArray(props.children)) {
            props.children = [props.children];
        }
        props.children.unshift(jsx("template", {shadowrootmode: "open", children: shadowDom}));
    }

    const vdom = jsx(component, {...props, ...attributes});
    vdom.__instance = instance;
    return vdom;
}