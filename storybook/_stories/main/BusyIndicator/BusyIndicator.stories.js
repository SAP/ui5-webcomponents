import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
import BusyIndicatorSize from "@ui5/webcomponents/dist/types/BusyIndicatorSize.js";
export default {
    title: "Main/Busy Indicator",
    component: "BusyIndicator",
    argTypes,
};
const Template = (args) => {
    return html `<ui5-busy-indicator
	text="${ifDefined(args.text)}"
	size="${ifDefined(args.size)}"
	?active="${ifDefined(args.active)}"
	delay="${ifDefined(args.delay)}"
>
	${unsafeHTML(args.default)}
</ui5-busy-indicator>`;
};
export const Basic = Template.bind({});
Basic.args = {
    active: true,
    size: BusyIndicatorSize.Medium,
};
export const UsageWithComponents = Template.bind({});
UsageWithComponents.args = {
    size: BusyIndicatorSize.Medium,
    default: `<ui5-list
	no-data-text="No Data"
	header-text="Available Items"
	>
</ui5-list>`,
};
UsageWithComponents.decorators = [
    (story) => {
        return html `<style>
	.sample {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>

<div class="sample">
	<ui5-button>Fetch List Data</ui5-button>
	${story()}
</div>

<script>
	var busyIndicator = document.querySelector("ui5-busy-indicator");
	var list = document.querySelector("ui5-list");
	var fetchBtn = document.querySelector("ui5-button");

	fetchBtn.addEventListener("click", event => {
		busyIndicator.active = true;

		setTimeout(() => {
			["UI5", "Web", "Components"].forEach(title => {
				const el = document.createElement("ui5-li");
				el.textContent = title;
				list.appendChild(el);
			});

			busyIndicator.active = false;
		}, 3000);
	});
</script>`;
    },
];
UsageWithComponents.parameters = {
    docs: {
        story: {
            iframeHeight: "500px",
            inline: false,
        }
    }
};
//# sourceMappingURL=BusyIndicator.stories.js.map