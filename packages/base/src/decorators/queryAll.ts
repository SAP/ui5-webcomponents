import type UI5Element from "../UI5Element.js";

type QueryDecorator = (target: UI5Element, propertyKey: string | symbol) => void;

/**
 * A decorator that converts a class member into a getter that
 * executes a querySelectorAll on the element's shadow DOM.
 *
 * @param { string } selector DOM String containing selector to match
 * @returns { QueryDecorator }
 *
 * ```ts
 * class MyComponnet extends UI5Element {
 *   @queryAll('.item')
 *   itemsDOM?: HTMLElement;
 *
 *   render() {
 *     return html`
 * 		 <div>
 *      	<li class=".item"></li>
 *       	<li class=".item"></li>
 * 		 </div>
 *     `;
 *   }
 * }
 * ```
 */
const queryAll = (selector: string): QueryDecorator => {
	return (target: any, propertyKey: string | symbol) => {
		Object.defineProperty(target, propertyKey, {
			get(this: UI5Element) {
				return this.shadowRoot?.querySelectorAll(selector);
			},
		});
	};
};

export default queryAll;
