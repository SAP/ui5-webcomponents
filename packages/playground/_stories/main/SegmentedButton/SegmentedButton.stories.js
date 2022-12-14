import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/SegmentedButton",
    component: "ui5-segmented-button",
    subcomponents: {'SegmentedButtonItem' : 'ui5-segmented-button-item'},
    argTypes,
};


export const Template0 = () => html`
<h3>Basic SegmentedButton</h3>
	<div class="snippet">
        <ui5-segmented-button accessible-name="Geographic location">
            <ui5-segmented-button-item>Map</ui5-segmented-button-item>
            <ui5-segmented-button-item pressed="">Satellite</ui5-segmented-button-item>
            <ui5-segmented-button-item>Terrain</ui5-segmented-button-item>
        </ui5-segmented-button>
	</div>
`;

export const Template1 = () => html`
<h3>SegmentedButton with Icons</h3>
	<div class="snippet">
		<ui5-segmented-button>
			<ui5-segmented-button-item icon="employee" pressed=""></ui5-segmented-button-item>
			<ui5-segmented-button-item icon="menu"></ui5-segmented-button-item>
			<ui5-segmented-button-item icon="factory"></ui5-segmented-button-item>
		</ui5-segmented-button>
	</div>
`;

export const Template2 = () => html`
<h3>SegmentedButton with 5 SegmentedButtonItems</h3>
	<div class="snippet">
		<ui5-segmented-button>
			<ui5-segmented-button-item>Item</ui5-segmented-button-item>
			<ui5-segmented-button-item pressed="">Pressed SegmentedButtonItem With Bigger Text</ui5-segmented-button-item>
			<ui5-segmented-button-item>Item</ui5-segmented-button-item>
			<ui5-segmented-button-item>SegmentedButtonItem</ui5-segmented-button-item>
			<ui5-segmented-button-item>Press me</ui5-segmented-button-item>
		</ui5-segmented-button>
	</div>
`;