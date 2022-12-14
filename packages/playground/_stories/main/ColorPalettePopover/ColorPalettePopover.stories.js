import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/ColorPalettePopover",
    component: "ui5-color-palette-popover",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Color Palette Popover with recent colors, default color and more colors features</h3>
	<div class="snippet">
		<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
		<ui5-color-palette-popover id="colorPalettePopover" show-recent-colors="" show-more-colors="" show-default-color="" default-color="green">
			<ui5-color-palette-item value="pink"></ui5-color-palette-item>
			<ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
			<ui5-color-palette-item value="#444444"></ui5-color-palette-item>
			<ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>
			<ui5-color-palette-item value="green"></ui5-color-palette-item>
			<ui5-color-palette-item value="darkred"></ui5-color-palette-item>
			<ui5-color-palette-item value="yellow"></ui5-color-palette-item>
			<ui5-color-palette-item value="blue"></ui5-color-palette-item>
			<ui5-color-palette-item value="cyan"></ui5-color-palette-item>
			<ui5-color-palette-item value="orange"></ui5-color-palette-item>
			<ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
			<ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>
		</ui5-color-palette-popover>
	</div>
	<script>
		colorPaletteBtn.addEventListener("click", function(event) {
			colorPalettePopover.showAt(this);
		});
	</script>
`;

export const Template1 = () => html`
<h3>Color Palette Popover without any additional features</h3>
	<div class="snippet">
		<ui5-button id="colorPaletteBtn1">Open ColorPalettePopover</ui5-button>
		<ui5-color-palette-popover id="colorPalettePopover1">
			<ui5-color-palette-item value="pink"></ui5-color-palette-item>
			<ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
			<ui5-color-palette-item value="#444444"></ui5-color-palette-item>
			<ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>
			<ui5-color-palette-item value="green"></ui5-color-palette-item>
			<ui5-color-palette-item value="darkred"></ui5-color-palette-item>
			<ui5-color-palette-item value="yellow"></ui5-color-palette-item>
			<ui5-color-palette-item value="blue"></ui5-color-palette-item>
			<ui5-color-palette-item value="cyan"></ui5-color-palette-item>
			<ui5-color-palette-item value="orange"></ui5-color-palette-item>
			<ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
			<ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>
		</ui5-color-palette-popover>
	</div>
	<script>
		colorPaletteBtn1.addEventListener("click", function (event) {
			colorPalettePopover1.showAt(this);
		});
	</script>
`;