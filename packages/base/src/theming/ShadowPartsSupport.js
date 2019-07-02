import { addCustomCSS } from "@ui5/webcomponents-base/Theming";

const styleTags = document.querySelectorAll("[data-ui5-custom-style]");

styleTags.forEach(tag => {
	const currentCSS = tag.innerHTML;

	addCustomCSS("ui5-card", currentCSS);
});