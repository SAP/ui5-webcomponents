import React from 'react';

export default function EnumFieldsTable({ declaration }) {
    const enumFields = declaration.members?.filter(member => member.kind === "field") || [];

    if (!enumFields.length) {
        return "No enum fields available for this component."
    }

    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {
                enumFields.map(field => {
                    return <tr>
                        <td>{field.name}</td>
                        <td dangerouslySetInnerHTML={{__html: field.description}}></td>
                    </tr>
                })
            }
        </tbody>
    </table>
}