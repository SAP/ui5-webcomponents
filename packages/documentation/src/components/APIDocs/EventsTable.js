import React from 'react';

export default function EventsTable({ declaration }) {
    const events = declaration.events || [];

    if (!events.length) {
        return "No events available for this component."
    }

    // return events.map(event => {
    //     return <>
    //         <h3>{event.name}</h3>
    //         <p>{event.description}</p>
    //         <p><b>Type:</b> {event.type?.text}</p>
    //         <p><b>Paramters:</b>
    //             <ul>
    //                 {
    //                     event._ui5parameters?.map(parameter => {
    //                         return <li>
    //                             <b>{parameter.name}:</b> {parameter.type?.text}
    //                             <p>{parameter.description}</p>
    //                         </li>
    //                     })
    //                 }
    //             </ul>
    //         </p>
    //     </>
    // })

    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Return type</th>
                <th>Description</th>
                <th>Arguments</th>
            </tr>
        </thead>
        <tbody>
            {
                events.map((event, idx) => {
                    return <tr key={"event" + idx}>
                        <td>{event.name}</td>
                        <td>{event.type?.text || ""}</td>
                        <td dangerouslySetInnerHTML={{__html: event.description}}></td>
                        <td>{event._ui5parameters?.map(parameter => parameter.name).join(" ") || ""}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}