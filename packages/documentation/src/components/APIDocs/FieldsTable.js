import React from 'react';

export default function FieldsTable({ declaration }) {
    const fields = declaration.members?.filter(member => member.kind === "field") || [];

    if (!fields.length) {
        return "No fields available for this component."
    }

    // return fields.map(field => {
    //     return <>
    //         <h3>{field.name}</h3>
    //         <p>{field.description}</p>
    //         {/* <p>Type: {field.type?.text}</p>
    //         <p>Default: {field.default}</p> */}
    //         <table>
    //             <tr>
    //                 <td>Type:</td>
    //                 <td>{field.type?.text}</td>
    //             </tr>
    //             <tr>
    //                 <td>Default:</td>
    //                 <td>{field.default}</td>
    //             </tr>
    //         </table>
    //     </>
    // })
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {
                fields.map(field => {
                    return <tr>
                        <td>{field.name}</td>
                        <td>{field.type?.text}</td>
                        <td>{field.default}</td>
                        <td dangerouslySetInnerHTML={{__html: field.description}}></td>
                    </tr>
                })
            }
        </tbody>
    </table>
}