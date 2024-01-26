import type { Meta } from "@storybook/web-components";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs.js";

import type Form from "@ui5/webcomponents/dist/Form.js";

import { FormGroup as FormGroupTemplate } from "./FormGroup.js";
import { FormEdit as FormEditTemplate } from "./FormEdit.js";
import { FormBasic as FormBasicTemplate } from "./FormBasic.js";
import { FormLabelSpan as FormLabelSpanTemplate } from "./FormLabelSpan.js";
import { FormGroupColumnSpan as FormGroupColumnSpanTemplate } from "./FormGroupColumnSpan.js";

const component = "ui5-form";

export default {
    title: "Main/Form",
    component: "Form",
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Form>;

export const FormBasic = FormBasicTemplate;
export const FormLabelSpan = FormLabelSpanTemplate;
export const FormEdit = FormEditTemplate;
export const FormGroup = FormGroupTemplate;
export const FormGroupColumnSpan = FormGroupColumnSpanTemplate;
