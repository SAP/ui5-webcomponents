import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
export default {
    title: "Main/SplitButton",
    component: "SplitButton",
    argTypes,
};
const Template = (args) => html `<ui5-split-button
	?disabled="${ifDefined(args.disabled)}"
	design="${ifDefined(args.design)}"
	icon="${ifDefined(args.icon)}"
	active-icon="${ifDefined(args.activeIcon)}"
	accessible-name="${ifDefined(args.accessibleName)}"
>
	${unsafeHTML(args.default)}
</ui5-split-button>`;
export const Basic = Template.bind({});
Basic.args = {
    default: "Default",
    accessibleName: "Split Button with Accessible Name",
};
export const OpeningMenu = Template.bind(this);
OpeningMenu.args = {
    default: "Open Menu",
};
OpeningMenu.decorators = [
    (story) => {
        return html `
		<ui5-menu id="menuInSplitBtnDefaultAction">
			<ui5-menu-item text="Edit" icon="add"></ui5-menu-item>
			<ui5-menu-item text="Save" icon="save"></ui5-menu-item>
			<ui5-menu-item text="Delete" icon="delete"></ui5-menu-item>
		</ui5-menu>
	${story()}
	<script>
	var splitBtn = document.querySelector("ui5-split-button");
	var menu = document.getElementById("menuInSplitBtnDefaultAction");
	
	splitBtn.addEventListener("ui5-arrow-click", function() {
		if (menu.open) {
			menu.close();
			splitBtn.activeArrowButton = false;
		} else {
			menu.showAt(splitBtn);
			splitBtn.activeArrowButton = true;
		}
	});
	
	menu.addEventListener("after-close", function() {
		splitBtn.activeArrowButton = false;
	});
	</script>`;
    }
];
OpeningMenu.parameters = {
    docs: {
        story: {
            inline: false,
            iframeHeight: "150px",
        },
    }
};
export const DifferentDesigns = () => html `
	<ui5-split-button design="${ButtonDesign.Emphasized}"> Emphasized </ui5-split-button>
	<ui5-split-button design="${ButtonDesign.Attention}"> Attention </ui5-split-button>
	<ui5-split-button design="${ButtonDesign.Positive}"> Positive </ui5-split-button>
	<ui5-split-button design="${ButtonDesign.Negative}"> Negative </ui5-split-button>
	<ui5-split-button design="${ButtonDesign.Transparent}"> Transparent </ui5-split-button>
`;
//# sourceMappingURL=SplitButton.stories.js.map