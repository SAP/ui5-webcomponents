import type { Meta } from "@storybook/web-components";
import argTypes from "./argTypes.js";

import type Form from "@ui5/webcomponents/dist/Form.js";

import { FormGroup as FormGroupStory } from "./FormGroup.js";
import { FormEdit as FormEditStory } from "./FormEdit.js";
import { FormBasic as FormBasicStory } from "./FormBasic.js";
import { FormLabelSpan as FormLabelSpanStory } from "./FormLabelSpan.js";
import { FormGroupColumnSpan as FormGroupColumnSpanStory } from "./FormGroupColumnSpan.js";
import { FormSingleGroup as FormSingleGroupStory } from "./FormSingleGroup.js";
import { FormMultipleGroups as FormMultipleGroupsStory } from "./FormMultipleGroups.js";

export default {
    title: "Main/Form",
    component: "Form",
    argTypes,
} as Meta<Form>;

export const FormBasic = FormBasicStory;
export const FormLabelSpan = FormLabelSpanStory;
export const FormEdit = FormEditStory;
export const FormGroup = FormGroupStory;
export const FormGroupColumnSpan = FormGroupColumnSpanStory;
export const FormSingleGroup = FormSingleGroupStory;
export const FormMultipleGroups = FormMultipleGroupsStory;
