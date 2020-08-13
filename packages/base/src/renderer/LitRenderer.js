import { html, svg, render } from "lit-html/lit-html.js";

const litRender = (templateResult, domNode, styles, { eventContext } = {}) => {
	if (styles) {
		templateResult = html`<style>${styles}</style>${templateResult}`;
	}
	render(templateResult, domNode, { eventContext });
};

let tags;
let suffix;
const setTags = t => {
	tags = t;
};
const setSuffix = s => {
	suffix = s;
};

const replaceStrings = strings => {
	if (suffix && tags && tags.length) {
		strings = strings.map(string => {
			tags.forEach(tag => {
				string = string.replace(new RegExp(`(</?)(${tag})(/?[> \t\n])`, "g"), `$1$2-${suffix}$3`);
			});
			return string;
		});
	}

	return strings;
};

const scopedHtml = (strings, ...values) => html(replaceStrings(strings), ...values);
const scopedSvg = (strings, ...values) => svg(replaceStrings(strings), ...values);

export { setTags, setSuffix };
export { scopedHtml as html, scopedSvg as svg };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "lit-html/directives/style-map.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default litRender;
