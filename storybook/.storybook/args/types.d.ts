/// <reference types="react" />
import { InputType } from "@storybook/types";
export type ArgType = InputType;
export interface IArgTypeEnhancer {
    isMatch: (argsType: ArgType) => boolean;
    enhance: (argsType: ArgType) => ArgType;
}
export type ReturnValue = {
    type: {
        text: string;
    };
    description: string;
};
export type Parameter = {
    name: string;
    type: {
        text: string;
    };
    optional: boolean;
    deprecated?: string | boolean;
    _ui5since?: string;
    default: string;
    description: string;
};
export type IDescriptionRendererProps = {
    parameters?: Parameter[];
    returnValue?: ReturnValue;
};
export interface IDescriptionRenderer {
    render(props: IDescriptionRendererProps): JSX.Element;
}
