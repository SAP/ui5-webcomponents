import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Responsive Popover",
    component: "ResponsivePopover",
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: "700px",
            },
        },
    },
    argTypes,
};
const Template = (args) => {
    return html `<ui5-responsive-popover
	initial-focus="${ifDefined(args.initialFocus)}"
	?prevent-focus-restore="${ifDefined(args.preventFocusRestore)}"
	?open="${ifDefined(args.open)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	accessible-role="${ifDefined(args.accessibleRole)}"
	header-text="${ifDefined(args.headerText)}"
	placement-type="${ifDefined(args.placementType)}"
	horizontal-align="${ifDefined(args.horizontalAlign)}"
	vertical-align="${ifDefined(args.verticalAlign)}"
	?modal="${ifDefined(args.modal)}"
	?hide-backdrop="${ifDefined(args.hideBackdrop)}"
	?hire-arrow="${ifDefined(args.hideArrow)}"
	?allow-target-overlap="${ifDefined(args.allowTargetOverlap)}"
	opener="${ifDefined(args.opener)}"
	>
	${unsafeHTML(args.header)}
	${unsafeHTML(args.default)}
	${unsafeHTML(args.footer)}
</ui5-responsive-popover>`;
};
export const Basic = Template.bind({});
Basic.args = {
    headerText: "Newsletter subscription",
    default: `<div class="popover-content">
	<ui5-label for="emailInput" required show-colon>Email</ui5-label>
	<ui5-input id="emailInput" style="min-width: 150px;" placeholder="Enter Email"></ui5-input>
	<ui5-label>Note: If you open the page in mobile, a dialog would be displayed.</ui5-label>
</div>`,
    footer: `<div slot="footer" class="popover-footer">
	<ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
</div>`,
};
Basic.decorators = [
    (story) => {
        return html `<style>
	.popover-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.popover-footer {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		align-items: center;
		padding: 0.5rem 0;
	}
</style>

<ui5-button id="openPopoverButton" design="Emphasized">Open ResponsivePopover</ui5-button>
${story()}

<script>
	var popoverOpener = document.getElementById("openPopoverButton");
	var popover = document.querySelector("ui5-responsive-popover");
	var popoverCloser = document.getElementById("closePopoverButton");
	popoverOpener.addEventListener("click", () => {
		popover.showAt(popoverOpener);
	});
	popoverCloser.addEventListener("click", () => {
		popover.close();
	});
</script>`;
    }
];
//# sourceMappingURL=ResponsivePopover.stories.js.map