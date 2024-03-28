import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import ToastPlacement from "@ui5/webcomponents/dist/types/ToastPlacement.js";
export default {
    title: "Main/Toast",
    component: "Toast",
    argTypes,
};
let index = 0;
const Template = (args) => {
    return html `
<ui5-button id="btn-${++index}">Show Toast</ui5-button>
<ui5-toast
	id="toast-${index}"
	duration="${ifDefined(args.duration)}"
	placement="${ifDefined(args.placement)}"
	>${unsafeHTML(args.default)}</ui5-toast>
<script>
	var toastOpener${index} = document.getElementById("btn-${index}");
	var toast${index} = document.getElementById("toast-${index}"); 

	toastOpener${index}.addEventListener("click", () => {
		toast${index}.show();
	});
</script>`;
};
export const Basic = Template.bind({});
Basic.args = {
    placement: ToastPlacement.BottomCenter,
    default: "Basic Toast",
};
export const Duration = Template.bind({});
Duration.args = {
    duration: 4500,
    default: "Long Toast",
};
export const Placement = Template.bind({});
Placement.args = {
    placement: ToastPlacement.MiddleCenter,
    default: "Middle Center Toast",
};
//# sourceMappingURL=Toast.stories.js.map