import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-menu";
export default {
    title: "Main/Menu",
    component,
    subcomponents: { 'MenuItem': 'ui5-menu-item' },
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Basic Menu</h3>
	<div class="snippet">
		<ui5-button id="btnOpenBasic" class="samples-margin">Open Menu</ui5-button> <br/>
		<ui5-menu id="menuBasic">
			<ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
			<ui5-menu-item text="New Folder" icon="add-folder" disabled=""></ui5-menu-item>
			<ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
			<ui5-menu-item text="Close"></ui5-menu-item>
			<ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
			<ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>
		</ui5-menu>
		<script>
			btnOpenBasic.addEventListener("click", function(event) {
				menuBasic.showAt(btnOpenBasic);
			});
		</script>
	</div>
`;
Template0.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
        },
    }
};
export const Template1 = () => html `
<h3>Menu with Sub-menu items</h3>
	<div class="snippet">
		<ui5-button id="btnOpenSubs">Open Menu</ui5-button> <br/>
		<ui5-menu id="menuSubs">
			<ui5-menu-item text="New File" icon="add-document"></ui5-menu-item>
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
			<ui5-menu-item text="Exit" icon="journey-arrive"></ui5-menu-item>
		</ui5-menu>
		<script>
			btnOpenSubs.addEventListener("click", function(event) {
				menuSubs.showAt(btnOpenSubs);
			});
		</script>
	</div>
`;
Template1.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
        },
    }
};
export const Template2 = () => html `
<h3>Menu with additional text on menu items</h3>
	<div class="snippet">
		<ui5-button id="btnOpenAdditionalText" class="samples-margin">Open Menu</ui5-button> <br/>
		<ui5-menu id="menuAdditionalText">
			<ui5-menu-item text="New File" icon="add-document" additional-text="Ctrl+N"></ui5-menu-item>
			<ui5-menu-item text="New Folder" icon="add-folder" additional-text="Ctrl+F" disabled=""></ui5-menu-item>
			<ui5-menu-item text="Open" icon="open-folder" starts-section=""></ui5-menu-item>
			<ui5-menu-item text="Close"></ui5-menu-item>
			<ui5-menu-item text="Preferences" icon="action-settings" starts-section=""></ui5-menu-item>
			<ui5-menu-item text="Exit" icon="journey-arrive" additional-text="Ctrl+X"></ui5-menu-item>
		</ui5-menu>
		<script>
			btnOpenAdditionalText.addEventListener("click", function(event) {
				menuAdditionalText.showAt(btnOpenAdditionalText);
			});
		</script>
	</div>
`;
Template2.parameters = {
    docs: {
        story: {
            // Opt-out of inline rendering
            inline: false,
        },
    }
};
//# sourceMappingURL=Menu.stories.js.map