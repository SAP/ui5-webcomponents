import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/ColorPalettePopover",
    component: "ColorPalettePopover",
    argTypes,
};
const Template = (args) => html `<ui5-color-palette-popover
	id="${ifDefined(args.id)}"
	?show-recent-colors="${ifDefined(args.showRecentColors)}"
	?show-more-colors="${ifDefined(args.showMoreColors)}"
	?show-default-color="${ifDefined(args.showDefaultColor)}"
	default-color="${ifDefined(args.defaultColor)}"
>
	${unsafeHTML(args.default)}
</ui5-color-palette-popover>`;
export const Basic = Template.bind({});
Basic.args = {
    id: "colorPalettePopover",
    default: `<ui5-color-palette-item value="lightsalmon"></ui5-color-palette-item>
<ui5-color-palette-item value="lightpink"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(216,124,172)"></ui5-color-palette-item>
<ui5-color-palette-item value="#6c666d"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(55,81,95)"></ui5-color-palette-item>
<ui5-color-palette-item value="#0072bb"></ui5-color-palette-item>
<ui5-color-palette-item value="powderblue"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(143,201,58)"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(195,172,206)"></ui5-color-palette-item>
<ui5-color-palette-item value="orange"></ui5-color-palette-item>`,
};
Basic.decorators = [
    (story) => html `<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	${story()}
	<script>
		colorPaletteBtn.addEventListener("click", function(event) {
			colorPalettePopover.showAt(this);
		});
	</script>`,
];
Basic.parameters = {
    docs: {
        story: {
            inline: false,
            iframeHeight: "500px",
        },
    }
};
export const DefaultColor = Template.bind({});
DefaultColor.storyName = "Default, Recent, and More Colors";
DefaultColor.args = {
    id: "colorPalettePopover",
    defaultColor: "orange",
    showDefaultColor: true,
    showRecentColors: true,
    showMoreColors: true,
    default: `<ui5-color-palette-item value="lightsalmon"></ui5-color-palette-item>
<ui5-color-palette-item value="lightpink"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(216,124,172)"></ui5-color-palette-item>
<ui5-color-palette-item value="#6c666d"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(55,81,95)"></ui5-color-palette-item>
<ui5-color-palette-item value="#0072bb"></ui5-color-palette-item>
<ui5-color-palette-item value="powderblue"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(143,201,58)"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(195,172,206)"></ui5-color-palette-item>
<ui5-color-palette-item value="orange"></ui5-color-palette-item>
<ui5-color-palette-item value="#ef3054"></ui5-color-palette-item>
<ui5-color-palette-item value="#ff6f59"></ui5-color-palette-item>
<ui5-color-palette-item value="moccasin"></ui5-color-palette-item>
<ui5-color-palette-item value="#07A0C3"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(8,103,136)"></ui5-color-palette-item>`,
};
DefaultColor.decorators = [
    (story) => html `<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	${story()}
	<script>
		colorPaletteBtn.addEventListener("click", function(event) {
			colorPalettePopover.showAt(this);
		});
	</script>`,
];
DefaultColor.parameters = {
    docs: {
        story: {
            inline: false,
            iframeHeight: "500px",
        },
    }
};
//# sourceMappingURL=ColorPalettePopover.stories.js.map