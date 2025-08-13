import type UI5Element from "../UI5Element.js";

type QueryDecorator = (target: UI5Element, propertyKey: string | symbol) => void;

/**
 * A decorator that converts a class member into a getter that
 * executes a querySelector on the element's shadow DOM.
 *
 * @param { string } selector DOM String containing selector to match
 * @returns { QueryDecorator }
 *
 * ```ts
 * class MyComponnet extends UI5Element {
 *   @query('.myComponentRoot')
 *   root?: HTMLElement;
 *
 *   render() {
 *     return html`
 *       <div class=".root">
 * 		  </div>
 *     `;
 *   }
 * }
 * ```
 */
const query = (selector: string): QueryDecorator => {
	return (target: any, propertyKey: string | symbol) => {
		Object.defineProperty(target, propertyKey, {
			get(this: UI5Element) {
				return this.shadowRoot?.querySelector(selector) as HTMLElement;
			},
		});
	};
};

export default query;
