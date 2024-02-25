import React from 'react';

export default function CssPartsTable({ declaration }) {
    const cssParts = declaration.cssParts || [];

    if (!cssParts.length) {
        return "No CSS parts available for this component."
    }

    // return cssParts.map(cssPart => {
    //     return <>
    //         <h3>{cssPart.name}</h3>
    //         <p dangerouslySetInnerHTML={{ __html: cssPart.description }}></p>
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
                cssParts.map((cssPart, idx) => {
                    return <tr key={"cssPart" + idx}>
                        <td><b>{cssPart.name}</b></td>
                        <td dangerouslySetInnerHTML={{__html: cssPart.description}}></td>
                    </tr>
                })
            }
        </tbody>
    </table>
}