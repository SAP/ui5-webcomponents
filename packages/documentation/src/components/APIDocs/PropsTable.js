import React from 'react';

export default function PropsTable({ declaration }) {
    const properties = declaration.members?.filter(member => member.kind === "field") || [];

    if (!properties.length) {
        return "No properties available for this component."
    }

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
                properties.map((field, idx) => {
                    return <tr key={`props-${idx}`}>
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