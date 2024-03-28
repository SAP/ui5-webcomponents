import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Menu",
    component: "Menu",
    argTypes,
};
const Template = (args) => html `<ui5-menu
	header-text="${ifDefined(args.headerText)}"
	opener="${ifDefined(args.opener)}"
	?open="${ifDefined(args.open)}"
	id="${ifDefined(args.id)}"
>
	${unsafeHTML(args.default)}
</ui5-menu>`;
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
    id: "menuBasic",
    headerText: "Basic Menu with Items",
    default: `<ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
<ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
<ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Close"></ui5-menu-item>
<ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>`,
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
Basic.parameters = {
    docs: {
        story: {
            inline: false,
        },
    }
};
export const SubMenu = Template.bind({});
SubMenu.storyName = "Menu with Submenu";
SubMenu.args = {
    id: "menuSubs",
    default: `<ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
<ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
<ui5-menu-item text="Open" icon="open-folder" starts-section="">
	<ui5-menu-item text="Open Locally" icon="open-folder">
		<ui5-menu-item text="Open from C"></ui5-menu-item>
		<ui5-menu-item text="Open from D"></ui5-menu-item>
		<ui5-menu-item text="Open from E"></ui5-menu-item>
	</ui5-menu-item>
	<ui5-menu-item text="Open from Cloud"></ui5-menu-item>
</ui5-menu-item>
<ui5-menu-item text="Save" icon="save">
	<ui5-menu-item text="Save Locally" icon="save">
		<ui5-menu-item text="Save on C" icon="save"></ui5-menu-item>
		<ui5-menu-item text="Save on D" icon="save"></ui5-menu-item>
		<ui5-menu-item text="Save on E" icon="save"></ui5-menu-item>
	</ui5-menu-item>
	<ui5-menu-item text="Save on Cloud" icon="upload-to-cloud"></ui5-menu-item>
</ui5-menu-item>
<ui5-menu-item text="Close"></ui5-menu-item>
<ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>`,
};
SubMenu.decorators = [
    (story) => html `<ui5-button id="btnOpenBasic" class="samples-margin" icon="slim-arrow-down" icon-end>Open Menu</ui5-button> <br/>
	${story()}
	<script>
		btnOpenBasic.addEventListener("click", function(event) {
			menuSubs.showAt(btnOpenBasic);
		});
	</script>`,
];
SubMenu.parameters = {
    docs: {
        story: {
            inline: false,
        },
    }
};
export const AditionalText = Template.bind({});
AditionalText.storyName = "Menu Items with Additional Text";
AditionalText.args = {
    id: "menuAdditionalText",
    default: `<ui5-menu-item text="New File" icon="add-document" additional-text="Ctrl+N"></ui5-menu-item>
<ui5-menu-item text="New Folder" icon="add-folder" additional-text="Ctrl+F" disabled=""></ui5-menu-item>
<ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Close"></ui5-menu-item>
<ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
<ui5-menu-item text="Exit" icon="journey-arrive" additional-text="Ctrl+X"></ui5-menu-item>`,
};
AditionalText.decorators = [
    (story) => html `<ui5-button id="btnOpenAdditionalText" class="samples-margin" icon="slim-arrow-down" icon-end>Open Menu</ui5-button> <br/>
	${story()}
	<script>
		btnOpenAdditionalText.addEventListener("click", function(event) {
			menuAdditionalText.showAt(btnOpenAdditionalText);
		});
	</script>`,
];
AditionalText.parameters = {
    docs: {
        story: {
            inline: false,
        },
    }
};
//# sourceMappingURL=Menu.stories.js.map