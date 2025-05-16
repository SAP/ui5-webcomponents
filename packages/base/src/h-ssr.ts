import { isUI5ElementClass } from "./jsx-utils.js";
import type UI5Element from "./UI5Element.js";

const isSSR = typeof document === "undefined";

export default function withSsr(h: any) {
	return function h_(component: string | typeof UI5Element, props: Record<string, any>) {
		let instance!: UI5Element;
		let shadowDom;
		const attributes = {};

		if (isSSR && isUI5ElementClass(component)) {
			instance = Reflect.construct(component, []);

			// attach children
			if (props.children) {
				if (Array.isArray(props.children)) {
					// @ts-expect-error
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					instance.children = props.children.map(child => {
						let childInstance;
						if (typeof child.type === "function") {
							const vdom = child.type.call(instance, child.props);
							// console.log("child vdom", vdom);
							childInstance = vdom.__instance;
						}
						// eslint-disable-next-line @typescript-eslint/no-unsafe-return
						return childInstance || child.__instance;
					});
					// @ts-expect-error
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					instance.childNodes = instance.children.map(child => (typeof child === "string" ? { nodeType: 3, value: child } : child));
				}
				if (typeof props.children === "string") {
					instance.textContent = props.children;
					// @ts-expect-error
					instance.childNodes = [{ nodeType: 3, value: props.children }];
				}
				instance._processChildren();
			}

			// set properties
			Object.keys(props).forEach(prop => {
				if (prop === "children") {
					return;
				}
				// @ts-expect-error
				instance[prop] = props[prop];
			});

			// lifecycle
			instance.onBeforeRendering();
			instance.updateAttributes();
			shadowDom = instance.render();

			// setting tag as attribute is in UI5Element.connectedCallback
			instance.setAttribute(component.getMetadata().getPureTag(), "");
			// @ts-expect-error
			instance.attributes.forEach(({ name, value }) => {
				// @ts-expect-error
				attributes[name] = value;
			});
		}

		if (shadowDom) {
			props.children = props.children || [];
			if (props.children[0] && props.children[0].type !== "template") {
				if (!Array.isArray(props.children)) {
					props.children = [props.children];
				}
				props.children.unshift(h("template", { shadowrootmode: "open", children: [shadowDom, h("style", { dangerouslySetInnerHTML: { __html: (component as typeof UI5Element).styles } })] }));
			}
		}

		const tag = typeof component === "string" ? component : component.getMetadata().getTag();
		const vdom = h(tag, { ...props, ...attributes });
		vdom.__instance = instance;
		return vdom as unknown;
	};
}
