import React from 'react';

export default function PropsTable({ declaration }) {
    const properties = declaration.members?.filter(member => member.kind === "field") || [];

    if (!properties.length) {
        return "No properties available for this component."
    }

    return properties.map(property => {
        return <>
            <h3>{property.name}</h3>
            <table>
                <tr>
                    <td><b>Description</b></td>
                    <td dangerouslySetInnerHTML={{ __html: property.description }}></td>
                </tr>
                <tr>
                    <td><b>Type</b></td>
                    <td>{property.type?.text}</td>
                </tr>
                <tr>
                    <td><b>Default</b></td>
                    <td>{property.default}</td>
                </tr>
                {property._ui5since && <tr>
                    <td><b>Available since</b></td>
                    <td>{property._ui5since}</td>
                </tr>}
                {property.deprecated && <tr>
                    <td><b>Deprecated</b></td>
                    <td>{property.deprecated}</td>
                </tr>}
            </table>
        </>
    })

    // return <>
    //     <table>
    //         <thead>
    //             <tr>
    //                 <th>Name</th>
    //                 <th>Type</th>
    //                 <th>Default</th>
    //                 <th>Description</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {
    //                 properties.map((field, idx) => {
    //                     return <tr key={`props-${idx}`}>
    //                         <td>{field.name}</td>
    //                         <td>{field.type?.text}</td>
    //                         <td>{field.default}</td>
    //                         <td dangerouslySetInnerHTML={{ __html: field.description }}></td>
    //                     </tr>
    //                 })
    //             }
    //         </tbody>
    //     </table>
    // </>
}