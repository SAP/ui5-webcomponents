import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Popover",
    component: "Popover",
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
    return html `<ui5-popover
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
</ui5-popover>`;
};
export const Basic = Template.bind({});
Basic.args = {
    headerText: "Newsletter subscription",
    default: `<div class="popover-content">
	<div class="flex-column">
		<ui5-label for="emailInput" required show-colon>Email</ui5-label>
		<ui5-input id="emailInput" style="min-width: 150px; margin-top: 1rem;" placeholder="Enter Email"></ui5-input>
	</div>
</div>`,
    footer: `<div slot="footer" class="popover-footer">
	<div style="flex: 1;"></div>
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

	.flex-column {
		display: flex;
		flex-direction: column;
	}

	.popover-footer {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		align-items: center;
		padding: 0.5rem 0;
	}
</style>

<ui5-button id="openPopoverButton" design="Emphasized">Open Popover</ui5-button>
${story()}

<script>
	var popoverOpener = document.getElementById("openPopoverButton");
	var popover = document.querySelector("ui5-popover");
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
//# sourceMappingURL=Popover.stories.js.map