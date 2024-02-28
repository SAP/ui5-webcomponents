import React from 'react';

export default function EventsTable({ event }) {
    return <table style={{
                display: "table",
                borderRadius: "0.5rem",
                boxShadow: "inset 0 0 0 1px var(--ifm-table-border-color)",
                borderStyle: "hidden",
            }}>
            <tbody>
            <tr>
                <td>Description</td>
                <td dangerouslySetInnerHTML={{ __html: event.description }}></td>
            </tr>
            <tr>
                <td>Type</td>
                <td>{event.type?.text}</td>
            </tr>
            {event._ui5parameters && <tr>
                <td>Parameters</td>
                <td>{event._ui5parameters?.map((parameter, idx) => {
                    return <div key={idx}>{parameter.name}: {parameter.type?.text}
                        <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: parameter.description }}></p>
                        {parameter._ui5since && <>
                            Since: {parameter._ui5since}
                            <br />
                        </>}
                        {parameter.deprecated && <>
                            Deprecated: {parameter.deprecated}
                            <br />
                        </>}
                    </div>
                })}</td>
            </tr>}
            {event._ui5since && <tr>
                <td>Since</td>
                <td>{event._ui5since}</td>
            </tr>}
            {event.deprecated && <tr>
                <td>Deprecated</td>
                <td>{event.deprecated}</td>
            </tr>}
        </tbody>
    </table>
}