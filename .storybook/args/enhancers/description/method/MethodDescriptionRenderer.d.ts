/// <reference types="react" />
import { IDescriptionRenderer, IDescriptionRendererProps } from "../../../types";
export declare class MethodDescriptionRenderer implements IDescriptionRenderer {
    private renderArguments;
    private renderReturnValue;
    render: (props: IDescriptionRendererProps) => JSX.Element;
}
