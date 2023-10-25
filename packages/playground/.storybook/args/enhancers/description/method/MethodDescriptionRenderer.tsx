import React from "react";
import { IDescriptionRenderer, IDescriptionRendererProps, Parameter, ReturnValue } from "../../../types";

export class MethodDescriptionRenderer implements IDescriptionRenderer {

    private renderArguments = (parameters: Parameter[]): JSX.Element => {
        const parameterList = parameters?.map((p: Parameter) => (
            <React.Fragment key={p.name}>
                <b><code>{p.name}</code></b>
                <ul>
                    <li><b>type:</b> {p.type}</li>
                    <li><b>description:</b> {p.description}</li>
                </ul>
            </React.Fragment>
        ));

        const Arguments = () => <>
            <p><b>Arguments:</b></p>
            {parameterList}
        </>;

        return (
            <>
                {parameters?.length && <Arguments />}
            </>
        );
    }

    private renderReturnValue = (returnValue: ReturnValue): JSX.Element => {
        return (
            <>
                <p><b>Return Value:</b></p>
                <ul>
                    <li><b>type:</b> {returnValue?.type}</li>
                    <li><b>description:</b> {returnValue?.description}</li>
                </ul>
            </>
        );
    }

    public render = (props: IDescriptionRendererProps): JSX.Element => {
        const { parameters, returnValue } = props;
        if (!parameters && !returnValue) {
            return <></>;
        }

        return (
            <>
                <br />
                <br />
                {parameters && this.renderArguments(parameters)}
                {returnValue && this.renderReturnValue(returnValue)}
            </>
        );
    }
}