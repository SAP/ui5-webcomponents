import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import type Dialog from "@ui5/webcomponents/dist/Dialog.js";
import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import { DocsPage } from "../../../.storybook/docs";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

const component = "ui5-list";

export default {
	title: "Main/Dialog",
	component,
	argTypes,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component }),
		},
	},
} as Meta<Dialog>;

const Template: UI5StoryArgs<Dialog, StoryArgsSlots> = (args) => {
	return html`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>

<ui5-dialog
	id="dialog"
	header-text="${ifDefined(args.headerText)}"
	?stretch="${ifDefined(args.stretch)}"
	?draggable="${ifDefined(args.draggable)}"
	?resizable="${ifDefined(args.resizable)}"
	state="${ifDefined(args.state)}"
	initial-focus="${ifDefined(args.initialFocus)}"
	?prevent-focus-restore="${ifDefined(args.preventFocusRestore)}"
	?open="${ifDefined(args.open)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	accessible-role="${ifDefined(args.accessibleRole)}"
>
	${unsafeHTML(args.header)}
	${unsafeHTML(args.default)}
	${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
	var dialogOpener = document.getElementById("dialogOpener");
	var dialog = document.getElementById("dialog"); 
	var dialogCloser = document.querySelector("#dialog .dialogCloser");

	dialogOpener.accessibilityAttributes = {
		hasPopup: "dialog",
		controls: dialog.id,
	};
	dialogOpener.addEventListener("click", function () {
		dialog.open = true;
	});
	dialogCloser.addEventListener("click", function () {
		dialog.open = false;
	});
</script>`;
};

export const Basic = Template.bind({});
Basic.args = {
	headerText: "Register Form",
	default: `
		<section class="login-form">
			<div>
				<ui5-label for="username" required="">Username: </ui5-label>
				<ui5-input id="username"></ui5-input>
			</div>
			<div>
				<ui5-label for="password" required="">Password: </ui5-label>
				<ui5-input id="password" type="Password" value-state="Error"></ui5-input>
			</div>
			<div>
				<ui5-label for="email" type="Email" required="">Email: </ui5-label>
				<ui5-input id="email"></ui5-input>
			</div>
			<div>
				<ui5-label for="address">Address: </ui5-label>
				<ui5-input id="address"></ui5-input>
			</div>
		</section>`,
	footer: `
		<div slot="footer" style="display: flex; align-items: center;padding: .5rem">
			<div style="flex: 1;"></div>
			<ui5-button class="dialogCloser" design="Emphasized">Register</ui5-button>
		</div>`,
};

export const DraggableAndResizable = Template.bind({});
DraggableAndResizable.args = {
	open: true,
	resizable: true,
	draggable: true,
	headerText: "Draggable/Resizable dialog",
	default: `
		<p>Move this dialog around the screen by dragging it by its header.</p>
			<p>Resize this dialog by dragging it by its resize handle.</p>
		<p>These features are available only on Desktop.</p>`,
	footer: `
		<div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; padding: .25rem 1rem;">
			<ui5-button class="dialogCloser" design="Emphasized">OK</ui5-button>
		</div>`,
};

export const FioriDialog = Template.bind({});
FioriDialog.storyName = "SAP Fiori Styled Footer";
FioriDialog.args = {
	open: true,
	headerText: "SAP Fiori Styled Footer",
	default: "<p>Adding custom styles to achieve the look and feel of a SAP Fiori footer</p>",
	footer: `
		<div slot="footer" style="display: flex; align-items: center; justify-content: end; width: 100%; box-sizing: border-box;">
			<ui5-button design="Emphasized" style="min-width: 4rem;">OK</ui5-button>
			<ui5-button class="dialogCloser" style="margin: 0 0 0 0.5rem; min-width: 4rem;">Cancel</ui5-button>
		</div>`,
};

export const WithState = Template.bind({});
WithState.args = {
	open: true,
	state: ValueState.Error,
	default: "<p>Dialog with state</p>",
	footer: `
		<div slot="footer" style="display: flex; justify-content: flex-end; align-items: center;">
			<ui5-button class="dialogCloser">Close</ui5-button>
		</div>`,
};
WithState.decorators = [
	(story, { args }) => {
		return story({ args: { ...args, headerText: args.state } }) // match the header text with the state
	}
];
