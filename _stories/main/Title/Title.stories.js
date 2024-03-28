import { html } from "lit";
import argTypes from "./argTypes.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
export default {
    title: "Main/Title",
    component: "Title",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-title
	level="${ifDefined(args.level)}"
	wrapping-type="${ifDefined(args.wrappingType)}"
>${unsafeHTML(args.default)}</ui5-title>`;
};
Template.decorators = [
    (story, { args }) => {
        return html `
${story({ args: { ...args, level: TitleLevel.H1 } })}
${story({ args: { ...args, level: TitleLevel.H2 } })}
${story({ args: { ...args, level: TitleLevel.H3 } })}
${story({ args: { ...args, level: TitleLevel.H4 } })}
${story({ args: { ...args, level: TitleLevel.H5 } })}
${story({ args: { ...args, level: TitleLevel.H6 } })}`;
    },
];
export const Basic = Template.bind({});
Basic.args = {
    default: "Title Text",
};
Basic.decorators = [...Template.decorators];
export const Wrapping = Template.bind({});
Wrapping.args = {
    default: "Long Title Text Text Text Which Wraps",
    wrappingType: WrappingType.Normal,
};
Wrapping.decorators = [
    ...Template.decorators,
    (story) => {
        return html `
<style>
	ui5-title {
		width: 15ch;
	}
</style>
${story()}`;
    },
];
export const WithLink = Template.bind({});
WithLink.args = {
    default: `<ui5-link design="Default">With Default Link (57)</ui5-link>`,
};
WithLink.decorators = [...Template.decorators];
//# sourceMappingURL=Title.stories.js.map