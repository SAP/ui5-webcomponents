import React from "react";
import { IDescriptionRenderer, IDescriptionRendererProps, Parameter } from "../../../types";

export class EventDescriptionRenderer implements IDescriptionRenderer {
    private renderEventDetails = (parameters: Parameter[]): JSX.Element => {
        const parameterList = parameters?.map((p: Parameter) => (
            <React.Fragment key={p.name}>
                <b><code>{p.name}</code></b>
                <ul>
                    <li><b>type:</b> {p.type}</li>
                    <li><b>description:</b> {p.description}</li>
                </ul>
            </React.Fragment>
        ));

        const EventDetail = () => <>
            <p><b>Event Detail Properties:</b></p>
            {parameterList}
        </>;

        return (
            <>
                {parameters?.length && <EventDetail />}
            </>
        );
    }

    public render = (props: IDescriptionRendererProps): JSX.Element => {
        const { parameters } = props;
        if (!parameters?.length) {
            return <></>;
        }

        return (
            <>
                <br />
                <br />
                {parameters?.length && this.renderEventDetails(parameters)}
            </>
        );
    }
}