import React from 'react';

export default function CssPartsTable({ declaration }) {
    const cssParts = declaration.cssParts || [];

    if (!cssParts.length) {
        return "No CSS parts available for this component."
    }

    // return cssParts.map(cssPart => {
    //     return <>
    //         <h3>{cssPart.name}</h3>
    //         <p>{cssPart.description}</p>
    //     </>
    // })

    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {
                cssParts.map(cssPart => {
                    return <tr>
                        <td>{cssPart.name}</td>
                        <td dangerouslySetInnerHTML={{__html: cssPart.description}}></td>
                    </tr>
                })
            }
        </tbody>
    </table>
}