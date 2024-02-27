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
                <td><b>Description</b></td>
                <td dangerouslySetInnerHTML={{ __html: event.description }}></td>
            </tr>
            <tr>
                <td><b>Type</b></td>
                <td>{event.type?.text}</td>
            </tr>
            {event._ui5parameters && <tr>
                <td><b>Parameters</b></td>
                <td>{event._ui5parameters?.map((parameter, idx) => {
                    return <div key={idx}><b>{parameter.name}</b>: {parameter.type?.text}
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
                <td><b>Since</b></td>
                <td>{event._ui5since}</td>
            </tr>}
            {event.deprecated && <tr>
                <td><b>Deprecated</b></td>
                <td>{event.deprecated}</td>
            </tr>}
        </tbody>
    </table>
}