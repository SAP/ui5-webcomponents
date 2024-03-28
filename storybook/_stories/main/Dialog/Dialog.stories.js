import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
export default {
    title: "Main/Dialog",
    component: "Dialog",
    argTypes,
    parameters: {
        docs: {
            story: {
                iframeHeight: "800px",
                inline: false,
            },
        },
    },
};
const Template = (args) => {
    return html `
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
	var dialogClosers = [...dialog.querySelectorAll(".dialogCloser")];

	dialogOpener.accessibilityAttributes = {
		hasPopup: "dialog",
		controls: dialog.id,
	};
	dialogOpener.addEventListener("click", () => {
		dialog.open = true;
	});
	dialogClosers.forEach(btn => {
		btn.addEventListener("click", () => {
			dialog.open = false;
		});
	})
</script>`;
};
export const Basic = Template.bind({});
Basic.args = {
    headerText: "Register Form",
    default: `<section class="login-form">
	<div>
		<ui5-label for="username" required show-colon>Username</ui5-label>
		<ui5-input id="username"></ui5-input>
	</div>
	<div>
		<ui5-label for="password" required show-colon>Password</ui5-label>
		<ui5-input id="password" type="Password" value-state="Error"></ui5-input>
	</div>
	<div>
		<ui5-label for="email" type="Email" required show-colon>Email</ui5-label>
		<ui5-input id="email"></ui5-input>
	</div>
	<div>
		<ui5-label for="address" show-colon>Address</ui5-label>
		<ui5-input id="address"></ui5-input>
	</div>
</section>`,
    footer: `<div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; align-items: center">
	<div style="flex: 1;"></div>
	<ui5-button class="dialogCloser" design="Emphasized">Register</ui5-button>
</div>`,
};
Basic.decorators = [
    (story) => html `<style>
	.login-form {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: flex-start;
		margin: 3rem 6rem;
	}
	
	.login-form > div {
		display: grid;
		width: 15rem;
		margin-bottom: .5rem;
	}

	@media(max-width: 600px) {
		.login-form {
			margin: 3rem 1rem;
		}
	}
</style>
${story()}`
];
export const DraggableAndResizable = Template.bind({});
DraggableAndResizable.args = {
    resizable: true,
    draggable: true,
    headerText: "Draggable/Resizable dialog",
    default: `<p>Move this dialog around the screen by dragging it by its header.</p>
<p>Resize this dialog by dragging it by its resize handle.</p>
<p>These features are available only on Desktop.</p>`,
    footer: `<div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; align-items: center">
	<ui5-button class="dialogCloser" design="Emphasized">OK</ui5-button>
</div>`,
};
export const BarInDialog = Template.bind({});
BarInDialog.storyName = "Bar in Header/Footer";
BarInDialog.args = {
    header: `<ui5-bar slot="header" design="Header">
	<ui5-title level="H5" slot="startContent">Bar used in Header and Footer</ui5-title>
	<ui5-button class="dialogCloser" design="Transparent" id="closeDialogButton" slot="endContent" icon="decline"></ui5-button>
</ui5-bar>`,
    default: "<p>Adding styles for the parts to remove the default Dialog's paddings when ui5-bar is used inside Header and Footer</p>",
    footer: `<ui5-bar slot="footer" design="Footer">
	<ui5-button class="dialogCloser" design="Emphasized" slot="endContent" style="min-width: 4rem;">OK</ui5-button>
</ui5-bar>`,
};
BarInDialog.decorators = [
    (story) => html `<style>
	#dialog::part(header),
	#dialog::part(footer) {
		padding-inline: 0;
	}
</style>
${story()}`
];
export const WithState = Template.bind({});
WithState.args = {
    state: ValueState.Error,
    default: "<p>Dialog with state</p>",
    footer: `<div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; align-items: center">
	<ui5-button class="dialogCloser">Close</ui5-button>
</div>`,
};
WithState.decorators = [
    (story, { args }) => {
        return story({ args: { ...args, headerText: args.state } }); // match the header text with the state
    }
];
//# sourceMappingURL=Dialog.stories.js.map