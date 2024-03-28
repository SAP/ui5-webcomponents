import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Menu/MenuItem",
    component: "MenuItem",
    argTypes,
};
const Template = (args) => html `<ui5-menu id="menuBasic">
	<ui5-menu-item
    accessible-name="${ifDefined(args.accessibleName)}"
    additional-text="${ifDefined(args.additionalText)}"
    ?busy="${ifDefined(args.busy)}"
    busy-delay="${ifDefined(args.busyDelay)}"
    ?disabled="${ifDefined(args.disabled)}"
    icon="${ifDefined(args.icon)}"
    ?starts-section="${ifDefined(args.startsSection)}"
    text="${ifDefined(args.text)}"
	>
		${unsafeHTML(args.default)}
	</ui5-menu-item>
</ui5-menu>`;
export const Basic = Template.bind({});
Basic.storyName = "MenuItem";
Basic.args = {
    icon: "open-folder",
    text: "Open",
    startsSection: true,
    default: `<ui5-menu-item text="Open Locally" icon="open-folder"></ui5-menu-item>
  <ui5-menu-item text="Open from Cloud"></ui5-menu-item>`
};
Basic.decorators = [
    (story) => html `<ui5-button id="btnOpenBasic" class="samples-margin" icon="slim-arrow-down" icon-end>Open Menu</ui5-button> <br/>
	${story()}
	<script>
		btnOpenBasic.addEventListener("click", function(event) {
			menuBasic.showAt(btnOpenBasic);
		});
	</script>`,
];
Basic.tags = ["_hidden_"];
Basic.parameters = {
    docs: {
        story: {
            inline: false,
        },
    }
};
//# sourceMappingURL=MenuItem.stories.js.map