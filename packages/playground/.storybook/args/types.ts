import { InputType } from "@storybook/types";

export type ArgType = InputType;

export interface IArgTypeEnhancer {
    isMatch: (argsType: ArgType) => boolean;
    enhance: (argsType: ArgType) => ArgType;
}

export type ReturnValue = {
    type: string;
    description: string;
};

export type Parameter = {
    name: string;
    type: string;
    description: string;
};

export type IDescriptionRendererProps = {
    parameters?: Parameter[];
    returnValue?: ReturnValue;
};

export interface IDescriptionRenderer {
    render(props: IDescriptionRendererProps): JSX.Element;
}
