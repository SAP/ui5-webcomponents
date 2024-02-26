import React from 'react';

export default function EventsTable({ event }) {
    return <table>
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
                <td>{event._ui5parameters?.map((parameter, index) => {
                    return <div key={index}><b>{parameter.name}</b>: {parameter.type?.text}
                        <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: parameter.description }}></p>
                        {parameter._ui5since && <>
                            Available since: {parameter._ui5since}
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
                <td><b>Available since</b></td>
                <td>{event._ui5since}</td>
            </tr>}
            {event.deprecated && <tr>
                <td><b>Deprecated</b></td>
                <td>{event.deprecated}</td>
            </tr>}
        </tbody>
    </table>
}