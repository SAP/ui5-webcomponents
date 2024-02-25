import React from 'react';

export default function SlotsTable({ declaration }) {
    const slots = declaration.slots || [];

    if (!slots.length) {
        return "No slots available for this component."
    }

    return slots.map(slot => {
        return <>
            <h3>{slot.name}</h3>
            <table>
                <tr>
                    <td><b>Description</b></td>
                    <td dangerouslySetInnerHTML={{ __html: slot.description }}></td>
                </tr>
                <tr>
                    <td><b>Type</b></td>
                    <td>{slot._ui5type?.text}</td>
                </tr>
                {slot._ui5since && <tr>
                    <td><b>Available since</b></td>
                    <td>{slot._ui5since}</td>
                </tr>}
                {slot.deprecated && <tr>
                    <td><b>Deprecated</b></td>
                    <td>{slot.deprecated}</td>
                </tr>}
            </table>
        </>
    })

    // return <table>
    //     <thead>
    //         <tr>
    //             <th>Name</th>
    //             <th>Type</th>
    //             <th>Description</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {
    //             slots.map((slot, idx) => {
    //                 return <tr key={"slot" + idx}>
    //                     <td>{slot.name}</td>
    //                     <td>{slot._ui5type?.text}</td>
    //                     <td dangerouslySetInnerHTML={{__html: slot.description}}></td>
    //                 </tr>
    //             })
    //         }
    //     </tbody>
    // </table>
}