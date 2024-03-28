import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import BadgeDesign from "@ui5/webcomponents/dist/types/BadgeDesign.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
export default {
    title: "Main/Badge",
    component: "Badge",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-badge
	design="${ifDefined(args.design)}"
	color-scheme="${ifDefined(args.colorScheme)}"
	?interactive="${ifDefined(args.interactive)}"
	?hide-state-icon="${ifDefined(args.hideStateIcon)}"
	wrapping-type="${ifDefined(args.wrappingType)}"
	style="${ifDefined(args.style)}"
>
	${unsafeHTML(args.icon)}
	${unsafeHTML(args.default)}
</ui5-badge>`;
};
export const Basic = Template.bind({});
Basic.args = {
    colorScheme: "6",
    default: "Badge Text"
};
export const Interactive = Template.bind({});
Interactive.args = {
    design: BadgeDesign.Positive,
    interactive: true,
    default: "Success"
};
export const WrappingTypes = Template.bind({});
WrappingTypes.decorators = [
    (story, { args }) => {
        return html `
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
	${story({
            args: {
                ...args,
                default: args.default || "This would truncate as it is too long",
                wrappingType: args.wrappingType || WrappingType.None,
                style: "width: 200px"
            }
        })}
	${story({
            args: {
                ...args,
                default: args.default || "This would wrap as it is too long",
                wrappingType: args.wrappingType || WrappingType.Normal,
                style: "width: 200px"
            }
        })}
</div>`;
    },
];
export const Designs = Template.bind({});
Designs.decorators = [
    (story, ctx) => {
        return html `
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
		${[BadgeDesign.Neutral, BadgeDesign.Information, BadgeDesign.Positive, BadgeDesign.Negative, BadgeDesign.Critical, BadgeDesign.Set1, BadgeDesign.Set2, BadgeDesign.Set3].map((value) => {
            return story({
                args: {
                    design: ctx.args.design || value,
                    default: ctx.args.default || value,
                }
            });
        })}
</div>`;
    }
];
export const Set1 = Template.bind({});
Set1.decorators = [
    (story, ctx) => {
        return html `
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
		${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
            return story({
                args: {
                    design: ctx.args.design || BadgeDesign.Set1,
                    colorScheme: ctx.args.colorScheme || value.toString(),
                    default: ctx.args.default || "Color Scheme " + value,
                }
            });
        })}
</div>`;
    }
];
export const Set2 = Template.bind({});
Set2.decorators = [
    (story, ctx) => {
        return html `
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
		${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
            return story({
                args: {
                    design: ctx.args.design || BadgeDesign.Set2,
                    colorScheme: ctx.args.colorScheme || value.toString(),
                    default: ctx.args.default || "Color Scheme " + value,
                }
            });
        })}
</div>`;
    }
];
export const Set3 = Template.bind({});
Set3.decorators = [
    (story, ctx) => {
        return html `
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
		${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
            return story({
                args: {
                    design: ctx.args.design || BadgeDesign.Set3,
                    colorScheme: ctx.args.colorScheme || value.toString(),
                    default: ctx.args.default || "Color Scheme " + value,
                }
            });
        })}
</div>`;
    }
];
//# sourceMappingURL=Badge.stories.js.map